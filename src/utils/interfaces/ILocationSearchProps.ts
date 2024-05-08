import { WeatherType } from "utils/enums/WeatherType";
import { IForecastResult } from "./IForecastResult";
import { IWeatherResult } from "./IWeatherResult";

export interface ILocationSearchProps {
    location: string; 
    setLocation: React.Dispatch<React.SetStateAction<string>>;
    fetchWeather: (index: string) => Promise<void>;
    fetchForecast: (index: string) => any;
    getCityByCoordinates: (latitude: number, longitude: number) => Promise<string>;
    weatherData: IWeatherResult[];
    forecastData: IForecastResult[];
    weatherType: WeatherType;
}