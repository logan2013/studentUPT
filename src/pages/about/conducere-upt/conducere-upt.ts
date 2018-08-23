import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  templateUrl: 'conducere-upt.html',
})
export class ConducereUpt {
  public descriereConducere: string;
  public functie: any = [];
  public nume: any = [];
  public image: any = [];
  public resort: any = [];
  public adresa: any = [];
  public telfax: any = [];
  public email: any = [];
  public show: any = [false, false, false, false, false, false, false];
  public all: Array<{ functie: any, nume: any, image: any, resort: any, adresa: any, telfax: any, email: any, show: any }>;
  public imageError: any[] = [];
  constructor(private http: Http) { }

  ionViewWillEnter() {
    this.http.get('http://193.226.9.153/conducereUPT.php').map(res => res.json())
      .subscribe((data) => {
        this.descriereConducere = data.descriereConducere;
        this.functie = data.functie;
        this.nume = data.nume;
        this.image = data.image;
        this.imageError = data.imageError;
        this.resort = data.resort;
        this.adresa = data.adresa;
        this.email = data.email;
        this.all = [];
        for (let i: number = 0; i < this.nume.length; i++) {
          this.all.push({
            functie: this.functie[i],
            nume: this.nume[i],
            image: this.image[i],
            resort: this.resort[i],
            adresa: this.adresa[i],
            telfax: this.telfax[i],
            email: this.email[i],
            show: this.show[i]
          })
        }
      });
  }

  toggle(nume) {
    for (let i: number = 0; i < this.nume.length; i++) {
      if (this.all[i].nume == nume) {
        this.all[i].show = !this.all[i].show;
      }
    }
  }

  errorHandler(event, i) {
    event.target.src = 'http://193.226.9.153/images/' + this.imageError[i];
  }

}
