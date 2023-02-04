import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidarTokenGuard } from './guards/validar-token.guard';

/**
 * Definicion de las rutas de la pagina
 */

const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path: 'home',
    loadChildren: () => import('./protected/protected.module').then( m => m.ProtectedModule ),
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
