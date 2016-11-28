import { Component, ViewEncapsulation } from "@angular/core";
import { SoHeader } from "../components/so-header/so-header.component";

@Component(({
    selector: 'pages',
    declarations: [SoHeader],
    encapsulation: ViewEncapsulation.None,
    styles: [],
    template: '<so-header></so-header><div>Pages</div>'
}) as any)

export class Pages { }