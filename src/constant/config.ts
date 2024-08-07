export const BASE_URL = "https://backend-fastapi-kw-blogs.onrender.com/";

//Auth
export const URL_API_AUTH = "auth";
export const URL_AUTH_REGISTER = `${URL_API_AUTH}/register`;
export const URL_API_LOGIN = `${URL_API_AUTH}/login`;
export const URL_API_LOGOUT = `${URL_API_AUTH}/logout`;
export const URL_API_REFRESHTOKEN = `${URL_API_AUTH}/refresh-token`;
export const LOCAL_USER = "user";

//User
export const URL_API_USER = "user";
export const URL_API_CHANGEPASSWORD = `${URL_API_USER}/change-password`;
export const URL_API_UPDATEUSER = `${URL_API_USER}/update-user`;

//POST
export const URL_API_POST = "post";
export const URL_API_SEARCHPOST = `${URL_API_POST}/search-posts`;
export const URL_API_NEWESTPOST = `${URL_API_POST}/newest-posts-search`;
export const URL_API_CREATEPOST = `${URL_API_POST}/create-post`;
export const URL_API_POSTID = `${URL_API_POST}/post`;
export const URL_API_POSTUPDATED = `${URL_API_POST}/update`;
export const URL_API_DELETEPOST = `${URL_API_POST}/delete`;
export const URL_API_LIKEPOST = `${URL_API_POST}/like`;
export const URL_API_YOURPOSTS = `${URL_API_POST}/your-posts`;
export const URL_API_YOURFAVORITESPOSTS = `${URL_API_POST}/your-posts-favorites`;

//FILE
export const URL_API_FILE = "file";
export const URL_API_UPLOADFILE = `${URL_API_FILE}/upload-file`;
