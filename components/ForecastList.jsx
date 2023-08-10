import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { getGridPoint, getForecastData } from '../requests/weather.request';

export default function ForecastList() {

    //similar to useHistory
    const navigation = useNavigation();
    const [forecast, setForecast] = useState([
        {
            temperature: 80,
            name: 'Mostly sunny',
            number: 1,
        },
        {
            temperature: 91,
            name: 'Sunny',
            number: 2,
        },
    ]);

    const [location, setLocation] = useState();

    useEffect(() => {
        getLocation();
    }, []);

    const getLocation = async () => {
        let { status } =
            await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            console.log("permission not granted");
            return;
        }
        let currentLocation = await Location.getCurrentPositionAsync(
            {}
        );
        setLocation(currentLocation);
    };

    useEffect(() => {
        if (location && location.coords) {
            getWeatherData();
        }
    }, [location]);

    const getWeatherData = async () => {
        let forecastUrl = await getGridPoint(location);
        let forecastData = await getForecastData(forecastUrl);
        setForecast(forecastData);
    }

    return (
        <View style={{ height: '100%' }}>
            <Text>{JSON.stringify(location)}</Text>
            {/* similar to .map() to display data */}
            <FlatList
                data={forecast}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            console.log('You pressed a button');
                            navigation.navigate('Details', item);
                        }}
                        style={{ padding: 20, borderColor: 'gray', borderBottomWidth: 1 }}>
                        <Text>{item.name} {item.temperature}</Text>
                    </TouchableOpacity>
                )}
                style={{ width: '100%' }}
            />
        </View>
    )
}