import { ConfiguracionService } from './../../../services/configuracion.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
declare var tns;
declare var lightGallery;
declare var $: any; //importar jquery

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
  constructor(
    private _route: ActivatedRoute,
    private _configuracionService: ConfiguracionService,
    private _carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    //obtener porducto
    this._route.params.subscribe((params) => {
      this.idProducto = params['id'];
      this._configuracionService.getProductos().subscribe((response) => {
        this.producto = response.find((item) => {
          return item.id == this.idProducto;
        });
        console.log('this.producto', this.producto);
        this.initSlider();
      });
    });

    //popover
    this.inicializar_popover();
  }

  initSlider() {
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
        autoplay: true,
        autoplayButton: false,
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
    }, 300);
  }
  inicializar_popover() {
    $('[data-toggle="popover"]').popover('hide');
  }
  validar_stock() {
    //validar si esta vacio
    if (
      this.dataCarrito.cantidad === null ||
      parseInt(this.dataCarrito.cantidad) < 1
    ) {
      this.dataCarrito.cantidad = 1;
    }

    // si supera el stock
    if (parseInt(this.dataCarrito.cantidad) > this.producto.stock) {
      $('[data-toggle="popover"]').popover('show');
      this.dataCarrito.cantidad = this.producto.stock;

      setTimeout(function () {
        $('[data-toggle="popover"]').popover('hide');
      }, 2600);
    }
  }
  agregar_producto() {
    this.btn_cart = true;
    console.log('producto', this.producto);
    this.producto.cantidad = this.dataCarrito.cantidad;
    
    setTimeout(() => {
      this.btn_cart = false;
      this._carritoService.agregarProductoCarrito(this.producto, null);
      $('#modalCarritoCompras').modal('show');

      // this.productModal.emit(product);
    }, 900);
  }

  reduceProduct() {
    if (this.dataCarrito.cantidad > 1) this.dataCarrito.cantidad--;
  }
  addProduct() {
    this.dataCarrito.cantidad++;
    this.validar_stock();
  }

  abrirConsultarStock() {
    $('#modalConsultarStock').modal('show');
  }
  abrirCalcularDespacho() {
    $('#modalCalcularDespacho').modal('show');
  }
  abrirConsultarTiendas() {
    $('#modalConsultarTiendas').modal('show');
  }
  abrirConsultarDistritos() {
    $('#modalConsultarDistritos').modal('show');
  }
}
