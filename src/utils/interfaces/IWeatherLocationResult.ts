import { IWeatherGeometry } from "./IWeatherGeometry";

export interface IWeatherLocationResult {
    annotations: any;
    bounds: any;
    components: any;
    confidence: number;
    formatted: string;
    geometry: IWeatherGeometry;
}

