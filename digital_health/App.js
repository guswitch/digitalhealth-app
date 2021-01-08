import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, StatusBar, View } from 'react-native';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';
//import Routes from './routes';

export const AuthContext = React.createContext();
const Stack = createStackNavigator();

import api from './src/services/api';

import Login from './src/Pages/Login';
import Home from './src/Pages/Home';
import ForgetPassword from './src/Pages/ForgetPassword';
import SplashScreen from './src/Pages/Splash';
import Profile from './src/Pages/Profile';

import AllContacts from './src/Pages/Contacts';
import CreateContact from './src/Pages/Contacts/create';
import UpdateContact from './src/Pages/Contacts/update';
import DeleteContact from './src/Pages/Contacts/delete';
import AllNotifications from './src/Pages/Notifications';

import * as Notification from 'expo-notifications';
import * as Permission from 'expo-permissions';

export let socket = io('http://10.0.2.2:3000');

Notification.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true
    }
  }
});

export default function App() {

  useEffect(() => {

    Permission.getAsync(Permission.NOTIFICATIONS)
      .then(StatusObj => {
        if (StatusObj.status !== 'granted') {
          return Permission.askAsync(Permission.NOTIFICATIONS)
        }
        return StatusObj;
      }).then(StatusObj => {
        if (StatusObj.status !== 'granted') {
          throw new Error('Permission not granted');
        }
      })
      .then(() => {
        return Notification.getExpoPushTokenAsync();
      })
      .then(async push_token => {
        console.log(push_token);
        /*try {
          //await api.post('/pushtoken/create', {push_token: push_token.data});
        } catch(err) {
          console.error(err);
        }*/
      })
      .catch(err => {
        console.error(err);
        return null;
      });

  }, []);

  useEffect(() => {

    const backgroundSubscription = Notification.addNotificationReceivedListener(response => {
      console.log(response);
    });

    const foregroundSubscription = Notification.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    return () => {
      foregroundSubscription.remove();
      backgroundSubscription.remove();
    }
  }, []);

/* useEffect(() => {
 
        //   console.log(socket);
        socket.on('Teste', function (data) {
           Notification.scheduleNotificationAsync({
            content: {
              title: data.title,
              body: data.description
            },
            trigger: {
              seconds: 1
            }
          })
        });  
  },[]);*/

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('@DigitalHealth:token');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        const { username, password } = data;
        try {
          const response = await api.post('/session', { username, password })
          console.log(response.data);
          const { token } = response.data;

          await AsyncStorage.setItem('@DigitalHealth:token', JSON.stringify(token));

          dispatch({ type: 'SIGN_IN', token: token });
        } catch (error) {
          return alert('Falha ao fazer login');
        }


      },
      signOut: async () => {
        await AsyncStorage.removeItem('@DigitalHealth:token')

        dispatch({ type: 'SIGN_OUT' })
      },
      /*signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },*/
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <StatusBar barStyle='light-content' />
        <Stack.Navigator>
          {state.isLoading ? (
            <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          ) : state.userToken == null ? (
            <>
              <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
              <Stack.Screen name='ForgetPassword' component={ForgetPassword} options={{ headerShown: false }} />
            </>
          ) : (
                <>
                  <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />

                  <Stack.Screen name='AllContacts' component={AllContacts}
                    options={{ title: 'Contatos', headerStyle: { backgroundColor: '#2C5698' }, headerTintColor: '#fff' }} />

                  <Stack.Screen name='CreateContact' component={CreateContact}
                    options={{ title: 'Criar Contato', headerStyle: { backgroundColor: '#2C5698' }, headerTintColor: '#fff' }} />

                  <Stack.Screen name='DeleteContact' component={DeleteContact}
                    options={{ title: 'Excluir Contato', headerStyle: { backgroundColor: '#2C5698' }, headerTintColor: '#fff' }} />

                  <Stack.Screen name='UpdateContact' component={UpdateContact}
                    options={{ title: 'Atualizar Contato', headerStyle: { backgroundColor: '#2C5698' }, headerTintColor: '#fff' }} />

                  <Stack.Screen name='AllNotifications' component={AllNotifications}
                    options={{ title: 'Notificações', headerStyle: { backgroundColor: '#2C5698' }, headerTintColor: '#fff' }} />

                  <Stack.Screen name='Profile' component={Profile}
                    options={{ title: 'Perfil', headerStyle: { backgroundColor: '#2C5698' }, headerTintColor: '#fff' }} />
                </>
              )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
} 