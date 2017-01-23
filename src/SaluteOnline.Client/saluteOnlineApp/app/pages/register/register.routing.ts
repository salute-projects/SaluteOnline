import { Routes, RouterModule } from "@angular/router";
import { SoRegister } from "./register.component";

const routes: Routes = [
    { path: '', component: SoRegister }
];

export const routing = RouterModule.forChild(routes);