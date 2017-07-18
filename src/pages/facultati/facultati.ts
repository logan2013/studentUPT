import { AnimationStyleMetadata, Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, ModalController, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Auth } from '../../providers/auth';
import { Http } from '@angular/http';
import { OneSignal } from '@ionic-native/onesignal';
import { DataTabs } from '../../providers/datatabs';

@IonicPage()
@Component({
  selector: 'page-facultati',
  templateUrl: 'facultati.html',
})

export class Facultati {
  public selectedItem: any;
  public posts: any;
  public postss: any;
  public id: any;
  public icons: string[];
  public faculties: string[];
  public user: string;
  public danger: string = "danger";
  public favorite: string = "Follow";
  public info: any = [];
  private notes: any[];
  public series: any[];
  public descriereAC: any;
  public conducereAC: Array<{ functie: string, nume: string, telefon: string, email: string, image: string, show: any }> = [];
  public orarAC: Array<{ orarFacultate: any, orarAdmitere: any, eventSource: any }> = [];
  public descriereEE: any;
  public conducereEE: Array<{ functie: any, nume: any, telefon: any, email: any, image: any, show: any }> = [];
  public orarEE: Array<{ orarFacultate: any, orarAdmitere: any, eventSource: any }> = []
  public descriereOSTL: any;
  public conducereOSTL: Array<{ functie: any, nume: any, telefon: any, email: any, image: any, show: any }> = [];
  public orarOSTL: Array<{ orarFacultate: any, orarAdmitere: any, eventSource: any }> = [];
  public descriereMPT: any;
  public conducereMPT: Array<{ functie: any, nume: any, telefon: any, email: any, image: any, show: any }> = [];
  public orarMPT: Array<{ orarFacultate: any, orarAdmitere: any, eventSource: any }> = [];
  public descriereMT: any;
  public conducereMT: Array<{ functie: any, nume: any, telefon: any, email: any, image: any, show: any }> = [];
  public orarMT: Array<{ orarFacultate: any, orarAdmitere: any, eventSource: any }> = []
  public descriereETC: any;
  public conducereETC: Array<{ functie: any, nume: any, telefon: any, email: any, image: any, show: any }> = [];
  public orarETC: Array<{ orarFacultate: any, orarAdmitere: any, eventSource: any }> = [];
  public descriereA4: any;
  public conducereA4: Array<{ functie: any, nume: any, telefon: any, email: any, image: any, show: any }> = [];
  public orarA4: Array<{ orarFacultate: any, orarAdmitere: any, eventSource: any }> = [];
  public descriereCT: any;
  public conducereCT: Array<{ functie: any, nume: any, telefon: any, email: any, image: any, show: any }> = [];
  public orarCT: Array<{ orarFacultate: any, orarAdmitere: any, eventSource: any }> = [];
  public descriereFSC: any;
  public conducereFSC: Array<{ functie: any, nume: any, telefon: any, email: any, image: any, show: any }> = [];
  public orarFSC: Array<{ orarFacultate: any, orarAdmitere: any, eventSource: any }> = [];
  public acupt: Array<{ descriere: any, conducere: any, orar: any }>;
  public eeupt: Array<{ descriere: any, conducere: any, orar: any }>;
  public ostl: Array<{ descriere: any, conducere: any, orar: any }>;
  public mptupt: Array<{ descriere: any, conducere: any, orar: any }>;
  public mtupt: Array<{ descriere: any, conducere: any, orar: any }>;
  public etcupt: Array<{ descriere: any, conducere: any, orar: any }>;
  public a4upt: Array<{ descriere: any, conducere: any, orar: any }>;
  public ctupt: Array<{ descriere: any, conducere: any, orar: any }>;
  public fscupt: Array<{ descriere: any, conducere: any, orar: any }>;
  public items: Array<{ title: string, note: string, iconActive: any, faculties: string, favorite: string, serie: string[], imagelink: any, short: any }> = [];
  public logos: Array<{ imagelink: any }> = [];
  constructor(
    public auth: Auth,
    public http: Http,
    public dataTabs: DataTabs,
    public oneSignal: OneSignal,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public navParams: NavParams) {
    this.dataTabs.setMessage('');
    this.dataTabs.setCoducere('');
    this.dataTabs.setDescriere('');
    this.dataTabs.setOrar('');
    this.dataTabs.setProiecte('')
    this.user = localStorage.getItem('user');
    this.auth.login().then((isLoggedIn) => {


      this.descriereAC = [
        `În anul 1966, Facultatea de Automatică și Calculatoare oferea țării prima promoție în 
        specialitatea „Calculatoare electronice”. De atunci și până astăzi, facultatea noastră 
        asigură pregătirea inginerilor în programele de studii Calculatoare şi Tehnologia Informaţiei,
         Ingineria Sistemelor şi Informatică. Studiile universitare 
        sunt organizate în paradigma „Bologna” și cuprind toate cele trei cicluri: licență, master,
         doctorat.
         Planurile de învățământ reprezintă rezultatul unei evoluții continue, menite să asigure excelența
         profesională și compatibilitatea cu mediul academic internațional. Exceptând activitățile de 
         învățământ, prioritățile Facultății de Automatică și Calculatoare sunt încurajarea cercetării 
         științifice și stabilirea de parteneriate cu mediul academic sau privat.`
        ,
        'ac/descriereac.jpg'
      ];

      this.conducereAC.push({
        functie: 'Decan',
        nume: 'Prof.dr.ing. Radu-Emil PRECUP',
        telefon: '0256 403 212 / 0256 403 229',
        email: 'radu.precup@upt.ro',
        image: 'ac/precup.jpg'
        , show: false
      });

      this.conducereAC.push({
        functie: 'Prodecan',
        nume: 'Conf.dr.ing. Lucian-Adrian PRODAN',
        telefon: '0256 403 213 / 0256 403 278 ',
        email: 'lprodan@cs.upt.ro  / lucian.prodan@upt.ro',
        image: 'ac/prodan.jpg'
        , show: false

      });

      this.conducereAC.push({
        functie: 'Prodecan',
        nume: 'Ș.l.dr.ing. Ciprian-Bogdan CHIRILĂ',
        telefon: '0256 403 217/ 0256 404 061',
        email: 'chirila@cs.upt.ro  / ciprian.chirila@upt.ro',
        image: 'ac/chirila.jpg'
        , show: false

      });

      this.orarAC.push({
        orarFacultate: ` <table border='2' align="center">
        <tr>
          <b>Orar secretariat etajul 5 SECRETARIAT DEPARTAMENT CALCULATOARE (Sala B512) </b>
        </tr><br>
        <tr>
          <b>PROGRAM DE LUCRU CU STUDENȚII</b>
        </tr>
        <tr>
        Luni - Joi : 10-13
        <tr>
        Vineri : 10-12
        </tr><hr>
        <tr>
          <b>Orar secretariat etajul 6 SECRETARIAT PENTRU INFO + IS  (Sala B615) </b>
        </tr><br>
        <tr>
           <b>PROGRAM DE LUCRU CU STUDENȚII </b>
        </tr>
        <tr>
        Luni - Joi : 10-13
        </tr>
        <tr>
        Vineri : 10-12
        </tr><hr>
        <tr>
           <b>Orar secretariat parter SECRETARIAT FACULTATEA DE AUTOMATICĂ ȘI CALCULATOARE </b>
        </tr>
        <br>
        <tr>       
           <b>PROGRAM DE LUCRU </b>
        </tr>
        <tr>                
        Luni - Joi : 13-15
        </tr>
        <tr>        
        Vineri : 11-13
        </tr><hr>
        <tr>
          <b>Orar secretariat DECANAT (Parter)</b>
        </tr><br>
        <tr>        
          <b>PROGRAM DE LUCRU CU STUDENȚII</b>
        </tr>
        <tr>        
        Luni - Joi : 13-15
        </tr>
        <tr>        
        Vineri : 11-13
        </tr>
        </table>
`,
        orarAdmitere: `   <table  width='100%'>
        <tr bgcolor="#2e2f92"><td>  <font color="white">17.07.2017-22.07.2017-Orar: 09:00-14:00</td> 			<td>  <font color="white">Înscrierea candidaților</td></tr>	
        <tr  background="blue"><td>  <font color="#2e2f92" >  <b>25.07.2017 ora 10:00	</td><td>	 <font color="#2e2f92" >  <b>			Proba de evaluare a cunoștințelor: MATEMATICĂ</td><tr>	
        <tr bgcolor="#2e2f92"> <td>  <font color="white">26.07.2017  ora 10:00				</td><td>	 <font color="white">Afișare rezultate: runda I</td></tr><br>	
        <tr> <td> <font color="#2e2f92" >  <b>26.07.2017 ora 10:00- 27.07.2017 ora 16:00	</td><td>			 <font color="#2e2f92" >  <b>	Confirmarea celor admiși: runda I</td></tr>
        <tr bgcolor="#2e2f92"> <td> <font color="white">28.07.2017 ora 10:00			</td><td>	 <font color="white">	Afișare rezultate: runda II</td></tr>
        <tr> <td> <font color="#2e2f92" >  <b>28.07.2017 ora 10:00-29.07.2017 ora 12:00		</td><td>	 <font color="#2e2f92" >  <b>		Confirmarea celor admiși: runda II</td></tr>
        <tr bgcolor="#2e2f92"><td>  <font color="white">29.07.2017 ora 16:00		</td><td>		 <font color="white">	Afișare rezultate: runda III</td></tr><br>	
        <tr><td> <font color="#2e2f92" >  <b>29.07.2017 ora 16:00-18:00	</td><td>		 <font color="#2e2f92" >  <b>		Confirmarea celor admiși: runda III</td></tr>
        <tr bgcolor="#2e2f92"><td> <font color="white">29.07.2017 ora 20:00			</td><td>	 <font color="white">	Rezultate finale</td></tr>
        </table>
`,
        eventSource: [
          { startTime: new Date(Date.UTC(2017, 6, 17, 6)), endTime: new Date(Date.UTC(2017, 6, 17, 11)), allDay: false, title: 'Insciere candidati, intre orele 09:00 si 14:00' },
          { startTime: new Date(Date.UTC(2017, 6, 18, 6)), endTime: new Date(Date.UTC(2017, 6, 18, 11)), allDay: false, title: 'Insciere candidati, intre orele 09:00 si 14:00' },
          { startTime: new Date(Date.UTC(2017, 6, 19, 6)), endTime: new Date(Date.UTC(2017, 6, 19, 11)), allDay: false, title: 'Insciere candidati, intre orele 09:00 si 14:00' },
          { startTime: new Date(Date.UTC(2017, 6, 20, 6)), endTime: new Date(Date.UTC(2017, 6, 20, 11)), allDay: false, title: 'Insciere candidati, intre orele 09:00 si 14:00' },
          { startTime: new Date(Date.UTC(2017, 6, 21, 6)), endTime: new Date(Date.UTC(2017, 6, 21, 11)), allDay: false, title: 'Insciere candidati, intre orele 09:00 si 14:00' },
          { startTime: new Date(Date.UTC(2017, 6, 22, 6)), endTime: new Date(Date.UTC(2017, 6, 22, 11)), allDay: false, title: 'Insciere candidati, intre orele 09:00 si 14:00' },
          { startTime: new Date(Date.UTC(2017, 6, 25, 7)), endTime: new Date(Date.UTC(2017, 6, 25, 10)), allDay: false, title: 'Proba de evaluare a cunoștințelor: MATEMATICĂ' },
          { startTime: new Date(Date.UTC(2017, 6, 26, 7)), endTime: new Date(Date.UTC(2017, 6, 26, 7)), allDay: false, title: 'Afișare rezultate: runda I  ' },
          { startTime: new Date(Date.UTC(2017, 6, 26, 7)), endTime: new Date(Date.UTC(2017, 6, 27, 13)), allDay: false, title: ' Confirmarea celor admiși: runda I ' },
          { startTime: new Date(Date.UTC(2017, 6, 28, 7)), endTime: new Date(Date.UTC(2017, 6, 28, 7)), allDay: false, title: `Afișare rezultate: runda II ` },
          { startTime: new Date(Date.UTC(2017, 6, 28, 7)), endTime: new Date(Date.UTC(2017, 6, 29, 9)), allDay: false, title: `Confirmarea celor admiși: runda II` },
          { startTime: new Date(Date.UTC(2017, 6, 29, 13)), endTime: new Date(Date.UTC(2017, 6, 29, 13)), allDay: false, title: `Afișare rezultate: runda III` },
          { startTime: new Date(Date.UTC(2017, 6, 29, 13)), endTime: new Date(Date.UTC(2017, 6, 29, 15)), allDay: false, title: `Confirmarea celor admiși: runda III` },
          { startTime: new Date(Date.UTC(2017, 6, 29, 17)), endTime: new Date(Date.UTC(2017, 6, 29, 17)), allDay: false, title: `Rezultate finale` }
        ]
      })
      this.descriereEE = [
        `  Începuturile învăţământului superior electrotehnic în Timişoara coincid cu începuturile Şcolii Politehnice – Timişoara. Data de 15 noiembrie 1920 este data înfiinţării Şcolii Politehnice la Timişoara, care şi-a început activitatea cu pregătirea inginerilor în specializările Electromecanică (Mecanică şi Electricitate) respectiv Mine şi Metalurgie.
  Universitatea a apreciat întotdeauna rolul important jucat de industrie în pregătirea studenților pentru piața muncii și a susținut continuu relații de colaborare cu mediul economic. Interesul pentru dezvoltarea unor competențe care să se plieze pe nevoile pieței muncii, a influențat dezvoltarea curriculară și s-a concretizat, printre altele, în angajarea unui număr mare de absolvenți în companii multinaționale de prestigiu.
`,
        'ee/descriereee.jpg'
      ];

      this.conducereEE.push({
        functie: 'Decan',
        nume: 'Prof.dr.ing. Sorin Muşuroi',
        telefon: '0256-403462',
        email: 'sorin.musuroi@upt.ro',
        image: 'ee/musuroi.jpg'
        , show: false

      });

      this.conducereEE.push({
        functie: 'Prodecan',
        nume: 'Prof.dr.ing. Doru Vătău',
        telefon: '0256-403415',
        email: 'doru.vatau@upt.ro',
        image: 'ee/vatau.jpg'
        , show: false

      });

      this.orarEE.push({
        orarAdmitere: `
        <table  width='100%'>
        <tr height="50px"  bgcolor="#2e2f92" >
          <td height="50px">
            <font color="white">
              Înscriere candidaţi:
            </font>
          </td>
          <td height="50px">
            <font color="white">
              17.07.2017 - 22.07.2017<br>
              24.07.2017 – 25.07.2017
            </font>
          </td>
        </tr>
        <tr height="50px">
          <td>
              <font color="#2e2f92">
                <b>Concurs de dosare:</b>
              </font>
          </td>
          <td>
              <font color="#2e2f92" >
                 <b> 25.07.2017</b>
              </font>
          </td>
        </tr height="50px">
        <tr bgcolor="#2e2f92">
          <td>
            <font color="white">
            Rezultatele concursului:
          </td>
          <td>
            <font color="white">
            26.07.2017, ora 10.00
          </td>
        </tr>
        <tr>
          <td>
            <font color="#2e2f92" >
              <b>
                Confirmări Runda I:
              </b>
             </font>
          </td>
          <td>
              <font color="#2e2f92" >
                <b>
                  26.07.2017, ora 10.00 <br> 27.07.2017, ora 16.00
                </b>
              </font>
          </td>
        </tr>
        <tr bgcolor="#2e2f92">
          <td>
              <font color="white">
                 Afişare Runda II:
              </font>
          </td>
          <td>
             <font color="white">
                 28.07.2017, ora 10.00
              </font>
          </td>
        </tr>
        <tr>
          <td>
              <font color="#2e2f92" >
                <b>
                 Confirmări Runda II:
               </b>
              </font>
          </td>
          <td>
             <font color="#2e2f92" >
                  <b>
                    28.07.2017, ora 10.00 <br> 29.07.2017, ora 12.00
                 </b>
              </font>
          </td>
        </tr>
        <tr bgcolor="#2e2f92">
          <td>
             <font color="white">
               Afişare Runda III:
               </font>
          </td>
          <td>
             <font color="white">
                 29.07.2017, ora 16.00
                </font>
          </td>
        </tr>
        <tr>
          <td>
           <font color="#2e2f92" >  <b>
                  Confirmări Runda III:
                  </b>
              </font>
          </td>
          <td>
            <font color="#2e2f92" >
                  <b>
                  29.07.2017, orele 16.00 - 18.00
                  </b>
              </font>
          </td>
        </tr>
        <tr  bgcolor="#2e2f92">
          <td>
           <font color="white">
              Rezultatele finale:
            </font>
          </td>
          <td>
             <font color="white">
              29.07.2017, ora 20.00  
              </font>
          </td>
        </tr>
        </table>
`,
        eventSource: [
          { startTime: new Date(Date.UTC(2017, 6, 17)), endTime: new Date(Date.UTC(2017, 6, 22)), allDay: false, title: 'Insciere candidati' },
          { startTime: new Date(Date.UTC(2017, 6, 24)), endTime: new Date(Date.UTC(2017, 6, 25)), allDay: false, title: 'Insciere candidati' },
          { startTime: new Date(Date.UTC(2017, 6, 25)), endTime: new Date(Date.UTC(2017, 6, 25)), allDay: false, title: 'Concurs de dosare' },
          { startTime: new Date(Date.UTC(2017, 6, 26, 7)), endTime: new Date(Date.UTC(2017, 6, 26, 7)), allDay: false, title: 'Rezultatele concursului' },
          { startTime: new Date(Date.UTC(2017, 6, 26, 7)), endTime: new Date(Date.UTC(2017, 6, 27, 13)), allDay: false, title: ' Confirmări Runda I' },
          { startTime: new Date(Date.UTC(2017, 6, 28, 7)), endTime: new Date(Date.UTC(2017, 6, 28, 7)), allDay: false, title: 'Afişare Runda II' },
          { startTime: new Date(Date.UTC(2017, 6, 28, 7)), endTime: new Date(Date.UTC(2017, 6, 29, 9)), allDay: false, title: ' Confirmări Runda II ' },
          { startTime: new Date(Date.UTC(2017, 6, 29, 13)), endTime: new Date(Date.UTC(2017, 6, 29, 13)), allDay: false, title: 'Afişare Runda III ' },
          { startTime: new Date(Date.UTC(2017, 6, 29, 13)), endTime: new Date(Date.UTC(2017, 6, 26, 15)), allDay: false, title: ' Confirmări Runda III' },
          { startTime: new Date(Date.UTC(2017, 6, 29, 17)), endTime: new Date(Date.UTC(2017, 6, 29, 17)), allDay: false, title: `Rezultate finale` }
        ],
        orarFacultate: `<table border='2' width = "100%" >
        <tr>
       <td> Orare</td> <td> Luni - Joi</td><td> Vineri</td>
        </tr>
        <tr>
        <td>Decanat </td><td>12:00 - 15:00 </td><td>11:00 - 13:00</td>
        </tr>
        <tr>
        <td>Secretariat Facultate</td> <td> 12:00 - 15:00 </td> <td>11:00 - 13:00</td>
        </tr>
        <tr>
        <td>Secretariat Dep. ET</td> <td> 12:00 - 15:00 </td> <td>11:00 - 13:00</td>
        </tr>
        <tr>
        <td>Secretariat Dep. EE</td><td> 12:00 - 15:00 </td> <td> 11:00 - 13:00</td>
        </tr>
        <tr>
        <td>Secretariat Dep. BFI</td> <td> 12:00 - 15:00</td> <td> 11:00 - 13:00</td>
        </tr>
        </table>`
      });


      this.descriereOSTL = [
        `Misiunea Facultății de Construcții este dezvoltarea învățământului universitar în domeniile inginerie civilă, ingineria instalațiilor și inginerie geodezică,
         precum și realizarea activităților de cercetare, proiectare, dezvoltare tehnologică și managerială la standardele cele mai ridicate. In cei peste 75 de ani de 
         existență, Facultatea de Construcții din Timisoara a fost întotdeauna deschisă colaborării cu mediul economic, social și academic, câștigându-și o imagine foarte 
         bună la nivel național și internațional, devenind un vector de dezvoltare în domeniu, un reper de profesionalism și exigență. Toate programele de studii sunt acreditate,
          în concordanță`,
        'ostl/descriereostl.jpg'
      ];

      this.conducereOSTL.push({
        functie: 'Decan',
        nume: 'Prof.dr.ing Raul ZAHARIA',
        telefon: '0256403922',
        email: 'raul.zaharia@upt.ro',
        image: 'ostl/zaharia.jpg'
        , show: false

      });

      this.conducereOSTL.push({
        functie: 'Prodecan',
        nume: 'Conf.dr.ing Sorin HERBAN ',
        telefon: '0256403984',
        email: 'sorin.herban@upt.ro',
        image: 'ostl/herban.jpg'
        , show: false

      });

      this.orarOSTL.push({
        orarAdmitere: `
            <table  width='100%'>
        <tr height="50px"  bgcolor="#2e2f92" >
          <td height="50px">
            <font color="white">
              Înscriere candidaţi:
            </font>
          </td>
          <td height="50px">
            <font color="white">
              17.07.2017 - 22.07.2017<br>
              24.07.2017 – 25.07.2017
            </font>
          </td>
        </tr>
        <tr height="50px">
          <td>
              <font color="#2e2f92">
                <b>Concurs de dosare:</b>
              </font>
          </td>
          <td>
              <font color="#2e2f92" >
                 <b> 25.07.2017</b>
              </font>
          </td>
        </tr height="50px">
        <tr bgcolor="#2e2f92">
          <td>
            <font color="white">
            Rezultatele concursului:
          </td>
          <td>
            <font color="white">
            26.07.2017, ora 10.00
          </td>
        </tr>
        <tr>
          <td>
            <font color="#2e2f92" >
              <b>
                Confirmări Runda I:
              </b>
             </font>
          </td>
          <td>
              <font color="#2e2f92" >
                <b>
                  26.07.2017, ora 10.00 <br> 27.07.2017, ora 16.00
                </b>
              </font>
          </td>
        </tr>
        <tr bgcolor="#2e2f92">
          <td>
              <font color="white">
                 Afişare Runda II:
              </font>
          </td>
          <td>
             <font color="white">
                 28.07.2017, ora 10.00
              </font>
          </td>
        </tr>
        <tr>
          <td>
              <font color="#2e2f92" >
                <b>
                 Confirmări Runda II:
               </b>
              </font>
          </td>
          <td>
             <font color="#2e2f92" >
                  <b>
                    28.07.2017, ora 10.00 <br> 29.07.2017, ora 12.00
                 </b>
              </font>
          </td>
        </tr>
        <tr bgcolor="#2e2f92">
          <td>
             <font color="white">
               Afişare Runda III:
               </font>
          </td>
          <td>
             <font color="white">
                 29.07.2017, ora 16.00
                </font>
          </td>
        </tr>
        <tr>
          <td>
           <font color="#2e2f92" >
                  <b>
                  Confirmări Runda III:
                  </b>
              </font>
          </td>
          <td>
            <font color="#2e2f92" >
                  <b>
                  29.07.2017, orele 16.00 - 18.00
                  </b>
              </font>
          </td>
        </tr>
        <tr  bgcolor="#2e2f92">
          <td>
           <font color="white">
              Rezultatele finale:
            </font>
          </td>
          <td>
             <font color="white">
              29.07.2017, ora 20.00  
              </font>
          </td>
        </tr>
        </table>`,
        eventSource: [
          { startTime: new Date(Date.UTC(2017, 6, 17)), endTime: new Date(Date.UTC(2017, 6, 22)), allDay: false, title: 'Insciere candidati' },
          { startTime: new Date(Date.UTC(2017, 6, 24)), endTime: new Date(Date.UTC(2017, 6, 25)), allDay: false, title: 'Insciere candidati' },
          { startTime: new Date(Date.UTC(2017, 6, 25)), endTime: new Date(Date.UTC(2017, 6, 25)), allDay: false, title: 'Concurs de dosare' },
          { startTime: new Date(Date.UTC(2017, 6, 26, 7)), endTime: new Date(Date.UTC(2017, 6, 26, 7)), allDay: false, title: 'Rezultatele concursului' },
          { startTime: new Date(Date.UTC(2017, 6, 26, 7)), endTime: new Date(Date.UTC(2017, 6, 27, 13)), allDay: false, title: ' Confirmări Runda I' },
          { startTime: new Date(Date.UTC(2017, 6, 28, 7)), endTime: new Date(Date.UTC(2017, 6, 28, 7)), allDay: false, title: 'Afişare Runda II' },
          { startTime: new Date(Date.UTC(2017, 6, 28, 7)), endTime: new Date(Date.UTC(2017, 6, 29, 9)), allDay: false, title: ' Confirmări Runda II ' },
          { startTime: new Date(Date.UTC(2017, 6, 29, 13)), endTime: new Date(Date.UTC(2017, 6, 29, 13)), allDay: false, title: 'Afişare Runda III ' },
          { startTime: new Date(Date.UTC(2017, 6, 29, 13)), endTime: new Date(Date.UTC(2017, 6, 26, 15)), allDay: false, title: ' Confirmări Runda III' },
          { startTime: new Date(Date.UTC(2017, 6, 29, 17)), endTime: new Date(Date.UTC(2017, 6, 29, 17)), allDay: false, title: `Rezultate finale` }
        ],
        orarFacultate: `
        <table border='2' width="100%">
        <tr><td>Luni - Joi</td><td>13:00 - 15:00</td></tr>
        <tr><td>Vineri</td><td>10:00 - 12:00</td></tr>
        </table>`
      });


      this.descriereMPT = [
        `Instruirea în Inginerie și Management se desfășoară la Facultatea de Management în Producție și Transporturi pe parcursul a 4 ani, iar după absolvire se poate accede la învățământ de master și școală doctorală. Licența dobândită acoperă o dublă specializare, atât în domeniul ingineresc, cât și managerial.
Instruirea din domeniul de studiu Științe Administrative durează 3 ani, iar absolvenții sunt specialiști pregătiți în domeniul administrației publice centrale și locale, dar și al cercetării științifice de profil.
Absolvenții facultății lucrează în întreprinderi de prestigiu cum ar fi: Continental, Hella, TRW, Nestle sau Coca-Cola sau și-au deschis întreprinderi proprii. 
`,
        'mpt/descrierempt.jpg'
      ];

      this.conducereMPT.push({
        functie: 'Decan',
        nume: 'Prof. ing. Dr. ec. Marian MOCAN',
        telefon: '0256 404284',
        email: ' marian.mocan@upt.ro',
        image: 'mpt/mocan.jpg'
        , show: false

      });

      this.conducereMPT.push({
        functie: 'Prodecan',
        nume: 'S.I. dr. ing. Ilie TĂUCEAN',
        telefon: '0256 404287',
        email: 'ilie.taucean@upt.ro  ',
        image: 'mpt/taucean.jpg'
        , show: false

      });

      this.orarMPT.push({
        orarAdmitere: `
          <table  width='100%'>
        <tr height="50px"  bgcolor="#2e2f92" >
          <td height="50px">
            <font color="white">
              Înscriere candidaţi:
            </font>
          </td>
          <td height="50px">
            <font color="white">
              17.07.2017 - 22.07.2017<br>
              24.07.2017 – 25.07.2017
            </font>
          </td>
        </tr>
        <tr height="50px">
          <td>
              <font color="#2e2f92">
                <b>Concurs de dosare:</b>
              </font>
          </td>
          <td>
              <font color="#2e2f92" >
                 <b> 25.07.2017</b>
              </font>
          </td>
        </tr height="50px">
        <tr bgcolor="#2e2f92">
          <td>
            <font color="white">
            Rezultatele concursului:
          </td>
          <td>
            <font color="white">
            26.07.2017, ora 10.00
          </td>
        </tr>
        <tr>
          <td>
            <font color="#2e2f92" >
              <b>
                Confirmări Runda I:
              </b>
             </font>
          </td>
          <td>
              <font color="#2e2f92" >
                <b>
                  26.07.2017, ora 10.00 <br> 27.07.2017, ora 16.00
                </b>
              </font>
          </td>
        </tr>
        <tr bgcolor="#2e2f92">
          <td>
              <font color="white">
                 Afişare Runda II:
              </font>
          </td>
          <td>
             <font color="white">
                 28.07.2017, ora 10.00
              </font>
          </td>
        </tr>
        <tr>
          <td>
              <font color="#2e2f92" >
                <b>
                 Confirmări Runda II:
               </b>
              </font>
          </td>
          <td>
             <font color="#2e2f92" >
                  <b>
                    28.07.2017, ora 10.00 <br> 29.07.2017, ora 12.00
                 </b>
              </font>
          </td>
        </tr>
        <tr bgcolor="#2e2f92">
          <td>
             <font color="white">
               Afişare Runda III:
               </font>
          </td>
          <td>
             <font color="white">
                 29.07.2017, ora 16.00
                </font>
          </td>
        </tr>
        <tr>
          <td>
           <font color="#2e2f92" >
                  <b>
                  Confirmări Runda III:
                  </b>
              </font>
          </td>
          <td>
            <font color="#2e2f92" >
                  <b>
                  29.07.2017, orele 16.00 - 18.00
                  </b>
              </font>
          </td>
        </tr>
        <tr  bgcolor="#2e2f92">
          <td>
           <font color="white">
              Rezultatele finale:
            </font>
          </td>
          <td>
             <font color="white">
              29.07.2017, ora 20.00  
              </font>
          </td>
        </tr>
        </table>`,
        eventSource: [
          { startTime: new Date(Date.UTC(2017, 6, 17)), endTime: new Date(Date.UTC(2017, 6, 22)), allDay: false, title: 'Insciere candidati' },
          { startTime: new Date(Date.UTC(2017, 6, 24)), endTime: new Date(Date.UTC(2017, 6, 25)), allDay: false, title: 'Insciere candidati' },
          { startTime: new Date(Date.UTC(2017, 6, 25)), endTime: new Date(Date.UTC(2017, 6, 25)), allDay: false, title: 'Concurs de dosare' },
          { startTime: new Date(Date.UTC(2017, 6, 26, 7)), endTime: new Date(Date.UTC(2017, 6, 26, 7)), allDay: false, title: 'Rezultatele concursului' },
          { startTime: new Date(Date.UTC(2017, 6, 26, 7)), endTime: new Date(Date.UTC(2017, 6, 27, 13)), allDay: false, title: ' Confirmări Runda I' },
          { startTime: new Date(Date.UTC(2017, 6, 28, 7)), endTime: new Date(Date.UTC(2017, 6, 28, 7)), allDay: false, title: 'Afişare Runda II' },
          { startTime: new Date(Date.UTC(2017, 6, 28, 7)), endTime: new Date(Date.UTC(2017, 6, 29, 9)), allDay: false, title: ' Confirmări Runda II ' },
          { startTime: new Date(Date.UTC(2017, 6, 29, 13)), endTime: new Date(Date.UTC(2017, 6, 29, 13)), allDay: false, title: 'Afişare Runda III ' },
          { startTime: new Date(Date.UTC(2017, 6, 29, 13)), endTime: new Date(Date.UTC(2017, 6, 26, 15)), allDay: false, title: ' Confirmări Runda III' },
          { startTime: new Date(Date.UTC(2017, 6, 29, 17)), endTime: new Date(Date.UTC(2017, 6, 29, 17)), allDay: false, title: `Rezultate finale` }
        ],
        orarFacultate: ``
      });

      this.descriereMT = [
        `Facultatea de Mecanică din Timișoara este cea mai mare dintre facultățile Universității Politehnica Timișoara. Ea oferă studenților formarea ca inginer mecanic, cu diverse specializări.
Aceasta dispune de următoarele departamente:
-Mecanică și Rezistența Materialelor
-Mecatronică și Robotică
-Ingineria Materialelor și Fabricației
-Mașini Mecanice, Utilaje și Transporturi
Actual oferă ciclurile de licență, masterat și doctorat. Activitatea de cercetare științifică se desfășoară atât la nivelul departamentelor și catedrelor, cât și în două centre de cercetare de tip baze de cercetare cu utilizatori multipli. Studenții dispun de facilități de cazare și masă, petrecerea timpului liber și sport.
`,
        'mt/descrieremt.jpg'
      ];

      this.conducereMT.push({
        functie: 'Decan',
        nume: 'Prof.Dr.Ing. Inocențiu MANIU',
        telefon: '+40-256-403522',
        email: 'inocentiu.maniu@upt.ro',
        image: 'mt/maniu.jpg'
        , show: false

      });

      this.conducereMT.push({
        functie: 'Prodecan',
        nume: 'Conf.Dr.Ing. Aurel TULCAN',
        telefon: '+40-256-403524',
        email: 'aurel.tulcan@upt.ro',
        image: 'mt/tulcan.jpg'
        , show: false

      });

      this.conducereMT.push({
        functie: 'Prodecan',
        nume: 'Conf.Dr.Ing. Eugen GHITA',
        telefon: '+40-256-403525',
        email: 'eugen.ghita@upt.ro',
        image: 'mt/ghita.jpg'
        , show: false

      });

      this.orarMT.push({
        orarAdmitere: `
          <table  width='100%'>
        <tr height="50px"  bgcolor="#2e2f92" >
          <td height="50px">
            <font color="white">
              Înscriere candidaţi:
            </font>
          </td>
          <td height="50px">
            <font color="white">
              17.07.2017 - 22.07.2017<br>
              24.07.2017 – 25.07.2017
            </font>
          </td>
        </tr>
        <tr height="50px">
          <td>
              <font color="#2e2f92">
                <b>Concurs de dosare:</b>
              </font>
          </td>
          <td>
              <font color="#2e2f92" >
                 <b> 25.07.2017</b>
              </font>
          </td>
        </tr height="50px">
        <tr bgcolor="#2e2f92">
          <td>
            <font color="white">
            Rezultatele concursului:
          </td>
          <td>
            <font color="white">
            26.07.2017, ora 10.00
          </td>
        </tr>
        <tr>
          <td>
            <font color="#2e2f92" >
              <b>
                Confirmări Runda I:
              </b>
             </font>
          </td>
          <td>
              <font color="#2e2f92" >
                <b>
                  26.07.2017, ora 10.00 <br> 27.07.2017, ora 16.00
                </b>
              </font>
          </td>
        </tr>
        <tr bgcolor="#2e2f92">
          <td>
              <font color="white">
                 Afişare Runda II:
              </font>
          </td>
          <td>
             <font color="white">
                 28.07.2017, ora 10.00
              </font>
          </td>
        </tr>
        <tr>
          <td>
              <font color="#2e2f92" >
                <b>
                 Confirmări Runda II:
               </b>
              </font>
          </td>
          <td>
             <font color="#2e2f92" >
                  <b>
                    28.07.2017, ora 10.00 <br> 29.07.2017, ora 12.00
                 </b>
              </font>
          </td>
        </tr>
        <tr bgcolor="#2e2f92">
          <td>
             <font color="white">
               Afişare Runda III:
               </font>
          </td>
          <td>
             <font color="white">
                 29.07.2017, ora 16.00
                </font>
          </td>
        </tr>
        <tr>
          <td>
           <font color="#2e2f92" >
                  <b>
                  Confirmări Runda III:
                  </b>
              </font>
          </td>
          <td>
            <font color="#2e2f92" >
                  <b>
                  29.07.2017, orele 16.00 - 18.00
                  </b>
              </font>
          </td>
        </tr>
        <tr  bgcolor="#2e2f92">
          <td>
           <font color="white">
              Rezultatele finale:
            </font>
          </td>
          <td>
             <font color="white">
              29.07.2017, ora 20.00  
              </font>
          </td>
        </tr>
        </table>`,
        eventSource: [
          { startTime: new Date(Date.UTC(2017, 6, 17)), endTime: new Date(Date.UTC(2017, 6, 22)), allDay: false, title: 'Insciere candidati' },
          { startTime: new Date(Date.UTC(2017, 6, 24)), endTime: new Date(Date.UTC(2017, 6, 25)), allDay: false, title: 'Insciere candidati' },
          { startTime: new Date(Date.UTC(2017, 6, 25)), endTime: new Date(Date.UTC(2017, 6, 25)), allDay: false, title: 'Concurs de dosare' },
          { startTime: new Date(Date.UTC(2017, 6, 26, 7)), endTime: new Date(Date.UTC(2017, 6, 26, 7)), allDay: false, title: 'Rezultatele concursului' },
          { startTime: new Date(Date.UTC(2017, 6, 26, 7)), endTime: new Date(Date.UTC(2017, 6, 27, 13)), allDay: false, title: ' Confirmări Runda I' },
          { startTime: new Date(Date.UTC(2017, 6, 28, 7)), endTime: new Date(Date.UTC(2017, 6, 28, 7)), allDay: false, title: 'Afişare Runda II' },
          { startTime: new Date(Date.UTC(2017, 6, 28, 7)), endTime: new Date(Date.UTC(2017, 6, 29, 9)), allDay: false, title: ' Confirmări Runda II ' },
          { startTime: new Date(Date.UTC(2017, 6, 29, 13)), endTime: new Date(Date.UTC(2017, 6, 29, 13)), allDay: false, title: 'Afişare Runda III ' },
          { startTime: new Date(Date.UTC(2017, 6, 29, 13)), endTime: new Date(Date.UTC(2017, 6, 26, 15)), allDay: false, title: ' Confirmări Runda III' },
          { startTime: new Date(Date.UTC(2017, 6, 29, 17)), endTime: new Date(Date.UTC(2017, 6, 29, 17)), allDay: false, title: `Rezultate finale` }
        ],
        orarFacultate: ''
      })
      this.descriereETC = [
        `Cum spune și denumirea Facultatea de Electronică, Telecomunicații și Tehnologii Informaționale, din cadrul Universității Politehnica Timișoara, are rolul de a forma ingineri în domeniul electronicii și al telecomunicațiilor. Există două domenii în care se împarte facultatea: ”Electronică aplicată” și ”Tehnologi și sisteme de telecomunicații ”, punându-se un mare accent asupra tehnologiilor informaționale.
Munca studenților este răsplatită prin condiții extraordinare de învățământ, iar prin extraordinare înțelegem aparatură modernă, profesori de cel mai înalt calibru și printr-o atmosferă academică de neegalat. De asemenea, studenții sunt încurajați prin acordarea de burse. Datorită faptului că este o facultate excelentă și de viitor, studenții acesteia sunt căutați de firme ca: Nokia, Continental Automotive, Kathrein, AEM, Flex, etc.  
	Prin electronică și telecomunicaţii ești la zi, ești integrat în Europa!
`,
        'etc/descriereetc.jpg'
      ];

      this.conducereETC.push({
        functie: 'Decan',
        nume: 'prof. univ. dr. ing. Florin Alexa ',
        email: 'florin.alexa@upt.ro',
        telefon: '',
        image: 'etc/alexa.jpg'
        , show: false

      });

      this.conducereETC.push({
        functie: 'Prodecan',
        nume: 'prof. univ. dr. ing. Cătălin Căleanu  ',
        email: 'catalin.caleanu@upt.ro',
        telefon: '',
        image: 'etc/caleanu.jpg'
        , show: false

      });

      this.conducereETC.push({
        functie: 'Prodecan',
        nume: 'prof. univ. dr. ing. Ivan Bogdanov ',
        email: 'ivan.bogdanov@upt.ro',
        telefon: '',
        image: 'etc/bogdanov.jpg'
        , show: false

      });

      this.orarETC.push({
        orarAdmitere: `   <table  width='100%'>
        <tr bgcolor="#2e2f92"><td>  <font color="white">17.07.2017-22.07.2017-Orar: 09:00-14:00</td> 			<td>  <font color="white">Înscrierea candidaților</td></tr>	
        <tr  background="blue"><td>  <font color="#2e2f92" >  <b>25.07.2017 ora 10:00	</td><td>	 <font color="#2e2f92" >  <b>			Proba de evaluare a cunoștințelor: MATEMATICĂ</td><tr>	
        <tr bgcolor="#2e2f92"> <td>  <font color="white">26.07.2017  ora 10:00				</td><td>	 <font color="white">Afișare rezultate: runda I</td></tr><br>	
        <tr> <td> <font color="#2e2f92" >  <b>26.07.2017 ora 10:00- 27.07.2017 ora 16:00	</td><td>			 <font color="#2e2f92" >  <b>	Confirmarea celor admiși: runda I</td></tr>
        <tr bgcolor="#2e2f92"> <td> <font color="white">28.07.2017 ora 10:00			</td><td>	 <font color="white">	Afișare rezultate: runda II</td></tr>
        <tr> <td> <font color="#2e2f92" >  <b>28.07.2017 ora 10:00-29.07.2017 ora 12:00		</td><td>	 <font color="#2e2f92" >  <b>		Confirmarea celor admiși: runda II</td></tr>
        <tr bgcolor="#2e2f92"><td>  <font color="white">29.07.2017 ora 16:00		</td><td>		 <font color="white">	Afișare rezultate: runda III</td></tr><br>	
        <tr><td> <font color="#2e2f92" >  <b>29.07.2017 ora 16:00-18:00	</td><td>		 <font color="#2e2f92" >  <b>		Confirmarea celor admiși: runda III</td></tr>
        <tr bgcolor="#2e2f92"><td> <font color="white">29.07.2017 ora 20:00			</td><td>	 <font color="white">	Rezultate finale</td></tr>
        </table>
`,
        eventSource: [
          { startTime: new Date(Date.UTC(2017, 6, 17, 6)), endTime: new Date(Date.UTC(2017, 6, 17, 11)), allDay: false, title: 'Insciere candidati, intre orele 09:00 si 14:00' },
          { startTime: new Date(Date.UTC(2017, 6, 18, 6)), endTime: new Date(Date.UTC(2017, 6, 18, 11)), allDay: false, title: 'Insciere candidati, intre orele 09:00 si 14:00' },
          { startTime: new Date(Date.UTC(2017, 6, 19, 6)), endTime: new Date(Date.UTC(2017, 6, 19, 11)), allDay: false, title: 'Insciere candidati, intre orele 09:00 si 14:00' },
          { startTime: new Date(Date.UTC(2017, 6, 20, 6)), endTime: new Date(Date.UTC(2017, 6, 20, 11)), allDay: false, title: 'Insciere candidati, intre orele 09:00 si 14:00' },
          { startTime: new Date(Date.UTC(2017, 6, 21, 6)), endTime: new Date(Date.UTC(2017, 6, 21, 11)), allDay: false, title: 'Insciere candidati, intre orele 09:00 si 14:00' },
          { startTime: new Date(Date.UTC(2017, 6, 22, 6)), endTime: new Date(Date.UTC(2017, 6, 22, 11)), allDay: false, title: 'Insciere candidati, intre orele 09:00 si 14:00' },
          { startTime: new Date(Date.UTC(2017, 6, 25, 7)), endTime: new Date(Date.UTC(2017, 6, 25, 10)), allDay: false, title: 'Proba de evaluare a cunoștințelor: MATEMATICĂ' },
          { startTime: new Date(Date.UTC(2017, 6, 26, 7)), endTime: new Date(Date.UTC(2017, 6, 26, 7)), allDay: false, title: 'Afișare rezultate: runda I  ' },
          { startTime: new Date(Date.UTC(2017, 6, 26, 7)), endTime: new Date(Date.UTC(2017, 6, 27, 13)), allDay: false, title: ' Confirmarea celor admiși: runda I ' },
          { startTime: new Date(Date.UTC(2017, 6, 28, 7)), endTime: new Date(Date.UTC(2017, 6, 28, 7)), allDay: false, title: `Afișare rezultate: runda II ` },
          { startTime: new Date(Date.UTC(2017, 6, 28, 7)), endTime: new Date(Date.UTC(2017, 6, 29, 9)), allDay: false, title: `Confirmarea celor admiși: runda II` },
          { startTime: new Date(Date.UTC(2017, 6, 29, 13)), endTime: new Date(Date.UTC(2017, 6, 29, 13)), allDay: false, title: `Afișare rezultate: runda III` },
          { startTime: new Date(Date.UTC(2017, 6, 29, 13)), endTime: new Date(Date.UTC(2017, 6, 29, 15)), allDay: false, title: `Confirmarea celor admiși: runda III` },
          { startTime: new Date(Date.UTC(2017, 6, 29, 17)), endTime: new Date(Date.UTC(2017, 6, 29, 17)), allDay: false, title: `Rezultate finale` }
        ],
        orarFacultate: `<table border='2' width="100%">
        <tr><td>Luni - Joi</td><td>10:00 - 12:00</td></tr>
        <tr><td>Vineri</td><td>10:00 - 11:00</td></tr>
        </table>`
      })

      this.descriereA4 = [
        `Facultatea de Arhitectură, cea mai tânără facultate a Universităţii Politehnica Timişoara, a cunoscut o continuă dezvoltare, atât ca număr de studenţi şi cadre didactice, cât și ca diversificare a ofertei educaţionale. Actualmente există două specializări: Arhitectură şi Mobilier şi Amenajări interioare. Durata studiilor este de 12 semestre/ 6 ani.

Participarea constantă, cu rezultate deosebite, a studenţilor şi absolvenţilor facultăţii noastre la concursuri de arhitectură naţionale şi internaţionale, la workshopuri şi manifestări ştiinţifice, confirmă calitatea învăţământului de arhitectură din Timişoara şi conferă acestuia o poziţie meritorie la nivel naţional. Planul de învățământ cuprinde discipline de pregătire generală, discipline de specialitate şi activităţi practice în domeniile tehnic şi artistic.
`,
        'a4/descrierea4.jpg'
      ];

      this.conducereA4.push({
        functie: 'Decan',
        nume: 'Decan: prof. dr. arh. Ioan Andreescu',
        telefon: '0256404022',
        email: 'oan.andreescu@upt.ro',
        image: 'a4/andreescu.jpg'
        , show: false

      });

      this.conducereA4.push({
        functie: 'Prodecan',
        nume: 'prof. dr. ing. Marius Moșoarcă',
        email: 'marius.mosoarca@upt.ro',
        telefon: '0256404560',
        image: 'a4/mosoarca.jpg'
        , show: false

      });

      this.conducereA4.push({
        functie: 'Director Departamament',
        nume: 'conf. dr. arh. Cătălina Bocan',
        telefon: '0256404019',
        email: 'catalina.bocan@upt.ro ',
        image: 'a4/bocan.jpg'
        , show: false

      });

      this.orarA4.push({
        orarAdmitere: `
        <table width='100%'>
        <tr bgcolor="#2e2f92">
        <td>
          <font color="white">
          Înscriere candidaţi
          </td><td>
            <font color="white">
          17.07.2017 - 22.07.2017
          </td></tr>
        <tr><td>
        <font color="#2e2f92" >
                  <b>
          Concurs de admitere
          Desen tehnic si liber
          </td><td>
          <font color="#2e2f92" >
                  <b>
          25.07.2017
          </td></tr>
        <tr bgcolor="#2e2f92"><td>
          <font color="white">
          Rezultatele concursului:	
          </td><td>
            <font color="white">
          26.07.2017, ora 10.00
          </td></tr>
        <tr><td>
        <font color="#2e2f92" >
                  <b>
          Confirmări 	Runda I:	
          </td><td>
          <font color="#2e2f92" >
                  <b>
          26.07.2017, ora 10.00 - 27.07.2017, ora 16.00
          </td></tr>
        <tr bgcolor="#2e2f92"><td>
          <font color="white">
          Afişare Runda II:
          </td><td>
            <font color="white">
          28.07.2017, ora 10.00
          </td></tr>
        <tr><td>
           <font color="#2e2f92" >
                  <b>
          Confirmări 	Runda II:	
          </td><td>
             <font color="#2e2f92" >
                  <b>
          28.07.2017, ora 10.00 - 29.07.2017, ora 12.00
          </td></tr>
        <tr bgcolor="#2e2f92"><td>
          <font color="white">
          Afişare Runda III:
          </td><td>
            <font color="white">
          29.07.2017, ora 16.00
          </td></tr>
        <tr><td>
           <font color="#2e2f92" >
                  <b>
          Confirmări 	Runda III:	
          </td><td>
             <font color="#2e2f92" >
                  <b>
          29.07.2017, orele 16.00 - 18.00
          </td></tr>
        <tr bgcolor="#2e2f92"><td>
          <font color="white">
          Rezultatele finale:
          </td><td>
            <font color="white">
          29.07.2017, ora 20.00
          </td></tr>
			</table>
`,
        eventSource: [
          { startTime: new Date(Date.UTC(2017, 6, 17, 6)), endTime: new Date(Date.UTC(2017, 6, 17, 11)), allDay: false, title: 'Insciere candidati, intre orele ' },
          { startTime: new Date(Date.UTC(2017, 6, 18, 6)), endTime: new Date(Date.UTC(2017, 6, 18, 11)), allDay: false, title: 'Insciere candidati, intre orele ' },
          { startTime: new Date(Date.UTC(2017, 6, 19, 6)), endTime: new Date(Date.UTC(2017, 6, 19, 11)), allDay: false, title: 'Insciere candidati, intre orele ' },
          { startTime: new Date(Date.UTC(2017, 6, 20, 6)), endTime: new Date(Date.UTC(2017, 6, 20, 11)), allDay: false, title: 'Insciere candidati, intre orele ' },
          { startTime: new Date(Date.UTC(2017, 6, 21, 6)), endTime: new Date(Date.UTC(2017, 6, 21, 11)), allDay: false, title: 'Insciere candidati, intre orele ' },
          { startTime: new Date(Date.UTC(2017, 6, 22, 6)), endTime: new Date(Date.UTC(2017, 6, 22, 11)), allDay: false, title: 'Insciere candidati, intre orele ' },
          { startTime: new Date(Date.UTC(2017, 6, 25, 7)), endTime: new Date(Date.UTC(2017, 6, 25, 10)), allDay: false, title: ' Concurs de admitereDesen tehnic si liber' },
          { startTime: new Date(Date.UTC(2017, 6, 26, 7)), endTime: new Date(Date.UTC(2017, 6, 26, 7)), allDay: false, title: 'Afișare rezultate: runda I  ' },
          { startTime: new Date(Date.UTC(2017, 6, 26, 7)), endTime: new Date(Date.UTC(2017, 6, 27, 13)), allDay: false, title: ' Confirmarea celor admiși: runda I ' },
          { startTime: new Date(Date.UTC(2017, 6, 28, 7)), endTime: new Date(Date.UTC(2017, 6, 28, 7)), allDay: false, title: `Afișare rezultate: runda II ` },
          { startTime: new Date(Date.UTC(2017, 6, 28, 7)), endTime: new Date(Date.UTC(2017, 6, 29, 9)), allDay: false, title: `Confirmarea celor admiși: runda II` },
          { startTime: new Date(Date.UTC(2017, 6, 29, 13)), endTime: new Date(Date.UTC(2017, 6, 29, 13)), allDay: false, title: `Afișare rezultate: runda III` },
          { startTime: new Date(Date.UTC(2017, 6, 29, 13)), endTime: new Date(Date.UTC(2017, 6, 29, 15)), allDay: false, title: `Confirmarea celor admiși: runda III` },
          { startTime: new Date(Date.UTC(2017, 6, 29, 17)), endTime: new Date(Date.UTC(2017, 6, 29, 17)), allDay: false, title: `Rezultate finale` }
        ],
        orarFacultate: `<table border="2" width="100%">
        <tr><td>Luni - Joi</td><td>12:00 - 14:00</td></tr>
        <tr><td>Vineri</td><td>10:00 - 12:00</td></tr>
        </table>`
      })

      this.descriereCT = [
        `Facultatea de Chimie Industrială a fost înființată, în cadrul Școlii Politehnice din Timișoara, în anul 1948.
  Începând cu anul 2005, Universitatea Politehnica Timișoara și implicit Facultatea de Chimie Industrială și Ingineria Mediului trec la organizarea învățământului superior pe trei cicluri: ciclul de licență, ciclul de master și ciclul de doctorat. Tot în această perioadă se realizează organizarea facultății pe două departamente: Chimie Aplicată și Ingineria Compușilor Anorganici și a Mediului (CAICAM) și Chimie Aplicată și Ingineria Compușilor Organici și Naturali (CAICON).
  Misiunea de bază a facultății o constituie dezvoltarea învățământului universitar în domeniile: inginerie chimică, ingineria mediului și ingineria produselor alimentare.
  `,
        'ct/descrierect.jpg'
      ];

      this.conducereCT.push({
        functie: 'Decan',
        nume: 'Prof. dr. ing. Nicolae  VASZILCSIN',
        email: 'nicolae.vaszilcsin@upt.ro',
        telefon: '0256-403061',
        image: ''
        , show: false

      });

      this.conducereCT.push({
        functie: 'Prodecan',
        nume: 'Conf. dr. ing. Gabriela-Alina DUMITREL',
        email: 'alina.dumitrel@upt.ro',
        telefon: '0256-403062',
        image: ''
        , show: false

      });

      this.orarCT.push({
        orarAdmitere: `
            <table  width = "100%">
              <tr bgcolor="#2e2f92">
                <td>
                 <font color="white">
                  Înscrieri si interviu:
                  </font>
                </td>
                <td>
                 <font color="white">
                  Confirmari:
                  </font>
                </td>
              </tr>
              <tr>
                <td>
                 <font color="#2e2f92" >
                    <b>
                    17.07 - 22.07.2017;
                    24.07 - 25.07.2017,
                    orele 9:00- 16:00
                    </b>
                  </font>
                </td>
                <td>
                 <font color="#2e2f92" >
                    <b>
                    26.07 - 27.07.2017, orele 10:00- 16:00
                    </b>
                  </font>
                </td>
              </tr>
            </table>
          `,
        eventSource: [
          { startTime: new Date(Date.UTC(2017, 6, 17, 6)), endTime: new Date(Date.UTC(2017, 6, 22, 13)), allDay: false, title: 'Înscrieri si interviu' },
          { startTime: new Date(Date.UTC(2017, 6, 24, 6)), endTime: new Date(Date.UTC(2017, 6, 25, 13)), allDay: false, title: 'Înscrieri si interviu' },
          { startTime: new Date(Date.UTC(2017, 6, 26, 7)), endTime: new Date(Date.UTC(2017, 6, 27, 13)), allDay: false, title: 'Confirmari' }
        ],
        orarFacultate: ``
      });

      this.conducereFSC.push({
        functie: 'Decan',
        nume: 'Conf. univ. dr. Daniel Dejica-Carțiș',
        telefon: '',
        email: 'daniel.dejica@upt.ro',
        image: 'fsc/dejica.jpg',
        show: false
      });
      this.conducereFSC.push({
        functie: 'Prodecan',
        nume: 'Lect. univ. dr. Simona Cristina Șimon',
        telefon: '',
        email: ' simona.simon@upt.ro',
        image: 'fsc/simon.jpg',
        show: false
      });

      this.descriereFSC = [
        `Facultatea de Științe ale Comunicării a fost înființată în data de 1 octombrie 2011. 
În prezent, Facultatea de Științe ale Comunicării gestionează un număr de aproximativ 500 de studenți 
înscriși la cele două programe de studii la nivel de licență, forma de învățământ cu frecvență – Comunicare și 
relații publice și Traducere și interpretare -, la programul de studii la nivel de licență, forma de învățământ 
la distanță - Comunicare și relații publice – și la programul de studii interdisciplinar cu Inginerie electronică 
și telecomunicații, la nivel de master, forma de învățământ cu frecvență - Comunicare, relații publice și media 
digitală. Luând în considerare specificul programelor de studii, misiunea didactică a Facultății de Științe ale 
Comunicării este de a forma atât specialiști în domeniul comunicării și al relațiilor publice. `,
        'fsc/descrierefsc.jpg'
      ];
      this.orarFSC.push({
        orarAdmitere: `
          <table  width='100%'>
        <tr height="50px"  bgcolor="#2e2f92" >
          <td height="50px">
            <font color="white">
              Înscriere candidaţi:
            </font>
          </td>
          <td height="50px">
            <font color="white">
             17.07.2017 - 22.07.2017, orele 9.00-14.00;<br>
24.07.2017 orele 9.00-14.00<br>
25.07.2017-orele 9.00-12.00

            </font>
          </td>
        </tr>
        <tr height="50px">
          <td>
              <font color="#2e2f92">
                <b>Concurs de dosare:</b>
              </font>
          </td>
          <td>
              <font color="#2e2f92" >
                 <b> 25.07.2017</b>
              </font>
          </td>
        </tr height="50px">
        <tr bgcolor="#2e2f92">
          <td>
            <font color="white">
            Rezultatele concursului:
          </td>
          <td>
            <font color="white">
            26.07.2017, ora 10.00
          </td>
        </tr>
        <tr>
          <td>
            <font color="#2e2f92" >
              <b>
                Confirmări Runda I:
              </b>
             </font>
          </td>
          <td>
              <font color="#2e2f92" >
                <b>
                  26.07.2017, ora 10.00 <br> 27.07.2017, ora 16.00
                </b>
              </font>
          </td>
        </tr>
        <tr bgcolor="#2e2f92">
          <td>
              <font color="white">
                 Afişare Runda II:
              </font>
          </td>
          <td>
             <font color="white">
                 28.07.2017, ora 10.00
              </font>
          </td>
        </tr>
        <tr>
          <td>
              <font color="#2e2f92" >
                <b>
                 Confirmări Runda II:
               </b>
              </font>
          </td>
          <td>
             <font color="#2e2f92" >
                  <b>
                    28.07.2017, ora 10.00 <br> 29.07.2017, ora 12.00
                 </b>
              </font>
          </td>
        </tr>
        <tr bgcolor="#2e2f92">
          <td>
             <font color="white">
               Afişare Runda III:
               </font>
          </td>
          <td>
             <font color="white">
                 29.07.2017, ora 16.00
                </font>
          </td>
        </tr>
        <tr>
          <td>
           <font color="#2e2f92" >
                  <b>
                  Confirmări Runda III:
                  </b>
              </font>
          </td>
          <td>
            <font color="#2e2f92" >
                  <b>
                  29.07.2017, orele 16.00 - 18.00
                  </b>
              </font>
          </td>
        </tr>
        <tr  bgcolor="#2e2f92">
          <td>
           <font color="white">
              Rezultatele finale:
            </font>
          </td>
          <td>
             <font color="white">
              29.07.2017, ora 20.00  
              </font>
          </td>
        </tr>
        </table>`,
        eventSource: [
          { startTime: new Date(Date.UTC(2017, 6, 17)), endTime: new Date(Date.UTC(2017, 6, 22)), allDay: false, title: 'Insciere candidati' },
          { startTime: new Date(Date.UTC(2017, 6, 24)), endTime: new Date(Date.UTC(2017, 6, 25)), allDay: false, title: 'Insciere candidati' },
          { startTime: new Date(Date.UTC(2017, 6, 25)), endTime: new Date(Date.UTC(2017, 6, 25)), allDay: false, title: 'Concurs de dosare' },
          { startTime: new Date(Date.UTC(2017, 6, 26, 7)), endTime: new Date(Date.UTC(2017, 6, 26, 7)), allDay: false, title: 'Rezultatele concursului' },
          { startTime: new Date(Date.UTC(2017, 6, 26, 7)), endTime: new Date(Date.UTC(2017, 6, 27, 13)), allDay: false, title: ' Confirmări Runda I' },
          { startTime: new Date(Date.UTC(2017, 6, 28, 7)), endTime: new Date(Date.UTC(2017, 6, 28, 7)), allDay: false, title: 'Afişare Runda II' },
          { startTime: new Date(Date.UTC(2017, 6, 28, 7)), endTime: new Date(Date.UTC(2017, 6, 29, 9)), allDay: false, title: ' Confirmări Runda II ' },
          { startTime: new Date(Date.UTC(2017, 6, 29, 13)), endTime: new Date(Date.UTC(2017, 6, 29, 13)), allDay: false, title: 'Afişare Runda III ' },
          { startTime: new Date(Date.UTC(2017, 6, 29, 13)), endTime: new Date(Date.UTC(2017, 6, 26, 15)), allDay: false, title: ' Confirmări Runda III' },
          { startTime: new Date(Date.UTC(2017, 6, 29, 17)), endTime: new Date(Date.UTC(2017, 6, 29, 17)), allDay: false, title: `Rezultate finale` }
        ],
        orarFacultate: ''
      })
      this.info = isLoggedIn;
      console.log(this.info)
      this.selectedItem = navParams.get('item');
      this.notes = ['a4upt', 'ACUPT', 'CHIUPT', 'OSTLUPT', 'ETCUPT', 'EEUPT', 'MPTUPT', 'MECUPT', 'FSCUPT'];
      this.faculties = [
        'Facultatea de Arhitectură și Urbanism',
        'Facultatea de Automatică și Calculatoare',
        'Facultatea de Chimie Industrială și Ingineria Mediului ',
        'Facultatea de Construcții',
        'Facultatea de Electronică, Telecomunicații și Tehnologii Informaționale',
        'Facultatea Electrotehnică și Electroenergetică',
        'Facultatea de Management în Producție și Transporturi',
        'Facultatea de Mecanică',
        'Facultatea de Ştiinţe ale Comunicării '];
      let short = ['ARH', 'AC', 'CIIM', 'CT', 'ETTI', 'EE', 'MPT', 'MEC', 'FSC']
      let logos = ['a4/a4.png', 'ac/ac.png', 'ct/ct.png', 'ostl/ostl.png', 'etc/etc.png', 'ee/ee.png', 'mpt/mpt.png', 'mt/mt.png', 'fsc/fsc.png'];

      this.items = [];
      console.log(this.selectedItem)
      // If we navigated to this page, we will have an item available as a nav param
      if (this.info.data == "user") {
        for (let i = 0; i < logos.length; i++) {
          // for(let j = 0; j < this.info.follow.length; j++){
          //   if(this.notes[i] == this.info.follow[j].value && this.info.follow[j].counter == 1 ){
          //       this.danger = "secondary";
          //       this.favorite = "Unfollow";
          //   }
          //   else if(this.notes[i] == this.info.follow[j].value && this.info.follow[j].counter == 0){
          //     this.danger = "danger";
          //     this.favorite = "Follow"
          //   }
          // }
          if (this.notes[i] == 'ACUPT') {
            this.series = ['Ingineria Sistemelor', 'Calculatoare si Tehnologia Informatiei', 'Informatica']
          }
          else {
            this.series = [];
          }
          this.items.push({
            title: this.faculties[i],
            note: this.notes[i],
            iconActive: "",
            faculties: this.faculties[i],
            favorite: "",
            serie: this.series,
            imagelink: logos[i],
            short: short[i]
          });
        }
      } else {
        for (let i = 0; i < logos.length; i++) {
          this.danger = "danger";
          this.favorite = "Follow"
          if (this.info.follow != null) {
            for (let j = 0; j < this.info.follow.length; j++) {

              if (this.notes[i] == this.info.follow[j].value && this.info.follow[j].counter == 1) {
                this.danger = "secondary";
                this.favorite = "Unfollow";
              } else if (this.notes[i] == this.info.follow[j].value && this.info.follow[j].counter == 0) {
                this.danger = "danger";
                this.favorite = "Follow"
              }
            }
          }

          if (this.notes[i] == 'ACUPT') {
            this.series = ['Ingineria Sistemelor', 'Calculatoare si Tehnologia Informatiei', 'Informatica']
          } else {
            this.series = [];
          }





          this.items.push({
            title: this.faculties[i],
            note: this.notes[i],
            iconActive: this.danger,
            faculties: this.faculties[i],
            favorite: this.favorite,
            serie: this.series,
            imagelink: logos[i],
            short: short[i]
          });
        }
      }

    });
    // let logos = ['ac/ac.jpg', 'ee/ee.jpg', 'etc/etc.png', 'ostl/ostl.jpg', 'mpt/mpt.jpg', 'ct/ct.jpg', 'a4/a4.jpg', 'mt/mt.jpg'];
    // for (let i = 0, count = logos.length; i < count; i++) {
    //   this.logos.push({
    //     imagelink: logos[i]
    //   });
    // }
  }

