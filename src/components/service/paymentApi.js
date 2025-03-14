import api, { handleError } from "./api.js";

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