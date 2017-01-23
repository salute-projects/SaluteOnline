import { Routes, RouterModule } from "@angular/router";
import { Pages } from "./pages.component";

const routes: Routes = [
    {
        path: 'register', loadChildren: './register/register.module#RegisterModule'    
    },
    { 
        path: 'pages', component: Pages,
        children: [
            { path: 'main-page', loadChildren: './main-page/main-page.module#MainPageModule' },
            { path: '', redirectTo: 'main-page', pathMatch: 'full' }
        ]        
    }];

export const routing = RouterModule.forChild(routes);