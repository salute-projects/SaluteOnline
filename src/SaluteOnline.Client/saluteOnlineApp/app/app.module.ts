import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';

const appRoutes: Routes = [
    { path: '', redirectTo: 'pages', pathMatch: 'full' },
    { path: '**', redirectTo: 'pages' }
];

@NgModule({
    imports: [BrowserModule, PagesModule, RouterModule.forRoot(appRoutes)],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }