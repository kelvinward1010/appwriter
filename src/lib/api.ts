import axios from "axios";

import { BASE_URL, URL_API_REFRESHTOKEN } from "@/constant/config";
import storage, { storageRefreshToken } from "@/utils/storage";

export const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 1000 * 60 * 30 * 3, // 90 minutes
});

apiClient.interceptors.request.use(
    function (config) {
        config.headers.Authorization = "Bearer " + storage.getToken();
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

// Trong interceptor
apiClient.interceptors.response.use(
    function (response) {
        // Xử lý phản hồi thành công
        return response;
    },
    async function (error) {
        if (error?.response?.status === 401) {
            try {
                // Gọi API để lấy token mới
                const refreshtoken = storageRefreshToken.getToken();
                const draftData = {
                    refresh_token: refreshtoken,
                };
                const refreshTokenResponse = await apiClient.post(
                    `${URL_API_REFRESHTOKEN}`,
                    draftData,
                );
                const newToken = refreshTokenResponse.data?.data?.token;

                //Lưu token mới vào Redux store
                //dispatch(updateToken({access_token: newToken}));

                // Lưu token mới vào local storage
                storage.setToken(newToken);

                // Thử gửi lại yêu cầu ban đầu với token mới
                const originalRequest = error.config;
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                console.error("Lỗi khi lấy token mới:", refreshError);
                // Xử lý lỗi khi lấy token mới (ví dụ: đăng xuất người dùng)
                // dispatch({ type: 'LOGOUT' });
                // Điều hướng đến trang đăng nhập nếu cần
                // history.push('/login');
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    },
);
