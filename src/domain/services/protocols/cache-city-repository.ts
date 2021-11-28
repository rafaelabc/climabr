import { Weather } from './../../entities/weather';
import { CacheInfo } from 'src/domain/entities/cache-info';

export abstract class CacheCityRepository{
  abstract getLastCities(): Promise<CacheInfo[]>;
  abstract clearAll(): Promise<void>;
  abstract saveLastCity(weather: Weather): Promise<void>;

}
