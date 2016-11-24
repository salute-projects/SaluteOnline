import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { HeaderComponent } from './header/header.component';
import { LoadingPageComponent } from './loading-page/loading-page.component';

const appRoutes: Routes = [
    { path: 'index', component: LoadingPageComponent, data: { title: 'SaluteOnline' } }
];

@NgModule({
    imports: [BrowserModule, ButtonsModule, RouterModule.forRoot(appRoutes)],
    declarations: [AppComponent, HeaderComponent, LoadingPageComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }