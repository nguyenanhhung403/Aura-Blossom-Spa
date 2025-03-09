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

  // Định nghĩa font chữ và style chung
  const fontStyles = {
    fontFamily: "'Montserrat', 'Roboto', sans-serif",
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white" style={fontStyles}>
      <Sidebar />
      <div className="flex-1 p-4">
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h1 style={{ fontSize: "24px", fontWeight: "bold", fontFamily: "'Montserrat', sans-serif" }}>Báo Cáo Doanh Thu Quán Spa</h1>
            <select 
              value={year} 
              onChange={(e) => setYear(e.target.value)}
              style={{ padding: "8px 12px", borderRadius: "4px", border: "1px solid #ccc", backgroundColor: "#333", color: "white", fontFamily: "'Montserrat', sans-serif" }}
            >
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "24px" }}>
            <div style={{ padding: "16px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", backgroundColor: "#1f2937" }}>
              <div style={{ fontSize: "14px", color: "#9ca3af", marginBottom: "4px", fontFamily: "'Montserrat', sans-serif" }}>Tổng Doanh Thu</div>
              <div style={{ fontSize: "20px", fontWeight: "bold", fontFamily: "'Montserrat', sans-serif" }}>{formatCurrency(totalRevenue)}</div>
            </div>
            <div style={{ padding: "16px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", backgroundColor: "#1f2937" }}>
              <div style={{ fontSize: "14px", color: "#9ca3af", marginBottom: "4px", fontFamily: "'Montserrat', sans-serif" }}>Doanh Thu TB/Tháng</div>
              <div style={{ fontSize: "20px", fontWeight: "bold", fontFamily: "'Montserrat', sans-serif" }}>{formatCurrency(avgMonthlyRevenue)}</div>
            </div>
            <div style={{ padding: "16px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", backgroundColor: "#1f2937" }}>
              <div style={{ fontSize: "14px", color: "#9ca3af", marginBottom: "4px", fontFamily: "'Montserrat', sans-serif" }}>Tổng Số Điều Trị</div>
              <div style={{ fontSize: "20px", fontWeight: "bold", fontFamily: "'Montserrat', sans-serif" }}>{totalTreatments}</div>
            </div>
            <div style={{ padding: "16px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", backgroundColor: "#1f2937" }}>
              <div style={{ fontSize: "14px", color: "#9ca3af", marginBottom: "4px", fontFamily: "'Montserrat', sans-serif" }}>Tổng Khách Hàng</div>
              <div style={{ fontSize: "20px", fontWeight: "bold", fontFamily: "'Montserrat', sans-serif" }}>{totalClients}</div>
            </div>
          </div>
          
          <div style={{ marginBottom: "24px", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", backgroundColor: "#1f2937" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px", fontFamily: "'Montserrat', sans-serif" }}>Biểu Đồ Doanh Thu Hàng Tháng {year}</h2>
            <div style={{ height: "320px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentYearData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                  <XAxis dataKey="month" stroke="#9ca3af" tick={{ fontFamily: "'Montserrat', sans-serif" }} />
                  <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}tr`} stroke="#9ca3af" tick={{ fontFamily: "'Montserrat', sans-serif" }} />
                  <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={{ backgroundColor: "#1f2937", borderColor: "#4b5563", fontFamily: "'Montserrat', sans-serif" }} />
                  <Legend wrapperStyle={{ fontFamily: "'Montserrat', sans-serif" }} />
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
          
          <div style={{ padding: "20px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", backgroundColor: "#1f2937" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px", fontFamily: "'Montserrat', sans-serif" }}>Chi Tiết Doanh Thu Hàng Tháng {year}</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Montserrat', sans-serif" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #4b5563" }}>
                    <th style={{ textAlign: "left", padding: "12px 8px", color: "#9ca3af" }}>Tháng</th>
                    <th style={{ textAlign: "right", padding: "12px 8px", color: "#9ca3af" }}>Doanh Thu</th>
                    <th style={{ textAlign: "right", padding: "12px 8px", color: "#9ca3af" }}>Số Điều Trị</th>
                    <th style={{ textAlign: "right", padding: "12px 8px", color: "#9ca3af" }}>Số Khách Hàng</th>
                    <th style={{ textAlign: "right", padding: "12px 8px", color: "#9ca3af" }}>TB/Khách</th>
                  </tr>
                </thead>
                <tbody>
                  {currentYearData.map((item, index) => (
                    <tr key={index} style={{ borderBottom: "1px solid #374151" }}>
                      <td style={{ padding: "12px 8px" }}>{item.month}</td>
                      <td style={{ textAlign: "right", padding: "12px 8px" }}>{formatCurrency(item.revenue)}</td>
                      <td style={{ textAlign: "right", padding: "12px 8px" }}>{item.treatments}</td>
                      <td style={{ textAlign: "right", padding: "12px 8px" }}>{item.clients}</td>
                      <td style={{ textAlign: "right", padding: "12px 8px" }}>
                        {formatCurrency(item.revenue / item.clients)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr style={{ fontWeight: "bold", backgroundColor: "#111827" }}>
                    <td style={{ padding: "12px 8px" }}>Tổng</td>
                    <td style={{ textAlign: "right", padding: "12px 8px" }}>{formatCurrency(totalRevenue)}</td>
                    <td style={{ textAlign: "right", padding: "12px 8px" }}>{totalTreatments}</td>
                    <td style={{ textAlign: "right", padding: "12px 8px" }}>{totalClients}</td>
                    <td style={{ textAlign: "right", padding: "12px 8px" }}>
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