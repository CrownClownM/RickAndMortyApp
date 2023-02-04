import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { PersonajeComponent } from './pages/personaje/personaje.component';


@NgModule({
  declarations: [DashboardComponent, CatalogoComponent, PersonajeComponent],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    FormsModule
  ]
})
export class ProtectedModule { }
