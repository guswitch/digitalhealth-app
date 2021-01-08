import {StyleSheet, Dimensions} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 0,      
        backgroundColor: '#2C5698',
        padding: 20,
        //alignItems: 'center',
        //justifyContent: 'center'
    },
    header: {
        margin: 0,
        width: Dimensions.get("window").width,
        flexDirection: 'row', 
        justifyContent: 'space-between',
        paddingHorizontal: 20, 
        paddingVertical: 15, 
        backgroundColor: '#FFF'
    },
    boxData: {
        marginVertical: 7,
        borderRadius: 15,
        paddingVertical: 20,
        backgroundColor: '#FAFAFA',
        paddingLeft: 25,
        shadowOffset:{  width: 5,  height: 5,  },
        shadowColor: 'black',
        shadowOpacity: 0.3,
    },
    text: {
        color: '#2C5698',
        fontSize: 24,
        fontWeight: 'normal',
        marginTop: 4,
        paddingLeft: 5
    },
    image: {
        marginTop: 10
    },
    textbold: {
        color: '#118077',
        fontSize: 20,
        fontWeight: 'bold',
    },
    title: {
        color: '#118077',
        fontSize: 34,
        fontWeight: 'bold',
    }
});

export default styles;