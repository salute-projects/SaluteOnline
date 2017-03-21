import { Routes, RouterModule } from "@angular/router";
import { Pages } from "./pages.component";
import { AuthGuard } from "../services/auth-guard.service";

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
            { path: 'usersettings', loadChildren: './user-settings/user.settings.module#SoUserSettingsModule', canActivate: [AuthGuard] },
            { path: 'contacts', loadChildren: './contacts/contacts.module#ContactsModule' },
            { path: 'materials',
                children: [
                    { path: '', redirectTo: 'codex', pathMatch: 'full' },
                    { path: 'codex', loadChildren: './codex/codex.module#CodexModule' }
                ]
            }
        ]        
    }];

export const routing = RouterModule.forChild(routes);