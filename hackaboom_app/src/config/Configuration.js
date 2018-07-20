import { Platform } from "react-native";
const Configuration = {
    API_URL : "https://dev.tppagent.api.dev.birlikte.al",
    STATIC_HOST :"https://dev.tppagent.api.dev.birlikte.al",
    PLATFORM_IOS : Platform.OS == "ios",
    PLATFORM_ANDROID : Platform.OS != "ios",
    HTTP_TIMEOUT_MS : 40000 /* 40 sec */
};

export default Configuration;
