import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';


@IonicPage()
@Component({
  selector: 'page-note',
  templateUrl: 'note.html',
})
export class NotePage {
  pet: string = 'note';
  public userSet: any = [];
  public userKeyAndVal: Array<{ key: any, value: any, materie: { Forma_ev: any, Ore_curs: any, Ore_laborator: any, Ore_proiect: any, Total_ore: any } }> = [];
  public userKey: any = ["Materia", "Forma_ev", "Ore curs", "Ore laborator", "Ore proiect", "Total ore"];
  public userKeyAndValNote: Array<{
    key: any,
    value: any,
    Semestrul: any,
    materie: {
      Materia: any,
      Forma_ev: any,
      Credite: any,
      Prog1: any,
      Prog2: any,
      Prog3: any,
      NP: any,
      NF: any,
      Taxa: any,
      Semestru: any,
      An: any
    }
    // ,
    // Sem: Array<{
    //   key: any,
    //   value: any,
    //   Semestrul: any,
    //   materie: {
    //     Materia: any,
    //     Forma_ev: any,
    //     Credite: any,
    //     Prog1: any,
    //     Prog2: any,
    //     Prog3: any,
    //     NP: any,
    //     NF: any,
    //     Taxa: any,
    //     Semestru: any,
    //     An: any
    //   }
    // }>
  }> = [];


  public userKeyNote: any = [
    "Materia",
    "Forma_ev",
    "Credite",
    "Prog1",
    "Prog2",
    "Prog3",
    "NP",
    "NF",
    "Taxa",
    "Semestru",
    "An"
  ];

  //, "Setul"];
  //
  public totalCredite: any;
  public totalPlata: any;
  public an: any;
  public sem: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private document: DocumentViewer) {

    try {

      this.userSet = localStorage.getItem("dataUser");
      var usrData = JSON.parse(this.userSet);
      this.totalCredite = Math.round(usrData["Total credite"]) || 0;
      this.totalPlata = Math.round(usrData["Total de plata"]);
      this.an = usrData["An_studiu"]
      // this.userKey = Object.keys(usrData);
      for (let j = 0; j < 70; j++) {

        if (this.userKey[0] + "[" + j + "]" &&
          usrData[this.userKey[0] + "[" + j + "]"] != undefined &&
          this.userKey[1] + "[" + j + "]" &&
          usrData[this.userKey[1] + "[" + j + "]"] != undefined
        ) {

          this.userKeyAndVal.push({
            key: this.userKey[0],
            value: usrData[this.userKey[0] + "[" + j + "]"],
            materie: {
              Forma_ev: usrData[this.userKey[1] + "[" + j + "]"],
              Ore_curs: usrData[this.userKey[2] + "[" + j + "]"].substring(0, 2),
              Ore_laborator: usrData[this.userKey[3] + "[" + j + "]"].substring(0, 2),
              Ore_proiect: usrData[this.userKey[4] + "[" + j + "]"].substring(0, 2),
              Total_ore: usrData[this.userKey[5] + "[" + j + "]"].substring(0, 2)
            }
          })
        }

        if (this.userKeyNote[0] + "[" + j + "]" &&
          usrData[this.userKeyNote[0] + "[" + j + "]"] != undefined
        ) {

          this.userKeyAndValNote.push({
            key: this.userKeyNote[0],
            value: usrData[this.userKeyNote[0] + "[" + j + "]"],
            Semestrul: usrData[this.userKeyNote[9] + "[" + j + "]"],
            materie: {
              Materia: usrData[this.userKeyNote[0] + "[" + j + "]"],
              Forma_ev: usrData[this.userKeyNote[1] + "[" + j + "]"],
              Credite: usrData[this.userKeyNote[2] + "[" + j + "]"],
              Prog1: usrData[this.userKeyNote[3] + "[" + j + "]"],
              Prog2: usrData[this.userKeyNote[4] + "[" + j + "]"],
              Prog3: usrData[this.userKeyNote[5] + "[" + j + "]"],
              NP: usrData[this.userKeyNote[6] + "[" + j + "]"],
              NF: usrData[this.userKeyNote[7] + "[" + j + "]"],
              Taxa: usrData[this.userKeyNote[8] + "[" + j + "]"],
              Semestru: usrData[this.userKeyNote[9] + "[" + j + "]"],
              An: usrData[this.userKeyNote[10] + "[" + j + "]"],
            }
          })
        }

      }

      this.userKeyAndValNote.sort(this.sortNote)
      var count_1 = 0;
      var count_2 = 0;
      var count_3 = 0;
      var count_4 = 0;
      var count_5 = 0;
      var count_6 = 0;
      var count_7 = 0;
      var count_8 = 0;
      for (var i = 0; i < this.userKeyAndValNote.length; i++) {
        if (1 == this.userKeyAndValNote[i].Semestrul) {
          count_1++;
        }
        if (2 == this.userKeyAndValNote[i].Semestrul) {
          count_2++;
        }
        if (3 == this.userKeyAndValNote[i].Semestrul) {
          count_3++;
        }
        if (4 == this.userKeyAndValNote[i].Semestrul) {
          count_4++;
        }
        if (5 == this.userKeyAndValNote[i].Semestrul) {
          count_5++;
        }
        if (6 == this.userKeyAndValNote[i].Semestrul) {
          count_6++;
        }
        if (7 == this.userKeyAndValNote[i].Semestrul) {
          count_7++;
        }
        if (8 == this.userKeyAndValNote[i].Semestrul) {
          count_8++;
        }
      }
      if (count_1 != 0) {
        this.sem.push(1);
      }
      if (count_2 != 0) {
        this.sem.push(2);
      }
      if (count_3 != 0) {
        this.sem.push(3);
      }
      if (count_4 != 0) {
        this.sem.push(4);
      }
      if (count_5 != 0) {
        this.sem.push(5);
      }
      if (count_6 != 0) {
        this.sem.push(6);
      }
      if (count_7 != 0) {
        this.sem.push(7);
      }
      if (count_8 != 0) {
        this.sem.push(8);
      }
    }
    catch (e) {
      console.log(e.message)
    }
  }

  public sortNote(a: any, b: any) {
    if (a.Semestrul < b.Semestrul) {
      return -1;
    } else if (a.Semestrul > b.Semestrul) {
      return 1;
    } else {
      return 0;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotePage');
  }

}
