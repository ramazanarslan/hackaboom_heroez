import { Dimensions, StyleSheet } from "react-native";
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
    card: {
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        marginTop: 5,
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        backgroundColor: 'rgba(255,255,255,0.3)',
        height: 60,
        flexDirection: 'row',
        elevation: 1,

    },
});
