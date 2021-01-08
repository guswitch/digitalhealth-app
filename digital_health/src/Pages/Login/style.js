import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,      
        backgroundColor: '#FFF',
        padding: 20,
        paddingTop: 15,
        alignItems: 'center',
        //justifyContent: 'center'
    },
    title: {
        color: '#2C5698',
        fontSize: 36,
        paddingTop: 30,
        fontWeight: 'bold'
    },
    subtitle: {
        color: '#26b4b0',
        fontSize: 24,
        marginBottom:15,
    },
    label: {
        fontSize:16,
        color: '#26b4b0',
        alignSelf: 'flex-start'
    },
    field: {
        paddingHorizontal: 10,
        marginBottom:30,
        width: 300,
        borderColor: '#26b4b0',
        color: '#2C5698',
        borderWidth: 1.5,
        height: 50,
        fontSize:18
    },
});

export default styles;