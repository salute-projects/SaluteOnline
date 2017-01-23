import { Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'main-page',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./main-page.component.scss').toString()],
    template: require('./main-page.component.html')
}) 
export class MainPage {
    
}