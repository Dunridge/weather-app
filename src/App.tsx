import { useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/header/Header";

export default function App() {

	useEffect(() => {
		// testGetCurrentWeather();
	}, []);

	const testGetCurrentWeather = async () => {
		const latitude = 0;
		const longitude = 0;
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

	return (
		<div className="h-screen flex flex-col">
			<Header />
			<div className="text-3xl flex-grow bg-secondary">
				<div>Weather App: {process.env.REACT_APP_OPENWEATHER_KEY}</div>
				<div>Weather App: {process.env.REACT_APP_OPENWEATHER_KEY}</div>
				<div>Weather App: {process.env.REACT_APP_OPENWEATHER_KEY}</div>
				<div>Weather App: {process.env.REACT_APP_OPENWEATHER_KEY}</div>
			</div>
			<Footer />
		</div>
	);
}
