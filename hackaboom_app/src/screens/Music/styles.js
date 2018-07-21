import {Dimensions, StyleSheet} from "react-native";

const deviceHeight = Dimensions.get("window").height;
export default StyleSheet.create({
    happyPart: {
        flex: 0.5,
        alignItems: "center",
        justifyContent: "center"
    },
    bg: {
        flex: 1,
        width: null,
        height: deviceHeight,
        backgroundColor: "rgba(0,0,0,0.1)",
        flexDirection: "row",
        alignSelf: "center"
    },
    angryPart: {
        flex: 0.6,
        alignItems: "center",
        justifyContent: "flex-start"
    },
    oneOfThird: {
        flex: 0.33,
        justifyContent: "center",
        alignItems: "center"
    },
    albumpic: {
        alignSelf: 'center',
        height: 300,
        width: 300
    },
    profileCircle: {
        width: 120,
        height: 120,
        borderRadius: 80,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileCircleTransparent: {
        width: 140,
        height: 140,
        borderRadius: 90,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        alignItems: 'center',
        justifyContent: 'center'
    },

});
