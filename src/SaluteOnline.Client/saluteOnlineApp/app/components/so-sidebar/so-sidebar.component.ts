import { Component, ElementRef, HostListener, ViewEncapsulation, AfterViewInit, OnInit } from "@angular/core";
import { GlobalState } from "../../services/global.state";
import { layoutSizes } from "../../styles/constants";
import { menuList } from "../../configuration/menu-list";
import * as _ from "lodash";

@Component({
    selector: 'so-sidebar',
    styles: [ require('./so-sidebar.component.scss').toString() ],
    template: require('./so-sidebar.component.html'),
    encapsulation: ViewEncapsulation.None
})

export class SoSidebar implements AfterViewInit, OnInit {

    routes = _.cloneDeep(menuList);

    isMenuCollapsed = false;    
    isSidebarShouldCollapse = false;
    menuHeight : number;

    constructor(private elementRef: ElementRef, private state: GlobalState) {
        this.state.subscribe('menu.isCollapsed', (isCollapsed : boolean) => {
            this.isMenuCollapsed = isCollapsed;
        });
    }
    
    ngOnInit(): void {
        if (this.shouldSidebarCollapse()) {
            this.sidebarCollapse();
        }
    }

    ngAfterViewInit(): void {
        setTimeout(() => this.updateHeight());
    }

    @HostListener('window:resize')
    onWindowResize(): void {
        const isSidebarMustCollapse = this.shouldSidebarCollapse();
        if (isSidebarMustCollapse !== this.isSidebarShouldCollapse) {
            
        }
        this.isSidebarShouldCollapse = isSidebarMustCollapse;
        this.updateHeight();
    }
    
    sidebarCollapseStatusChange(collapse: boolean): void {
        this.isMenuCollapsed = collapse;
        this.state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    }

    updateHeight() : void {
        this.menuHeight = this.elementRef.nativeElement.childNodes[0].clientHeight - 84;
    }
    
    sidebarExpand(): void {
        this.sidebarCollapseStatusChange(false);
    }

    sidebarCollapse(): void {
        this.sidebarCollapseStatusChange(true);
    }

    private shouldSidebarCollapse(): boolean {
        return window.innerWidth <= layoutSizes.resolutionCollapseSidebar;
    }
}