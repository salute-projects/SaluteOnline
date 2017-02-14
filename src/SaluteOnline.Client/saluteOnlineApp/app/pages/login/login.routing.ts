import { Routes, RouterModule } from "@angular/router";
import { SoLogin } from "./login.component";

const routes: Routes = [
    { path: '', component: SoLogin }
];

export const routing = RouterModule.forChild(routes);