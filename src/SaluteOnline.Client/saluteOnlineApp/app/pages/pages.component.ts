import { Component, ViewEncapsulation } from "@angular/core";
import { SoHeader } from "../components/so-header/so-header.component";
import { SoSidebar } from "../components/so-sidebar/so-sidebar.component";

@Component(({
    selector: 'pages',
    declarations: [SoHeader, SoSidebar],
    encapsulation: ViewEncapsulation.None,
    styles: [],
    template: require('./pages-template.html')
}) as any)

export class Pages { }