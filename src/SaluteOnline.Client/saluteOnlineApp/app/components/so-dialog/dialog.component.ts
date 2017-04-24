import { Component, ViewEncapsulation, OnInit } from "@angular/core";
import { IDialogProperties, DialogProperties } from "../../services/dialog/IDialogProperties";
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'dialog-result-example-dialog',
    styles: [require('./dialog.component.scss').toString()],
    template: require('./dialog.component.html'),
    encapsulation: ViewEncapsulation.None
})
export class SoDialog implements OnInit {
    private config : IDialogProperties;

    constructor(public dialogRef: MdDialogRef<SoDialog>) { }

    ngOnInit(): void { this.config = this.dialogRef.config.data; }
}