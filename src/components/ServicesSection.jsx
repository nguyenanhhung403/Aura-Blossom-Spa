import React from 'react';
import heroImage from '../../images/AnhSuMenh/SuMenh.jpg';

const ServicesSection = () => {
    return (
        <section id="services" className="bg-[#E8EAE6] py-16 px-4 animate__animated animate__fadeInUp animate__delay-1s">
            <div className="max-w-7xl mx-auto text-center mb-10">
                <h2 className="text-3xl font-bold text-[#2F4F4F] mb-4">
                    Dịch vụ của chúng tôi
                </h2>
                <p className="text-gray-700 max-w-2xl mx-auto">
                    Mang trong mình sứ mệnh tôn vinh vẻ đẹp tự nhiên, Aura Blossom Spa
                    cung cấp các liệu trình chăm sóc da và trị liệu toàn diện.
                </p>
            </div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg p-6 shadow hover:shadow-xl transition animate__animated animate__zoomIn">
                    <img
                        src={heroImage}
                        alt="Detox Lăn Da"
                        className="rounded mb-4 w-full h-40 object-cover"
                    />
                    <h3 className="text-xl font-semibold text-[#446E6A] mb-2">
                        Detox Lăn Da
                    </h3>
                    <p className="text-sm text-gray-600">
                        Hành trình làm mới làn da với liệu trình Detox độc đáo...
                    </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow hover:shadow-xl transition animate__animated animate__zoomIn animate__delay-1s">
                    <img
                        src=""
                        alt="Chăm sóc da chuyên sâu"
                        className="rounded mb-4 w-full h-40 object-cover"
                    />
                    <h3 className="text-xl font-semibold text-[#446E6A] mb-2">
                        Chăm sóc da chuyên sâu
                    </h3>
                    <p className="text-sm text-gray-600">
                        Phục hồi và nuôi dưỡng làn da, đem lại vẻ rạng ngời...
                    </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow hover:shadow-xl transition animate__animated animate__zoomIn animate__delay-2s">
                    <img
                        src=""
                        alt="Chăm sóc body"
                        className="rounded mb-4 w-full h-40 object-cover"
                    />
                    <h3 className="text-xl font-semibold text-[#446E6A] mb-2">
                        Chăm sóc body
                    </h3>
                    <p className="text-sm text-gray-600">
                        Liệu trình massage, tẩy tế bào chết, giúp làn da mịn màng...
                    </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow hover:shadow-xl transition animate__animated animate__zoomIn animate__delay-3s">
                    <img
                        src=""
                        alt="Triệt lông vĩnh viễn"
                        className="rounded mb-4 w-full h-40 object-cover"
                    />
                    <h3 className="text-xl font-semibold text-[#446E6A] mb-2">
                        Triệt lông vĩnh viễn
                    </h3>
                    <p className="text-sm text-gray-600">
                        Tự tin khoe làn da láng mịn với liệu trình triệt lông tiên tiến...
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
