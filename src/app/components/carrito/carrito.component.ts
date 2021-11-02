import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  public data_carrito_compras : any[]= [];
  public subtotal=0;
  public totalPagar = 0;

  constructor() { 
    this.data_carrito_compras = JSON.parse(localStorage.getItem('carrito_compras'));
    console.log(" this.data_carrito_compras", this.data_carrito_compras);
    this.calcular_carrito();
  }

  ngOnInit(): void {
  }

  calcular_carrito(){
  
     this.subtotal = this.data_carrito_compras.reduce((acc,px)=>{
       return px.precio + acc;
     },0)
     console.log("this.subtotal", this.subtotal);
     this.totalPagar = this.subtotal;
  }

  
  eliminar_item(id){
      this.data_carrito_compras = JSON.parse(localStorage.getItem('carrito_compras'));

      this.data_carrito_compras = this.data_carrito_compras.filter(function(item) {
          return item.id !== id; 
        });

      localStorage.setItem('carrito_compras', JSON.stringify(this.data_carrito_compras));
      this.calcular_carrito();
      console.log("neivo carrito", this.data_carrito_compras);

  }
}
