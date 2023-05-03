import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getWeatherData } from './utils/getWeatherData';

import WeatherDetails from './components/WeatherDetails';
import Locale from './components/Locale';

export default function App() {
	const localesList = [
		{ name: 'Amsterdam', region: 'North Holland', country: 'Netherlands' },
		{ name: 'Koror', region: '', country: 'Palau' },
		{ name: 'Playa Del Carmen', region: 'Quintana Roo', country: 'Mexico' },
	];

	const [weather, setWeather] = useState(null);
	const [time, setTime] = useState(new Date());
	const [locales, setLocales] = useState(localesList);

	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);

	const storeData = async (key, value) => {
		try {
			const jsonValue = JSON.stringify(value);
			await AsyncStorage.setItem(key, jsonValue);
		} catch (e) {
			// saving error
		}
	};

	const getData = async (key) => {
		try {
			const jsonValue = await AsyncStorage.getItem(key);
			return jsonValue != null ? JSON.parse(jsonValue) : null;
		} catch (e) {
			// error reading value
		}
	};

	const localeComponents = localesList.map((locale) => {
		return <Locale key={locale.name} locale={locale} time={time} />;
	});

	useEffect(() => {
		const clock = setInterval(() => {
			const timeNow = new Date();
			setTime(timeNow);
		}, 10000);

		async function getWeather() {
			const weatherData = await getWeatherData();
			setWeather(weatherData);
		}
		getWeather();

		return () => {
			clearInterval(clock);
		};
	}, []);

	if (weather !== null) {
		return (
			<SafeAreaView>
				<View style={styles.container}>
					<WeatherDetails weather={weather} time={time} />
					<View style={styles.localeList}>{localeComponents}</View>
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
		margin: 15,
	},
	localeList: {
		marginTop: 25,
	},
});
