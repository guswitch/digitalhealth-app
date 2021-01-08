import React from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';

const logo = require('../../../assets/logoBranca.png');

export default function SplashScreen(){
    return(
        <View style={styles.container}>
            <Image style={{width: 200,height: 200}} source={logo} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2C5698'
    }
})