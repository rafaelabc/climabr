import { Weather } from '../domain/entities/weather';
import { CacheInfo } from '../domain/entities/cache-info';
import { Storage } from '@ionic/storage-angular';
import { CacheCityRepository } from 'src/domain/services/protocols/cache-city-repository';

const STORAGE_NAME = '__climabr:last_cities';

export class LocalCacheCityRepository extends CacheCityRepository {
  constructor(private storage: Storage) {
    super();
    this.storage = storage;
  }

  async getLastCities(): Promise<CacheInfo[]> {
    const infoStorage = await this.storage.get(STORAGE_NAME);

    if (!infoStorage) {
      return [];
    }

    const lastCities: CacheInfo[] = JSON.parse(infoStorage);

    return lastCities;
  }

  async clearAll(): Promise<void> {
    return this.storage.remove(STORAGE_NAME);
  }

  async saveLastCity(weather: Weather): Promise<void> {
    const lastCities = await this.getLastCities();

    const indexCityAlreadyExists = lastCities.findIndex(
      (registry) => registry.weather.city.id === weather.city.id
    );

    const newCacheInfo: CacheInfo = {
      weather,
      created: new Date(),
    };

    if (indexCityAlreadyExists !== -1) {
      lastCities[indexCityAlreadyExists] = newCacheInfo;
    } else {
      lastCities.push(newCacheInfo);
    }
    await this.storage.set(STORAGE_NAME, JSON.stringify(lastCities));
  }
}
