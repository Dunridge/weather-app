import { useState } from "react";
import { ILocationSearchProps } from "utils/interfaces/ILocationSearchProps";
import WeatherResultCard from "./WeatherCard";
import { IWeatherResult } from "utils/interfaces/IWeatherResult";

export default function LocationSearch({ location, setLocation, fetchWeather, weatherData }: ILocationSearchProps) {

    const onGetCurrentWeather = () => {
        fetchWeather(location);
        debugger;
    };

    const onLocationUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLocation(value);
    };

    return (
        <div className="flex flex-col w-full">
            <div className="text-3xl font-medium">Location Search</div>
            <div className="flex flex-col w-1/4 gap-[6px] my-[12px]">
                <div>Enter your zip code or city: </div>
                <input className="border border-solid border-gray-200 w-full h-[46px] px-[12px] py-[2px] rounded-xl focus:border-gray-800 focus:outline-none focus:ring-0" type="text" value={location} onChange={onLocationUpdate} />
            </div>

            <button className="w-[140px] bg-tertiary rounded-md py-[6px]" onClick={onGetCurrentWeather}>Get forecast</button>

            <div>{ weatherData.map((data: IWeatherResult) => <WeatherResultCard key={data.id} {...data}/>) }</div>
        </div>
    );
}