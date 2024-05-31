import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button'
import { Router, RouterModule } from '@angular/router';
import { AccountService } from '../../../BackendConnection/services/account.service';
import { AuthService } from '../../../BackendConnection/services/auth.service';
import { ILoginResponse, IRegister } from '../../../BackendConnection/models/account.module';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule, MatButtonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private readonly userService=inject(AccountService);
  private readonly authService= inject(AuthService);
  private readonly router= inject(Router);
  fb= inject(NonNullableFormBuilder);
  registerForm=this.fb.group({
    email:this.fb.control('',[Validators.required, Validators.email]),
    username:this.fb.control('',[Validators.required]),
    firstName:this.fb.control('',[Validators.required]),
    name:this.fb.control('',[Validators.required]),
    address:this.fb.control('',[Validators.required]),
    password:this.fb.control('',[Validators.required, Validators.min(6)]),
    confirmPassword:this.fb.control('',[Validators.required, Validators.min(6)])
  },
);

  register(){
    if(this.registerForm.invalid){
      return;
    }

    this.userService.register(this.registerForm.value as IRegister).subscribe((token:ILoginResponse)=>{
        this.authService.token=token.accessToken;
        //console.log('User registered');
        this.router.navigateByUrl('/home');
    });
  }
}
