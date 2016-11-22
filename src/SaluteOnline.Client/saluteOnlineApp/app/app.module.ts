import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { HeaderComponent } from './header/header.component';
import { LoadingPageComponent } from './loading-page/loading-page.component';


@NgModule({
    imports: [BrowserModule, ButtonsModule],
    declarations: [AppComponent, HeaderComponent, LoadingPageComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }