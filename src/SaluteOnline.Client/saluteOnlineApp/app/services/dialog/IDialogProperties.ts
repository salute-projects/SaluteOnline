export interface IDialogProperties {
    header: string;
    content: string;
    okButton: string;
    cancelButton: string;
    customClass: string | null;
}

export class DialogProperties implements IDialogProperties {
    constructor(config: IDialogProperties = {
        header: '',
        content: '',
        okButton: 'OK',
        cancelButton: 'CANCEL',
        customClass: ''
    }) {
        this.header = config.header;
        this.content = config.content;
        this.okButton = config.okButton;
        this.cancelButton = config.cancelButton;
        this.customClass = config.customClass;
    }

    header: string;
    content: string;
    okButton: string;
    cancelButton: string;
    customClass: string;
}