import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css'],
})
export class FormProductComponent implements OnInit {
  public solicitud: any;
  public contactForm: FormGroup;
  private emailPattern: any =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  private buildForm() {
    this.contactForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellidos: ['', [Validators.required, Validators.minLength(5)]],
      categoria: ['', [Validators.required]],
      producto: ['', [Validators.required]],
      celular: ['', [Validators.required]],
    });
  }

  onResetForm(): void {
    this.contactForm.reset();
  }

  onSaveForm(): void {
    if (this.contactForm.valid) {
      const value = this.contactForm.value;
      console.log('form validooo', value);
      this.onResetForm();
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {}
  get nombre() {
    return this.contactForm.get('nombre');
  }
  get apellidos() {
    return this.contactForm.get('apellidos');
  }
  get categoria() {
    return this.contactForm.get('categoria');
  }
  get producto() {
    return this.contactForm.get('producto');
  }
  get celular() {
    return this.contactForm.get('celular');
  }
  get email() {
    return this.contactForm.get('email');
  }
  get message() {
    return this.contactForm.get('message');
  }
}
