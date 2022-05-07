import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginOrSignupComponent } from './components/login-or-signup/login-or-signup.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { BottomAppBarComponent } from './components/bottom-app-bar/bottom-app-bar.component';
import { OopsComponent } from './components/oops/oops.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginOrSignupComponent,
    MainPageComponent,
    BottomAppBarComponent,
    OopsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
