import React from 'react';

const StaffSection = () => {
    return (
        <section id="staff" className="bg-[#E8EAE6] py-16 px-4 animate__animated animate__fadeInUp animate__delay-2s">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-[#2F4F4F] mb-8">
                    Chuyên viên tiêu biểu của năm
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-lg p-6 shadow animate__animated animate__zoomIn">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Nguyễn Anh Hùng"
                            className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                        />
                        <h3 className="text-lg font-semibold text-[#446E6A]">
                            Nguyễn Anh Hùng
                        </h3>
                        <p className="text-gray-700 text-sm">
                            Chuyên gia điều trị mụn
                        </p>
                        <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                            Anh Hùng nổi bật với khả năng điều trị mụn hiệu quả, giúp nhiều khách hàng lấy lại làn da sáng mịn, tự tin.
                        </p>
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow animate__animated animate__zoomIn animate__delay-1s">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Trần Việt Anh"
                            className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                        />
                        <h3 className="text-lg font-semibold text-[#446E6A]">
                            Trần Việt Anh
                        </h3>
                        <p className="text-gray-700 text-sm">
                            Dịch vụ chăm sóc da toàn diện
                        </p>
                        <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                            Anh thành công trong việc cung cấp các liệu trình chăm sóc da toàn diện, giúp làn da khách hàng luôn khỏe mạnh và tươi mới.
                        </p>
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow animate__animated animate__zoomIn animate__delay-2s">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Dưa Hấu Miếng"
                            className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                        />
                        <h3 className="text-lg font-semibold text-[#446E6A]">
                            Dưa Hấu Miếng
                        </h3>
                        <p className="text-gray-700 text-sm">
                            Chuyên viên điều trị tẩy lông
                        </p>
                        <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                            Anh Vinh nổi bật với kỹ thuật tẩy lông vĩnh viễn, giúp khách hàng loại bỏ lông một cách an toàn và lâu dài, mang lại làn da mịn màng, tự tin.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StaffSection;
