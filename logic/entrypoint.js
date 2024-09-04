import * as builder from './vendors/builder.js';
import Home from "./components/Home.js";
import NotFound from "./components/404.js";
import '../front/desktop.css'
import '../front/builder.css'
import('../front/Remix/remixicon.scss')

builder.entrypoit(()=>{
    let home  = new Home(),
        _404  = new NotFound(),
        router = new builder.router(home, _404);

    router.watch()
})