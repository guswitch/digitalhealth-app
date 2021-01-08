import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';

export default function HeadButton({source, onPress}) {
    return(
        <TouchableOpacity onPress={onPress} style={{paddingVertical: 5,paddingHorizontal: 7}}>
            <View>
               <Image source={source} />
            </View>
        </TouchableOpacity>
    )
}