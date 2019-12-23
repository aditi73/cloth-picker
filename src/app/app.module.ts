import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//components
import { LoginComponent } from './login/login.component';
import { UploadClothesComponent } from './upload-clothes/upload-clothes.component';
import { ClothesGalleryComponent } from './clothes-gallery/clothes-gallery.component';

//material components
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';

//services
import { DataService } from './utility/data.service';
import { RouteGuard } from './utility/route.guard';
import { FavouriteComponent } from './favourite/favourite.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UploadClothesComponent,
    ClothesGalleryComponent,
    FavouriteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    // BrowserAnimationsModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [DataService,RouteGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
