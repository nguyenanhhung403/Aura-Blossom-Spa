import React from "react";
import avt1 from "../../images/avatar/avt1.jpg";
import avt2 from "../../images/avatar/avt2.jpg";
import avt3 from "../../images/avatar/avt3.jpg";
import { useNavigate } from "react-router-dom";

const staffMembers = [
  {
    id: 1,
    name: "Nguyễn Anh Hùng",
    role: "Chuyên gia điều trị mụn",
    description:
      "Anh Hùng nổi bật với khả năng điều trị mụn hiệu quả, giúp nhiều khách hàng lấy lại làn da sáng mịn, tự tin.",
    image: avt2,
    delay: "",
  },
  {
    id: 2,
    name: "Trần Việt Anh",
    role: "Dịch vụ chăm sóc da toàn diện",
    description:
      "Anh thành công trong việc cung cấp các liệu trình chăm sóc da toàn diện, giúp làn da khách hàng luôn khỏe mạnh và tươi mới.",
    image: avt1,
    delay: "animate__delay-1s",
  },
  {
    id: 3,
    name: "Dưa Hấu Miếng",
    role: "Chuyên viên điều trị tẩy lông",
    description:
      "Anh Vinh nổi bật với kỹ thuật tẩy lông vĩnh viễn, giúp khách hàng loại bỏ lông một cách an toàn và lâu dài, mang lại làn da mịn màng, tự tin.",
    image: avt3,
    delay: "animate__delay-2s",
  },
];

const StaffSection = () => {
    const navigate = useNavigate();
  return (
    <section
      id="staff"
      className="py-16 px-4 animate__animated animate__fadeInUp animate__delay-2s"
      style={{ backgroundColor: "rgb(142, 163, 150)" }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#2F4F4F] mb-8">
          Chuyên viên tiêu biểu của năm
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {staffMembers.map(({ id, name, role, description, image, delay }) => (
            <div
              key={id}
              className={`bg-white rounded-lg p-6 shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-lg animate__animated ${delay}`}
            >
              <img
                src={image}
                alt={name}
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4 hover:shadow-lg"
              />
              <h3 className="text-lg font-semibold text-[#446E6A]">{name}</h3>
              <p className="text-gray-700 text-sm">{role}</p>
              <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>

        {/* Nút Xem Thêm */}
        <div className="mt-8">
          <button
            onClick={() => navigate("/therapist")} // Điều hướng đến trang chuyên viên
            className="px-6 py-3 bg-[#446E6A] text-white rounded-full font-semibold hover:bg-[#375955] transition"
          >
            Xem thêm
          </button>
        </div>
      </div>
    </section>
  );
};

export default StaffSection;
