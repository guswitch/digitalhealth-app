import React, { useEffect, useState } from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import SimpleButton from '../../components/SimpleButton';

import api from '../../services/api';

export default function AllContacts({ navigation }) {

    let ScreenHeight = Dimensions.get("window").height - 50;
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        async function getContacts() {
            try {
                const response = await api.get('/contacts/');
                setContacts(response.data);
                //console.log(response.data);
            } catch (err) {
                alert(err)
            }
        }
        getContacts();
    }, [contacts]);

    async function deleteContact(id) {
        try {
            await api.delete(`/contacts/delete/${id}`);
            alert('Excluido com sucesso')
        } catch (err) {
            alert(err)
        }
    }

    function handleDeleteContact(id) {
        Alert.alert('Excluir contato', 'Tem certeza que deseja excluir esse contato ?', [
            { text: 'Excluir', onPress: () => deleteContact(id) }
        ], { cancelable: true })
    }

    return (

        <>
    
            <ScrollView style={styles.container}>
                {
                    contacts.map(contact => {
                        const {name,telephone,_id} = contact;
                        //const {telephone} = contact;
                        //const {_id} = contact;

                        return (
                            <View key={contact._id} style={styles.contact}>
                                <View>
                                    <Text style={styles.contactName}> {contact.name} </Text>
                                    <Text style={styles.contactNumber}> {contact.telephone} </Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Button title="editar" onPress={() => navigation.navigate('UpdateContact',{name,telephone,_id})} />
                                    <Button title="excluir" color="red" onPress={() => handleDeleteContact(contact._id)} />
                                </View>
                            </View>
                        )
                    })
                }

            </ScrollView>

            <SimpleButton text="Adicionar novo contato" onPress={() => navigation.navigate('CreateContact')} />
        
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 20,
        paddingTop: 15,

        //alignItems: 'center',
    },
    contact: {
        marginVertical: 5,
        paddingVertical: 15,
        paddingHorizontal: 15,
        width: 350,
        backgroundColor: '#f2f2f2',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10
    },
    contactName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    contactNumber: {
        fontSize: 18,
        fontWeight: 'normal',
    }
})