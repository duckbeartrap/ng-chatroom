import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: "", loadChildren: () => import('@pages/home/home.module').then(m => m.HomeModule) },
  { path: "auth", loadChildren: () => import('@pages/auth/auth.module').then(m => m.AuthModule) },
  { path: "chatroom", loadChildren: () => import('@pages/chatroom/chatroom.module').then(m => m.ChatroomModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
