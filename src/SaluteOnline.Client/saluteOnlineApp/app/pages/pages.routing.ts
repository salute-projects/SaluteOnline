import { Routes, RouterModule } from "@angular/router";
import { Pages } from "./pages.component";

const routes: Routes = [
    { path: 'pages', component: Pages }
];

export const routing = RouterModule.forChild(routes);