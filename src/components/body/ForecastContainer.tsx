import { useEffect, useState } from "react";
import { IDailyForecast } from "utils/interfaces/IDailyForecast";
import { IForecastContainerProps } from "utils/interfaces/IForecastContainerProps";
import ForecastResultCard from "./ForecastResultCard";

export default function ForecastContainer({ result: { daily, lat, lon }, getCityByCoordinates }: IForecastContainerProps) {
    const [city, setCity] = useState('');

    useEffect(() => {
        console.log(city);
        debugger;
    }, [city]);

    useEffect(() => {
        getCityName();
    }, [lat, lon]);

    const getCityName = async () => {
        const city = await getCityByCoordinates(lat, lon);
        setCity(city);
    };

    return (
        <div className="rounded-md p-[22px] h-fit w-full bg-complementary">
            <div>Forecast for { !city ? <div>({lat}; {lon})</div> : city }</div>
            <div className="mt-[20px] flex flex-col">
                {daily.slice(0, 5).map((item: IDailyForecast) => <ForecastResultCard key={item.dt} dt={item.dt} description={item.summary} icon={item.weather[0].icon} />)}
            </div>
        </div>
    );
}