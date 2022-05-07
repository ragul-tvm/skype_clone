import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetUserService } from 'src/app/services/get-user.service';
import { ValidateService } from 'src/app/services/validate.service';
import { Person, User } from 'src/assets/user.interface';

@Component({
  selector: 'app-login-or-signup',
  templateUrl: './login-or-signup.component.html',
  styleUrls: ['./login-or-signup.component.css']
})
export class LoginOrSignupComponent implements OnInit {

  public user!: Person | Person[] | null | undefined | any;
  public username!: string;
  public password!: string;
  public loginToken: string = "werwerwer";
  public errorMsg: string = '';
  public errorNote: boolean = false;
  
  constructor(private getUsers: GetUserService,
    private loginService: ValidateService,
    private route: Router) {
      
    }

  ngOnInit(): void {

  }

  getUserforLogin(username: string): void {
    
    this.getUsers.find_user(username).subscribe((data) => {
      if (data.status === 0) {
        this.errorNote = true
        this.user = {};
      } else {
        this.errorNote = false
        if (data.data instanceof Array && data.data.length > 0) {
          this.user = data.data[0]
        }
      }
    }, (error) => {
      if (error) {
        this.errorMsg = error
      } else {
        this.errorMsg = ''
      }
    })
  }

  validatePassword(password: string): void {
    this.loginService.checkCredential(this.username, password).subscribe((data) => {
      if (data.status === undefined) {
        this.errorNote = true
        // this.user = undefined;
      } else {
        this.errorNote = false
        this.user = data.data.user
        this.loginToken = data.data.token
        if (data.data.token !== undefined) {
          this.route.navigateByUrl(`/main/${this.loginToken}`, { skipLocationChange: true })
          // this.route.navigate()
        }
      }
    }, (error) => {
      if (error) {
        this.errorMsg = error
      } else {
        this.errorMsg = ''
      }

    })
  }

  backtoSignin(): void {
    this.errorNote = false
    this.user = undefined;
  }

}
