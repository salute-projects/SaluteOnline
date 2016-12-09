import { Component, ViewEncapsulation, Input, Output, EventEmitter, OnInit, OnDestroy } from "@angular/core";
import { Routes, Router, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs/Rx";
import { GlobalState } from "../../services/global.state";
import { SoMenuService } from "./so-menu.service";

declare var jQuery:any;

@Component({
    selector: 'so-menu',
    encapsulation: ViewEncapsulation.None,
    styles: [ require('./so-menu.component.scss').toString() ],
    template: require('./so-menu.component.html'),
    providers: [SoMenuService]
})

export class SoMenu implements OnInit, OnDestroy  {
    
    @Input() menuRoutes:Routes = [];
    @Input() sidebarCollapsed = false;
    @Input() menuHeight:number;

    @Output() expandMenu = new EventEmitter<any>();

    menuItems : any[];
    showHoverElem:boolean;
    hoverElemHeight:number;
    hoverElemTop:number;
    protected onRouteChange : Subscription;
    outOfArea = -200;

    constructor(private router: Router, private service: SoMenuService, private state: GlobalState) {
        this.onRouteChange = this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                if (this.menuItems) {
                    this.selectMenuAndNotify();
                } else {
                    setTimeout(() => this.selectMenuAndNotify());
                }
            }
        });
    }

    selectMenuAndNotify(): void {
        if (this.menuItems) {
            this.menuItems = this.service.selectMenuItem(this.menuItems);
            this.state.notifyDataChanged('menu.activeLink', this.service.getCurrentItem());
        }
    }

    ngOnInit() : void {
        this.menuItems = this.service.convertRoutesToMenus(this.menuRoutes);
    }

    ngOnDestroy(): void {
        this.onRouteChange.unsubscribe();
    }

    hoverItem($event: any): void {
        this.showHoverElem = true;
        this.hoverElemHeight = $event.currentTarget.clientHeight;
        this.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - 66;
    }

    toggleSubMenu($event: any): boolean {
        const submenu = jQuery($event.currentTarget).next();
        if (this.sidebarCollapsed) {
            this.expandMenu.emit(null);
            if (!$event.item.expanded) {
                $event.item.expanded = true;
            }
        } else {
            $event.item.expanded = !$event.item.expanded;
            submenu.slideToggle();
        }
        return false;
    }
}