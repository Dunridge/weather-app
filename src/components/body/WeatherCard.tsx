import { IWeatherResult } from "utils/interfaces/IWeatherResult";

export default function WeatherResultCard({ name, coord, weather, wind, main }: IWeatherResult) {
    // TODO: choose and pick the data fields from the results that you need 


    return (
        <div className="flex flex-col inline-block rounded-md p-[22px] h-fit w-full bg-complementary">
            <div className="w-full text-center text-xl font-semibold">{ name }</div>
            <div className="w-full text-center">(lat: <span>{coord.lat}</span>; lon: <span>{coord.lon}</span>)</div>
            <div>{ weather.map((item) => (<div key={item.id}>{ item.main }: { item.description }</div>)) }</div>
            <div>Temperature: { main.temp } (min: { main.temp_min }) (max: { main.temp_max })</div>
            <div>Feels like: { main.feels_like }</div>
            <div>Wind speed: { wind.speed }</div>
            <div>Wind temperature: { wind.deg }</div>
            <div>Ground level: { main.grnd_level ?? 'NA' }</div>
            <div>See level: { main.sea_level ?? 'NA' }</div>
            <div>Humidity: { main.humidity }</div>
            <div>Pressure: { main.pressure }</div>
        </div>
    );
}