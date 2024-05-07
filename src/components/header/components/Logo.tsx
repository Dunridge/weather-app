import logoImage from 'assets/svg/logo.svg';

export default function Logo() {

    return (
        <div className="flex gap-[12px] items-center">
            <img src={logoImage} height={40} width={40} alt="Example Image" />
            <div className="text-white text-xl">WeatherApp</div>
        </div>
    );
}