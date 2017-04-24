"use strict";
var DialogProperties = (function () {
    function DialogProperties(config) {
        if (config === void 0) { config = {
            header: '',
            content: '',
            okButton: 'OK',
            cancelButton: 'CANCEL',
            customClass: ''
        }; }
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