import api, { handleError } from "./api.js";
import { useNavigate } from "react-router-dom";

export const createVnPayPayment = async (paymentRequest) => {
    try {
        const response = await api.post('/api/payment/vn-pay', paymentRequest);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const handleVnPayCallback = async (request) => {
    try {
        const response = await api.get('/api/payment/vn-pay-callback', { params: request });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const handlePaymentResponse = (response, navigate) => {
    try {
        if (response.code === "00") {
            // Thanh toán thành công
            alert("Thanh toán thành công!");
            // Chuyển hướng về trang history
            navigate('/history');
            return {
                success: true,
                message: "Thanh toán thành công!"
            };
        } else {
            // Thanh toán thất bại
            alert("Thanh toán thất bại. Vui lòng thử lại!");
            navigate('/payment-failed');
            return {
                success: false,
                message: "Thanh toán thất bại. Vui lòng thử lại!"
            };
        }
    } catch (error) {
        console.error("Payment error:", error);
        return {
            success: false,
            message: "Có lỗi xảy ra khi xử lý thanh toán!"
        };
    }
};