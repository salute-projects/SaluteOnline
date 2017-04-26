"use strict";
var DialogProperties = (function () {
    function DialogProperties(config) {
        if (config === void 0) { config = {
            confirm: true,
            header: '',
            content: '',
            okButton: 'OK',
            cancelButton: 'CANCEL',
            customClass: ''
        }; }
        this.confirm = config.confirm;
        this.header = config.header;
        this.content = config.content;
        this.okButton = config.okButton;
        this.cancelButton = config.cancelButton;
        this.customClass = config.customClass;
    }
    return DialogProperties;
}());
exports.DialogProperties = DialogProperties;
//# sourceMappingURL=IDialogProperties.js.map