import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { handleVnPayCallback, handlePaymentResponse } from '../service/paymentApi';

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
        const handleCallback = async () => {
            try {
                // Lấy query params từ URL
                const queryParams = new URLSearchParams(location.search);
                console.log(queryParams);
                // Gọi API xử lý callback
                const response = await handleVnPayCallback(Object.fromEntries(queryParams));
                console.log(response);
                // Xử lý response và chuyển hướng
                handlePaymentResponse(response, navigate);
            } catch (error) {
                console.error("Payment callback error:", error);
                alert("Có lỗi xảy ra trong quá trình xử lý thanh toán!");
                navigate('/payment-failed');
            }
        };

        if (location.search) {
            handleCallback();
        }
    }, [location, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h2 className="text-xl mb-4">Đang xử lý thanh toán...</h2>
                {/* Có thể thêm loading spinner ở đây */}
            </div>
        </div>
    );
};

export default Payment; 