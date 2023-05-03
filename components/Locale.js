import { View, Text, Image, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

import { getWeatherData } from '../utils/getWeatherData';

function Locale({ locale, time }) {
	const [weather, setWeather] = useState(null);

	useEffect(() => {
		async function getWeather() {
			const locationString =
				locale.name + ', ' + locale.region + ', ' + locale.country;
			const weatherData = await getWeatherData(locationString);
			setWeather(weatherData);
		}
		getWeather();
	}, []);

	if (weather) {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>
					{weather.location.name}{' '}
					{time.toLocaleTimeString([], {
						hour: 'numeric',
						minute: 'numeric',
						timeZone: weather.location.tz_id,
					})}
				</Text>
				<View style={styles.row}>
					<Image
						source={{
							uri: `https:${weather.current.condition.icon}`,
							width: 50,
							height: 50,
						}}
					/>
					<Text style={styles.temp}>{weather.current.temp_f}°</Text>
				</View>
			</View>
		);
	} else {
		return (
			<View>
				<Text>loading...</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 15,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	temp: {
		fontSize: 18,
	},
});

export default Locale;
