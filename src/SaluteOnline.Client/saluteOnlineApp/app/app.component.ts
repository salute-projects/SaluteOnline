import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { LoadingPageComponent } from './loading-page/loading-page.component';

@Component(({
    selector: 'my-app',
    directives: [ HeaderComponent, LoadingPageComponent ],
    //template: require('./app.template.html'),
    template: `<router-outlet></router-outlet>`,    
    styles: [ require('./app.component.scss').toString() ]
}) as any)

export class AppComponent {
    title = 'Hello World!';
}