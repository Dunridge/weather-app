import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/header/Header";
import LocationSearch from "components/body/LocationSearch";
import { IWeatherLocationResult } from "utils/interfaces/IWeatherLocationResult";
import { IWeatherGeometry } from "utils/interfaces/IWeatherGeometry";
import { IWeatherResult } from "utils/interfaces/IWeatherResult";
import { IForecastResult } from "utils/interfaces/IForecastResult";
import { WeatherType } from "utils/enums/WeatherType";

export default function App() {
	// TODO: set temporary index for now 
    const [location, setLocation] = useState('94107');
	const [weatherData, setWeatherData] = useState<IWeatherResult[]>([]);
	const [forecastData, setForecastData] = useState<IForecastResult[]>([]);
    const [weatherType, setWeatherType] = useState(WeatherType.CurrentWeather);
	const [currentLocationWeather, setCurrentLocationWeather] = useState<IWeatherResult>({} as IWeatherResult);

	useEffect(() => {
		// const index = 94107; // TODO: test this with the city name
		// fetchWeather(index);
		runOnLoad(); // this works and it accepts text for the city too 
	}, []);

	const runOnLoad = async () => {
		// getCityOrZipCoordinates(94107);
		// const latitude = 0;
		// const longitude = 0;
		// const city = await getCityByCoordinates(latitude, longitude);
		fetchCurrentLocationWeather();
		debugger;
	};

	useEffect(() => {
		if (weatherData.length !== 0) {
			console.log("All Weather Data:", weatherData);
			debugger;
		}
	}, [weatherData]);

	useEffect(() => {
		if (forecastData.length !== 0) {
			console.log("forecastData", forecastData);
			debugger;
		}
	}, [forecastData]);

	const fetchForecast = async (index: string) => {
		const forecastData = await getForecastByIndexOrCity(index);
		setForecastData(forecastData);
		setWeatherType(WeatherType.ForecastWeather);
	};

	const fetchWeather = async (index: string) => {
		const weatherData: IWeatherResult[] = await getWeatherByIndexOrCity(index);
		setWeatherData(weatherData);
		setWeatherType(WeatherType.CurrentWeather);
	};

	const fetchCurrentLocationWeather = async () => {
		navigator.geolocation.getCurrentPosition(async (data) => {
			const latitude = data.coords.latitude;
			const longitude = data.coords.longitude;
			const city = await getCityByCoordinates(latitude, longitude);
			const weatherData: IWeatherResult[] = await getWeatherByIndexOrCity(city);
			const currentLocation = weatherData[0];
			setCurrentLocationWeather(currentLocation);
		}, (error) => {
			console.error(error); 
		});
	};

	const getWeatherByIndexOrCity = async (index: string): Promise<IWeatherResult[]> => {
		const results: IWeatherLocationResult[] = await getCityOrZipCoordinates(index);
		const locationGeometries: IWeatherGeometry[] = results.map((match: IWeatherLocationResult) => ({ lat: match.geometry.lat, lng: match.geometry.lng } as IWeatherGeometry));

		let allWeatherData: IWeatherResult[] = [];

		try {
			const weatherPromises = locationGeometries.map(async (geometry: IWeatherGeometry) => {
				const { lat, lng } = geometry;
				const weatherData = await getCurrentWeather(lat, lng);
				return weatherData;
			});
			// TODO: add an interface
			allWeatherData = await Promise.all(weatherPromises);
			debugger;
		} catch (error) {
			console.error(error);
			debugger;
		}

		return allWeatherData;
	};

	const getForecastByIndexOrCity = async (index: string): Promise<IForecastResult[]> => {
		const results: IWeatherLocationResult[] = await getCityOrZipCoordinates(index);
		const locationGeometries: IWeatherGeometry[] = results.map((match: IWeatherLocationResult) => ({ lat: match.geometry.lat, lng: match.geometry.lng } as IWeatherGeometry));
		
		let allForecastData: IForecastResult[] = [];

		try {
			const weatherPromises = locationGeometries.map(async (geometry: IWeatherGeometry) => {
				const { lat, lng } = geometry;
				const weatherData = await getForecastWeather(lat, lng);
				return weatherData;
			});
			allForecastData = await Promise.all(weatherPromises);
			debugger;
		} catch (error) {
			console.error(error);
			debugger;
		}

		return allForecastData;
	};

	const getCurrentWeather = async (latitude: number, longitude: number) => {
		const apiKey = process.env.REACT_APP_OPENWEATHER_KEY;
		const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
		const endpointUrl = "https://corsproxy.io/?" + encodeURIComponent(url);

		let currentWeather = {} as IWeatherResult;

		try {
			const response = await fetch(endpointUrl,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			const data: IWeatherResult = await response.json();
			currentWeather = data;
			console.log("data", data);
		} catch (error) {
			console.error(error);
		}

		return currentWeather;
	};

	const getCityByCoordinates = async (latitude: number, longitude: number): Promise<string> => {
		const apiKey = process.env.REACT_APP_GEOCODING_KEY;
		const requestUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&pretty=1&key=${apiKey}`;
		let result: any;

		try {
			const response = await fetch(requestUrl,
				{
					mode: "cors",
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			const data = await response.json();
			debugger;
			result = data.results[0].formatted;
		} catch (error) {
			console.error(error);
		}

		return result;
	};

	const getCityOrZipCoordinates = async (indexOrCity: string): Promise<IWeatherLocationResult[]> => {
		const apiKey = process.env.REACT_APP_GEOCODING_KEY;
		const requestUrl = `https://api.opencagedata.com/geocode/v1/json?q=${indexOrCity}&key=${apiKey}`;
		let results: IWeatherLocationResult[] = [];

		try {
			const response = await fetch(requestUrl,
				{
					mode: "cors",
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			const data = await response.json();
			results = data.results;
		} catch (error) {
			console.error(error);
		}

		return results;
	};

	const getForecastWeather = async (latitude: number, longitude: number) => {
		const apiKey = process.env.REACT_APP_OPENWEATHER_KEY;
		const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
		const fetchUrl = "https://corsproxy.io/?" + encodeURIComponent(url);

		let currentWeather = {} as any;

		try {
			const response = await fetch(fetchUrl,
				{
					mode: "cors",
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			const data = await response.json();
			currentWeather = data;
			debugger;
		} catch (error) {
			console.error(error);
		}

		return currentWeather;
	};

	return (
		<div className="h-screen flex flex-col bg-secondary">
			<Header />
			<div className="flex-grow bg-secondary px-[40px] pt-[60px] pb-[120px]">
				<LocationSearch location={location} 
								setLocation={setLocation}
								fetchWeather={fetchWeather}
								fetchForecast={fetchForecast}
								weatherData={weatherData}
								forecastData={forecastData}
								weatherType={weatherType}
								getCityByCoordinates={getCityByCoordinates}
								currentLocationWeather={currentLocationWeather}
								/>
			</div>
			<Footer />
		</div>
	);
}
