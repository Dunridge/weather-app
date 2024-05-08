import { IWeatherResult } from "./IWeatherResult";

export interface ILocationSearchProps {
    location: number; 
    setLocation: React.Dispatch<React.SetStateAction<number>>;
    fetchWeather: (index: number) => Promise<void>;
    weatherData: IWeatherResult[];
}