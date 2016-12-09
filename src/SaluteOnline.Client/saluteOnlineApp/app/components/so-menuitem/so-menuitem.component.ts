import { Component, ViewEncapsulation, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'so-menu-item',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./so-menuitem.component.scss').toString()],
    template: require('./so-menuitem.component.html')
})

export class SoMenuItem {
    
    @Input() menuItem: any;
    @Input() child = false;

    @Output() itemHover = new EventEmitter<any>();
    @Output() toggleSubMenu = new EventEmitter<any>();

    onHoverItem($event : any): void {
        this.itemHover.emit($event);
    }

    onToggleSubMenu($event: any, item: any): boolean {
        $event.item = item;
        this.toggleSubMenu.emit($event);
        return false;
    }
}