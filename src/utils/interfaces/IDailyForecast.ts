import { IWeather } from "./IWeather";

export interface IDailyForecast {
    dt: number;
    sunrise: number;
    sunset: number;
    summary: string;
    moonrise?: number;
    moonset?: number;
    moon_phase?: number;
    temp: {
        day: number;
        min: number;
        max: number;
        night: number;
        eve: number;
        morn: number;
    };
    feels_like: {
        day: number;
        night: number;
        eve: number;
        morn: number;
    };
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