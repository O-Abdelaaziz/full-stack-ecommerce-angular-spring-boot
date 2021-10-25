import { OktaAuthService } from '@okta/okta-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated:boolean=false;
  userFullName:string='';
  storage:Storage=localStorage;
  constructor(private oktaAuthService:OktaAuthService) { }

  ngOnInit(): void {
    this.oktaAuthService.$authenticationState.subscribe(
      (response)=>{
        this.isAuthenticated=response;
        this.getUserDetails();
      }
    )
  }


  getUserDetails() {


    if(this.isAuthenticated){
      this.oktaAuthService.getUser().then(
        (response)=>{
          this.userFullName=response.name;
          this.storage.setItem('email',JSON.stringify(response.email));
        }
      )
    }
  }

  logout(){
    this.oktaAuthService.signOut();
  }

}
