import { IWeather } from "./IWeather";

export interface IHourlyForecast {
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: IWeather[];
    pop: number;
    rain?: {
        "1h": number;
    };
    snow?: {
        "1h": number;
    };
}