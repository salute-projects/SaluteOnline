import { Component, ViewEncapsulation, AfterViewInit } from "@angular/core";
import { GeoService } from "../../services/geo/geo.service";
import { FormGroup, AbstractControl, FormBuilder, Validators } from "@angular/forms";
import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { UrlsService } from "../../services/urls";
import { EmailValidator } from "../../services/validators/email.validator";
import { EmailUniqueValidator } from "../../services/validators/email.unique.validator";
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import { MdSnackBar } from "@angular/material";
import { IUser } from "../../domain/IUser";
const moment = require("moment");

@Component({
    selector: 'so-user-settings',
    providers: [UrlsService],
    encapsulation: ViewEncapsulation.None,
    styles: [require('./user.settings.scss').toString()],
    template: require('./user.settings.html')
})

export class SoUserSettings implements AfterViewInit {
    avatar: string;

    form: FormGroup;
    email: AbstractControl;
    name: AbstractControl;
    lastname: AbstractControl;
    phoneMain: AbstractControl;
    phoneSecond: AbstractControl;
    stateControl: AbstractControl;
    cityControl: AbstractControl;
    birthday: AbstractControl;

    submitted = false;

    countries : string[];
    country: string;
    filteredContries: any[];

    cities: string[];
    city: string;
    filteredCities: any[];
    
    user: IUser;

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
        if (this.stateControl.value.toLowerCase() === 'україна') {
            this.filteredCities = this._geoService.getCities(this.stateControl.value, query);   
        }
    }

    constructor(private _geoService: GeoService, fb: FormBuilder, private _http: Http, private _urls: UrlsService, private _authHttp: AuthHttp, public snackBar: MdSnackBar) {
        this.countries = _geoService.getCountries();
        this.form = fb.group({
            'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
            'name': ['', Validators.compose([Validators.minLength(4), Validators.maxLength(50)])],
            'lastname': ['', Validators.compose([Validators.minLength(4), Validators.maxLength(50)])],
            'phoneMain': [''],
            'phoneSecond': [''],
            'state': [''],
            'city': [''],
            'birthday': ['']
        });
        this.email = this.form.controls['email'];
        this.name = this.form.controls['name'];
        this.lastname = this.form.controls['lastname'];
        this.phoneMain = this.form.controls['phoneMain'];
        this.phoneSecond = this.form.controls['phoneSecond'];
        this.stateControl = this.form.controls['state'];
        this.cityControl = this.form.controls['city'];
        this.birthday = this.form.controls['birthday'];
    }
    
    onSubmit(values: Object) {
        this.submitted = true;
        const params = new URLSearchParams();
        params.set('Email', this.email.value);
        params.set('Name', this.name.value);
        params.set('LastName', this.lastname.value);
        params.set('PhoneMain', this.phoneMain.value);
        params.set('PhoneSecond', this.phoneSecond.value);
        params.set('State', this.stateControl.value);
        params.set('City', this.cityControl.value);
        params.set('Birthday', this.birthday.value.toISOString());
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        const options = new RequestOptions({ headers: headers });
        this._authHttp.patch(this._urls.updateUser, params.toString(), options)
            .map(res => res.json())
            .subscribe();      
    }

    private setUserValues(user: IUser): void {
        this.email.setValue(user.email);
        this.name.setValue(user.name);
        this.lastname.setValue(user.lastName);
        this.phoneMain.setValue(user.phoneMain);
        this.phoneSecond.setValue(user.phoneSecond);
        this.birthday.setValue(moment(user.birthday).toDate());
        this.stateControl.setValue(user.state);
        this.cityControl.setValue(user.city);
        this.avatar = user.avatar;
    }

    ngAfterViewInit(): void {
        this._authHttp.get(this._urls.getLoggedUser)
            .map(res => res.json())
            .subscribe(
                (result: IUser) => {
                    this.user = result;
                    this.setUserValues(result);
                },
                () => {
                    const snackBar = this.snackBar.open("Не вдалось отримати профіль", "Закрити", { duration: 10000 });
                    snackBar.onAction()
                        .subscribe(() => {
                            snackBar.dismiss();
                        });
                });
    }

    onBeforeSend(event: any){
        const accessToken = localStorage.getItem('token');
        event.xhr.setRequestHeader('Authorization', `bearer ${accessToken}`);
    }

    onUpload(event: any) {
        this.avatar = event.xhr.response;
    }
}