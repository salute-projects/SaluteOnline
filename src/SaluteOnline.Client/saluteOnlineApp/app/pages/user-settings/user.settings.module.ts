import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MdTabsModule, MdCardModule, MdInputModule, MdButtonModule, MdCheckboxModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormsHelpers } from "../../services/forms.helpers";
import { HttpHelpers } from "../../services/http.helpers";
import { SoUserSettings } from "./user.settings";
import { routing } from "./user.settings.routing";
import { GeoService } from "../../services/geo/geo.service";
import { AutoCompleteModule, CalendarModule, FileUploadModule } from "primeng/primeng";
import { MomentModule } from 'angular2-moment';

@NgModule({
    imports: [CommonModule, MdTabsModule, MdCardModule, MdInputModule, MdButtonModule, MdCheckboxModule,
        AutoCompleteModule, CalendarModule, FileUploadModule, routing, FormsModule, ReactiveFormsModule],
    providers: [GeoService, FormsHelpers, HttpHelpers],
    declarations: [SoUserSettings]
})

export class SoUserSettingsModule {
    
}