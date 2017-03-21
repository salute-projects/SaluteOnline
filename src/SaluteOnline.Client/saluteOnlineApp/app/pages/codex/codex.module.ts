import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { routing } from "./codex.routing";
import { SoCodex } from "./codex.component";
import { AccordionModule } from "primeng/primeng";

@NgModule({
    imports: [CommonModule, routing, AccordionModule],
    declarations: [SoCodex],
    providers: []
})

export class CodexModule {
}