import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { IndexProductoComponent } from './components/productos/index-producto/index-producto.component';
import { AuthGuard } from './guards/auth.guard';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
// import { AuthGuard } from './guards/auth.guard';
const appRoute: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'cuenta/perfil',
    component: PerfilComponent,
    canActivate: [AuthGuard],
  },
  { path: 'productos', component: IndexProductoComponent },
  { path: 'productos/categoria/:categoria', component: IndexProductoComponent },
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);
