import { useState } from "react";
import { ILocationSearchProps } from "utils/interfaces/ILocationSearchProps";
import WeatherResultCard from "./WeatherCard";
import { IWeatherResult } from "utils/interfaces/IWeatherResult";

export default function LocationSearch({ location, setLocation, fetchWeather, fetchForecast,  weatherData, forecastData }: ILocationSearchProps) {

    const onGetCurrentWeather = () => {
        fetchWeather(location);
        debugger;
    };

    const onGetForecast = () => {
        fetchForecast(location);
    };

    const onLocationUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLocation(value);
    };

    return (
        <div className="flex flex-col w-full">
            <div className="text-3xl font-medium">Location Search</div>

            <div className="flex flex-col">
                <div className="mt-[12px]">Enter your zip code or city:</div>

                <div className="flex items-center">
                    <div className="flex w-[400px] gap-[6px] my-[12px]">
                        <input className="border border-solid border-gray-200 w-full h-[46px] px-[12px] py-[2px] rounded-xl focus:border-gray-800 focus:outline-none focus:ring-0" type="text" value={location} onChange={onLocationUpdate} />
                    </div>
                    <button className="w-fit h-[40px] ml-[10px] bg-tertiary rounded-md py-[6px] px-[12px]" onClick={onGetCurrentWeather}>Get current weather</button>
                    <button className="w-fit h-[40px] ml-[10px] bg-tertiary rounded-md py-[6px] px-[12px]" onClick={onGetForecast}>Get forecast</button>
                </div>
            </div>

            {/* TODO: display one or the other, pass a boolean */}
            <div className="grid grid-cols-2 gap-[20px] mt-[40px]">
                {weatherData.map((data: IWeatherResult) => <WeatherResultCard key={data.id} {...data} />)}
            </div>

            <div>
                { JSON.stringify(forecastData) }
            </div>
        </div>
    );
}