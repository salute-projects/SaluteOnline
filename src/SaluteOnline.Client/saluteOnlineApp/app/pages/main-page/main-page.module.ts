import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MainPage } from './main-page.component';
import { routing } from './main-page.routing';
import { MdButtonModule, MdTooltipModule } from "@angular/material";

@NgModule({
    imports: [CommonModule, routing, MdButtonModule, MdTooltipModule],
    declarations: [MainPage]
})
export class MainPageModule {
}