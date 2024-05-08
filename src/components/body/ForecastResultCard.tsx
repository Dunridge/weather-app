import { IForecastResultCardProps } from "utils/interfaces/IForecastResultCardProps";

// TODO: add extra fields and add styling 
export default function ForecastResultCard({ description, icon, dt }: IForecastResultCardProps) {

    return (
        <div className="">
            <div>Date: { new Date(dt * 1000).toLocaleDateString() }</div>
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
            { description }
        </div>
    );
}