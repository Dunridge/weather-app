import logoImage from 'assets/svg/logo.svg';

export default function Logo() {

    return (
        <div className="flex gap-[8px] items-center">
            <img src={logoImage} height={40} width={40} alt="Example Image" />
            <div className="text-white">WeatherApp</div>
        </div>
    );
}