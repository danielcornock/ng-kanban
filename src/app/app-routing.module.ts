import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./authentication/views/login/login.component";
import { HomeComponent } from "./home/views/home/home.component";
import { AuthGuard } from "./authentication/guards/auth.guard";
import { BoardComponent } from "./boards/views/board/board.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "home", canActivate: [AuthGuard], component: HomeComponent },
  {
    path: "boards/:boardId",
    canActivate: [AuthGuard],
    component: BoardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
