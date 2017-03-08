import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MdTabsModule, MdCardModule, MdInputModule, MdButtonModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SoUserSettings } from "./user.settings";
import { routing } from "./user.settings.routing";
import { GeoService } from "../../services/geo/geo.service";

import { AutoCompleteModule, CalendarModule, FileUploadModule } from "primeng/primeng";

import { MomentModule } from 'angular2-moment';

@NgModule({
    imports: [CommonModule, MdTabsModule, MdCardModule, MdInputModule, MdButtonModule, AutoCompleteModule, CalendarModule, FileUploadModule, routing, FormsModule, ReactiveFormsModule],
    providers: [GeoService],
    declarations: [SoUserSettings]
})

export class SoUserSettingsModule {
    
}