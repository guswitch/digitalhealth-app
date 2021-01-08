import React from 'react';
import {StyleSheet,View, TouchableOpacity, Text} from 'react-native';

export default function SubmitButton({text, onPress}) {
    return(
        <TouchableOpacity onPress={onPress}>
            <View>
                <Text style={styles.textButton}> {text} </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    textButton: {
        marginTop: 20,
        paddingHorizontal: 80,
        paddingVertical: 15,
        textTransform: 'uppercase',
        fontSize: 14,
        textAlign: 'center',
        backgroundColor: '#2C5698',
        color: '#EEE',
        fontWeight: '400'
    }
})