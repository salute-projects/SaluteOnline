import { Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'so-right-sidebar',
    styles: [ require('./so-right-sidebar.component.scss').toString() ],
    template: require('./so-right-sidebar.component.html'),
    encapsulation: ViewEncapsulation.None
})

export class SoRightSidebar {
}