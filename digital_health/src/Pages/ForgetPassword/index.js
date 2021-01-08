import React from 'react';
import {Text, View, Image,Button} from 'react-native';

import styles from '../Login/style';

const logo = require('../../../assets/logo.png');

export default function ForgetPassword({navigation}){
    return(
        <View style={styles.container}>
            <Image styles={styles.logo} source={logo} /> 
            <Text style={styles.title}> Esqueceu sua senha ? </Text>
            <Text style={styles.subtitle}> Entre em contato com a equipe de suporte do Digital Health </Text>
            <Button title='Voltar ao login' onPress={() => navigation.goBack()} />
        </View>
    )
}