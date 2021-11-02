import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
declare var noUiSlider;
declare var $: any; //importar jquery

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css'],
})
export class IndexProductoComponent implements OnInit {
  public configuracion_categorias: any[];
  public configuracion_categorias_original: any[];
  public productos: any[];
  public productos_original: any[];

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
  constructor(private _route: ActivatedRoute) {
    this.configuracion_categorias = JSON.parse(
      localStorage.getItem('categorias')
    );
    this.configuracion_categorias_original = JSON.parse(
      localStorage.getItem('categorias')
    );
    this.productos_original = JSON.parse(localStorage.getItem('productos'));

    this._route.params.subscribe((params) => {
      this.route_category = params['categoria'];
      this.productos = JSON.parse(localStorage.getItem('productos'));

      if (this.route_category) {
        // si estoy enviando ruta
        this.productos = JSON.parse(localStorage.getItem('productos')).filter(
          (px) => px.categoria == this.route_category
        );
      } else {
        this.productos = JSON.parse(localStorage.getItem('productos'));
      }
    });

    setTimeout(() => {
      this.load_data = false;
    }, 1500);
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
  }

  buscar_categorias() {
    console.log(this.filter_category);
    //Validacion
    if (this.filter_category) {
      var search = new RegExp(this.filter_category, 'i');
      this.configuracion_categorias = this.configuracion_categorias.filter(
        (category) => search.test(category.name)
      );
    } else {
      this.configuracion_categorias = this.configuracion_categorias_original;
    }
  }

  buscar_producto() {
    // this.productos = this.productos_original.filter(
    //   (px) => (px.name = this.filter_product)
    // );

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
        id : 'C00'+ producto.id+ JSON.parse(localStorage.getItem('user_data')).dni,
        producto: producto.id,
        cliente: JSON.parse(localStorage.getItem('user_data')).dni,
        cantidad: 1,
        variedad: producto.variedades[0].titulo,
        titulo_variedad: 'Pulgadas',
        ruta: producto.ruta,
        name: producto.name,
        precio : producto.precio

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
      console.log('la maxima cantidad disponible es ', producto.stock);
    }
  }
}
