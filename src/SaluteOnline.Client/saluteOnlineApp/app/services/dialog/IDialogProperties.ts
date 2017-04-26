export interface IDialogProperties {
    confirm: boolean;
    header: string;
    content: string;
    okButton: string;
    cancelButton: string;
    customClass: string | null;
}

export class DialogProperties implements IDialogProperties {
    constructor(config: IDialogProperties = {
        confirm: true,
        header: '',
        content: '',
        okButton: 'OK',
        cancelButton: 'CANCEL',
        customClass: ''
    }) {
        this.confirm = config.confirm;
        this.header = config.header;
        this.content = config.content;
        this.okButton = config.okButton;
        this.cancelButton = config.cancelButton;
        this.customClass = config.customClass;
    }

    confirm: boolean;
    header: string;
    content: string;
    okButton: string;
    cancelButton: string;
    customClass: string;
}