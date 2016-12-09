import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { routing } from "./pages.routing";
import { Pages } from "./pages.component";
import { SoHeader } from '../components/so-header/so-header.component';
import { SoSidebar } from "../components/so-sidebar/so-sidebar.component";
import { SoMenu } from "../components/so-menu/so-menu.component";
import { SoMenuItem } from "../components/so-menuitem/so-menuitem.component";
import { SoTooltipModule } from "../components/so-tooltip/so-tooltip-module";

@NgModule({
    imports: [CommonModule, SoTooltipModule, routing],
    declarations: [Pages, SoHeader, SoSidebar, SoMenu, SoMenuItem]

})

export class PagesModule {
    
}