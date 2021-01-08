import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';

import SubmitButton from '../../components/SubmitButton';

import api from '../../services/api';

export default function UpdateContact({route,navigation}) {
    const [name, setName] = useState(route.params.name);
    const [telephone, setTelephone] = useState(route.params.telephone);

    async function handleSubmit(data) {
        try {
            const response = await api.put(`/contacts/update/${route.params._id}`,data);
            console.log(response.data);
            alert('contato atualizado');

            return navigation.navigate('AllContacts')
        } catch (err) {
            alert(err)
        }
    }

    return (
        <View style={styles.container}>

            <Text style={styles.label}> Nome: </Text>
            <TextInput
                style={styles.field}
                onChangeText={text => setName(text)}
                value={name}
            />

            <Text style={styles.label}> Número </Text>
            <TextInput
                style={styles.field}
                onChangeText={text => setTelephone(text)}
                value={telephone}
            />

            <SubmitButton
                text='Atualizar contato'
                disable={(name === '') || (telephone === '')}
                onPress={() => handleSubmit({ name, telephone })}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 20,
        paddingTop: 15,
        alignItems: 'center',
        //justifyContent: 'center'
    },
    label: {
        fontSize: 16,
        color: '#26b4b0',
        alignSelf: 'flex-start'
    },
    field: {
        paddingHorizontal: 10,
        marginBottom: 30,
        width: 350,
        alignSelf: 'flex-start',
        borderColor: '#26b4b0',
        color: '#2C5698',
        borderWidth: 1.5,
        height: 50,
        fontSize: 18
    },
});