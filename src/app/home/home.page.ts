import { CacheInfo } from 'src/domain/entities/cache-info';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/domain/entities/city';
import { SearchCityService } from 'src/domain/services/search-city.service';
import { CacheCityService } from 'src/domain/services/cache-city.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  cities: City[];
  hasError: boolean = false;
  errorMessage: string;
  lastCities: CacheInfo[];

  constructor(
    private readonly searchService: SearchCityService,
    private readonly router: Router,
    private readonly cacheCityService: CacheCityService
  ) {}



  async clearHistory(){
    if (confirm('Tem certeza que deseja apagar o histórico?')) {
      await this.cacheCityService.clear();
      this.lastCities = [];
    }
  }
  async ionViewDidEnter() {

    const cities = await this.cacheCityService.load();

    cities.sort(
      (item1, item2) => {
        const d1 = new Date(item1.created);
        const d2 = new Date(item2.created);

        if (d1 < d2) return 1;
        if (d1 > d2) return -1;

        return 0;
      }
    );

    this.lastCities = cities;
  }
  async onSearch(query: string) {
    try {
      this.hasError = false;
      this.cities = await this.searchService.search(query);
    } catch (error) {
      this.hasError = true;
      this.errorMessage = error.message;
    }
  }

  async onSelectCity(cityId: string) {
    await this.cacheCityService.save(Number(cityId));
    this.router.navigateByUrl(`/weather/${cityId}`);
  }
}
