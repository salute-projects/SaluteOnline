import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MdCardModule, MdInputModule, MdButtonModule, MdProgressSpinnerModule } from "@angular/material";
import { SoContacts } from "./contacts.component";
import { routing } from "./contacts.routing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth } from 'angular2-jwt';
import { Autosize } from "../../directives/autosize.directive";
import { HttpHelpers } from "../../services/http.helpers";

@NgModule({
    imports: [CommonModule, routing, MdCardModule, MdInputModule, MdButtonModule, MdProgressSpinnerModule, FormsModule, ReactiveFormsModule],
    declarations: [SoContacts, Autosize],
    providers: [HttpHelpers]
})

export class ContactsModule {
}