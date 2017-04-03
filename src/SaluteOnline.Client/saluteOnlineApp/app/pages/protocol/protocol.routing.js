"use strict";
var router_1 = require("@angular/router");
var protocol_component_1 = require("./protocol.component");
var routes = [
    { path: '', component: protocol_component_1.SoProtocol, children: [] }
];
exports.routing = router_1.RouterModule.forChild(routes);
//# sourceMappingURL=protocol.routing.js.map