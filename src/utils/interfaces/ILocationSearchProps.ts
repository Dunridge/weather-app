import { IWeatherResult } from "./IWeatherResult";

export interface ILocationSearchProps {
    location: string; 
    setLocation: React.Dispatch<React.SetStateAction<string>>;
    fetchWeather: (index: string) => Promise<void>;
    fetchForecast: () => any;
    weatherData: IWeatherResult[];
}