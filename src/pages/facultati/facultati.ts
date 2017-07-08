import { AnimationStyleMetadata, Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, ModalController, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Auth } from '../../providers/auth';
import { Http } from '@angular/http';
import { OneSignal } from '@ionic-native/onesignal';
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
  public conducereAC: Array<{ functie: string, nume: string, telefon: string, email: string, image: string }> = [];
  public orarAC: Array<{ orarFacultate: any, orarAdmitere: any }> = [];
  public descriereEE: any;
  public conducereEE: Array<{ functie: any, nume: any, telefon: any, email: any, image: any }> = [];
  public orarEE: Array<{ orarFacultate: any, orarAdmitere: any }> = []
  public descriereOSTL: any;
  public conducereOSTL: Array<{ functie: any, nume: any, telefon: any, email: any, image: any }> = [];
  public orarOSTL: Array<{ orarFacultate: any, orarAdmitere: any }> = [];
  public descriereMPT: any;
  public conducereMPT: Array<{ functie: any, nume: any, telefon: any, email: any, image: any }> = [];
  public orarMPT: Array<{ orarFacultate: any, orarAdmitere: any }> = [];
  public descriereMT: any;
  public conducereMT: Array<{ functie: any, nume: any, telefon: any, email: any, image: any }> = [];
  public orarMT: Array<{ orarFacultate: any, orarAdmitere: any }> = []
  public descriereETC: any;
  public conducereETC: Array<{ functie: any, nume: any, telefon: any, email: any, image: any }> = [];
  public orarETC: Array<{ orarFacultate: any, orarAdmitere: any }> = [];
  public descriereA4: any;
  public conducereA4: Array<{ functie: any, nume: any, telefon: any, email: any, image: any }> = [];
  public orarA4: Array<{ orarFacultate: any, orarAdmitere: any }> = [];
  public descriereCT: any;
  public conducereCT: Array<{ functie: any, nume: any, telefon: any, email: any, image: any }> = [];
  public orarCT: Array<{ orarFacultate: any, orarAdmitere: any }> = [];
  public acupt: Array<{ descriere: any, conducere: any, orar: any }>;
  public eeupt: Array<{ descriere: any, conducere: any, orar: any }>;
  public ostl: Array<{ descriere: any, conducere: any, orar: any }>;
  public mptupt: Array<{ descriere: any, conducere: any, orar: any }>;
  public mtupt: Array<{ descriere: any, conducere: any, orar: any }>;
  public etcupt: Array<{ descriere: any, conducere: any, orar: any }>;
  public a4upt: Array<{ descriere: any, conducere: any, orar: any }>;
  public ctupt: Array<{ descriere: any, conducere: any, orar: any }>;
  public items: Array<{ title: string, note: string, iconActive: any, faculties: string, favorite: string, serie: string[] }> = [];
  constructor(
    public auth: Auth,
    public http: Http,
    public oneSignal: OneSignal,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public navParams: NavParams) {
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
         ofesională și compatibilitatea cu mediul academic internațional. Exceptând activitățile de 
         învățământ, prioritățile Facultății de Automatică și Calculatoare sunt încurajarea cercetării 
         științifice și stabilirea de parteneriate cu mediul academic sau privat.`
      ];

      this.conducereAC.push({
        functie: 'Decan',
        nume: 'Prof.dr.ing. Radu-Emil PRECUP',
        telefon: '0256 403 212 / 0256 403 229',
        email: 'radu.precup@upt.ro',
        image: 'ac/precup.jpg'
      });

      this.conducereAC.push({
        functie: 'Prodecan',
        nume: 'Conf.dr.ing. Lucian-Adrian PRODAN',
        telefon: '0256 403 213 / 0256 403 278 ',
        email: 'lprodan@cs.upt.ro  / lucian.prodan@upt.ro',
        image: 'ac/prodan.jpg'
      });

      this.conducereAC.push({
        functie: 'Prodecan',
        nume: 'Ș.l.dr.ing. Ciprian-Bogdan CHIRILĂ',
        telefon: '0256 403 217/ 0256 404 061',
        email: 'chirila@cs.upt.ro  / ciprian.chirila@upt.ro',
        image: 'ac/chirila.jpg'
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
        orarAdmitere: `Înscriere candidați: luni – sâmbătă 17 – 22 iulie, între orele 9 și 14<br>
●	Concurs (proba de matematică și concursul de dosare): marți 25 iulie<br>
●	Rezultatele inițiale ale admiterii: marți 26 iulie, ora 10<br>
●	Confirmări Runda 1: Perioada marți 26 iulie ora 10 – miercuri 27 iulie ora 16 reprezintă RUNDA 1 de confirmări a statutului de admis cu lista de opțiuni inițială<br>
●	Afișare Runda 2: joi 28 iulie, ora 10<br>
●	Confirmări Runda 2: Intervalul orar 10 – 12 din data de vineri 29 iulie reprezintă RUNDA 2 de confirmări a statutului de admis cu lista de opțiuni inițială<br>
●	Afișare Runda 3: vineri 29 iulie, ora 16<br>
●	Confirmări Runda 3: Intervalul orar 16 – 18 din data de vineri 29 iulie reprezintă RUNDA 3 de confirmări a statutului de admis cu lista de opțiuni inițială<br>
●	Rezultatele finale ale admiterii: vineri 29 iulie 2017 ora 20<br>
`})
      this.descriereEE = [
        `  Începuturile învăţământului superior electrotehnic în Timişoara coincid cu începuturile Şcolii Politehnice – Timişoara. Data de 15 noiembrie 1920 este data înfiinţării Şcolii Politehnice la Timişoara, care şi-a început activitatea cu pregătirea inginerilor în specializările Electromecanică (Mecanică şi Electricitate) respectiv Mine şi Metalurgie.
  Universitatea a apreciat întotdeauna rolul important jucat de industrie în pregătirea studenților pentru piața muncii și a susținut continuu relații de colaborare cu mediul economic. Interesul pentru dezvoltarea unor competențe care să se plieze pe nevoile pieței muncii, a influențat dezvoltarea curriculară și s-a concretizat, printre altele, în angajarea unui număr mare de absolvenți în companii multinaționale de prestigiu.
`
      ];

      this.conducereEE.push({
        functie: 'Decan',
        nume: 'Prof.dr.ing. Sorin Muşuroi',
        telefon: '0256-403462',
        email: 'sorin.musuroi@upt.ro',
        image: 'ee/musuroi.jpg'
      });

      this.conducereEE.push({
        functie: 'Prodecan',
        nume: 'Prof.dr.ing. Doru Vătău',
        telefon: '0256-403415',
        email: 'doru.vatau@upt.ro',
        image: 'ee/vatau.jpg'
      });

      this.orarEE.push({
        orarAdmitere: `
        <table border='2'>
        <tr><td>
        Înscriere candidaţi:
        </td><td>
        17.07.2017 - 22.07.2017
        24.07.2017 – 25.07.2017</td></tr>
          <tr><td>Concurs de dosare:</td><td>
        25.07.2017</td></tr>
          <tr><td>Rezultatele concursului:</td><td>
        26.07.2017, ora 10.00</td></tr>
          <tr><td>Confirmări Runda I:</td><td>
        26.07.2017, ora 10.00 - 27.07.2017, ora 16.00</tr></td>
          <tr><td>Afişare Runda II:</td><td>
        28.07.2017, ora 10.00</td></tr>
          <tr><td>Confirmări Runda II:</td><td>
        28.07.2017, ora 10.00 - 29.07.2017, ora 12.00</td></tr>
          <tr><td>Afişare Runda III:</td><td>
        29.07.2017, ora 16.00</td></tr>
          <tr><td>Confirmări Runda III:</td><td>
        29.07.2017, orele 16.00 - 18.00</td></tr>
          <tr><td>Rezultatele finale:</td><td>
        29.07.2017, ora 20.00  </td></tr>
        </table>
`,
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
          în concordanță`
      ];

      this.conducereOSTL.push({
        functie: 'Decan',
        nume: 'Prof.dr.ing Raul ZAHARIA',
        telefon: '0256403922',
        email: 'raul.zaharia@upt.ro',
        image: 'ostl/zaharia.jpg'
      });

      this.conducereOSTL.push({
        functie: 'Prodecan',
        nume: 'Conf.dr.ing Sorin HERBAN ',
        telefon: '0256403984',
        email: 'sorin.herban@upt.ro',
        image: 'ostl/herban.jpg'
      });

      this.orarOSTL.push({
        orarAdmitere: `
        <table border='2'>
        <tr><td>Înscriere candidați:</td> <td>17.07.2017-22.07.2017
        24.07.2017-25.07.2017</td></tr>
        <tr><td>Concurs de dosare:	</td> <td>25.07.2017</td></tr>
        <tr><td>Afișarea rezultatelor concursului:</td> <td>	26.07.2017, ora 10.00</td></tr>
        <tr><td>Confirmări runda I</td> <td>	26.07.2017, ora 10.00-27.07.2017, ora 16.00</td></tr>
        <tr><td>Afișare runda II</td> <td>	28.07.2017, ora 10.00</td></tr>
        <tr><td>Confirmări runda II	</td> <td>28.07.2017, ora 10.00-29.07.2017, ora 12.00</td></tr>
        <tr><td>Afișare runda III</td> <td>	29.07.2017, ora 16.00</td></tr>
        <tr><td>Confirmări runda III	</td> <td>29.07.2017, orele 16.00-18.00</td></tr>
        <tr><td>Rezultatele finale	</td> <td>29.07.2017, ora 20.00</td></tr>
        </table>`,
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
`
      ];

      this.conducereMPT.push({
        functie: 'Decan',
        nume: 'Prof. ing. Dr. ec. Marian MOCAN',
        telefon: '0256 404284',
        email: ' marian.mocan@upt.ro',
        image: 'mpt/mocan.jpg'
      });

      this.conducereMPT.push({
        functie: 'Prodecan',
        nume: 'S.I. dr. ing. Ilie TĂUCEAN',
        telefon: '0256 404287',
        email: 'ilie.taucean@upt.ro  ',
        image: 'mpt/taucean.jpg'
      });

      this.orarMPT.push({
        orarAdmitere: `
        <table border='2'>
        <tr><td>Înscriere candidați:</td> <td>17.07.2017-22.07.2017
        24.07.2017-25.07.2017</td></tr>
        <tr><td>Concurs de dosare:	</td> <td>25.07.2017</td></tr>
        <tr><td>Afișarea rezultatelor concursului:</td> <td>	26.07.2017, ora 10.00</td></tr>
        <tr><td>Confirmări runda I</td> <td>	26.07.2017, ora 10.00-27.07.2017, ora 16.00</td></tr>
        <tr><td>Afișare runda II</td> <td>	28.07.2017, ora 10.00</td></tr>
        <tr><td>Confirmări runda II	</td> <td>28.07.2017, ora 10.00-29.07.2017, ora 12.00</td></tr>
        <tr><td>Afișare runda III</td> <td>	29.07.2017, ora 16.00</td></tr>
        <tr><td>Confirmări runda III	</td> <td>29.07.2017, orele 16.00-18.00</td></tr>
        <tr><td>Rezultatele finale	</td> <td>29.07.2017, ora 20.00</td></tr>
        </table>`,
        orarFacultate: ``
      });

      this.descriereMT = [
        ''
      ];

      this.descriereETC = [
        `Cum spune și denumirea Facultatea de Electronică, Telecomunicații și Tehnologii Informaționale, din cadrul Universității Politehnica Timișoara, are rolul de a forma ingineri în domeniul electronicii și al telecomunicațiilor. Există două domenii în care se împarte facultatea: ”Electronică aplicată” și ”Tehnologi și sisteme de telecomunicații ”, punându-se un mare accent asupra tehnologiilor informaționale.
Munca studenților este răsplatită prin condiții extraordinare de învățământ, iar prin extraordinare înțelegem aparatură modernă, profesori de cel mai înalt calibru și printr-o atmosferă academică de neegalat. De asemenea, studenții sunt încurajați prin acordarea de burse. Datorită faptului că este o facultate excelentă și de viitor, studenții acesteia sunt căutați de firme ca: Nokia, Continental Automotive, Kathrein, AEM, Flex, etc.  
	Prin electronică și telecomunicaţii ești la zi, ești integrat în Europa!
`
      ];

      this.conducereETC.push({
        functie: 'Decan',
        nume: 'prof. univ. dr. ing. Florin Alexa ',
        email: 'florin.alexa@upt.ro',
        telefon: '',
        image: 'etc/alexa.jpg'
      });

      this.conducereETC.push({
        functie: 'Prodecan',
        nume: 'prof. univ. dr. ing. Cătălin Căleanu  ',
        email: 'catalin.caleanu@upt.ro',
        telefon: '',
        image: 'etc/caleanu.jpg'
      });

      this.conducereETC.push({
        functie: 'Prodecan',
        nume: 'prof. univ. dr. ing. Ivan Bogdanov ',
        email: 'ivan.bogdanov@upt.ro',
        telefon: '',
        image: 'etc/bogdanov.jpg'
      });

      this.orarETC.push({
        orarAdmitere: `
        <table border='2'>
        <tr><b> Calendar admitere iulie 2017	</b></tr><br>				
        <tr><td>17.07.2017-22.07.2017-Orar: 09:00-14:00</td> 			<td>Înscrierea candidaților</td></tr>	
        <tr><td> 25.07.2017 ora 10:00	</td><td>				Proba de evaluare a cunoștințelor: MATEMATICĂ</td><tr>	
        <tr> <td>26.07.2017  ora 10:00				</td><td>	Afișare rezultate: runda I</td></tr><br>	
        <tr> <td>26.07.2017 ora 10:00- 27.07.2017 ora 16:00	</td><td>				Confirmarea celor admiși: runda I</td></tr>
        <tr> <td>28.07.2017 ora 10:00			</td><td>		Afișare rezultate: runda II</td></tr>
        <tr> <td>29.07.2017 ora 10:00-29.07.2017 ora 12:00		</td><td>			Confirmarea celor admiși: runda II</td></tr>
        <tr><td> 29.07.2017 ora 16:00		</td><td>			Afișare rezultate: runda III</td></tr><br>	
        <tr><td>29.07.2017 ora 16:00-18:00	</td><td>				Confirmarea celor admiși: runda III</td></tr>
        <tr><td>29.07.2017 ora 20:00			</td><td>		Rezultate finale</td></tr>
        </table>`,
        orarFacultate: `<table border='2' width="100%">
        <tr><td>Luni - Joi</td><td>10:00 - 12:00</td></tr>
        <tr><td>Vineri</td><td>10:00 - 11:00</td></tr>
        </table>`
      })

      this.descriereA4 = [
        `Facultatea de Arhitectură, cea mai tânără facultate a Universităţii Politehnica Timişoara, a cunoscut o continuă dezvoltare, atât ca număr de studenţi şi cadre didactice, cât și ca diversificare a ofertei educaţionale. Actualmente există două specializări: Arhitectură şi Mobilier şi Amenajări interioare. Durata studiilor este de 12 semestre/ 6 ani.

Participarea constantă, cu rezultate deosebite, a studenţilor şi absolvenţilor facultăţii noastre la concursuri de arhitectură naţionale şi internaţionale, la workshopuri şi manifestări ştiinţifice, confirmă calitatea învăţământului de arhitectură din Timişoara şi conferă acestuia o poziţie meritorie la nivel naţional. Planul de învățământ cuprinde discipline de pregătire generală, discipline de specialitate şi activităţi practice în domeniile tehnic şi artistic.
`
      ];

      this.conducereA4.push({
        functie: 'Decan',
        nume: 'Decan: prof. dr. arh. Ioan Andreescu',
        telefon: '0256404022',
        email: 'oan.andreescu@upt.ro',
        image: 'a4/andreescu.jpg'
      });

      this.conducereA4.push({
        functie: 'Prodecan',
        nume: 'prof. dr. ing. Marius Moșoarcă',
        email: 'marius.mosoarca@upt.ro',
        telefon: '0256404560',
        image: 'a4/mosoarca.jpg'
      });

      this.conducereA4.push({
        functie: 'Director Departamament',
        nume: 'conf. dr. arh. Cătălina Bocan',
        telefon: '0256404019',
        email: 'catalina.bocan@upt.ro ',
        image: 'a4/bocan.jpg'
      });

      this.orarA4.push({
        orarAdmitere: `
        <table border='2' width='100%'>
        <tr><td>
          Înscriere candidaţi
          </td><td>
          17.07.2017 - 22.07.2017
          </td></tr>
        <tr><td>
          Concurs de admitere
          Desen tehnic si liber
          </td><td>
          25.07.2017
          </td></tr>
        <tr><td>
          Rezultatele concursului:	
          </td><td>
          26.07.2017, ora 10.00
          </td></tr>
        <tr><td>
          Confirmări 	Runda I:	
          </td><td>
          26.07.2017, ora 10.00 - 27.07.2017, ora 16.00
          </td></tr>
        <tr><td>
          Afişare Runda II:
          </td><td>
          28.07.2017, ora 10.00
          </td></tr>
        <tr><td>
          Confirmări 	Runda II:	
          </td><td>
          28.07.2017, ora 10.00 - 29.07.2017, ora 12.00
          </td></tr>
        <tr><td>
          Afişare Runda III:
          </td><td>
          29.07.2017, ora 16.00
          </td></tr>
        <tr><td>
          Confirmări 	Runda III:	
          </td><td>
          29.07.2017, orele 16.00 - 18.00
          </td></tr>
        <tr><td>
          Rezultatele finale:
          </td><td>
          29.07.2017, ora 20.00
          </td></tr>
			</table>
`,
        orarFacultate: `<table border="2" width="100%">
        <tr><td>Luni - Joi</td><td>12:00 - 14:00</td></tr>
        <tr><td>Vineri</td><td>10:00 - 12:00</td></tr>
        </table>`
      })

      this.descriereCT = [
        `Facultatea de Chimie Industrială a fost înființată, în cadrul Școlii Politehnice din Timișoara, în anul 1948.
  Începând cu anul 2005, Universitatea Politehnica Timișoara și implicit Facultatea de Chimie Industrială și Ingineria Mediului trec la organizarea învățământului superior pe trei cicluri: ciclul de licență, ciclul de master și ciclul de doctorat. Tot în această perioadă se realizează organizarea facultății pe două departamente: Chimie Aplicată și Ingineria Compușilor Anorganici și a Mediului (CAICAM) și Chimie Aplicată și Ingineria Compușilor Organici și Naturali (CAICON).
  Misiunea de bază a facultății o constituie dezvoltarea învățământului universitar în domeniile: inginerie chimică, ingineria mediului și ingineria produselor alimentare.
  `
      ];

      this.conducereCT.push({
        functie: 'Decan',
        nume: 'Prof. dr. ing. Nicolae  VASZILCSIN',
        email: 'nicolae.vaszilcsin@upt.ro',
        telefon: '0256-403061',
        image: ''
      });

      this.conducereCT.push({
        functie: 'Prodecan',
        nume: 'Conf. dr. ing. Gabriela-Alina DUMITREL',
        email: 'alina.dumitrel@upt.ro',
        telefon: '0256-403062',
        image: ''
      });

      this.orarCT.push({
        orarAdmitere: `
            <table border='2' width = "100%">
              <tr>
                <td>
                  Înscrieri si interviu:
                </td>
                <td>
                  Confirmari:
                </td>
              </tr>
              <tr>
                <td>
                  17.07 - 22.07.2017;
                  24.07 - 25.07.2017,
                  orele 9:00- 16:00
                </td>
                <td>
                  26.07 - 27.07.2017, orele 10:00- 16:00
                </td>
              </tr>
            </table>
          `,
        orarFacultate: ``
      })

      this.info = isLoggedIn;
      console.log(this.info)
      this.selectedItem = navParams.get('item');
      this.notes = ['ACUPT', 'CHIUPT', 'EEUPT', 'ETCUPT', 'MECUPT', 'MPTUPT', 'OSTLUPT', 'a4upt'];
      this.faculties = [
        'Facultatea de Automatică și Calculatoare',
        'Facultatea de Chimie Industrială și Ingineria Mediului ',
        'Facultatea Electrotehnica si Electroenergetica',
        'Facultatea de Electronica si Telecomunicatii',
        'Facultatea de Mecanica',
        'Facultatea de Management si Productie in Transporturi',
        'Facultatea de Constructii',
        'Facultatea de Arhitectura si Urbanism'];
      this.items = [];
      console.log(this.selectedItem)
      // If we navigated to this page, we will have an item available as a nav param
      if (this.info.data == "user") {
        for (let i = 0; i < 8; i++) {
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
            serie: this.series
          });
        }
      } else {
        for (let i = 0; i < 8; i++) {
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
            serie: this.series
          });
        }
      }
    });
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
    } else if(item.note == 'a4upt') {
       this.navCtrl.push('Paginafacultate', {
        item: item,
        descriere: this.descriereA4,
        orar: this.orarA4,
        conducere: this.conducereA4
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
      this.http.get('http://www.atestate-inf.tk/ghidtest/notification.php?id=' + this.id + '&user=' + this.user + '&facultate=' + itemss.note/*+'&ids='+Device.uuid*/).map(res => res.json()).subscribe(data => {
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