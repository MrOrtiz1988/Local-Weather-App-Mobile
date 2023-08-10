import { View, Text, } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function ForecastDetails({route}) {
    return (
        <View>
            <Text>{route.params.name} {route.params.temperature}</Text>
        </View>
    )
}