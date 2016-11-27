import { Injectable } from "@angular/core";

@Injectable()
export class SoLoader {
    private selector = 'loading-page';
    private element : HTMLElement;

    constructor() {
        this.element = document.getElementById(this.selector);
    }

    show(): void {
        this.element.style['display'] = 'block';
        this.element.classList.add('active');
    }

    hide(delay:number = 0): void {
        setTimeout(() => {
            this.element.classList.remove('active');
        }, delay);
    }
}
