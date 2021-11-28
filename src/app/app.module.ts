import { LocalCacheCityRepository } from './../data/local-cache-city-repository';
import { CacheCityService } from './../domain/services/cache-city.service';
import { LoadWeatherService } from './../domain/services/load-weather.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchCityService } from 'src/domain/services/search-city.service';
import { LocalCityRepository } from 'src/data/local-city-repository';
import { ApiWeatherRepository } from 'src/data/api-weather-repository';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';
const createSearchCityService = () => {
  return new SearchCityService(new LocalCityRepository());
};

const createLoadWeatherService = (http: HttpClient) => {
  return new LoadWeatherService(
    new LocalCityRepository(),
    new ApiWeatherRepository(http)
  );
};

const createCacheCityService = (
  storage: Storage,
  loadWeatherService: LoadWeatherService
): CacheCityService => {
  return new CacheCityService(
    new LocalCacheCityRepository(storage), loadWeatherService
  );
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: SearchCityService,
      useFactory: createSearchCityService,
    },
    {
      provide: LoadWeatherService,
      useFactory: createLoadWeatherService,
      deps: [HttpClient],
    },
    {
      provide: CacheCityService,
      useFactory: createCacheCityService,
      deps: [Storage, LoadWeatherService]
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
