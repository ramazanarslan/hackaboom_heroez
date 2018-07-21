import {StyleSheet} from "react-native";

export default StyleSheet.create({
    mapLayout: {
        flex: 0.4
    },
    listLayout: {
        flex: 0.6
    },
    mapStyle: {
        flex: 1
    },
    card: {
        marginLeft:5,
        marginRight:5,
        marginBottom:5,
        marginTop:5,
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        height: 60,
        backgroundColor: '#fff',
        flexDirection: 'row',
        elevation: 3,

    },
    roundedNameInitials: {

        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: "#23c086",
        elevation: 3
    },
    textname: {
    marginLeft:5,
        alignSelf: 'center'
    },
    bodyname: {
    alignItems:'center'
    }
});
