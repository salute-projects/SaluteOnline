import { Routes, RouterModule } from "@angular/router";
import { MainPage } from './main-page.component';

const routes: Routes = [
    {
        path: '',
        component: MainPage,
        children: []
    }
];

export const routing = RouterModule.forChild(routes);