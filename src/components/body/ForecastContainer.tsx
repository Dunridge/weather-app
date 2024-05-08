import { IDailyForecast } from "utils/interfaces/IDailyForecast";
import { IForecastResult } from "utils/interfaces/IForecastResult";
import ForecastResultCard from "./ForecastResultCard";

export default function ForecastContainer({ daily, lat, lon }: IForecastResult) {

    return (
        <div className="rounded-md p-[22px] h-fit w-full bg-complementary">
            <div>Forecast for ({lat}; {lon})</div>
            <div className="mt-[20px] flex flex-col">
                {daily.slice(0, 5).map((item: IDailyForecast) => <ForecastResultCard key={item.dt} dt={item.dt} description={item.summary} icon={item.weather[0].icon} />)}
            </div>
        </div>
    );
}