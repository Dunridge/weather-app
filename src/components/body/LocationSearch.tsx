import { useState } from "react";
import { ILocationSearchProps } from "utils/interfaces/ILocationSearchProps";

export default function LocationSearch({ getCurrentWeather }: ILocationSearchProps) {
    const [location, setLocation] = useState('');

    const onGetCurrentWeather = () => {
        console.log(location);
        debugger;

        // TODO: find out wheather this API offers weather by city / zip
        //  -- if not then get the location of the city or zip 
        // getCurrentWeather(0, 0);
    };

    const onLocationUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLocation(value);
    };

    return (
        <div className="flex flex-col w-full">
            <div className="flex gap-[6px]">
                <div>Enter your zip code or city: </div>
                <input type="text" value={location} onChange={onLocationUpdate} />
            </div>

            <button className="w-[140px] bg-tertiary rounded-md py-[6px]" onClick={onGetCurrentWeather}>Get forecast</button>
            {/* <div>{location}</div> */}
        </div>
    );
}