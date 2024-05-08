import { IWeatherResult } from "utils/interfaces/IWeatherResult";

// TODO: choose and pick the data fields from the results that you need 
export default function WeatherResultCard({ name }: IWeatherResult) {

    return (
        <div>{ name }</div>
    );
}