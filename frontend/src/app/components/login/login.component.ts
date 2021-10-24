import { Component, OnInit } from '@angular/core';

import { OktaAuthService } from '@okta/okta-angular';
import { OktaAuth, IDToken, AccessToken } from '@okta/okta-auth-js';

import * as OktaSignIn from '@okta/okta-signin-widget';
import appConfig from 'src/app/config/app-config';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  oktaSignIn:any;
  constructor(private oktaAuthService:OktaAuthService) { 
    this.oktaSignIn=new OktaSignIn(
      {
        logo:'assets/images/logo.png',
        baseUrl:appConfig.oidc.issuer.split('/oauth2')[0],
        clientId:appConfig.oidc.clientId,
        redirectUri:appConfig.oidc.redirectUri,
        authParams:{
          pkce:true,
          issuer:appConfig.oidc.issuer,
          scopes:appConfig.oidc.scopes
        }
      }
    );

  }

  

  ngOnInit(): void {
    this.oktaSignIn.remove();
    this.oktaSignIn.renderEl({
      el:'#okta-sign-in-widget'},
      (response)=>{
        if(response.status ==='SUCCESS'){
          this.oktaAuthService.signInWithRedirect();
        },
        (error)=>{
          throw error;
        }
      
    });
  }

}