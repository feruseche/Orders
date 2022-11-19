import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  flag: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {

    if(!this.flag){

      setTimeout(() => {
         this.router.navigateByUrl('home');
         this.flag = true;
      }, 1000);
    }else{
      this.router.navigateByUrl('home');
    }
    
  }

  ionViewWillEnter() {
    this.router.navigateByUrl('home');
  }
}
