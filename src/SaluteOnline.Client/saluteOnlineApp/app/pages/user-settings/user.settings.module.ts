import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MdTabsModule, MdCardModule, MdInputModule } from "@angular/material";

import { SoUserSettings } from "./user.settings";
import { routing } from "./user.settings.routing";
import { GeoService } from "../../services/geo/geo.service";

import { AutoCompleteModule } from "primeng/primeng";

@NgModule({
    imports: [CommonModule, MdTabsModule, MdCardModule, MdInputModule, AutoCompleteModule, routing],
    providers: [GeoService],
    declarations: [SoUserSettings]
})

export class SoUserSettingsModule {
    
}