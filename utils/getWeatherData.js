import axios from 'axios';

export async function getWeatherData(location = null) {
	let query;
	if (!location) {
		query = 'auto:ip';
	} else {
		query = location;
	}
	const url = `${process.env.WEATHER_URL}&q=${query}&days=3&aqi=no&alerts=no`;
	const data = await axios.get(url);
	return data.data;
}
