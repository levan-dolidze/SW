import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path:'',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },

  { path: 'preview', loadChildren: () => import('./preview/preview.module').then(m => m.PreviewModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
