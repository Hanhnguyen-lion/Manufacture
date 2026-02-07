import { Component, signal } from '@angular/core';
import { 
  FormBuilder,
  FormGroup, 
  ReactiveFormsModule, 
  Validators
} from '@angular/forms';
import { email } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm!: FormGroup;
  protected errorMessage = signal("");

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ){
    this.loginForm = fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(){
    if (this.loginForm.valid){
      var user = this.loginForm.value;

      this.authService.login(user).subscribe({
        next: (data) =>{
          if (data.status_code == 200){
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigateByUrl(returnUrl);
          }
          else{
            this.errorMessage.set(data.detail)
            this.loginForm.controls["email"].setValue("")
            this.loginForm.controls["password"].setValue("")
          }
        },
          error:(error)=>{
            console.log(error);
          }
      });
    }
  }
}
