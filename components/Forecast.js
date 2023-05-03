import { View, Text, Image, StyleSheet } from 'react-native';

function Forecast({ forecast }) {
	const date = new Date(forecast.date_epoch * 1000);
	const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];
	const day = weekdays[date.getUTCDay()];

	return (
		<>
			<View style={styles.container}>
				<Text>{day}</Text>
				<Image
					source={{
						uri: `https:${forecast.day.condition.icon}`,
						width: 64,
						height: 64,
					}}
				/>
				<Text>
					{Math.round(forecast.day.mintemp_f)}° /{' '}
					{Math.round(forecast.day.maxtemp_f)}°
				</Text>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		textAlign: 'center',
	},
	title: {
		fontSize: 24,
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

export default Forecast;
