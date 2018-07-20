import { Platform } from "react-native";
const Configuration = {
    API_URL : "167.99.141.244",
    STATIC_HOST :"167.99.141.244",
    PLATFORM_IOS : Platform.OS == "ios",
    PLATFORM_ANDROID : Platform.OS != "ios",
    HTTP_TIMEOUT_MS : 40000 /* 40 sec */
};

export default Configuration;
