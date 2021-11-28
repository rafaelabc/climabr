import { Weather } from './../entities/weather';
import { CacheInfo } from 'src/domain/entities/cache-info';
import { LoadWeatherService } from './load-weather.service';
import { CacheCityRepository } from 'src/domain/services/protocols/cache-city-repository';
export class CacheCityService{
  constructor(
    private readonly cacheCityRepository: CacheCityRepository,
    private readonly loadWeatherService: LoadWeatherService
  ){
  }

  async save(cityId: number): Promise<void> {
    const weather: Weather = await this.loadWeatherService.loadByCity(cityId);
    await this.cacheCityRepository.saveLastCity(weather);
  }

  async load(): Promise<CacheInfo[]>{
    return this.cacheCityRepository.getLastCities();
  }

  async clear(): Promise<void>{
    return this.cacheCityRepository.clearAll();
  }

}
