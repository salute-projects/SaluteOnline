import { Component, ViewEncapsulation } from "@angular/core";
import { GlobalState } from "../../services/global.state";

@Component({
    selector: 'so-header',
    styles: [ require('./so-header.component.scss').toString() ],
    template: require('./so-header.component.html'),
    encapsulation: ViewEncapsulation.None
})
export class SoHeader {
    isMenuCollapsed = false;
    
    constructor(private state: GlobalState) {
        this.state.subscribe('menu.isCollapsed', (isCollapsed: boolean) => {
            this.isMenuCollapsed = isCollapsed;
        });
    }

    toggleMenu() {
        this.isMenuCollapsed = !this.isMenuCollapsed;
        this.state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    }
}