import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { MatSliderChange } from '@angular/material/slider';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { NativeDateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { resetFakeAsyncZone } from '@angular/core/testing';

@Component({
  selector: 'app-settings-editing',
  templateUrl: './settings-editing.component.html',
  styleUrls: ['./settings-editing.component.css']
})
export class SettingsEditingComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, public datepipe: DatePipe) { }


  ngOnInit(): void {
    this.getUser();
  }

  //Kontroll Variablen
    //Account
    CtrlUsername: any;
    CtrlEmail: any;

    //Profil
      //Person
      CtrlNachname: any;
      CtrlVorname: any;
      CtrlGeschlecht: any;
      CtrlGeburtsdatum: any;//Date= new Date();
      CtrlJob: any;
      CtrlHobby: any;
      CtrlSuchePostleitzahl: any;
      CtrlSucheStadt: any;
      CtrlSucheLand: any;
      //WG
      CtrlWGName: any;
      CtrlPostleitzahl: any;
      CtrlStadt: any;
      CtrlLand: any;
      CtrlFreieSlots: any;
      CtrlSlotsGesamt: any;
      CtrlPreis: any;
      //beide
      CtrlRaucher: boolean = false;
      CtrlLautstaerke: any;
      CtrlSauberkeit: any;
      CtrlKochen: any;
      CtrlProfilbild: any;
      CtrlAktuellSuchend: boolean = false;

  //Form Variablen
  showForm: any = "account";
  userMessage: any;
  emailMessage: any;
  passwortMessage: any;
  matchingSubmitbtn: boolean = true;
  disableAccountbtn: boolean = true;
  disableProfilbtn: boolean = false;
  disableMatchingbtn: boolean = false;
  changeDoneMessage: any;

  //Account
  Username: any;
  Email: any;
  PasswortAlt: any;
  PasswortNeu: any;
  PasswortBest: any;
  PasswortError: any;
  PasswortAendernbtn: boolean = false;

  //Profil
    //Person
  Nachname: any;
  Vorname: any;
  Geschlecht: any;
  Geburtsdatum: any;//= new Date();
  Job: any;
  Hobby: any;
  SuchePostleitzahl: any;
  SucheStadt: any;
  SucheLand: any;
    //WG
  WGName: any;
  Postleitzahl: any;
  Stadt: any;
  Land: any;
  FreieSlots: any;
  SlotsGesamt: any;
  Preis: any;
    //beide
  Raucher: boolean = false;
  Lautstaerke: any;
  Sauberkeit: any;
  Kochen: any;
  Profilbild: any;
  AktuellSuchend: boolean = false;

  kindOfUser: any;

  //Laden der Userdaten
  getUser(){
    console.log("Getting Userdatas01");
    var sendData = {
      flag: "getKindOfUser"
    }

    var config = {
      params: sendData
    };

    //Anfragen welcher Usertyp der Benutzer ist (WG oder Person)
    this.http.get("settings", config).subscribe(result => {
      var jas = JSON.parse(JSON.stringify(result))[0];
      this.kindOfUser = jas.usertype;
      this.loadUserData();
    },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/login']);
          }
        }
      });
  }
  //Anfragen der Userdaten entsprechend des Usertyps
  loadUserData() {
    console.log("start load user data");
    var usertype: string = this.kindOfUser;
    var sendData = {
      flag: "getUserData",
      kindOfUser: usertype
    }

    var config = {
      params: sendData
    };

    console.log("anfrage wird gesendet0");
    //Userdaten anfragen
    this.http.get("settings", config).subscribe(result => {
      //Daten von User in passendes Format umwandeln und in Variablen speichern
    console.log("anfrage gesendet");
      
      let resultArray: any;
      resultArray = result;
      var userData = resultArray[0];//JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(result))[0]))[0];

      console.log("Getting Userdata");
      console.log(userData);
      this.Username = this.CtrlUsername = userData.username;
      this.Email = this.CtrlEmail = userData.email;
      this.Raucher = this.CtrlRaucher = userData.smoker;
      this.Lautstaerke = this.CtrlLautstaerke = userData.volume;
      this.Sauberkeit = this.CtrlSauberkeit = userData.tidiness;
      this.Kochen = this.CtrlKochen = userData.cook;
      this.AktuellSuchend = this.CtrlAktuellSuchend = userData.searching;
      this.Profilbild = this.CtrlProfilbild = userData.profilepic;

      console.log("this.kindOfUser: "+this.kindOfUser);
      console.log("search city: "+userData.searchcity);
      console.log("search land: "+userData.searchcountry);
      console.log("search plz: "+userData.searchpostcode);

      if(this.kindOfUser=="person"){
        //Daten von Person in passendes Format umwandeln und in Variablen speichern
      //var personData = JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(result))[1]))[0];
      console.log("Getting Persondata");
      //console.log(personData);
      this.Vorname = this.CtrlVorname = userData.firstname;
      this.Nachname = this.CtrlNachname = userData.surname;
      this.Geschlecht = this.CtrlGeschlecht = userData.gender;
      this.Geburtsdatum = this.CtrlGeburtsdatum = userData.birthdate;
      this.Geburtsdatum = this.CtrlGeburtsdatum = this.datepipe.transform(this.Geburtsdatum, 'yyyy-MM-dd');
      this.Job = this.CtrlJob = userData.job;
      this.Hobby = this.CtrlHobby = userData.hobby;
      this.SuchePostleitzahl = this.CtrlSuchePostleitzahl = userData.searchpostcode;
      this.SucheStadt = this.CtrlSucheStadt = userData.searchcity;
      this.SucheLand = this.CtrlSucheLand = userData.searchcountry;
      }
      else if(this.kindOfUser=="wg"){
        //Daten von WG in passendes Format umwandeln und in Variablen speichern
      //var wgData = JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(result))[1]))[0];
      console.log("Getting WGdata");
      //console.log(wgData);
      this.WGName = this.CtrlWGName = userData.wgname;
      this.Postleitzahl = this.CtrlPostleitzahl = userData.postcode;
      this.Stadt = this.CtrlStadt = userData.city;
      this.Land = this.CtrlLand = userData.country;
      this.FreieSlots = this.CtrlFreieSlots = userData.spotfree;
      this.SlotsGesamt = this.CtrlSlotsGesamt = userData.spotstotal;
      this.Preis = this.CtrlPreis = userData.price;
      }
      else{
        console.log("Fehler beim Laden. \nDer Benutzertyp konnte nicht korrekt zugeordnet werden. \nKontaktieren Sie einen Administrator.");
      }
      
    },
      err => {
        console.log("Error");
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/login']);
          }
        }
      });
  }




  accountbtn(){
    this.showForm = "account";
    this.disableAccountbtn = true;
    this.disableProfilbtn = false;
    this.disableMatchingbtn = false;
    this.changeDoneMessage = "";
  }
  profilbtn(){
    this.showForm = "profil";
    this.disableAccountbtn = false;
    this.disableProfilbtn = true;
    this.disableMatchingbtn = false;
    this.changeDoneMessage = "";
  }
  matchingbtn(){
    this.showForm = "matching";
    this.disableAccountbtn = false;
    this.disableProfilbtn = false;
    this.disableMatchingbtn = true;
    this.matchingSubmitbtn = true;
    this.Raucher = this.CtrlRaucher;
    this.AktuellSuchend = this.CtrlAktuellSuchend;
    this.changeDoneMessage = "";
  }
  passwortbtn(){
    this.PasswortAendernbtn = !this.PasswortAendernbtn;
    this.changeDoneMessage = "";
  }
  
  //_____________________________________________Formular Accountdaten__________________________________________________________________________________________
  sendUserForm(data: any) {
    var sendData;
    var config;
    //Check Email
    if(this.CtrlEmail != data.Email){
      sendData = {
        flag: "checkMail",
        Email: data.Email
      }
      config = {
        params: sendData
      };
      //Get abfrage, ob Username und Email vorhanden sind
      this.http.get("settings", config).subscribe(result => {
        console.log("result");
        console.log(result);
        //Wenn Email frei -> Eintragen der Daten in die Datenbank
        if (result == "emailAllowed") {
          console.log("Email Allowed");
          sendData = {
            flag: "changeMail",
            Email: data.Email
          };
          config = {
            params: sendData
          };
          this.http.get("settings", config).subscribe(result => {
          console.log("Mail Eintragen Ergebnis: "+result);
          });
          this.getUser();
          this.emailMessage = "Email geändert.";
        }
        else {
          this.emailMessage = "Email bereits vergeben.";
          
          console.log("Email Vergeben");
        }
        return;
      });
    }

    //Check Username
    if(this.CtrlUsername != data.Username){
      sendData = {
        flag: "checkUsername",
        Username: data.Username
      }
      config = {
        params: sendData
      };
      //Get abfrage, ob Username und Email vorhanden sind
      this.http.get("settings", config).subscribe(result => {
        console.log("result");
        console.log(result);
        //Wenn Email frei -> Eintragen der Daten in die Datenbank
        if (result == "usernameAllowed") {
          console.log("Username Allowed");
          sendData = {
            flag: "changeUsername",
            Username: data.Username
          };
          config = {
            params: sendData
          };
          this.http.get("settings", config).subscribe(result => {
            console.log("Username Eintragen Ergebnis: "+result);
            });
            this.getUser();
            this.userMessage = "Username geändert.";
        }
        else {
          this.userMessage = "Username bereits vergeben.";
          
          console.log("Username Vergeben");
        }
        return;
      });
    }

  }

  sendPassword(data: any) {
    var sendData;
    var config;
    

    console.log("sending password");
    console.log(data.PasswortAlt);
    //Abfrage ob Passwörter im Formular übereinstimmen
    if (data.PasswortNeu != data.PasswortBest) {
      this.PasswortError = "Passwörter stimmen nicht überein.";
      return;
    }
    else {
      this.PasswortError = "";
    }

    //Check Passwort
    sendData = {
      flag: "checkPassword",
      passwort: data.PasswortAlt
    }
    config = {
      params: sendData
    };
    //Get abfrage, ob Username und Email vorhanden sind
    this.http.get("settings", config).subscribe(result => {
      console.log("result");
      console.log(result);
      //Wenn Passwort richtig -> Änderung in Datenbank
      if (result == "passwordCorrect") {
        console.log("passwordCorrect");
        sendData = {
          flag: "changePasswort",
          Passwort: data.PasswortNeu
        };
        config = {
          params: sendData
        };
        this.http.get("settings", config).subscribe(result => {
          console.log("Passwort Geändert Ergebnis: "+result);
          });
          this.getUser();
          this.PasswortError="";
          this.changeDoneMessage = "Passwort geändert"
      }
      else {
        this.passwortMessage = "Passwort ist nicht korrekt.";
        
        console.log("Passwort falsch");
      }
      return;
    });
  }


  //_____________________________________________Formular Profildaten__________________________________________________________________________________________
  sendProfil(data: any){
    //Senden der Profildaten an die Datenbank
    var sendData;
    var config;
    sendData = {
      flag: "changeProfile",
      kindOfUser: this.kindOfUser
    };
    if(this.Nachname!=this.CtrlNachname){
      sendData = Object.assign(sendData, {Nachname: this.Nachname});
    }
    if(this.Vorname!=this.CtrlVorname){
      sendData = Object.assign(sendData, {Vorname: this.Vorname});
    }
    if(this.Geschlecht!=this.CtrlGeschlecht){
      sendData = Object.assign(sendData, {Geschlecht: this.Geschlecht});
    }
    if(this.Geburtsdatum!=this.CtrlGeburtsdatum){
      sendData = Object.assign(sendData, {Geburtsdatum: this.Geburtsdatum});
    }
    if(this.Job!=this.CtrlJob){
      sendData = Object.assign(sendData, {Job: this.Job});
    }
    if(this.Hobby!=this.CtrlHobby){
      sendData = Object.assign(sendData, {Hobby: this.Hobby});
    }
    if(this.WGName!=this.CtrlWGName){
      sendData = Object.assign(sendData, {WGName: this.WGName});
    }
    if(this.Postleitzahl!=this.CtrlPostleitzahl){
      sendData = Object.assign(sendData, {Postleitzahl: this.Postleitzahl});
    }
    if(this.Stadt!=this.CtrlStadt){
      sendData = Object.assign(sendData, {Stadt: this.Stadt});
    }
    if(this.Land!=this.CtrlLand){
      sendData = Object.assign(sendData, {Land: this.Land});
    }
    if(this.FreieSlots!=this.CtrlFreieSlots){
      sendData = Object.assign(sendData, {FreieSlots: this.FreieSlots});
    }
    if(this.SlotsGesamt!=this.CtrlSlotsGesamt){
      sendData = Object.assign(sendData, {SlotsGesamt: this.SlotsGesamt});
    }
    if(this.Preis!=this.CtrlPreis){
      sendData = Object.assign(sendData, {Preis: this.Preis});
    }
    config = {
      params: sendData
    };
    console.log("SendData:");
    console.log(sendData);
    this.http.get("settings", config).subscribe(result => {
      console.log("Ergebnis: "+result);
      });
      this.getUser();
      this.changeDoneMessage = "Änderungen gespeichert"
  } 


  //_____________________________________________Formular Matchingdaten__________________________________________________________________________________________
  changeRaucherCheck(value: boolean) {
    this.matchingSubmitbtn = false;
  }
  changeSuchendCheck(value: boolean) {
    this.matchingSubmitbtn = false;
  }
  activateSubmitButton(event: MatSliderChange){
    this.matchingSubmitbtn = false;
    console.log("change");
  }
  activateSubmitButtonCheckbox(event: MatCheckboxChange){
    this.matchingSubmitbtn = false;
    console.log("changeee");
  }
  sendMatching(data: any){}

  //Senden der Matchingdaten an die Datenbank
  submitMatchingbtn(){
    var sendData;
    var config;
    sendData = {
      flag: "changeMatching",
      kindOfUser: this.kindOfUser
    };
    if(this.Raucher!=this.CtrlRaucher){
      sendData = Object.assign(sendData, {Raucher: this.Raucher});
    }
    if(this.Lautstaerke!==this.CtrlLautstaerke){
      sendData = Object.assign(sendData, {Lautstaerke: this.Lautstaerke});
    }
    if(this.Sauberkeit!=this.CtrlSauberkeit){
      sendData = Object.assign(sendData, {Sauberkeit: this.Sauberkeit});
    }
    if(this.Kochen!=this.CtrlKochen){
      sendData = Object.assign(sendData, {Kochen: this.Kochen});
    }
    if(this.AktuellSuchend!=this.CtrlAktuellSuchend){
      sendData = Object.assign(sendData, {AktuellSuchend: this.AktuellSuchend});
    }
    if(this.SuchePostleitzahl!=this.CtrlSuchePostleitzahl){
      sendData = Object.assign(sendData, {SuchePostleitzahl: this.SuchePostleitzahl});
    }
    if(this.SucheStadt!=this.CtrlSucheStadt){
      sendData = Object.assign(sendData, {SucheStadt: this.SucheStadt});
    }
    if(this.SucheLand!=this.CtrlSucheLand){
      sendData = Object.assign(sendData, {SucheLand: this.SucheLand});
    }
    config = {
      params: sendData
    };
    console.log("SendData:");
    console.log(sendData);
    this.http.get("settings", config).subscribe(result => {
      console.log("Ergebnis: "+result);
      });
      this.getUser();
      this.changeDoneMessage = "Änderungen gespeichert"
  }


  
}




