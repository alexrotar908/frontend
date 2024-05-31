import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AccountService } from '../../../BackendConnection/services/account.service';
import { AuthService } from '../../../BackendConnection/services/auth.service';
import { ILogin, ILoginResponse } from '../../../BackendConnection/models/account.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule, MatButtonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly userService=inject(AccountService);
  private readonly authService= inject(AuthService);
  private readonly router= inject(Router);

  fb= inject(NonNullableFormBuilder);
  loginForm=this.fb.group({
    email:this.fb.control('',[Validators.required, Validators.email]),
    password:this.fb.control('',[Validators.required, Validators.min(6)])
  });

  login(){
    if(this.loginForm.invalid){
      return;
    }

    this.userService.login(this.loginForm.value as ILogin).subscribe((token:ILoginResponse)=>{
        this.authService.token=token.accessToken;
        //console.log('User registered');
        this.router.navigateByUrl('/home');
    });
  }

}
