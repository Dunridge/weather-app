import { useEffect } from "react";
import { WeatherType } from "utils/enums/WeatherType";
import { IForecastResult } from "utils/interfaces/IForecastResult";
import { ILocationSearchProps } from "utils/interfaces/ILocationSearchProps";
import { IWeatherResult } from "utils/interfaces/IWeatherResult";
import WeatherResultCard from "./WeatherCard";
import ForecastContainer from "./ForecastContainer";

export default function LocationSearch({ location, setLocation, fetchWeather, fetchForecast, getCityByCoordinates, weatherData, forecastData, weatherType }: ILocationSearchProps) {

    useEffect(() => {
        if (forecastData.length !== 0) {
            console.log(forecastData);
            debugger;
        }

    }, [forecastData]);

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
                    <div className="flex w-[400px] min-w-[200px] gap-[6px] my-[12px]">
                        <input className="border border-solid border-gray-200 w-full h-[46px] px-[12px] py-[2px] rounded-xl focus:border-gray-800 focus:outline-none focus:ring-0" type="text" value={location} onChange={onLocationUpdate} />
                    </div>
                    <button className={`w-fit whitespace-nowrap h-[40px] ml-[10px] ${weatherType === WeatherType.CurrentWeather ? 'border border-4 border-solid border-primary-200' : ''} bg-tertiary rounded-md py-[6px] px-[12px]`} onClick={onGetCurrentWeather}>Get current weather</button>
                    <button className={`w-fit whitespace-nowrap h-[40px] ml-[10px] ${weatherType === WeatherType.ForecastWeather ? 'border border-4 border-solid border-primary-200' : ''} bg-tertiary rounded-md py-[6px] px-[12px]`} onClick={onGetForecast}>Get forecast</button>
                </div>
            </div>

            {
                weatherType === WeatherType.CurrentWeather ? (
                    <div className="grid grid-cols-2 gap-[20px] mt-[40px]">
                        {weatherData.map((data: IWeatherResult) => <WeatherResultCard key={data.id} {...data} />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-[20px] mt-[40px]">
                        {forecastData.map((item: IForecastResult) => <ForecastContainer key={item.timezone} result={item} getCityByCoordinates={getCityByCoordinates} />)}
                    </div>
                )
            }
        </div>
    );
}