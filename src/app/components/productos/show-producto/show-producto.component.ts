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
}
