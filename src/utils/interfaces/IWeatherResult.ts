
import { IWeatherClouds } from "./IWeatherClouds";
import { IWeatherCoord } from "./IWeatherCoord";
import { IWeatherData } from "./IWeatherData";
import { IWeatherMain } from "./IWeatherMain";
import { IWeatherSys } from "./IWeatherSys";
import { IWeatherWind } from "./IWeatherWind";
// TODO: create a component and pass all the data there  

export interface IWeatherResult {
    base: string;
    clouds: IWeatherClouds;
    cod: number;
    coord: IWeatherCoord;
    dt: number;
    id: number;
    main: IWeatherMain;
    name: string;
    sys: IWeatherSys;
    timezone: number,
    visibility: number,
    weather: IWeatherData;
    wind: IWeatherWind;
}