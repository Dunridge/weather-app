import { IWeatherResult } from "utils/interfaces/IWeatherResult";

export default function WeatherResultCard({ name }: IWeatherResult) {
    // TODO: choose and pick the data fields from the results that you need 


    return (
        <div className="flex inline-block rounded-md p-[22px] h-[120px] w-full bg-complementary">
            <div className="">{ name }</div>
        </div>
    );
}