import { Component, HostListener } from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


interface Tokens {
  access_token: string;
  refresh_token: string;
}

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  faculty: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-ssl';

  idToken = '';
  tokens: Tokens;

  constructor(
    private authService: AuthService,
    private http: HttpClient
    ){
    }

  ngOnInit(): void {
  }

  getAccessTokens(){
    
    this.http.get<Tokens>(`http://localhost:5000/auth/login/${this.idToken}`).subscribe(
      (res: Tokens) => {
        this.tokens = res
      },(error: Response)=> alert(`Unable to get access tokens. Status ${error.status}`));
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (response) => {
        this.idToken = response.idToken
      }
    );
  }
}
