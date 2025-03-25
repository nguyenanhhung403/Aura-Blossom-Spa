import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Sidebar from './SideBar';

const SpaDashboard = () => {
  const [year, setYear] = useState('2024');
  
  // Dữ liệu mẫu cho các năm
  const revenueData = {
    '2023': [
      { month: 'Tháng 1', revenue: 42000000, treatments: 120, clients: 85 },
      { month: 'Tháng 2', revenue: 38500000, treatments: 110, clients: 76 },
      { month: 'Tháng 3', revenue: 45000000, treatments: 135, clients: 92 },
      { month: 'Tháng 4', revenue: 41200000, treatments: 118, clients: 87 },
      { month: 'Tháng 5', revenue: 48000000, treatments: 142, clients: 95 },
      { month: 'Tháng 6', revenue: 52300000, treatments: 158, clients: 110 },
      { month: 'Tháng 7', revenue: 56100000, treatments: 172, clients: 123 },
      { month: 'Tháng 8', revenue: 58400000, treatments: 180, clients: 128 },
      { month: 'Tháng 9', revenue: 54800000, treatments: 165, clients: 118 },
      { month: 'Tháng 10', revenue: 51200000, treatments: 155, clients: 108 },
      { month: 'Tháng 11', revenue: 49500000, treatments: 148, clients: 102 },
      { month: 'Tháng 12', revenue: 62300000, treatments: 190, clients: 135 }
    ],
    '2024': [
      { month: 'Tháng 1', revenue: 48500000, treatments: 136, clients: 98 },
      { month: 'Tháng 2', revenue: 45000000, treatments: 128, clients: 92 },
      { month: 'Tháng 3', revenue: 52800000, treatments: 152, clients: 110 },
      { month: 'Tháng 4', revenue: 51000000, treatments: 145, clients: 105 },
      { month: 'Tháng 5', revenue: 57200000, treatments: 162, clients: 118 },
      { month: 'Tháng 6', revenue: 63500000, treatments: 180, clients: 130 },
      { month: 'Tháng 7', revenue: 68200000, treatments: 195, clients: 140 },
      { month: 'Tháng 8', revenue: 71500000, treatments: 205, clients: 148 },
      { month: 'Tháng 9', revenue: 67800000, treatments: 192, clients: 138 },
      { month: 'Tháng 10', revenue: 65100000, treatments: 186, clients: 132 },
      { month: 'Tháng 11', revenue: 62000000, treatments: 175, clients: 125 },
      { month: 'Tháng 12', revenue: 75000000, treatments: 215, clients: 155 }
    ]
  };

  const currentYearData = revenueData[year];

  // Tính tổng doanh thu
  const totalRevenue = currentYearData.reduce((sum, month) => sum + month.revenue, 0);
  
  // Tính trung bình doanh thu hàng tháng
  const avgMonthlyRevenue = totalRevenue / currentYearData.length;
  
  // Tìm tháng có doanh thu cao nhất
  const highestRevenueMonth = currentYearData.reduce((max, month) => 
    month.revenue > max.revenue ? month : max, currentYearData[0]);
  
  // Tính tổng số điều trị và khách hàng
  const totalTreatments = currentYearData.reduce((sum, month) => sum + month.treatments, 0);
  const totalClients = currentYearData.reduce((sum, month) => sum + month.clients, 0);

  // Format số tiền VND
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white font-montserrat">
      <Sidebar />
      <div className="flex-1 p-4">
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
            <div className="p-4 rounded-lg shadow-md bg-gray-800">
              <div className="text-sm text-gray-400 mb-1">Tổng Doanh Thu</div>
              <div className="text-xl font-bold">{formatCurrency(totalRevenue)}</div>
            </div>
            <div className="p-4 rounded-lg shadow-md bg-gray-800">
              <div className="text-sm text-gray-400 mb-1">Doanh Thu TB/Tháng</div>
              <div className="text-xl font-bold">{formatCurrency(avgMonthlyRevenue)}</div>
            </div>
            <div className="p-4 rounded-lg shadow-md bg-gray-800">
              <div className="text-sm text-gray-400 mb-1">Tổng Số Điều Trị</div>
              <div className="text-xl font-bold">{totalTreatments}</div>
            </div>
            <div className="p-4 rounded-lg shadow-md bg-gray-800">
              <div className="text-sm text-gray-400 mb-1">Tổng Khách Hàng</div>
              <div className="text-xl font-bold">{totalClients}</div>
            </div>
          </div>
          
          <div className="mb-6 p-5 rounded-lg shadow-md bg-gray-800">
            <h2 className="text-lg font-bold mb-4">Biểu Đồ Doanh Thu Hàng Tháng {year}</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentYearData}>
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
                  {currentYearData.map((item, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="py-3 px-2">{item.month}</td>
                      <td className="text-right py-3 px-2">{formatCurrency(item.revenue)}</td>
                      <td className="text-right py-3 px-2">{item.treatments}</td>
                      <td className="text-right py-3 px-2">{item.clients}</td>
                      <td className="text-right py-3 px-2">
                        {formatCurrency(item.revenue / item.clients)}
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
                      {formatCurrency(totalRevenue / totalClients)}
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