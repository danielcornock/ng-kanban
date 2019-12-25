import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./authentication/views/login/login.component";
import { HomeComponent } from "./home/views/home/home.component";
import { AuthGuard } from "./authentication/guards/auth.guard";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "home", canActivate: [AuthGuard], component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
