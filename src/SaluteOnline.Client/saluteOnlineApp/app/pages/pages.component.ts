import { Component, ViewEncapsulation } from "@angular/core";
import { SoHeader } from "../components/so-header/so-header.component";
import { SoSidebar } from "../components/so-sidebar/so-sidebar.component";

@Component(({
    selector: 'pages',
    declarations: [SoHeader, SoSidebar],
    encapsulation: ViewEncapsulation.None,
    styles: [],
    template: '<so-header></so-header><so-sidebar></so-sidebar><div></div>'
}) as any)

export class Pages { }