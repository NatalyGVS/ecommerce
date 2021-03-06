import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './app.routing';

// componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { IndexProductoComponent } from './components/productos/index-producto/index-producto.component';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { SidebarComponent } from './components/usuario/sidebar/sidebar.component';
import { ShowProductoComponent } from './components/productos/show-producto/show-producto.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { DireccionesComponent } from './components/usuario/direcciones/direcciones.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { IndexPedidosComponent } from './components/usuario/pedidos/index-pedidos/index-pedidos.component';
import { DetallePedidoComponent } from './components/usuario/pedidos/detalle-pedido/detalle-pedido.component';
import { IndexCategoriasComponent } from './components/productos/index-categorias/index-categorias.component';
import { OfertaComponent } from './components/inicio/oferta/oferta.component';
import { RegaloComponent } from './components/inicio/regalo/regalo.component';
import { InfoComponent } from './components/inicio/info/info.component';
import { TimerComponent } from './components/inicio/oferta/timer/timer.component';
import { DosDigitosPipe } from './pipes/dos-digitos.pipe';
import { ItemProductComponent } from './components/item-product/item-product.component';
import { ModalComponent } from './components/carrito/modal/modal.component';
import { NumParteEnteraPipe } from './pipes/num-parte-entera.pipe';
import { NumParteDecimalPipe } from './pipes/num-parte-decimal.pipe';
import { CalcularDespachoComponent } from './components/modals/calcular-despacho/calcular-despacho.component';
import { VerTiendasComponent } from './components/modals/ver-tiendas/ver-tiendas.component';
import { ConsultarStockComponent } from './components/modals/consultar-stock/consultar-stock.component';
import { VerDistritosComponent } from './components/modals/ver-distritos/ver-distritos.component';
import { ItemCarritoComponent } from './components/carrito/item-carrito/item-carrito.component';
import { DiscountComponent } from './components/inicio/discount/discount.component';
import { FormProductComponent } from './components/inicio/form-product/form-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { LocalComponent } from './components/nav/local/local.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavComponent,
    FooterComponent,
    LoginComponent,
    PerfilComponent,
    SidebarComponent,
    IndexProductoComponent,
    ShowProductoComponent,
    CarritoComponent,
    DireccionesComponent,
    ContactoComponent,
    IndexPedidosComponent,
    DetallePedidoComponent,
    IndexCategoriasComponent,
    OfertaComponent,
    RegaloComponent,
    InfoComponent,
    TimerComponent,
    DosDigitosPipe,
    ItemProductComponent,
    ModalComponent,
    NumParteEnteraPipe,
    NumParteDecimalPipe,
    CalcularDespachoComponent,
    VerTiendasComponent,
    ConsultarStockComponent,
    VerDistritosComponent,
    ItemCarritoComponent,
    DiscountComponent,
    FormProductComponent,
    RegisterComponent,
    LocalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routing,
    NgbPaginationModule,
    ReactiveFormsModule //reactive forms validate
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
