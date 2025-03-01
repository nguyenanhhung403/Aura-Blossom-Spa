import React from 'react';
import spaAbout from '../../images/spa-about.png';
import HeroVideo from '../../images/AnhSuMenh/HeroVideo.mp4'
const AboutSection = () => {
    return (
        <section
            id="about"
            className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 animate__animated animate__fadeInUp animate__delay-1s"
        >
            <div className="flex items-center justify-center">
                <video
                    src={HeroVideo}
                    className="rounded-lg shadow-lg w-3/4 object-cover"
                    autoPlay
                    loop
                    muted
                />
            </div>
            <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-[#2F4F4F] mb-4">
                    Xứ mệnh của chúng tôi
                </h2>
                <h3 className="text-xl font-semibold text-[#446E6A] mb-4">
                    Aura Blossom Spa
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                    Đến Aura Blossom để hồi sinh và nở rộ” – như một đóa hoa, bạn sẽ cảm nhận được sự tươi mới, sống động sau những liệu trình tại đây. Không chỉ là chăm sóc làn da, Aura Blossom Spa còn mang đến sự cân bằng, giúp tâm hồn bạn thoát khỏi nhịp sống hối hả, những lo toan của cuộc sống thường ngày.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                    Với cái tên Aura Blossom, spa gợi lên hình ảnh của sự nở rộ và ánh sáng. “Aura” là vầng hào quang, là năng lượng tốt đẹp mà chúng tôi mong muốn lan tỏa đến bạn. “Blossom” là sự bừng nở, sự hồi sinh – nơi làn da bạn không chỉ đẹp hơn mà cả tinh thần cũng trở nên tươi mới.
                </p>
                <p className="text-gray-700 leading-relaxed">
                    Tại Aura Blossom Spa, từng góc nhỏ đều được chăm chút như một câu chuyện. Có góc ngồi nhỏ, nơi bạn nhâm nhi trà thảo mộc ấm, hương thơm như dẫn bạn về những buổi tối bên bếp lửa, khi mẹ kể bạn nghe câu chuyện cổ tích. Có những liệu trình chăm sóc da tự nhiên, dịu nhẹ, như bàn tay mẹ từng nhẹ nhàng vuốt tóc bạn sau một ngày dài mệt mỏi.
                </p>
                <p className="text-gray-700 leading-relaxed">
                    “Đến Aura Blossom để nở rộ trong an lành” – một hành trình chăm sóc bản thân không chỉ là sự đẹp đẽ bên ngoài mà còn là cảm giác yên bình, thư thái từ bên trong. Khi rời đi, bạn không chỉ cảm nhận làn da sáng mịn, mà còn mang theo trong lòng một chút ký ức đẹp đẽ, như đóa hoa vừa bừng nở trong vườn tuổi thơ.
                </p>
            </div>
        </section>
    );
};

export default AboutSection;
