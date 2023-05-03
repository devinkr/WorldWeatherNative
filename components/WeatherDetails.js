import { StyleSheet, Text, View, Image } from 'react-native';
import Forecast from './Forecast';

function WeatherDetails({ weather, time }) {
	const forecastComponents = weather.forecast.forecastday.map((day) => {
		return <Forecast key={day.date} forecast={day} />;
	});

	return (
		<View style={styles.container}>
			<Text style={styles.date}>
				{time.toLocaleDateString([], {
					weekday: 'short',
					day: 'numeric',
					month: 'long',
					year: 'numeric',
					timeZone: weather.location.tz_id,
				})}
			</Text>
			<Text style={styles.time}>
				{time.toLocaleTimeString([], {
					hour: 'numeric',
					minute: 'numeric',
					timeZone: weather.location.tz_id,
					timeZoneName: 'short',
				})}
			</Text>
			<Text style={styles.title}>
				{weather.location.name}, {weather.location.region}{' '}
			</Text>
			<Text>{weather.location.country}</Text>
			<View style={styles.flex}>
				<View>
					<Image
						source={{
							uri: `https:${weather.current.condition.icon}`,
							width: 80,
							height: 80,
						}}
					/>
				</View>
				<View>
					<Text style={styles.temp}>{weather.current.temp_f}°F</Text>
					<Text>Feels Like: {weather.current.feelslike_f}</Text>
				</View>
				<View>
					<Text>{weather.current.condition.text}</Text>
					<Text>Humidity: {weather.current.humidity}%</Text>
					<Text>UV: {weather.current.uv}</Text>
				</View>
			</View>
			<View style={styles.flex}>{forecastComponents}</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		margin: 15,
	},
	flex: {
		flexWrap: 'wrap',
		display: 'flex',
		flexDirection: 'row',
		marginTop: 10,
		marginBottom: 10,
		gap: 20,
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	title: {
		marginTop: 10,
		fontSize: 20,
	},
	time: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	date: {
		fontSize: 14,
	},
	temp: {
		fontSize: 44,
	},
	real: {
		fontSize: 15,
	},
	unit: {
		marginLeft: 5,
		fontSize: 18,
	},
});

export default WeatherDetails;
