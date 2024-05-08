import { IForecastResultCardProps } from "utils/interfaces/IForecastResultCardProps";

// TODO: add extra fields and add styling 
export default function ForecastResultCard({ description, icon }: IForecastResultCardProps) {

    return (
        <div className="">
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
            { description }
        </div>
    );
}