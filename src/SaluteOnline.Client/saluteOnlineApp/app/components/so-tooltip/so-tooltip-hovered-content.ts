import { IContentOptions } from "./so-tooltip-interfaces";
import { Component, AfterContentChecked, ElementRef } from "@angular/core";

@Component({
    template : `
            <div class="ng-tool-tip-content"
                    [ngClass]="options.cls"
                    [innerHTML] = "options.content"
                    [style.top.px]="options.y"
                    [style.left.px]="options.x"
                    style="z-index : 10;border: 1px solid #000;background-color: #FFF;position: absolute;">
              </div>
              `
}) 

export class SoTooltipHoveredContent implements AfterContentChecked {
    private _options: IContentOptions;

    constructor(private _elementReference: ElementRef) {}
    
    set options(op: IContentOptions) {
        this._options = op;
    }

    get options(): IContentOptions {
        return this._options;
    }
    
    ngAfterContentChecked(): void {
        const tooltipWidth: number = this._elementReference.nativeElement.querySelector('div.ng-tool-tip-content')
            .offsetWidth;
        if (window.innerWidth < (tooltipWidth + this.options.x)) {
            this.options.x = this.options.x - tooltipWidth;
        }
        if (this.options.offset && this.options.offset.x) {
            this.options.x += this.options.offset.x;
        }
        if (this.options.offset && this.options.offset.y) {
            this.options.y += this.options.offset.y;
        }
    }
}