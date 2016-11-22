import { Component } from "@angular/core";

@Component({
    selector: 'salute-header',
    template: require('./header.component.html'),
    styles: [ require('./header.component.scss').toString() ]
})

export class HeaderComponent {
    name = "Header Component";
}