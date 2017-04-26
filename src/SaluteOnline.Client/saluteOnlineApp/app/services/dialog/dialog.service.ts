import { SoDialog } from "../../components/so-dialog/dialog.component";
import { MdDialog } from '@angular/material';
import { Injectable } from '@angular/core';
import { IDialogProperties, DialogProperties } from "./IDialogProperties"

@Injectable()
export class SoDialogService {

    constructor(private readonly mdMdialog: MdDialog) {
        
    }

    show(config: IDialogProperties | null, width: string = 'auto', height: string = 'auto', disableClose: boolean = false) {
        if (!config) {
            config = this.setDefaultConfig();
        }
        return new Promise(resolve => {
            const dialogRef = this.mdMdialog.open(SoDialog, {
                width: width,
                height: height,
                data: config,
                disableClose: disableClose
            });
            dialogRef.afterClosed().subscribe((result: boolean) => {
                resolve(result);
            });
        });
    }

    showError(message: string, width: string = 'auto', height: string = 'auto') {
        const config = this.setDefaultConfig();
        config.content = message;
        config.confirm = false;
        return new Promise((): void => {
            this.mdMdialog.open(SoDialog, {
                width: width,
                height: height,
                data: config,
                disableClose: true
            });
        });
    }

    private setDefaultConfig() {
        return new DialogProperties();
    }
}