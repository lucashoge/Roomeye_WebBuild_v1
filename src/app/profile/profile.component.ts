import { Component, OnInit, Input } from '@angular/core';
import { trigger, keyframes, animate, transition } from "@angular/animations";
import * as kf from './keyframes';
import {User} from './user';
import data from './users.json';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    trigger('cardAnimator', [
      transition('* => swiperight', animate('900ms ease-in-out', keyframes(kf.swiperight))),
      transition('* => swipeleft', animate('900ms ease-in-out', keyframes(kf.swipeleft)))
    ])
  ]
})
export class ProfileComponent {

  public users: any[] = [];// = data;
  currentUser!: any;
  userID = 0;
  loggedInUser: any;


  public index = -1;
  switch = false;
  @Input()
  parentSubject!: Subject<any>;

  
  animationState!: string;

  constructor(private http: HttpClient, private router: Router) {
   }

  ngOnInit() {
    this.parentSubject.subscribe(event => {
      this.startAnimation(event)
    });
    this.loggedInUser = localStorage.getItem('loggedInUser');
    this.loggedInUser = JSON.parse(this.loggedInUser);

    console.log("profileComp loggedInUser: " + this.loggedInUser)

    this.getNewUsersForMatching();  
  }

  startAnimation(state: any) {
    if (!this.animationState) {
      this.animationState = state;
    }
    
  }

  resetAnimationState(state: any) {
    this.animationState = '';
    if(this.switch == true){
      this.index++;
      if(this.index>=this.users.length){
        this.index = 0;
        this.getNewUsersForMatching();
      }else{
        this.currentUser = this.users[this.index]; 
      }
      this.switch = false
    }else{
      this.switch = true;
    }

    
    
    // this.index++;
    // console.log(state);
    // this.currentUser = this.users[this.index];
  }

  async getNewUsersForMatching() {
    var httpPostData = {userId: this.userID, userType: this.loggedInUser.usertype, limit: "3"};
    this.http.post<any>("getUsersFromIdUpwards", { body: httpPostData}).subscribe((result) => {
      
      this.users = result;
      console.log("getNewUsersForMatching result:");
      console.log(this.users);
      if(this.users.length > 0){
        this.currentUser = this.users[0]; 
        console.log("currentUser from profiles" + this.currentUser)
        console.log(this.currentUser)
        this.userID = this.users[this.users.length-1].userid;
        console.log("profilePicture: " + this.currentUser.profilepic)
      }
      
    }); 
    
  }


  ngOnDestroy() {
    this.parentSubject.unsubscribe();
  }


}
