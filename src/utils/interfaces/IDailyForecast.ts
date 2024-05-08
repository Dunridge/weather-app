import { IDailyFeelsLike } from "./IDailyFeelsLike";
import { IDailyTemp } from "./IDailyTemp";
import { IWeather } from "./IWeather";

export interface IDailyForecast {
    dt: number;
    sunrise: number;
    sunset: number;
    summary: string;
    moonrise?: number;
    moonset?: number;
    moon_phase?: number;
    temp: IDailyTemp;
    feels_like: IDailyFeelsLike;
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    weather: IWeather[];
    clouds: number;
    pop: number;
    uvi: number;
    rain?: number;
    snow?: number;
}