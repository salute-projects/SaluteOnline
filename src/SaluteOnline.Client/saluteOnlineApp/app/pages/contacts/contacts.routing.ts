import { Routes, RouterModule } from "@angular/router";
import { SoContacts } from "./contacts.component";

const routes: Routes = [
    { path: '', component: SoContacts, children: [] }
];

export const routing = RouterModule.forChild(routes);