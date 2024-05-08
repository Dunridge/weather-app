import { IWeatherItemProps } from "utils/interfaces/IWeatherItemProps";

export default function WeatherItem({ icon, description, main }: IWeatherItemProps) {

    return (
        <div className="flex flex-col items-center">
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
            <div>{main}: {description}</div>
        </div>
    );
}