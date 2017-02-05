"use strict";
var router_1 = require("@angular/router");
var main_page_component_1 = require('./main-page.component');
var routes = [
    {
        path: '',
        component: main_page_component_1.MainPage,
        children: []
    }
];
exports.routing = router_1.RouterModule.forChild(routes);
//# sourceMappingURL=main-page.routing.js.map