import { Routes, RouterModule } from "@angular/router";
import { Pages } from "./pages.component";

const routes: Routes = [
    {
        path: 'register', loadChildren: './register/register.module#RegisterModule'    
    },
    {
        path: 'login', loadChildren: './login/login.module#LoginModule'    
    },
    { 
        path: 'pages', component: Pages,
        children: [
            { path: '', redirectTo: 'main-page', pathMatch: 'full' },
            { path: 'main-page', loadChildren: './main-page/main-page.module#MainPageModule' },
            { path: 'usersettings', loadChildren: './user-settings/user.settings.module#SoUserSettingsModule' }
        ]        
    }];

export const routing = RouterModule.forChild(routes);