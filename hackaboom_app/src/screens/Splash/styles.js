import {StyleSheet,Dimensions, Platform} from "react-native";

const deviceHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    bg: {
        flex: 1,
        width: null,
        height: deviceHeight,
        backgroundColor: "rgba(0,0,0,0.1)",
        flexDirection: "row",
        alignSelf: "center"
    },
    bgMiddle: {
        flex: 1,
        height: deviceHeight,
        backgroundColor: "rgba(0,0,0,0.1)",
        flexDirection: "column",
        alignSelf: "center",
        justifyContent:'center'
    }

});
