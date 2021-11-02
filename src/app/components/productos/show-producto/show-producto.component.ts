import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
declare var tns;
declare var lightGallery;
@Component({
  selector: 'app-show-producto',
  templateUrl: './show-producto.component.html',
  styleUrls: ['./show-producto.component.css'],
})
export class ShowProductoComponent implements OnInit {
  public idProducto;
  public producto: any = {};
  public productosRecomendados: any[];

  public dataCarrito: any = {
    variedad: '',
    cantidad: 1,
  };
  public btn_cart = false;
  constructor(private _route: ActivatedRoute) {
    this._route.params.subscribe((params) => {
      this.idProducto = params['id'];
      console.log('this.idProducto', this.idProducto);
      this.producto = JSON.parse(localStorage.getItem('detalleProducto'));
    });

    this.productosRecomendados = JSON.parse(
      localStorage.getItem('productos')
    ).filter(
      (px) =>
        px.categoria ==
        JSON.parse(localStorage.getItem('detalleProducto')).categoria
      //limitar a 8 productos
    );

    console.log('this.productosRecomendados', this.productosRecomendados);
  }

  ngOnInit(): void {
    //inicializar el slider
    setTimeout(() => {
      tns({
        container: '.cs-carousel-inner',
        controlsText: [
          '<i class="cxi-arrow-left"></i>',
          '<i class="cxi-arrow-right"></i>',
        ],
        navPosition: 'top',
        controlsPosition: 'top',
        mouseDrag: !0,
        speed: 600,
        autoplayHoverPause: !0,
        autoplayButtonOutput: !1,
        navContainer: '#cs-thumbnails',
        navAsThumbnails: true,
        gutter: 15,
      });

      //la lupa q se acerca al slider
      var e = document.querySelectorAll('.cs-gallery');
      if (e.length) {
        for (var t = 0; t < e.length; t++) {
          lightGallery(e[t], {
            selector: '.cs-gallery-item',
            download: !1,
            videojs: !0,
            youtubePlayerParams: { modestbranding: 1, showinfo: 0, rel: 0 },
            vimeoPlayerParams: { byline: 0, portrait: 0 },
          });
        }
      }

      //inicializar segundo slider
      tns({
        container: '.cs-carousel-inner-two',
        controlsText: [
          '<i class="cxi-arrow-left"></i>',
          '<i class="cxi-arrow-right"></i>',
        ],
        navPosition: 'top',
        controlsPosition: 'top',
        mouseDrag: !0,
        speed: 600,
        autoplayHoverPause: !0,
        autoplayButtonOutput: !1,
        nav: false,
        controlsContainer: '#custom-controls-related',
        responsive: {
          0: {
            items: 1,
            gutter: 20,
          },
          480: {
            items: 2,
            gutter: 24,
          },
          700: {
            items: 3,
            gutter: 24,
          },
          1100: {
            items: 4,
            gutter: 30,
          },
        },
      });
    }, 500);
  }
  agregar_producto() {
    if (this.dataCarrito.variedad) {
      if (this.dataCarrito.cantidad <= this.producto.stock) {
        let data = {
          id : 'C00'+ this.producto.id+ JSON.parse(localStorage.getItem('user_data')).dni,
          producto: this.producto.id,
          cliente: JSON.parse(localStorage.getItem('user_data')).dni,
          cantidad: this.dataCarrito.cantidad,
          variedad: this.dataCarrito.variedad,
          titulo_variedad: 'Pulgadas',
          ruta: this.producto.ruta,
          name: this.producto.name,
          precio : this.producto.precio
        };
        this.btn_cart = true;

        setTimeout(() => {
          //Agregar al carrito actual
          let carritoGeneral = JSON.parse(
            localStorage.getItem('carrito_compras')
          );
          // if (carritoGeneral) carritoGeneral.split(',');
          console.log('carritoGeneral', carritoGeneral);
          let carritoTotal;
          if (carritoGeneral) {
            carritoTotal = [...carritoGeneral, ...[data]];
            console.log('carritoTotal', carritoTotal);
          } else {
            carritoTotal = [data];
          }
          // localStorage.setItem('carrito_compras', carritoTotal.toString());
          localStorage.setItem('carrito_compras', JSON.stringify(carritoTotal));
          this.btn_cart = false;
        }, 500);
      } else {
        //notificacion que no hay stock
        //la maxima cantidad disponible es: this.producto.stock
        console.log('la maxima cantidad disponible es ', this.producto.stock);
      }
    } else {
      //notificacion de seleccione la variedad de producto (talla)
      console.log('seleccione la variedad de producto');
    }
  }
}
