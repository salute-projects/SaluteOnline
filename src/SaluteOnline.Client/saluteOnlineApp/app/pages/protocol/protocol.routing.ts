import { Routes, RouterModule } from "@angular/router";
import { SoProtocol } from "./protocol.component";

const routes: Routes = [
    { path: '', component: SoProtocol, children: [] }
];

export const routing = RouterModule.forChild(routes);