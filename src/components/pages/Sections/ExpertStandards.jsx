import React from "react";

const ExpertStandards = () => {
  return (
    <section className="w-full py-16 px-6 md:px-12" style={{ backgroundColor: 'rgb(88, 137, 133)' }}>
      <div className="max-w-5xl mx-auto text-center">
        {/* Tiêu đề chính */}
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Chuyên viên đạt chuẩn 3 không
        </h2>
        {/* Mô tả ngắn */}
        <p className="mt-6 text-lg md:text-xl text-gray-200 leading-relaxed">
          Chuyên viên đạt chuẩn "3 không" là những người có trình độ và kĩ năng
          chuyên môn cao, đáp ứng đủ các yêu cầu về đào tạo, chứng chỉ và kinh
          nghiệm trong việc làm đẹp hoặc điều trị.
        </p>
      </div>

      {/* Khối 3 tiêu chí */}
      <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Tiêu chí 1 */}
        <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center">
          <div className="text-4xl font-extrabold text-green-700 mb-4">01</div>
          <h3 className="text-2xl font-semibold text-[#2F4F4F] mb-3">
            Không sai sót
          </h3>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            Chuyên viên đạt chuẩn sẽ đảm bảo quy trình kỹ thuật tỉ mỉ, hạn chế
            tối đa các sai sót trong quá trình thực hiện, đồng thời bám sát quy
            trình an toàn đã được kiểm chứng.
          </p>
        </div>

        {/* Tiêu chí 2 */}
        <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center">
          <div className="text-4xl font-extrabold text-green-700 mb-4">02</div>
          <h3 className="text-2xl font-semibold text-[#2F4F4F] mb-3">
            Không lạm dụng
          </h3>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            Chuyên viên luôn sử dụng đúng phương pháp và mức cần thiết, không
            lạm dụng sản phẩm hay liệu trình quá mức, đảm bảo kết quả tối ưu và
            an toàn cho khách hàng.
          </p>
        </div>

        {/* Tiêu chí 3 */}
        <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center">
          <div className="text-4xl font-extrabold text-green-700 mb-4">03</div>
          <h3 className="text-2xl font-semibold text-[#2F4F4F] mb-3">
            Không ảnh hưởng sức khoẻ
          </h3>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            Chuyên viên cam kết các dịch vụ tuân thủ tiêu chuẩn y tế, không gây
            tác động xấu đến sức khỏe. Mọi liệu trình đều được thực hiện với
            dụng cụ và sản phẩm đạt chứng nhận an toàn.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExpertStandards;