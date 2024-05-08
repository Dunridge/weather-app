import { IWeatherResult } from "./IWeatherResult";

export interface ILocationSearchProps {
    getCurrentWeather: (latitude: number, longitude: number) => Promise<IWeatherResult>;
}