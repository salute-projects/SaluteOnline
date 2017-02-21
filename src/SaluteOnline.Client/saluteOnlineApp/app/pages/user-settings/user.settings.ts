import { Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'so-user-settings',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./user.settings.scss').toString()],
    template: require('./user.settings.html')
})

export class SoUserSettings {
    
}