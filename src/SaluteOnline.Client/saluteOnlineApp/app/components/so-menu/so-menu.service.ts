import { Injectable } from "@angular/core";
import { Router, Routes } from "@angular/router";

@Injectable()
export class SoMenuService {
    protected currentMenuItem = {};

    constructor(private router: Router) {
        
    }

    convertRoutesToMenus(routes: Routes): any[] {
        let items = this.convertArrayToItems(routes);
        return this.skipEmpty(items);
    }

    getCurrentItem(): any {
        return this.currentMenuItem;
    }

    selectMenuItem(menuItems: any[]): any[] {
        let items: any[] = [];
        menuItems.forEach((item) => {
            this.selectItem(item);
            if (item && item.selected) {
                this.currentMenuItem = item;
            }
            if (item.children && item.children.length > 0) {
                item.children = this.selectMenuItem(item.children);
            }
            items.push(item);
        });
        return items;
    }

    protected skipEmpty(items: any[]) : any[] {
        let menu: any[] = [];
        items.forEach((item) => {
            let menuItem : any;
            if (item && item.skip) {
                if (item.children && item.children.length > 0) {
                    menuItem = item.children;
                }
            } else {
                menuItem = item;
            }
            if (menuItem) {
                menu.push(menuItem);
            }
        });
        return [].concat.apply([], menu);
    }

    protected convertArrayToItems(routes: any[], parent?: any[]) {
        let items: any[] = [];
        routes.forEach((route) => {
            items.push(this.convertObjectToItem(route, parent));
        });
        return items;
    }

    protected convertObjectToItem(object:any, parent?: any): any {
        let item: any = {};
        if (object.data && object.data.menu) {
            item = object.data.menu;
            item.route = object;
            delete item.route.data.menu;
        } else {
            item.route = object;
            item.skip = true;
        }
        if (Array.isArray(item.route.path)) {
            item.route.paths = item.route.path;
        } else {
            item.route.paths = parent && parent.route && parent.route.paths ? parent.route.paths.slice(0) : ['/'];
            if (!!item.route.path) item.route.paths.push(item.route.path);
        }
        if (object.children && object.children.length > 0) {
            item.children = this.convertArrayToItems(object.children, item);
        }
        let prepared = this.prepareItem(item);
        if ((prepared.selected || prepared.expanded) && parent) {
            parent.expanded = true;
        }
        return prepared;
    }

    protected prepareItem(object: any): any {
        if (!object.skip) {
            object.target = object.target || '';
            object.pathMatch = object.pathMatch || 'full';
            return this.selectItem(object);
        }
        return object;
    }

    protected selectItem(object: any): any {

        object.selected = this.router.isActive(this.router.createUrlTree(object.route.paths),
            object.pathMatch === 'full');
        return object;
    }   
}