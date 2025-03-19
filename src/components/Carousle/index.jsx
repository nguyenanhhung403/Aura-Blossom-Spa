import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";


const ServicesCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Mobile lớn
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Mobile nhỏ
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <section className="services">
        <h2>Dịch Vụ Nổi Bật</h2>
        <Slider {...settings} className="service-slider">
          <div className="service-item">
            <img
              loading="lazy"
              src="/src/components/images/SevivceImg/tech1.jpg"
              alt="Bảng hiệu chữ INOX ChiDome1"
            />
            <p>CÔNG NGHỆ HYDRAFACIAL</p>
            <p>Thanh lọc sâu, giảm mụn, kiểm dầu. Sạch thoáng làn da , sạch mát tinh thần</p>
          </div>

          <div className="service-item">
            <img
              loading="lazy"
              src="/src/components/images/SevivceImg/tech2.jpg"
              alt="Thi Công Bảng Hiệu Goodne-Chicken 5"
            />
            <p>ÁNH SÁNG SINH HỌC BIO LED</p>
            <p>Làm dịu, giảm viêm, mờ thâm. Phục hồi vẻ tươi sáng cho làng da</p>
          </div>

          <div className="service-item">
            <img
              loading="lazy"
              src="/src/components/images/SevivceImg/tech3.png"
              alt="Biển Hiệu Đèn LED Phê Cafe "
            />
            <p>CÔNG NGHỆ HIGH PRESSURE MESO THERAPY</p>
            <p>Dịu lành, an toàn, không đau. Không kim, không xâm lấn, không cần nghỉ dưỡng</p>
          </div>

          <div className="service-item">
            <img
              loading="lazy"
              src="/src/components/images/SevivceImg/tech4.jpg"
              alt="Hộp Đèn MiCa Hút Nổi Gon-3"
            />
            <p className="font">CÔNG NGHỆ RADIO FREQUENCY LIFTING & EMS</p>
            <p>
            Săn chắc da, chống lão hóa. Tăng sinh collagen, tăng độ đàn hồi. Giảm nhăn, giảm quần thâm mắt
            </p>
          </div>

          
        </Slider>
      </section>
    </>
  );
};

export default ServicesCarousel;