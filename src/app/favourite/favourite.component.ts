import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { DataService } from '../utility/data.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {
  bookmarks: any = [];
  constructor(private localStorage: LocalStorage, private dataService:DataService) { }

  ngOnInit() {
    let user_details = this.dataService.getDataFromStore('user_details');
    this.localStorage.getItem('wadrobe_of_'+user_details.id).subscribe((data)=>{
      this.bookmarks = data['favourite_pairs'] ? data['favourite_pairs'] : [];
      console.log(this.bookmarks);
      console.log(data);
    });
  }

}
