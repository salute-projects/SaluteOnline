import { Component, ViewEncapsulation, AfterViewInit } from "@angular/core";
import { GeoService } from "../../services/geo/geo.service";
import { FormGroup, AbstractControl, FormBuilder, Validators } from "@angular/forms";
import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { UrlsService } from "../../services/urls";
import { EmailValidator } from "../../services/validators/email.validator";
import { EmailUniqueValidator } from "../../services/validators/email.unique.validator";
import { FormsHelpers } from "../../services/forms.helpers";
import { HttpHelpers } from "../../services/http.helpers";
import { pickerOptions } from "../../services/default.configs";
import { EqualPasswordValidator } from "../../services/validators/equal-passwords.validator";
import { GlobalState } from "../../services/global.state";
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import { MdSnackBar } from "@angular/material";
import { IUser } from "../../domain/IUser";
import { StringsKeyValue, KeyValuePair } from "../../domain/DataStructures";
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
    
    privacyForm: FormGroup;
    hideProfile: AbstractControl;
    changePassword: AbstractControl;
    passwords:FormGroup;
    newPassword: AbstractControl;
    newPasswordConfirm: AbstractControl;

    countries : string[];
    country: string;
    filteredContries: any[];

    cities: string[];
    city: string;
    filteredCities: any[];
    
    user: IUser;
    pickerOptions: any;

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

    constructor(private _geoService: GeoService, fb: FormBuilder, private _http: Http, private _urls: UrlsService, private _authHttp: AuthHttp, private _snackBar: MdSnackBar, 
                private _state: GlobalState, private _formsHelpers: FormsHelpers, private _httpHelpers: HttpHelpers) {
        this.pickerOptions = pickerOptions;
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
        this._formsHelpers.assignFormControlsByConvention(this, this.form, ['email', 'name', 'lastname', 'phoneMain', 'phoneSecond', 'birthday']);
        this.stateControl = this.form.controls['state'];
        this.cityControl = this.form.controls['city'];

        this.privacyForm = fb.group({
            'hideProfile': [''],
            'changePassword': [false],
            'passwords': fb.group({
                    'newPassword': ['', Validators.minLength(4)],
                    'newPasswordConfirm': ['', Validators.minLength(4)]
                },
                { validator: EqualPasswordValidator.validate('newPassword', 'newPasswordConfirm') })
        });
        this._formsHelpers.assignFormControlsByConvention(this, this.privacyForm, ['changePassword', 'hideProfile']);
        this.passwords = this.privacyForm.controls['passwords'] as FormGroup;
        this.newPassword = this.passwords.controls['newPassword'];
        this.newPasswordConfirm = this.passwords.controls["newPasswordConfirm"];
    }

    onSubmit(values: Object) {
        const pars = this._httpHelpers.createFormEncodedRequest([
            new StringsKeyValue('Email', this.email.value),
            new StringsKeyValue('Name', this.name.value),
            new StringsKeyValue('LastName', this.lastname.value),
            new StringsKeyValue('PhoneMain', this.phoneMain.value),
            new StringsKeyValue('PhoneSecond', this.phoneSecond.value),
            new StringsKeyValue('State', this.stateControl.value),
            new StringsKeyValue('City', this.cityControl.value),
            new StringsKeyValue('Birthday', this.birthday.value.toISOString())
        ]);
        this._authHttp.patch(this._urls.updateUser, pars.params, pars.options)
            .map(res => res.json())
            .subscribe((result: IUser) => {
                this._state.setUser(result);
                const snackBar = this._snackBar.open("Збережено!", "Закрити", { duration: 5000 });
                snackBar.onAction().subscribe(() => {
                    snackBar.dismiss();
                });
            },
            () => {
                const snackBar = this._snackBar.open("Не вдалось зберегти зміни", "Закрити", { duration: 10000 });
                snackBar.onAction().subscribe(() => {
                    snackBar.dismiss();
                });
            });      
    }
    
    onPrivacySubmit(values: Object) {
        const params = this._httpHelpers.createFormEncodedRequest([
            new StringsKeyValue('HideProfile', this.hideProfile.value)
        ]);
        if (this.changePassword.value) {
            params.params.set('Password', this.newPassword.value);
        }
        this._authHttp.patch(this._urls.updateUserPrivacy, params.params, params.options)
            .map(res => res.json())
            .subscribe((result: IUser) => {
                this._state.setUser(result);
                const snackBar = this._snackBar.open("Збережено!", "Закрити", { duration: 5000 });
                snackBar.onAction().subscribe(() => {
                    snackBar.dismiss();
                });
            },
            () => {
                const snackBar = this._snackBar.open("Не вдалось зберегти зміни", "Закрити", { duration: 10000 });
                snackBar.onAction().subscribe(() => {
                    snackBar.dismiss();
                });
            }); 
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
        this.hideProfile.setValue(user.hideProfile);
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
                    const snackBar = this._snackBar.open("Не вдалось отримати профіль", "Закрити", { duration: 10000 });
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