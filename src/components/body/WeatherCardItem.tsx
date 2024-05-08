import { IWeatherCardItemProps } from "utils/interfaces/IWeatherCardItemProps";

export default function WeatherCardItem({ text, data }: IWeatherCardItemProps) {

    return (
        <div className="flex">
            <span className="font-semibold">{ text }</span>: { data }
        </div>
    );
}