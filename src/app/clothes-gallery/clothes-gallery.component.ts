import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { DataService } from '../utility/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-clothes-gallery',
  templateUrl: './clothes-gallery.component.html',
  styleUrls: ['./clothes-gallery.component.css']
})
export class ClothesGalleryComponent implements OnInit {
  upper: any = [];
  bottom: any = [];
  displayUpper: any;
  displayBottom: any;
  userDetails: any;
  wardrobe: any;
  constructor( private localStorage: LocalStorage, private dataService:DataService, private snackBar: MatSnackBar) {
    // this.upper = [{id: 1, img_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYh-vlTZmHhcVVLGMLoLdSoJnl7EGK04oOety9-B_IP3mGsOd9&s"}, {id: 2, img_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3geg40xCNdZVdCpwEMrKXizSn2-HtNuXlTyET0CX5wCStRkbq&s"}, {id: 3, img_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhMMVniqHkGTKO6Ocy8l9W-H06G6qWasA6zfJ3K0wNWrnhTOUM7A&s"}, {id: 4, img_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR7puGmNmgHpRl3c2fIy8DK1ZNB-O1mWyY9wB4GeDoXWI1MwR7&s"}];
    // this.bottom = [{id: 1, img_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHplXR-7zzjyxye-bkJ-SEmm67-kAb5wgLIkE5QLCU3ZA93pfX&s"}, {id: 2, img_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgglD45-QgbTUNY9DVRVGUVPQnX2ImYWd7YyISI_3m6i-UEw_r&s"}, {id: 3, img_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQguSdKLsp1ogDufER5tE07aBXrhHs3GrFC9xOJNl502jasbHoveg&s"}, {id: 4, img_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM5RuGqvteMsMu45AvQmI9-yBaRWhBuGADz3wtLp0jRLvnnrIu&s"}];
   }

  ngOnInit() {
    this.userDetails = this.dataService.getDataFromStore('user_details');
    this.localStorage.getItem('wadrobe_of_'+this.userDetails.id).subscribe((data)=>{
      this.wardrobe = data ? data : {};
      this.upper = data["upper"];
      this.bottom = data["bottom"];
      this.generateNewPair();
    });
  }


  getRandom(size){
    let r = Math.floor(Math.random() * size);
    return r;
  }

  generateNewPair(){
    this.displayUpper = this.upper[this.getRandom(this.upper.length)];
    this.displayBottom = this.bottom[this.getRandom(this.bottom.length)];
  }

  isPairExist(upper_id, bottom_id, data){
    let index = data.findIndex(x => x.upper==upper_id && x.bottom==bottom_id)
    return (index == -1);
  }

  wardrobe_fav_dislike(type){
    this.wardrobe[type] = this.wardrobe[type] ? this.wardrobe[type] : [];
    this.wardrobe[type+"_pairs"] = this.wardrobe[type+"_pairs"] ? this.wardrobe[type+"_pairs"] : [];
    let clothPairIndex = this.isPairExist(this.displayUpper.id, this.displayBottom.id,this. wardrobe[type]);
    if(clothPairIndex){
      this.wardrobe[type].push({upper: this.displayUpper.id, bottom: this.displayBottom.id});
      this.wardrobe[type+"_pairs"].push({upper: this.displayUpper.img_url, bottom: this.displayBottom.img_url});
      ;
      this.localStorage.setItem('wadrobe_of_'+this.userDetails.id, this.wardrobe).subscribe((data)=>{console.log(data)});
      this.snackBar.open(type + ' added successfully','Successs',{horizontalPosition:'center',verticalPosition:'top', duration: 1000});
    }
    if (type == 'dislike'){
      this.generateNewPair();
    }
  }

  is_fav_dilike_pair(type){
    this.wardrobe[type] = this.wardrobe[type] ? this.wardrobe[type] : [];
    return this.isPairExist(this.displayUpper.id, this.displayBottom.id, this.wardrobe[type]);
  }
}
