import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { routing } from "./codex.routing";
import { SoCodex } from "./codex.component";
import { AccordionModule } from "primeng/primeng";
import { MdTooltipModule } from '@angular/material';

@NgModule({
    imports: [CommonModule, routing, AccordionModule, MdTooltipModule],
    declarations: [SoCodex],
    providers: []
})

export class CodexModule {
}