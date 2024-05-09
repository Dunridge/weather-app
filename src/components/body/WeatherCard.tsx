import { IWeatherResult } from "utils/interfaces/IWeatherResult";
import WeatherItem from "./WeatherItem";
import WeatherCardItem from "./WeatherCardItem";
import { MoonLoader } from "react-spinners";

export default function WeatherResultCard({ name, coord, weather, wind, main }: IWeatherResult) {
    // TODO: choose and pick the data fields from the results that you need 


    // TODO: add the weather icon 
    return (
        <div className="flex flex-col inline-block rounded-md p-[22px] h-fit w-full bg-complementary">
            {
                !name ? (
                    <div className="flex justify-center items-center">
                        <MoonLoader color="#78CC33" />
                    </div>
                ) : (
                    <>
                        <div className="w-full text-center text-xl font-bold">{name}</div>
                        <div className="w-full text-center">(lat: <span>{coord?.lat}</span>; lon: <span>{coord?.lon}</span>)</div>

                        <div className="w-full flex flex-col justify-center items-center">{
                            // TODO: add a component for that 
                            weather?.map((item) => (
                                <WeatherItem key={item?.id} description={item?.description} main={item?.main} icon={item?.icon} />
                            ))
                        }</div>

                        <div className="w-full text-center">Temperature: {main?.temp} (min: {main?.temp_min}) (max: {main?.temp_max})</div>

                        <div className="grid grid-cols-2 mt-[16px]">
                            <WeatherCardItem text="Feels like" data={main?.feels_like} />
                            <WeatherCardItem text="Wind speed" data={wind?.speed} />
                            <WeatherCardItem text="Wind temperature" data={wind?.deg} />
                            <WeatherCardItem text="Ground level" data={main?.grnd_level ?? 'NA'} />
                            <WeatherCardItem text="Sea level" data={main?.sea_level ?? 'NA'} />
                            <WeatherCardItem text="Humidity" data={main?.humidity} />
                            <WeatherCardItem text="Pressure" data={main?.pressure} />
                        </div>
                    </>
                )
            }
        </div>
    );
}