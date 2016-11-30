import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { routing } from "./pages.routing";
import { Pages } from "./pages.component";
import { SoHeader } from '../components/so-header/so-header.component';
import { SoSidebar } from "../components/so-sidebar/so-sidebar.component";

@NgModule({
    imports: [CommonModule, routing],
    declarations: [Pages, SoHeader, SoSidebar]

})

export class PagesModule {
    
}