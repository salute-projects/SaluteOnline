import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { routing } from "./pages.routing";
import { Pages } from "./pages.component";
import { SoHeader } from '../components/so-header/so-header.component';

@NgModule({
    imports: [CommonModule, routing],
    declarations: [Pages, SoHeader]

})

export class PagesModule {
    
}