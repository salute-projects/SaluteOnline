"use strict";
var router_1 = require("@angular/router");
var pages_component_1 = require("./pages.component");
var auth_guard_service_1 = require("../services/auth-guard.service");
var routes = [
    {
        path: 'register', loadChildren: './register/register.module#RegisterModule'
    },
    {
        path: 'login', loadChildren: './login/login.module#LoginModule'
    },
    {
        path: 'pages', component: pages_component_1.Pages,
        children: [
            { path: '', redirectTo: 'main-page', pathMatch: 'full' },
            { path: 'main-page', loadChildren: './main-page/main-page.module#MainPageModule' },
            { path: 'usersettings', loadChildren: './user-settings/user.settings.module#SoUserSettingsModule', canActivate: [auth_guard_service_1.AuthGuard] },
            { path: 'contacts', loadChildren: './contacts/contacts.module#ContactsModule' }
        ]
    }];
exports.routing = router_1.RouterModule.forChild(routes);
//# sourceMappingURL=pages.routing.js.map