"use strict";
var iframe_page_container_1 = require('./iframe/iframe-page.container');
exports.appRoutes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: 'components', component: iframe_page_container_1.IframePageComponent },
    { path: 'components/atoms/:atom', component: iframe_page_container_1.IframePageComponent }
];
