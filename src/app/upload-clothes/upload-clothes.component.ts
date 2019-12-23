import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { DataService } from '../utility/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-clothes',
  templateUrl: './upload-clothes.component.html',
  styleUrls: ['./upload-clothes.component.css']
})
export class UploadClothesComponent implements OnInit {
  imageExtension: any = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
  uploadClothesForm:any;
  constructor(private fb:FormBuilder,
    private localStorage: LocalStorage,
    private dataService:DataService,
    private router:Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.uploadClothesForm = this.fb.group({
      category:[null,[Validators.required]],
      image_url:[null,[Validators.required]]
    });
  }

  onImageUpload(event){
    let reader = new FileReader();
    let url = URL.createObjectURL(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      if (this.imageExtension.indexOf(event.target.files[0].type) > -1) {
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (e: any) => {
          this.uploadClothesForm.controls.image_url.setValue(reader.result);
        }
      }
    }
  }

  addClothes(){
    let user_details = this.dataService.getDataFromStore('user_details');
    this.localStorage.getItem('wadrobe_of_'+user_details.id).subscribe((data)=>{
      let wardrobe = data ? data : {};
      wardrobe["upper"] = wardrobe["upper"] ? wardrobe["upper"] : []
      wardrobe["bottom"] = wardrobe["bottom"] ? wardrobe["bottom"] : []
      wardrobe[this.uploadClothesForm.value.category].push({id: wardrobe[this.uploadClothesForm.value.category].length, img_url: this.uploadClothesForm.value.image_url});
      this.localStorage.setItem('wadrobe_of_'+user_details.id, wardrobe).subscribe((data)=>{console.log(data)});
      this.snackBar.open('Added to your wardrobe','Successs',{horizontalPosition:'center',verticalPosition:'top', duration: 1000});
      this.router.navigate(['/gallery']);
    });
  }
}
