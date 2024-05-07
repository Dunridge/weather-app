export interface ILocationSearchProps {
    getCurrentWeather: (latitude: number, longitude: number) => Promise<void>;
}