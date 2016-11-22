import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'loading-page',
    template: require('./loading-page.component.html'),
    styles: [require('./loading-page.component.scss').toString()]
})

export class LoadingPageComponent implements OnInit {
    name = "Loading Page Component";
    loadingScreenVisibility = true;        

    ngOnInit(): void {
        setTimeout(() => {
            this.loadingScreenVisibility = false;
        }, 5000);
    }
}