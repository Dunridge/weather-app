import { IForecastResult } from "./IForecastResult";

export interface IForecastContainerProps {
    result: IForecastResult;
    getCityByCoordinates: (latitude: number, longitude: number) => Promise<string>;
}