import { Component, ViewEncapsulation, AfterViewInit  } from '@angular/core';
import { GlobalState } from './services/global.state';
import { SoSpinner } from './services/so-spinner.service';
import { SoLoader } from './services/so-loading.service';

@Component(({
    selector: 'so-app',
    encapsulation: ViewEncapsulation.None,
    providers: [GlobalState, SoLoader],
    template: require('./app.template.html'),    
    styles: [ require('./app.component.scss').toString() ]
}) as any)

export class AppComponent implements AfterViewInit {
    isMenuCollapsed = false;
    
    constructor(private state: GlobalState, private loader: SoLoader) {
        this.loader.show();

        this.state.subscribe('menu.collapsed', (isCollapsed: boolean) => {
            this.isMenuCollapsed = isCollapsed;
        });
    }

    ngAfterViewInit(): void {
        this.loader.hide(5000);
    }
}