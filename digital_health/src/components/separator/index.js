import React from 'react';
import {StyleSheet,View} from 'react-native';

export default function Separator() {
    return(
        <View style={styles.separator}></View>
    )
}

const styles = StyleSheet.create({
    separator: {
        opacity: 0.5,
        alignSelf: 'center',
        backgroundColor: '#333',
        height: 1,
        width: 200,
        marginVertical: 15
    }
})