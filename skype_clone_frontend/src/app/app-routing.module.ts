import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginOrSignupComponent } from './components/login-or-signup/login-or-signup.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { OopsComponent } from './components/oops/oops.component';

const routes: Routes = [
  // {path: '', redirectTo: '/main/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjUxOTE2NTM2fQ.PkBnQikrK334C5fmbxE1b9a3N3GxHSlF0hH61QutfUE', pathMatch: 'full'},
  {path: '', component: LoginOrSignupComponent},
  {path: 'main/:id', component: MainPageComponent },
  {path: '**', component: OopsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
