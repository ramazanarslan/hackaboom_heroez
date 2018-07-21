import {Dimensions, StyleSheet} from "react-native";

const deviceHeight = Dimensions.get("window").height;
export default StyleSheet.create({
    mapLayout: {
        flex: 0.7
    },
    listLayout: {
        flex: 0.3
    },
    mapStyle: {
        flex: 1
    },
    card: {

            justifyContent: 'space-between',
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
            elevation: 1


    },
    roundedNameInitials: {

        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: "#fff",
        elevation: 3
    },
    textname: {
        fontFamily: 'Poppins-Regular',
color:'white',
        marginLeft:5,
        alignSelf: 'center'
    },
    bodyname: {
    alignItems:'center'
    },
    bg: {
        flex: 1,
        width: null,
        height: deviceHeight,
        backgroundColor: "rgba(0,0,0,0.1)",
        flexDirection: "row",
        alignSelf: "center"
    },
});
