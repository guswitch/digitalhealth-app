import React, { useState, useEffect } from 'react';
import { Text, View, Image, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

import styles from './style';

import Separator from '../../components/separator';
import SubmitButton from '../../components/SubmitButton';

import { AuthContext } from '../../../App';

const logo = require('../../../assets/logocoresprincipaisv.png');

export default function Login(props) {
  const { navigation } = props;

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = React.useContext(AuthContext);

  /*async function Authentication(){
    try {
      const response = await api.post('/session', { username, password })
      console.log(response.data);
      const {token} = response.data;

      await AsyncStorage.setItem('@DigitalHealth:token', JSON.stringify(token));

    return navigation.navigate('Home', {screen: 'Home'});
    } catch (error) {
      return setMsg('Falha ao fazer login');
    }
  }*/

  return (
    <View style={styles.container}>
 
      <Image source={logo} />
      <Text style={styles.title}> Primeiro acesso </Text>
      <Text style={styles.subtitle}> Entre usando seus dados </Text>

      <View>
        <Text style={styles.label}> Usuario </Text>
        <TextInput
          style={styles.field}
          onChangeText={text => setUserName(text)}
        />

        <Text style={styles.label}> Senha </Text>
        <TextInput
          secureTextEntry={true}
          style={styles.field}
          onChangeText={text => setPassword(text)}
        />

        <SubmitButton
          text='Entrar'
          disable={(username === '') || (password === '')}
          onPress={() => signIn({ username, password })}
        />

        <Separator />

        <Button
          title="Esqueceu sua senha ?"
          onPress={() => navigation.navigate('ForgetPassword')}
        />

      </View>

    </View>
  );
}

