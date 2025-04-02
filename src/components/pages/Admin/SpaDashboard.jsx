import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import Sidebar from './SideBar';
import { getAllAppointments } from "../../service/appointmentApi";
import { getAllServices } from "../../service/serviceApi";
import { getAllTherapists } from "../../service/therapistsApi";

const SpaDashboard = () => {
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [appointmentStats, setAppointmentStats] = useState({
    total: 0,
    paid: 0,
    partiallyPaid: 0,
    unpaid: 0,
    cancelled: 0
  });
  const [serviceStats, setServiceStats] = useState([]);
  const [therapistStats, setTherapistStats] = useState([]);
  
  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [appointmentsData, servicesData, therapistsData] = await Promise.all([
          getAllAppointments(),
          getAllServices(),
          getAllTherapists()
        ]);
        
        if (appointmentsData?.result && Array.isArray(appointmentsData.result)) {
          processData(appointmentsData.result, servicesData?.result || [], therapistsData?.result || []);
        } else {
          throw new Error('Không nhận được dữ liệu từ server');
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [year]);

  // Xử lý dữ liệu
  const processData = (appointments, services, therapists) => {
    // Tạo mảng dữ liệu cho 12 tháng
    const months = Array.from({ length: 12 }, (_, i) => {
      const monthName = new Date(0, i).toLocaleString('vi', { month: 'long' });
      return {
        month: monthName,
        revenue: 0,
        treatments: 0,
        clients: new Set(),
      };
    });

    // Thống kê trạng thái thanh toán
    let totalAppointments = appointments.length;
    let paidAppointments = 0;
    let partiallyPaidAppointments = 0;
    let unpaidAppointments = 0;
    let cancelledPaymentAppointments = 0;

    // Thống kê dịch vụ
    const serviceMap = new Map();
    services.forEach(service => {
      serviceMap.set(service.id, { 
        name: service.name, 
        count: 0, 
        revenue: 0 
      });
    });

    // Thống kê nhân viên
    const therapistMap = new Map();
    therapists.forEach(therapist => {
      therapistMap.set(therapist.id, { 
        name: therapist.fullname, 
        count: 0, 
        revenue: 0 
      });
    });

    // Xử lý từng lịch hẹn
    appointments.forEach(appointment => {
      // Thống kê trạng thái thanh toán
      if (appointment.paymentStatus === 'PAID') {
        paidAppointments++;
      } else if (appointment.paymentStatus === 'PARTIALLY_PAID') {
        partiallyPaidAppointments++;
      } else if (appointment.paymentStatus === 'UNPAID') {
        unpaidAppointments++;
      } else if (appointment.paymentStatus === 'CANCELLED') {
        cancelledPaymentAppointments++;
      }

      // Chỉ xử lý doanh thu với lịch hẹn đã hoàn thành thanh toán
      if (appointment.date && (appointment.paymentStatus === 'PAID' || appointment.paymentStatus === 'PARTIALLY_PAID')) {
        const appointmentDate = new Date(appointment.date);
        const appointmentYear = appointmentDate.getFullYear();
        const appointmentMonth = appointmentDate.getMonth();
        
        if (appointmentYear.toString() === year) {
          // Doanh thu
          const price = appointment.service?.price || 0;
          const revenue = appointment.paymentStatus === 'PAID' ? price : (appointment.depositAmount || 0);
          
          months[appointmentMonth].treatments += 1;
          months[appointmentMonth].revenue += revenue;
          months[appointmentMonth].clients.add(appointment.customer?.id || appointment.fullname);

          // Thống kê dịch vụ
          if (appointment.service?.id && serviceMap.has(appointment.service.id)) {
            const serviceData = serviceMap.get(appointment.service.id);
            serviceData.count += 1;
            serviceData.revenue += revenue;
          }

          // Thống kê nhân viên
          if (appointment.therapist?.id && therapistMap.has(appointment.therapist.id)) {
            const therapistData = therapistMap.get(appointment.therapist.id);
            therapistData.count += 1;
            therapistData.revenue += revenue;
          }
        }
      }
    });

    // Chuyển đổi Set thành số lượng
    const processedMonths = months.map(month => ({
      ...month,
      clients: month.clients.size
    }));

    // Cập nhật state
    setRevenueData(processedMonths);
    setAppointmentStats({
      total: totalAppointments,
      paid: paidAppointments,
      partiallyPaid: partiallyPaidAppointments,
      unpaid: unpaidAppointments,
      cancelled: cancelledPaymentAppointments
    });

    // Chuyển đổi Map thành mảng và sắp xếp theo doanh thu
    setServiceStats(
      Array.from(serviceMap.values())
        .filter(service => service.count > 0)
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5)
    );

    setTherapistStats(
      Array.from(therapistMap.values())
        .filter(therapist => therapist.count > 0)
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5)
    );
  };

  // Tính tổng doanh thu
  const totalRevenue = revenueData.reduce((sum, month) => sum + month.revenue, 0);
  
  // Tính trung bình doanh thu hàng tháng
  const avgMonthlyRevenue = totalRevenue / (revenueData.filter(month => month.treatments > 0).length || 1);
  
  // Tìm tháng có doanh thu cao nhất
  const highestRevenueMonth = revenueData.reduce((max, month) => 
    month.revenue > max.revenue ? month : max, revenueData[0] || { revenue: 0 });
  
  // Tính tổng số điều trị và khách hàng
  const totalTreatments = revenueData.reduce((sum, month) => sum + month.treatments, 0);
  const totalClients = revenueData.reduce((sum, month) => sum + month.clients, 0);

  // Format số tiền VND
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Màu sắc cho biểu đồ
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A4DE6C'];

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-900 text-white font-montserrat">
        <Sidebar />
        <div className="flex-1 p-4 flex justify-center items-center">
          <div className="text-xl">Đang tải dữ liệu...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gray-900 text-white font-montserrat">
        <Sidebar />
        <div className="flex-1 p-4 flex justify-center items-center">
          <div className="text-red-500 text-xl">
            Lỗi: {error}
            <button 
              onClick={() => window.location.reload()}
              className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-white font-montserrat">
      <Sidebar />
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-5">
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-2xl font-bold">Báo Cáo Doanh Thu Quán Spa</h1>
            <select 
              value={year} 
              onChange={(e) => setYear(e.target.value)}
              className="p-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="p-4 rounded-lg shadow-md bg-gradient-to-r from-blue-800 to-blue-600">
              <div className="text-sm text-gray-300 mb-1">Tổng Doanh Thu</div>
              <div className="text-xl font-bold">{formatCurrency(totalRevenue)}</div>
            </div>
            <div className="p-4 rounded-lg shadow-md bg-gradient-to-r from-green-800 to-green-600">
              <div className="text-sm text-gray-300 mb-1">Doanh Thu TB/Tháng</div>
              <div className="text-xl font-bold">{formatCurrency(avgMonthlyRevenue)}</div>
            </div>
            <div className="p-4 rounded-lg shadow-md bg-gradient-to-r from-purple-800 to-purple-600">
              <div className="text-sm text-gray-300 mb-1">Tổng Số Điều Trị</div>
              <div className="text-xl font-bold">{totalTreatments}</div>
            </div>
            <div className="p-4 rounded-lg shadow-md bg-gradient-to-r from-yellow-800 to-yellow-600">
              <div className="text-sm text-gray-300 mb-1">Tổng Khách Hàng</div>
              <div className="text-xl font-bold">{totalClients}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Biểu đồ doanh thu */}
            <div className="p-5 rounded-lg shadow-md bg-gray-800">
              <h2 className="text-lg font-bold mb-4">Biểu Đồ Doanh Thu Hàng Tháng {year}</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}tr`} stroke="#9ca3af" />
                    <Tooltip 
                      formatter={(value) => formatCurrency(value)} 
                      contentStyle={{ backgroundColor: "#1f2937", borderColor: "#4b5563" }} 
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      name="Doanh Thu" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Biểu đồ trạng thái thanh toán */}
            <div className="p-5 rounded-lg shadow-md bg-gray-800">
              <h2 className="text-lg font-bold mb-4">Trạng Thái Thanh Toán</h2>
              <div className="h-80 flex items-center justify-center">
                <div className="w-full">
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Đã thanh toán', value: appointmentStats.paid },
                          { name: 'Thanh toán một phần', value: appointmentStats.partiallyPaid },
                          { name: 'Chưa thanh toán', value: appointmentStats.unpaid },
                          { name: 'Đã hủy', value: appointmentStats.cancelled }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {[
                          { name: 'Đã thanh toán', value: appointmentStats.paid, color: '#10b981' },
                          { name: 'Thanh toán một phần', value: appointmentStats.partiallyPaid, color: '#f59e0b' },
                          { name: 'Chưa thanh toán', value: appointmentStats.unpaid, color: '#ef4444' },
                          { name: 'Đã hủy', value: appointmentStats.cancelled, color: '#8b5cf6' }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => value} 
                        contentStyle={{ backgroundColor: "#1f2937", borderColor: "#4b5563", color: "#fff" }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap justify-center text-sm">
                    <div className="flex items-center mr-4 mb-2">
                      <div className="w-3 h-3 bg-green-500 mr-1 rounded-full"></div>
                      <span>Đã thanh toán: {appointmentStats.paid}</span>
                    </div>
                    <div className="flex items-center mr-4 mb-2">
                      <div className="w-3 h-3 bg-yellow-500 mr-1 rounded-full"></div>
                      <span>Thanh toán một phần: {appointmentStats.partiallyPaid}</span>
                    </div>
                    <div className="flex items-center mr-4 mb-2">
                      <div className="w-3 h-3 bg-red-500 mr-1 rounded-full"></div>
                      <span>Chưa thanh toán: {appointmentStats.unpaid}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 bg-purple-500 mr-1 rounded-full"></div>
                      <span>Đã hủy: {appointmentStats.cancelled}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Top dịch vụ */}
            <div className="p-5 rounded-lg shadow-md bg-gray-800">
              <h2 className="text-lg font-bold mb-4">Top Dịch Vụ {year}</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={serviceStats}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                    <XAxis type="number" stroke="#9ca3af" />
                    <YAxis dataKey="name" type="category" stroke="#9ca3af" width={120} />
                    <Tooltip
                      formatter={(value, name) => [formatCurrency(value), 'Doanh thu']} 
                      contentStyle={{ backgroundColor: "#1f2937", borderColor: "#4b5563", color: "#fff" }}
                    />
                    <Legend />
                    <Bar dataKey="revenue" name="Doanh thu" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top nhân viên */}
            <div className="p-5 rounded-lg shadow-md bg-gray-800">
              <h2 className="text-lg font-bold mb-4">Top Nhân Viên {year}</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={therapistStats}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                    <XAxis type="number" stroke="#9ca3af" />
                    <YAxis dataKey="name" type="category" stroke="#9ca3af" width={120} />
                    <Tooltip 
                      formatter={(value, name) => [formatCurrency(value), 'Doanh thu']} 
                      contentStyle={{ backgroundColor: "#1f2937", borderColor: "#4b5563", color: "#fff" }}
                    />
                    <Legend />
                    <Bar dataKey="revenue" name="Doanh thu" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div className="p-5 rounded-lg shadow-md bg-gray-800">
            <h2 className="text-lg font-bold mb-4">Chi Tiết Doanh Thu Hàng Tháng {year}</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-2 text-gray-400">Tháng</th>
                    <th className="text-right py-3 px-2 text-gray-400">Doanh Thu</th>
                    <th className="text-right py-3 px-2 text-gray-400">Số Điều Trị</th>
                    <th className="text-right py-3 px-2 text-gray-400">Số Khách Hàng</th>
                    <th className="text-right py-3 px-2 text-gray-400">TB/Khách</th>
                  </tr>
                </thead>
                <tbody>
                  {revenueData.map((item, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="py-3 px-2">{item.month}</td>
                      <td className="text-right py-3 px-2">{formatCurrency(item.revenue)}</td>
                      <td className="text-right py-3 px-2">{item.treatments}</td>
                      <td className="text-right py-3 px-2">{item.clients}</td>
                      <td className="text-right py-3 px-2">
                        {item.clients > 0 ? formatCurrency(item.revenue / item.clients) : formatCurrency(0)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="font-bold bg-gray-900">
                    <td className="py-3 px-2">Tổng</td>
                    <td className="text-right py-3 px-2">{formatCurrency(totalRevenue)}</td>
                    <td className="text-right py-3 px-2">{totalTreatments}</td>
                    <td className="text-right py-3 px-2">{totalClients}</td>
                    <td className="text-right py-3 px-2">
                      {totalClients > 0 ? formatCurrency(totalRevenue / totalClients) : formatCurrency(0)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaDashboard;