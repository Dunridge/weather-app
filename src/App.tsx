import { useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/header/Header";
import LocationSearch from "components/body/LocationSearch";

export default function App() {

	useEffect(() => {
		getWeatherByIndexOrCity();
	}, []);

	const getWeatherByIndexOrCity = async () => {
		const results = await getCityOrZipCoordinates();
		// TODO: extract the coordinates and pass them to the getCurrentWeather; 
		// getCurrentWeather(0, 0);
		debugger;
	};

	const getCurrentWeather = async (latitude: number, longitude: number) => {
		const apiKey = process.env.REACT_APP_OPENWEATHER_KEY;
		const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
		const endpointUrl = "https://corsproxy.io/?" + encodeURIComponent(url);

		try {
			const response = await fetch(endpointUrl,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			const data = await response.json();
			console.log("data", data);
			debugger;
		} catch (error) {
			console.error(error);
			debugger;
		}
	};

	const getCityOrZipCoordinates = async () => {
		const apiKey = process.env.REACT_APP_GEOCODING_KEY;
		const index = 94107;
		const requestUrl = `https://api.opencagedata.com/geocode/v1/json?q=${index}&key=${apiKey}`;

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
		const results = data.results;
		return results;
	};

	return (
		<div className="h-screen flex flex-col">
			<Header />
			<div className="flex-grow bg-secondary px-[40px] py-[20px]">
				<LocationSearch getCurrentWeather={getCurrentWeather} />
				{/* <div>Weather App: {process.env.REACT_APP_OPENWEATHER_KEY}</div> */}
			</div>
			<Footer />
		</div>
	);
}
