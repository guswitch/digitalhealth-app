import React from 'react';
import {StyleSheet,View, TouchableOpacity, Text} from 'react-native';

export default function SubmitButton({text, disable, onPress}) {
    return(
        <TouchableOpacity onPress={onPress} disabled={disable}>
            <View style={isDisabled(disable)}>
                <Text style={styles.textButton}> {text} </Text>
            </View>
        </TouchableOpacity>
    )
}

const isDisabled =  function(disable){
    if(disable)
        return {backgroundColor: '#8e8e8e'};

    return {backgroundColor: '#2C5698'};
}
const styles = StyleSheet.create({
    textButton: {
        paddingVertical:15,
        paddingHorizontal: 65,
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center',
        color: '#EEE',
        fontWeight: '400'
    }
})