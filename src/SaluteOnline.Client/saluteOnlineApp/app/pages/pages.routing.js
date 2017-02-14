"use strict";
var router_1 = require("@angular/router");
var pages_component_1 = require("./pages.component");
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
            { path: 'main-page', loadChildren: './main-page/main-page.module#MainPageModule' },
            { path: '', redirectTo: 'main-page', pathMatch: 'full' }
        ]
    }];
exports.routing = router_1.RouterModule.forChild(routes);
//# sourceMappingURL=pages.routing.js.map