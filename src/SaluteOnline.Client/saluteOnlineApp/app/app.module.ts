import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { MaterialModule } from '@angular/material';
import { Ng2PageScrollModule } from "ng2-page-scroll";
 
const appRoutes: Routes = [
    { path: '', redirectTo: 'pages', pathMatch: 'full' }
];

@NgModule({
    imports: [BrowserModule, PagesModule, MaterialModule.forRoot(), Ng2PageScrollModule.forRoot(), RouterModule.forRoot(appRoutes, { useHash: true })],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }