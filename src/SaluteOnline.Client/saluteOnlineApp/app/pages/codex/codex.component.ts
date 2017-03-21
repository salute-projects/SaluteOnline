import { Component, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'so-codex',
    providers: [],
    encapsulation: ViewEncapsulation.None,
    styles: [require('./codex.component.scss').toString()],
    template: require('./codex.component.html')
})

export class SoCodex {

    constructor() {
    }
}