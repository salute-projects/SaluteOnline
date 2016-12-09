import { SoTooltipHoveredContent } from "./so-tooltip-hovered-content";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { SoTooltipComponent } from "./so-tooltip-component";

@NgModule({
    imports: [BrowserModule],
    declarations: [SoTooltipComponent, SoTooltipHoveredContent],
    exports: [SoTooltipComponent],
    entryComponents: [SoTooltipHoveredContent]
})
export class SoTooltipModule {
}