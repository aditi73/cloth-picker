import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../utility/data.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { MatSnackBar } from '@angular/material/snack-bar';
declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public auth2: any;
  constructor(private router:Router,
    private localStorage: LocalStorage,
    private snackBar: MatSnackBar,
    private dataService:DataService) { }

  ngOnInit() {
  }

  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '614357527088-jlp9m65klj3oq1fanquqci1e93g9nca4.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }

  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        let user_details = {
          auth_token:googleUser.getAuthResponse().id_token,
          id:profile.getId(),
          name:profile.getName(),
          profile_image_url:profile.getImageUrl(),
          email:profile.getEmail()
        };
        this.dataService.setDataInStore('user_details',user_details);
        this.localStorage.getItem('wadrobe_of_'+user_details.id).subscribe((data)=>{
          console.log(data);
          if(data && data.length > 0){
            this.router.navigate(['/gallery']);
          }else{
            this.router.navigate(['/upload'])
          }
          setTimeout(()=>{
            window.location.reload();
          },100);
        });
      }, (error) => {
        this.snackBar.open('Sorry, some error occured!','Error',{horizontalPosition:'center',verticalPosition:'top', duration: 1000});
      });
  }

  ngAfterViewInit(){
    setTimeout(()=>{
      this.googleInit();
    },2000)
  }

}
