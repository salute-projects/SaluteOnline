import { Routes, RouterModule } from "@angular/router";
import { SoCodex } from "./codex.component";

const routes: Routes = [
    { path: '', component: SoCodex, children: [] }
];

export const routing = RouterModule.forChild(routes);