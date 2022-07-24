import { Component, OnInit, Input } from '@angular/core';
import { trigger, keyframes, animate, transition } from "@angular/animations";
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  //loggedInUser: any;

  @Input() currentUser!: any;
  @Input()
  parentSubject!: Subject<any>;

  constructor(private http: HttpClient, private router: Router) {}
  
  ngOnInit(): void {

    //this.loggedInUser = localStorage.getItem('loggedInUser');
    //this.loggedInUser = JSON.parse(this.loggedInUser);
  }

}