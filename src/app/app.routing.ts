import { IndexCategoriasComponent } from './components/productos/index-categorias/index-categorias.component';
import { DetallePedidoComponent } from './components/usuario/pedidos/detalle-pedido/detalle-pedido.component';
import { IndexPedidosComponent } from './components/usuario/pedidos/index-pedidos/index-pedidos.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { ShowProductoComponent } from './components/productos/show-producto/show-producto.component';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { DireccionesComponent } from './components/usuario/direcciones/direcciones.component';

import { IndexProductoComponent } from './components/productos/index-producto/index-producto.component';
import { AuthGuard } from './guards/auth.guard';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
// import { AuthGuard } from './guards/auth.guard';
const appRoute: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  {
    path: 'cuenta/perfil',
    component: PerfilComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cuenta/direcciones',
    component: DireccionesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cuenta/pedidos',
    component: IndexPedidosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cuenta/pedidos/:id',
    component: DetallePedidoComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'carrito',
    component: CarritoComponent,
    canActivate: [AuthGuard],
  },
  // { path: 'productos', component: IndexProductoComponent },
  { path: 'categoria/:id', component: IndexCategoriasComponent }, //principal

  {
    path: 'productos/categoria/:id-prin/:id-cat',
    component: IndexProductoComponent,
  }, //principal, categoria
  {
    path: 'productos/categoria/:id-prin/:id-cat/:id-sub', //principal, categoria, subcategoria
    component: IndexProductoComponent,
  },
  { path: 'productos/:id', component: ShowProductoComponent },

  { path: 'contacto', component: ContactoComponent },
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);
