import { IWeatherResult } from "utils/interfaces/IWeatherResult";

export default function WeatherResultCard({ name, coord, weather }: IWeatherResult) {
    // TODO: choose and pick the data fields from the results that you need 


    return (
        <div className="flex flex-col inline-block rounded-md p-[22px] h-fit w-full bg-complementary">
            <div className="">City: { name }</div>
            <div>Coordinates: (lat: <span>{coord.lat}</span>; lon: <span>{coord.lon}</span>)</div>
            <div>Description:</div>
            <div>{ weather.map((item) => (<div key={item.id}>{ item.main }: { item.description }</div>)) }</div>
        </div>
    );
}