  /**
   * 
   * @param event 
   * @param item 
   */
  itemTapped(event, item) {
    console.log(item.notes)
    if (item.note == 'ACUPT') {

      this.navCtrl.push('Paginafacultate', {
        item: item,
        descriere: this.descriereAC,
        orar: this.orarAC,
        conducere: this.conducereAC
      });

    } else if (item.note == 'EEUPT') {

      this.navCtrl.push('Paginafacultate', {
        item: item,
        descriere: this.descriereEE,
        orar: this.orarEE,
        conducere: this.conducereEE
      });

    } else if (item.note == 'ETCUPT') {

      this.navCtrl.push('Paginafacultate', {
        item: item,
        descriere: this.descriereETC,
        orar: this.orarETC,
        conducere: this.conducereETC
      });

    } else if (item.note == 'OSTLUPT') {

      this.navCtrl.push('Paginafacultate', {
        item: item,
        descriere: this.descriereOSTL,
        orar: this.orarOSTL,
        conducere: this.conducereOSTL
      });

    } else if (item.note == 'MPTUPT') {

      this.navCtrl.push('Paginafacultate', {
        item: item,
        descriere: this.descriereMPT,
        orar: this.orarMPT,
        conducere: this.conducereMPT
      });

    } else if (item.note == 'CHIUPT') {
      this.navCtrl.push('Paginafacultate', {
        item: item,
        descriere: this.descriereCT,
        orar: this.orarCT,
        conducere: this.conducereCT
      });
    } else if (item.note == 'a4upt') {
      this.navCtrl.push('Paginafacultate', {
        item: item,
        descriere: this.descriereA4,
        orar: this.orarA4,
        conducere: this.conducereA4
      });
    } else if (item.note == 'MECUPT') {
      this.navCtrl.push('Paginafacultate', {
        item: item,
        descriere: this.descriereMT,
        orar: this.orarMT,
        conducere: this.conducereMT
      });
    } else if (item.note == 'FSCUPT') {
      this.navCtrl.push('Paginafacultate', {
        item: item,
        descriere: this.descriereFSC,
        orar: this.orarFSC,
        conducere: this.conducereFSC
      });
    }
  }

  /**
   * 
   * @param itemss 
   */
  addFollow(itemss) {
    console.log(itemss)
    this.oneSignal.getIds().then((ids) => {
      this.id = ids.userId; // recieve de id device and send it to server 
      this.http.get('http://193.226.9.153/notification.php?id=' + this.id + '&user=' + this.user + '&facultate=' + itemss.note/*+'&ids='+Device.uuid*/).map(res => res.json()).subscribe(data => {
        this.posts = data;
      });
    });

    for (let i = 0; i < 7; i++) {
      if (this.items[i].title == itemss.title && this.items[i].iconActive == "danger") {
        this.items[i].iconActive = "secondary";
        this.items[i].favorite = "FAVORITE";
        let toast = this.toastCtrl.create({
          message: 'Now you follow ' + this.items[i].faculties + ' news!',
          duration: 1500,
          position: 'top'
        });
        toast.present();
      } else if (this.items[i].title == itemss.title && this.items[i].iconActive == "secondary") {
        this.items[i].iconActive = "danger";
        this.items[i].favorite = "Add to favorite";
      }
    }
  }
}