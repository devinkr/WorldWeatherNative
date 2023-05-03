import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as Location from 'expo-location';

import WeatherDetails from './components/WeatherDetails';

export default function App() {
	const [weather, setWeather] = useState(null);
	const [time, setTime] = useState(new Date());

	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);

	useEffect(() => {
		(async () => {
			let coords = null;
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
			} else {
				let location = await Location.getCurrentPositionAsync({});
				setLocation(location);
				coords = location.coords;
			}
			getWeatherData(coords);
		})();

		const clock = setInterval(() => {
			const timeNow = new Date();
			setTime(timeNow);
		}, 10000);

		async function getWeatherData(coords) {
			let query;
			if (coords === null) {
				query = 'auto:ip';
			} else {
				query = coords.latitude + ',' + coords.longitude;
			}
			const url = `${process.env.WEATHER_URL}&q=${query}&days=3&aqi=no&alerts=no`;
			const data = await axios.get(url);
			setWeather(data.data);
		}
		return () => {
			clearInterval(clock);
		};
	}, []);

	if (weather !== null) {
		return (
			<View style={styles.container}>
				<WeatherDetails weather={weather} time={time} />
				<StatusBar style='auto' />
			</View>
		);
	} else {
		return (
			<View style={styles.container}>
				<Text>Loading...</Text>
				<Text>URL: {process.env.WEATHER_URL}</Text>
				<Text>Location: {JSON.stringify(location?.coords)}</Text>
				<StatusBar style='auto' />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
