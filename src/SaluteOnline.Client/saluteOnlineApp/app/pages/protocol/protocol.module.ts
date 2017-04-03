import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { routing } from "./protocol.routing";
import { SoProtocol } from "./protocol.component";
import { FormsModule } from '@angular/forms';
import { MdInputModule, MdSlideToggleModule, MdButtonModule, MdSelectModule } from "@angular/material";

@NgModule({
    imports: [CommonModule, MdInputModule, MdSlideToggleModule, MdButtonModule, MdSelectModule, FormsModule, routing],
    declarations: [SoProtocol],
    providers: []
})

export class ProtocolModule {
}