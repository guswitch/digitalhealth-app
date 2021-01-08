import React, { useEffect } from 'react';
import { Text, View, Button, TouchableOpacity, ScrollView, Dimensions, Image, StyleSheet } from 'react-native';

import { AuthContext } from '../../../App';

import SimpleButton from '../../components/SimpleButton';

export default function Profile({ navigation }) {

    const { signOut } = React.useContext(AuthContext);

    useEffect(() => {
    });

    return (
        <View style={styles.container}>

            <View style={styles.profileCredentials}>
                <Text style={styles.profileCredentialsText}> DH </Text>
            </View>

            <Text style={styles.textBold}> Porta utilizada: </Text>
            <Text style={styles.textSimple}> http://177.84.109.162:800 </Text>

            <Text style={styles.textBold}> Usuario: </Text>
            <Text style={styles.textSimple}> Dr. Edson </Text>

            <Text style={styles.textBold}> Telefone: </Text>
            <Text style={styles.textSimple}> +55 11 99856-9887 </Text>

            <Text style={styles.textBold}> Email: </Text>
            <Text style={styles.textSimple}> dr.edson@gmail.com </Text>

            <SimpleButton text="Sign out" onPress={signOut} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 20,
        paddingTop: 15,
        alignItems: 'center',
    },
    profileCredentials: {
        backgroundColor: '#CCC',
        width: 150,
        height: 150,
        borderRadius: 75,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileCredentialsText: {
        fontSize: 48
    },
    textBold: {
        paddingTop: 25,
        alignSelf: 'flex-start',
        fontSize: 24,
        fontWeight: 'bold'
    },
    textSimple: {
        alignSelf: 'flex-start',
        fontSize: 20,
    }
})