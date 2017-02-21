import { Routes, RouterModule } from "@angular/router";
import { SoUserSettings } from "./user.settings";

const routes: Routes = [
    { path: '', component: SoUserSettings }
];

export const routing = RouterModule.forChild(routes);