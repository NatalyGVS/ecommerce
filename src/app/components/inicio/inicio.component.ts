import { ConfiguracionService } from './../../services/configuracion.service';
import { Component, OnInit } from '@angular/core';
declare var tns;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  public productos: any[];
  public principales: any[];
  public banners;
  public regalos: any[];
  public load_data_px = true;


  constructor(private _configuracionService: ConfiguracionService) {}

  ngOnInit(): void {
    //llenado de categorias
    this._configuracionService.getCategorias().subscribe((response) => {
      this.principales = response;
      this.regalos = [
        {
          precio: 80,
          contenido:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
        },
        {
          precio: 70,
          contenido:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
        },
        {
          precio: 60,
          contenido:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
        },
        {
          precio: 50,
          contenido:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
        },
        {
          precio: 50,
          contenido:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
        },
      ];
    });

    //productos populares
    this._configuracionService.getProductosInicio().subscribe((response) => {
      this.productos = response;
      this.load_data_px = false;
      console.log('this.productos', this.productos);
      this.inicializacionCarousel();
    });
  }

  inicializacionCarousel() {
    setTimeout(() => {
      tns({
        container: '.cs-carousel-inner',
        controlsText: [
          '<i class="cxi-arrow-left"></i>',
          '<i class="cxi-arrow-right"></i>',
        ],
        mode: 'gallery',
        navContainer: '#pager',
        loop: true,
        speed: 200,
        autoplay: true,
        autoplayButton: false,
        autoplayButtonOutput: false,
        responsive: {
          0: { controls: false },
          991: { controls: true },
        },
        controls: false,
        mouseDrag: !0,
      });

      tns({
        container: '.cs-carousel-inner-three',
        controls: false,
        mouseDrag: !0,
        responsive: {
          0: {
            items: 1,
            gutter: 20,
          },
          420: {
            items: 2,
            gutter: 20,
          },
          600: {
            items: 3,
            gutter: 20,
          },
          700: {
            items: 3,
            gutter: 30,
          },
          900: {
            items: 4,
            gutter: 30,
          },
          1200: {
            items: 5,
            gutter: 30,
          },
          1400: {
            items: 6,
            gutter: 30,
          },
        },
      });

      tns({
        container: '.cs-carousel-inner-four',
        nav: false,
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

      tns({
        container: '.cs-carousel-inner-five',
        controls: false,
        gutter: 30,
        responsive: {
          0: { items: 1 },
          380: { items: 2 },
          550: { items: 3 },
          750: { items: 4 },
          1000: { items: 5 },
          1250: { items: 6 },
        },
      });
    }, 500);
  }
}
