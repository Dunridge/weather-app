import { IForecastResultCardProps } from "utils/interfaces/IForecastResultCardProps";

// TODO: add extra
export default function ForecastResultCard({ description, icon }: IForecastResultCardProps) {

    return (
        <div>
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
            { description }
        </div>
    );
}