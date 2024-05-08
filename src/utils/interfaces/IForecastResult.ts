import { IDailyForecast } from "./IDailyForecast";
import { IHourlyForecast } from "./IHourlyForecast";
import { IMinutelyForecast } from "./IMinutelyForecast";
import { IWeatherDataCurrent } from "./IWeatherDataCurrent";

export interface IForecastResult {
    current: IWeatherDataCurrent;
    daily: IDailyForecast[];
    hourly: IHourlyForecast[];
    minutely: IMinutelyForecast[];
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
}
