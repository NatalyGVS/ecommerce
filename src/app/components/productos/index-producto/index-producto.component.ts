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
  public principalActual: any = {};
  public categoriaActual: any = {};
  public subCategoriaActual: any = {};

  // public categoriasPrincipal: any[];
  // public subcategorias: any[];
  public productos: any[] = [];

  public filter_category = '';
  public filter_product = '';
  public filter_cat_productos;
  public load_data = true;

  //categoria por ruta
  public route_principal;
  public route_category;
  public route_subcategory;
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
    this.filter_cat_productos = 'todos';
  }
  initSlider() {
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
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.route_principal = params['id-prin'];
      this.route_category = params['id-cat'];
      this.route_subcategory = params['id-sub'];
      console.log('this.route_principal', this.route_principal);
      console.log('this.route_category', this.route_category);
      console.log('this.route_subcategory', this.route_subcategory);

      //llenado de categorias

      this.principalActual = this._configuracionService
        .getCategorias()
        .subscribe((response) => {
          this.principalActual = response.find((item) => {
            return item.id == this.route_principal;
          });
          console.log('response principalActual', this.principalActual);

          this.categoriaActual = this.principalActual.categorias.find((cat) => {
            return cat.id == this.route_category;
          });
          console.log('response categoriaActual', this.categoriaActual);

          if (this.route_subcategory) {
            this.subCategoriaActual = this.categoriaActual.subCategorias.find(
              (sub) => {
                return sub.id == this.route_subcategory;
              }
            );
            this.filter_cat_productos = this.subCategoriaActual.name;
          }

          //llenado de productos
          this._configuracionService.getProductos().subscribe((response) => {
            if (this.route_subcategory) {
              this.productos = response.filter((px) => {
                return (
                  px.principal.id == this.route_principal &&
                  px.categoria.id == this.route_category &&
                  px.subcategoria.id == this.route_subcategory
                );
              });
            } else {
              this.productos = response.filter((px) => {
                return (
                  px.principal.id == this.route_principal &&
                  px.categoria.id == this.route_category
                );
              });
            }
            this.load_data = false;
            console.log('response productos', this.productos);
          });
        });
    });
    this.initSlider();
  }

  buscar_categorias() {
    console.log(this.filter_category);
    //Validacion
    if (this.filter_category) {
      var search = new RegExp(this.filter_category, 'i');
      this.categoriaActual.subCategorias =
        this.categoriaActual.subCategorias.filter((sub) =>
          search.test(sub.name)
        );
    } else {
      this._configuracionService.getCategorias().subscribe((response) => {
        this.categoriaActual = response
          .find((item) => {
            return item.id == this.route_principal;
          })
          .categorias.find((sub) => {
            return sub.id == this.route_category;
          });

        console.log('response categoriaActualllll', this.categoriaActual);
      });
    }
  }

  buscar_producto() {
    this._configuracionService.getProductos().subscribe((response) => {
      this.load_data = false;

      if (this.filter_product) {
        // var search = new RegExp(this.filter_product, 'i');
        this.buscar_por_categoria(this.filter_product);
      } else {
        this.buscar_por_categoria();
      }
    });
  }

  buscar_precios() {
    let min = parseInt($('.cs-range-slider-value-min').val());
    let max = parseInt($('.cs-range-slider-value-max').val());

    console.log('precios', min, max);

    this._configuracionService.getProductos().subscribe((response) => {
      this.productos = response.filter(
        (px) => px.categoria.id == this.route_category
      );
      this.productos = this.productos.filter((px) => {
        return px.precio >= min && px.precio <= max;
      });
    });

    console.log('this.productosssss', this.productos);
  }

  buscar_por_categoria(filter?) {
    //llenado de productos
    console.log('this.route_principal', this.route_principal);
    console.log('this.route_category', this.route_category);
    console.log('this.filter_cat_productos', this.filter_cat_productos);

    this._configuracionService.getProductos().subscribe((response) => {
      if (this.filter_cat_productos == 'todos') {
        this.productos = response.filter((px) => {
          return (
            px.principal.id == this.route_principal &&
            px.categoria.id == this.route_category
          );
        });
        console.log('this.productos  filtrados', this.productos);
      } else {
        this.productos = response.filter((px) => {
          return (
            px.principal.id == this.route_principal &&
            px.categoria.id == this.route_category &&
            px.subcategoria.name == this.filter_cat_productos
          );
        });

        console.log('this.productos  filtrados', this.productos);
      }
      if (filter) {
        var search = new RegExp(this.filter_product, 'i');
        this.productos = this.productos.filter((px) => search.test(px.name));
      }
    });
  }

  reset_productos() {
    this._configuracionService.getProductos().subscribe((response) => {
      this.load_data = false;
      this.productos = response.filter(
        (px) => px.categoria.id == this.route_category
      );
    });
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
