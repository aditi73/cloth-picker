import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FavouriteComponent } from './favourite/favourite.component';
import{ RouteGuard } from './utility/route.guard';
import { UploadClothesComponent } from './upload-clothes/upload-clothes.component';
import { ClothesGalleryComponent } from './clothes-gallery/clothes-gallery.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent ,canActivate: [RouteGuard]},
  { path: 'upload', component: UploadClothesComponent ,canActivate: [RouteGuard]},
  { path: 'gallery', component: ClothesGalleryComponent ,canActivate: [RouteGuard]},
  { path: 'bookmarks', component: FavouriteComponent ,canActivate: [RouteGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
