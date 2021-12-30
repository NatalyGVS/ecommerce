import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public userForm: FormGroup;
  private emailPattern: any =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public user_data: any = {};
  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }
  private buildForm() {
    this.userForm = this.formBuilder.group({
      nombres: ['', [Validators.required, Validators.minLength(5)]],
      apellidos: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  onResetForm(): void {
    this.userForm.reset();
  }

  onSaveForm(): void {
    if (this.userForm.valid) {
      const value = this.userForm.value;
      console.log('form validooo', value);
      this.onResetForm();
    } else {
      this.userForm.markAllAsTouched();
    }
  }
  get nombres() {
    return this.userForm.get('nombres');
  }
  get apellidos() {
    return this.userForm.get('apellidos');
  }
  get email() {
    return this.userForm.get('email');
  }
  get password() {
    return this.userForm.get('password');
  }
  ngOnInit(): void {}
}
