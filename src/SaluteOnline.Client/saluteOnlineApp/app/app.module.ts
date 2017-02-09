import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { MaterialModule } from '@angular/material';
 
const appRoutes: Routes = [
    { path: '', redirectTo: 'pages', pathMatch: 'full' }
];

@NgModule({
    imports: [BrowserModule, PagesModule, MaterialModule.forRoot(), RouterModule.forRoot(appRoutes, { useHash: true })],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }