import { useState } from "react";
import { ILocationSearchProps } from "utils/interfaces/ILocationSearchProps";

export default function LocationSearch({ location, setLocation, fetchWeather, weatherData }: ILocationSearchProps) {

    const onGetCurrentWeather = () => {
        console.log(location); // index for now - TODO: add the ability to get the weather by city name
        fetchWeather(location);
        debugger;
    };

    const onLocationUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = +e.target.value;
        setLocation(value);
    };

    return (
        <div className="flex flex-col w-full">
            <div className="flex gap-[6px]">
                <div>Enter your zip code or city: </div>
                <input type="text" value={location} onChange={onLocationUpdate} />
            </div>

            <button className="w-[140px] bg-tertiary rounded-md py-[6px]" onClick={onGetCurrentWeather}>Get forecast</button>

            <div>{ JSON.stringify(weatherData) }</div>
        </div>
    );
}