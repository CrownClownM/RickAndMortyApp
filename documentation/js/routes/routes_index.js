var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"auth","loadChildren":"./auth/auth.module#AuthModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/auth/auth-routing.module.ts","module":"AuthRoutingModule","children":[{"path":"","component":"MainComponent","children":[{"path":"","component":"LoginComponent"},{"path":"registro","component":"RegisterComponent"},{"path":"**","redirectTo":""}]}],"kind":"module"}],"module":"AuthModule"}]},{"path":"home","loadChildren":"./protected/protected.module#ProtectedModule","canActivate":["ValidarTokenGuard"],"canLoad":["ValidarTokenGuard"],"children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/protected/protected-routing.module.ts","module":"ProtectedRoutingModule","children":[{"path":"","component":"DashboardComponent","children":[{"path":"","component":"CatalogoComponent"},{"path":"personaje/:id","component":"PersonajeComponent"},{"path":"**","redirectTo":""}]}],"kind":"module"}],"module":"ProtectedModule"}]},{"path":"**","redirectTo":"auth"}],"kind":"module"}]}