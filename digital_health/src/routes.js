import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Text } from 'react-native';

import Login from './Pages/Login';
import Home from './Pages/Home';
import ForgetPassword from './Pages/ForgetPassword';

const Stack = createStackNavigator();

let isAuthenticated = true;

export default function Routes() {

  return (
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen name='Home' component={Home}
              options={{ headerRight: () => { return (<Button title='contatos' />) } }}
            />
          </>
        ) : (
            <>
              <Stack.Screen name='Login' component={Login} headerMode='none' />
              <Stack.Screen name='ForgetPassword' component={ForgetPassword} headerMode='none' />
            </>
          )}
      </Stack.Navigator>
  )
}