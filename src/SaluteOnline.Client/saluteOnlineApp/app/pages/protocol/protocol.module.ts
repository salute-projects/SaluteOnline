import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { routing } from "./protocol.routing";
import { SoProtocol } from "./protocol.component";
import { FormsModule } from '@angular/forms';
import { MdInputModule, MdSlideToggleModule, MdButtonModule, MdSelectModule, MdCheckboxModule, MdRadioModule, MdTooltipModule } from "@angular/material";
import { AutoCompleteModule } from "primeng/primeng";

@NgModule({
    imports: [CommonModule, MdInputModule, MdSlideToggleModule, MdButtonModule, MdSelectModule, MdCheckboxModule, MdRadioModule, MdTooltipModule, FormsModule, AutoCompleteModule, routing],
    declarations: [SoProtocol],
    providers: []
})

export class ProtocolModule {
}