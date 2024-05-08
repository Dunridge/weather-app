export interface IForecastResult {
    current: IWeatherDataCurrent;
    daily: IDailyForecast[];
    hourly: IHourlyForecast[];
    minutely: IMinutelyForecast[];
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
}

export interface IWeather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface IWeatherDataCurrent {
    clouds: number;
    dew_point: number;
    dt: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    sunrise: number;
    sunset: number;
    temp: number;
    uvi: number;
    visibility: number;
    weather: IWeather[];
    wind_deg: number;
    wind_speed: number;
}

export interface IDailyForecast {
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise?: number;
    moonset?: number;
    moon_phase?: number;
    temp: {
        day: number;
        min: number;
        max: number;
        night: number;
        eve: number;
        morn: number;
    };
    feels_like: {
        day: number;
        night: number;
        eve: number;
        morn: number;
    };
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    weather: IWeather[];
    clouds: number;
    pop: number;
    uvi: number;
    rain?: number;
    snow?: number;
}

export interface IHourlyForecast {
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: IWeather[];
    pop: number;
    rain?: {
        "1h": number;
    };
    snow?: {
        "1h": number;
    };
}

export interface IMinutelyForecast {
    dt: number;
    precipitation: number;
}
