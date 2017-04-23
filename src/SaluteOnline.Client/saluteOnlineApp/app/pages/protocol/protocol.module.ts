import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { routing } from "./protocol.routing";
import { SoProtocol, DialogResultExampleDialog } from "./protocol.component";
import { FormsModule } from '@angular/forms';
import { MdInputModule, MdSlideToggleModule, MdButtonModule, MdSelectModule, MdCheckboxModule, MdRadioModule, MdTooltipModule } from "@angular/material";
import { AutoCompleteModule, DialogModule } from "primeng/primeng";

@NgModule({
    imports: [CommonModule, MdInputModule, MdSlideToggleModule, MdButtonModule, MdSelectModule, MdCheckboxModule, MdRadioModule, MdTooltipModule, FormsModule,
        AutoCompleteModule, DialogModule, routing],
    declarations: [SoProtocol, DialogResultExampleDialog],
    providers: [],
    entryComponents: [DialogResultExampleDialog]
})

export class ProtocolModule {
}