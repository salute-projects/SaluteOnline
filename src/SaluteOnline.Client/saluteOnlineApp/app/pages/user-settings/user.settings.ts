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
    
    pickerOptions = {
        minDateValue: new Date('1950/01/01'),
        maxDateValue: new Date('2010/12/31'),
        locale: {
            firstDayOfWeek: 0,
            dayNames: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"],
            dayNamesShort: ["Нед", "Пон", "Вів", "Сер", "Чет", "Птн", "Суб"],
            dayNamesMin: ["Н","П","В","С","Ч","Пт","Сб"],
            monthNames: [ "Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень" ],
            monthNamesShort: [ "Січ", "Лют", "Бер", "Кві", "Тра", "Чер","Лип", "Сер", "Вер", "Жов", "Лис", "Гру" ]
        } 
    }

    searchCountry(event: any) {
        const query = event.query;
        this.filteredContries = this.countries.filter(item => item.toLowerCase().indexOf(query.toLowerCase()) > -1);
    }

    searchCity(event: any) {
        const query = event.query;
        this.filteredCities = this._geoService.getCities('Україна', query);
    }

    constructor(private _geoService: GeoService) {
        this.countries = _geoService.getCountries();
    }

    ngOnInit(): void {
    }
}