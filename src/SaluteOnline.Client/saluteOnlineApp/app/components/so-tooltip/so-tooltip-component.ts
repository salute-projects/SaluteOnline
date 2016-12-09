import { Component, Directive, Inject, ComponentFactoryResolver, OnInit, AfterContentChecked, Input, Output, ElementRef, 
    Renderer, ViewContainerRef, ComponentRef, EventEmitter } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";
import { IContentOptions, IOffset } from "./so-tooltip-interfaces";
import { SoTooltipHoveredContent } from "./so-tooltip-hovered-content";

@Directive({
    selector: '[tooltip]',
    host: {
        '(mouseover)': 'onMouseHover($event)',
        '(click)': 'onClick($event)',
        '(mouseleave)': 'hideTooltip()'
    }
})

export class SoTooltipComponent {
    @Output() beforeAppear = new EventEmitter<SoTooltipComponent>();
    @Output() appear = new EventEmitter<SoTooltipComponent>();
    @Output() beforeCollapse = new EventEmitter<SoTooltipComponent>();
    @Output() collapse = new EventEmitter<SoTooltipComponent>();
    @Input() content : string;
    @Input() tooltipCustomClass: string;
    @Input() displayOffset: IOffset;
    @Input() clickTrigger = false;
    @Input() autoCollapse = true;

    private _contentComponentRef: ComponentRef<SoTooltipHoveredContent>;

    constructor(private _componentFactoryResolver: ComponentFactoryResolver,
        private _viewContainerReference: ViewContainerRef,
        private _renderer: Renderer,
        @Inject(DOCUMENT) private _document: any) {
    }

    private onMouseHover(event: any) {
        if (!this.autoCollapse || this.clickTrigger) {
            return;
        }
        this.createTooltip(event);
    }

    private onClick(event: any) {
        if (!this.autoCollapse || !this.clickTrigger) {
            return;
        }
        this.createTooltip(event);
    }

    private createTooltip(event: any) {
        const options: IContentOptions = {
            content: this.content,
            cls: this.tooltipCustomClass,
            x: event.clientX,
            y: event.clientY,
            offset: this.displayOffset
        };
        this.showTooltip(options);
    }

    showTooltip(options: IContentOptions) {
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(SoTooltipHoveredContent);
        this._contentComponentRef = this._viewContainerReference.createComponent(componentFactory);
        this.beforeAppear.emit(this);
        this._document.querySelector('body').appendChild(this._contentComponentRef.location.nativeElement);
        this._contentComponentRef.instance.options = options;
        this.appear.emit(this);
    }

    hideTooltip() {
        if (this._contentComponentRef) {
            this.beforeCollapse.emit(this);
            this._contentComponentRef.destroy();
            this.collapse.emit(this);
        }    
    }
}