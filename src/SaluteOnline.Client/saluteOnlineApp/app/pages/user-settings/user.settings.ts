import { Component, ViewEncapsulation, OnInit } from "@angular/core";
import { GeoService } from "../../services/geo/geo.service";

@Component({
    selector: 'so-user-settings',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./user.settings.scss').toString()],
    template: require('./user.settings.html')
})

export class SoUserSettings implements OnInit {
    countries : string[];
    country: string;
    filteredContries: any[];

    cities: string[];
    city: string;
    filteredCities: any[];
    
    searchCountry(event: any) {
        const query = event.query;
        this.filteredContries = this.countries.filter(item => item.toLowerCase().indexOf(query.toLowerCase()) > -1);
    }

    searchCity(event: any) {
        const query = event.query;
        this._geoService.getCities("China", query).subscribe((result: string[]) => this.filteredCities = result);
    }

    constructor(private _geoService: GeoService) {
        this.countries = _geoService.getCountries();
    }

    ngOnInit(): void {
    }
}