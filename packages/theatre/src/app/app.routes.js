"use strict";
var user_page_container_1 = require('./users/user-page.container');
var counter_page_container_1 = require('./counter/counter-page.container');
exports.appRoutes = [
    { path: '', redirectTo: '/users', pathMatch: 'full' },
    { path: 'users', component: user_page_container_1.UserPageComponent },
    { path: 'counter', component: counter_page_container_1.CounterPageComponent },
];
