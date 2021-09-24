import {StyleSheet} from "react-native";

const height_proportion = '100%';
const weight_proportion = '100%';


export const homeStyle = StyleSheet.create({
    mainStyle: {
        backgroundColor: 'white',
        height: height_proportion,
    },
    appbar: {
        position: 'relative',
        flexDirection: "row",
        left: 0,
        right: 0,
        top: 0,
        backgroundColor: "white",
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 0,
    },
    imageView: {
        flexDirection: "row",
        padding: 20,
        flex: 0.4,
    },
    imageLogo: {
        flex: 0.25,
        resizeMode: 'contain'
    },
    rightView: {
        flexDirection: "row",
        height: height_proportion,
        paddingRight: 10,
        flex: 0.17,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    appbarIcon: {
        flex: 0.35,
    },
    storyImage: {
        width: 58,
        borderRadius: 40,
        height: 58
    },
    story: {
        borderWidth: 1,
        borderColor: 'red',
        padding: 4,
        borderRadius: 40,
    },
    postMainView: {
        flexDirection: "column",
    },
    postMainTopView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    postTopView: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    postImage: {
        width: 38,
        borderRadius: 40,
        height: 38
    },
    postTitle: {
        fontSize: 12,
        fontWeight: '500',
        paddingStart: 10,
    },
    postMainImage: {
        width: weight_proportion,
        height: 300,
        marginTop: 9,
    },
    postMainBottomView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        height: 40,
    },
    postMoreIcon: {
        width: 15,
        marginRight: 1,
        height: 15
    },
    postBottomLeftSide: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: 'center'
    },
    postBottomIcon: {
        width: 20,
        marginHorizontal: 10,
    },
    postDescriptionStyle: {
        fontSize: 14,
        paddingHorizontal: 10,
        marginBottom: 5
    },
    followTextStyle: {
        fontSize: 14,
        color: '#3489eb',
        fontWeight: '600'
    },
    bottomNaviBarStyle: {
        backgroundColor: "white",
    }
});