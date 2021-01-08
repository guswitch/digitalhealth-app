import React, { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet, Button } from "react-native";
import { iconDropWhite, iconHumidityWhite } from "../../styles/icons";
import * as Notification from 'expo-notifications';
import * as Permission from 'expo-permissions';
import { ScrollView } from "react-native-gesture-handler";
import api from '../../services/api';

export default function AllNotifications() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function getNotifications() {
      try {
        const response = await api.get('/notifications/');
        setNotifications(response.data);
        //console.log(response.data);
      } catch (err) {
        alert(err)
      }
    }
    getNotifications();
  }, [notifications]);

  function handlerNotification() {
    Notification.scheduleNotificationAsync({
      content: {
        title: 'Testando',
        body: 'Testando notificações'
      },
      trigger: {
        seconds: 5
      }
    })
  }

  return (
    <>
      <ScrollView style={styles.container}>
        {
          notifications.map(notification => {
            return (
              <View key={notification._id} style={styles.notification}>
                <View style={styles.viewIcon}>
                  <Image source={iconDropWhite} style={styles.icon} />
                </View>
                <View style={styles.viewMessage}>
                  <Text style={styles.titleNotification}>{notification.title}</Text>
                  <Text styles={styles.message}>{notification.description}</Text>
                </View>
              </View>
            )
          })
        }
      </ScrollView>
      <Button title="enviar notificação" onPress={handlerNotification} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C5698",
    padding: 20,
    //alignItems: "center",
    //justifyContent: 'center'
  },

  notification: {
    width: 350,
    borderRadius: 10,
    marginVertical: 10,
    paddingVertical: 25,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleNotification: {
    flexWrap: 'wrap',
    fontSize: 22,
    fontWeight: 'bold'
  },
  viewIcon: {
    borderRadius: 10,
    paddingHorizontal: 7,
    backgroundColor: '#0b1f4f',
    paddingVertical: 20
  },
  icon: {
    height: 50,
    width: 50,
  },
  viewMessage: {
    width: 250,
  },
  message: {
    color: '#FFF',
    flexWrap: 'wrap'
  }
});
