import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';

import WeatherDetails from './components/WeatherDetails';

export default function App() {
	const [weather, setWeather] = useState(null);
	const [time, setTime] = useState(new Date());

	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);

	useEffect(() => {
		const clock = setInterval(() => {
			const timeNow = new Date();
			setTime(timeNow);
		}, 10000);

		async function getWeatherData(coords) {
			const url = `${process.env.WEATHER_URL}&q=auto:ip&days=3&aqi=no&alerts=no`;
			const data = await axios.get(url);
			setWeather(data.data);
		}
		getWeatherData();

		return () => {
			clearInterval(clock);
		};
	}, []);

	if (weather !== null) {
		return (
			<SafeAreaView>
				<View style={styles.container}>
					<WeatherDetails weather={weather} time={time} />
					<StatusBar style='auto' />
				</View>
			</SafeAreaView>
		);
	} else {
		return (
			<SafeAreaView>
				<View style={styles.container}>
					<Text>Loading...</Text>
					<StatusBar style='auto' />
				</View>
			</SafeAreaView>
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
