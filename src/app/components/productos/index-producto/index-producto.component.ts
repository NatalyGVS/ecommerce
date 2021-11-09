import { ConfiguracionService } from './../../../services/configuracion.service';

import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
declare var noUiSlider;
declare var $: any; //importar jquery
declare var tns;

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css'],
})
export class IndexProductoComponent implements OnInit {
  public categorias: any[];
  public categoriaActual: any = {};
  public subcategorias: any[];
  public productos: any[] = [];
  public productos_original: any[] = [];

  public filter_category = '';
  public filter_product = '';
  public filter_cat_productos = 'todos';
  public load_data = true;

  //categoria por ruta
  public route_category;
  //paginacion
  public page = 1;
  public pageSize = 12; // productos por pagina

  public sort_by = 'Defecto';

  //carrito de compras
  public dataCarrito: any = {
    variedad: '',
    cantidad: 1,
  };
  public btn_cart = false;
  constructor(
    private _route: ActivatedRoute,
    private _configuracionService: ConfiguracionService
  ) {
    //llenado de categorias
    this._configuracionService.get_categorias().subscribe((response) => {
      this.categorias = response;
      console.log('cat', response);
    });

    //llenado de productos
    this._configuracionService.get_productos().subscribe((response) => {
      this._route.params.subscribe((params) => {
        this.route_category = params['id'];
        console.log('this.route_category', this.route_category);

        this.categoriaActual = this.categorias.find(
          (x) => x.id == this.route_category
        );

        if (this.route_category) {
          // si estoy enviando ruta
          this.productos = response.filter(
            (px) => px.categoria.id == this.route_category
          );

          console.log(' this.productos', this.productos);
          //llenar subcategorias
          this.subcategorias = this.categorias.find(
            (element) => element.id == this.route_category
          ).subcategorias;

          console.log('------>this.subcategorias', this.subcategorias);
        } else {
          this.productos = response;
        }
      });
      this.load_data = false;
    });
  }

  ngOnInit(): void {
    var slider: any = document.getElementById('slider');
    noUiSlider.create(slider, {
      start: [0, 1000],
      connect: true,
      // decimals: false,
      range: {
        min: 0,
        max: 1000,
      },
      tooltips: [true, true],
      pips: {
        mode: 'count',
        values: 5,
      },
    });

    slider.noUiSlider.on('update', function (values) {
      //Establecer valor minimo y maximo
      $('.cs-range-slider-value-min').val(values[0]);
      $('.cs-range-slider-value-max').val(values[1]);
    });
    $('.noUi-tooltip').css('font-size', '11px');
    $('#custom-controls-trending').css({ display: 'flex' });

    // CAROUSEL SUBCATEGORIAS
    setTimeout(() => {
      tns({
        container: '.cs-carousel-inner-subcategorias',
        nav: false,
        autoplay: true,
        autoplayButton: false,
        autoplayButtonOutput: false,

        controlsText: [
          '<i class="cxi-arrow-left"></i>',
          '<i class="cxi-arrow-right"></i>',
        ],
        controlsContainer: '#custom-controls-trending',
        responsive: {
          0: {
            items: 1,
            gutter: 20,
          },
          480: {
            items: 3,
            gutter: 24,
          },
          700: {
            items: 4,
            gutter: 24,
          },
          900: {
            items: 5,
            gutter: 24,
          },
          1000: {
            items: 7,
            gutter: 30,
          },
        },
      });
    }, 2000);
  }

  buscar_categorias() {
    console.log(this.filter_category);
    //Validacion
    if (this.filter_category) {
      var search = new RegExp(this.filter_category, 'i');
      this.categorias = this.categorias.filter((category) =>
        search.test(category.name)
      );
    } else {
      this._configuracionService.get_categorias().subscribe((response) => {
        this.categorias = response;
      });
    }
  }

  buscar_producto() {
    //Validacion

    if (this.filter_product) {
      var search = new RegExp(this.filter_product, 'i');
      this.productos = this.productos_original.filter((px) =>
        search.test(px.name)
      );
    } else {
      this.productos = this.productos_original;
    }

    setTimeout(() => {
      this.load_data = false;
    }, 1500);

    console.log('this.productos', this.productos);
  }

  buscar_precios() {
    let min = parseInt($('.cs-range-slider-value-min').val());
    let max = parseInt($('.cs-range-slider-value-max').val());

    console.log('precios', min, max);

    this.productos = this.productos_original.filter((px) => {
      return px.precio >= min && px.precio <= max;
    });

    console.log('this.productosssss', this.productos);
  }

  buscar_por_categoria() {
    console.log('this.filter_cat_productos', this.filter_cat_productos);

    if (this.filter_cat_productos == 'todos') {
      this.productos = this.productos_original;
    } else {
      this.productos = this.productos_original.filter(
        (px) => px.categoria == this.filter_cat_productos
      );
      console.log('this.productos  filtrados', this.productos);
    }

    setTimeout(() => {
      this.load_data = false;
    }, 1500);
  }

  reset_productos() {
    this.productos = this.productos_original;
  }

  ordenar_por() {
    if (this.sort_by == 'Defecto') {
      this.productos = JSON.parse(localStorage.getItem('productos'));
    } else if (this.sort_by == 'Popularidad') {
      this.productos = this.productos.sort((a, b) => b.nVentas - a.nVentas);
    } else if (this.sort_by == '+-Precio') {
      this.productos = this.productos.sort((a, b) => b.precio - a.precio);
    } else if (this.sort_by == '-+Precio') {
      this.productos = this.productos.sort((a, b) => a.precio - b.precio);
    } else if (this.sort_by == 'azNombre') {
      this.productos = this.productos.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
    } else if (this.sort_by == 'zaNombre') {
      this.productos = this.productos.sort((a, b) => {
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        return 0;
      });
    }
  }

  agregar_producto(producto) {
    if (this.dataCarrito.cantidad <= producto.stock) {
      let data = {
        id:
          'C00' +
          producto.id +
          JSON.parse(localStorage.getItem('user_data')).dni,
        producto: producto.id,
        cliente: JSON.parse(localStorage.getItem('user_data')).dni,
        cantidad: 1,
        variedad: producto.variedades[0].titulo,
        titulo_variedad: 'Pulgadas',
        ruta: producto.ruta,
        name: producto.name,
        precio: producto.precio,
      };
      this.btn_cart = true;

      setTimeout(() => {
        //Agregar al carrito actual
        let carritoGeneral = localStorage.getItem('carrito_compras');
        // if (carritoGeneral) carritoGeneral.split(',');
        console.log('carritoGeneral', carritoGeneral);
        let carritoTotal;
        if (carritoGeneral) {
          carritoGeneral = JSON.parse(localStorage.getItem('carrito_compras'));
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
      console.log('la maxima cantidad disponible es ', producto.stock);
    }
  }

 
}
