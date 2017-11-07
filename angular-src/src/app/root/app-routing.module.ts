import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";

import { WelcomeComponent } from "../welcome/welcome.component";
import { AuthGuard } from "../authentication/guards/auth.guard";

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard]},
      { path: '', redirectTo: 'welcome', pathMatch: 'full'}
    ],{useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
