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
  
  getMe(){
    this.http.get('https://localhost/tellspace-server/auth/me').subscribe(
      (res) => {
        alert('You got me. Check console.')
        console.log(res)
      },
      (err) => alert('Error getting me!!!')
    )
  }

  getServerHealthCheck() {
    this.http.get<Tokens>(`https://localhost/tellspace-server/`).subscribe(
      (res) => {
        alert('TELLSPACE SERVER ALIVE')
      },
      (error: Response)=> console.log(error)
      ); 
  }

  getAccessTokens(){
    
    this.http.get<Tokens>(`https://localhost/tellspace-server/auth/login/${this.idToken}`).subscribe(
      (res: Tokens) => {
        this.tokens = res;
        sessionStorage.setItem('access_token', res.access_token)
      },(error: Response)=> {
        console.log(error)
        alert('Cannot get Tokens' + error.status)
      });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (response) => {
        this.idToken = response.idToken
      }
    );
  }
}
