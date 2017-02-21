import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MdTabsModule } from "@angular/material";

import { SoUserSettings } from "./user.settings";
import { routing } from "./user.settings.routing";

@NgModule({
    imports: [CommonModule, MdTabsModule, routing],
    declarations: [SoUserSettings]
})

export class SoUserSettingsModule {
    
}