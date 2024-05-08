import { IWeather } from "./IWeather";

export interface IWeatherDataCurrent {
    clouds: number;
    dew_point: number;
    dt: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    sunrise: number;
    sunset: number;
    temp: number;
    uvi: number;
    visibility: number;
    weather: IWeather[];
    wind_deg: number;
    wind_speed: number;
}