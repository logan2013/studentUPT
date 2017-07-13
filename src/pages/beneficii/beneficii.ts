import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';
/**
 * Generated class for the Beneficii page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-beneficii',
  templateUrl: 'beneficii.html',
})
export class Beneficii {

  public title: string[] = [];
  public content: string[] = [];
  public imageLink: string[] = [];
  public preview: string[] = [];
  public typeOfPage: number[] = []; // 1 - list page or 2 -content page
  public items: Array<{ title: string, content: string, imageLink: string, typeOfPage: number, preview: string }>;
  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams) {
    this.title = [
      'Biblioteca Centrală a Universității Politehnica Timișoara',
      'Legitimația de student UPT',
      'Contul de student UPT',
      'Baze sportive – Activitatea sportivă în UPT',
      'Cantina UPT ',
      'Policlinica Studenţească',
      'Reducere pentru transport'
    ];
    this.preview = [
      `Una dintre cele mai moderne biblioteci din țară, BCUPT pune la dispoziția studenților
       o serie de facilităţi şi servicii gratuite precum ...`,
      `În calitate de student vei beneficia de legitimaţie UPT, sub formă de card inteligent,
       care îţi oferă accesul în diverse locaţii UPT şi  ...`,
      `Vei beneficia de cont de student, care înseamnă, pe lângă o căsuţă de e-mail: 
	• calculatoarele din cadrul Bibliotecii Centrale UPT, cu acces  ...`,
      `Baza sportivă 1 poate fi găsită în imediata vecinătate a facultăților de Mecanică, Construcții
       sau a grupului Electro și a noii ...`,
      `Meniuri avantajoase la Fast Food C1 (la parterul Restaurantului Universitar Politehnica) 
      sau Fast Food 1 MV (la parterul căminului ...`,
      `Poţi beneficia de controale medicale, consultaţii, tratamente gratuite, servicii de
 medicină generală, stomatologie, ORL ...`,
      `Dacă la sfârșit de săptămână bănuții nu îți sunt suficienți ca să ajungi acasa, trebuie să
  știi că, student fiind, beneficiezi de 50% ...`
    ];
    this.content = [`
Una dintre cele mai moderne biblioteci din țară, BCUPT pune la dispoziția studenților o serie de facilităţi şi servicii gratuite precum: 

• săli de lectură la fiecare etaj, dispuse în spaţii deschise, închise sau flexibile;
	• sală de lectură deschisă 24/7; 
	• 5 săli studiu grup dispuse câte două la etajele 2 şi 3, respectiv una la etajul 4;
	• copy center care include echipamente amenajate la fiecare etaj cu posibilitate de tipărire de tip “follow me”;
	• sistem de auto-împrumut/restituire aflat la etajul I, având posibilitatea de restituire 24h;
	• zonă I-Tech cu 100 de calculatoare, la etajul 4;
	• spaţii de loisir;
	• wi-fi în întreaga clădire.
. `,

      `În calitate de student vei beneficia de legitimaţie UPT, sub formă de card inteligent, care îţi oferă accesul în diverse locaţii UPT şi dreptul de a utiliza o serie de resurse din cadrul Universităţii Politehnica Timişoara.

Legitimaţia UPT îţi oferă posibilitatea de a accesa:
	• sala de lectură 24h din cadrul bibliotecii în afara programului de lucru;
	• bazinele de înot din cadrul Bazei Sportive 2 UPT;
	• în curând, anumite cămine studenţeşti.

De asemenea, această legitimaţie este necesară pentru a putea:
	• împrumuta cărţi de la bibliotecă;
	• tipări /scana / multiplica document.

Informaţii utile privind eliberarea şi utilizarea legitimaţiilor:
	• conţin informaţii de bază despre student şi poza studentului;
	• legitimaţiile se eliberează la Biblioteca Centrală UPT, punctul informaţii, în baza carnetului de student vizat la zi. Poza se face la eliberarea cardului. Programarea pentru eliberarea cardului (în primele luni de la începerea anului universitar) se face pe http://www.library.upt.ro/card/;
	• accesul la sala 24h este activat odată cu eliberarea legitimaţiei;
	• accesul la bazinele UPT se face pe baza de legitimaţie si amprentă (stocată pe card) şi este activat la Baza Sportivă 2 – birou administraţie, în baza carnetului de student vizat la zi şi a unei adeverinţe medicale care să ateste că studentul este apt pentru înot şi nu are boli de piele; 
	• cardul se eliberează gratuit şi nu este transmisibil, folosirea abuzivă a acestuia ducând la limitarea accesului sau anularea acestuia;
	• în caz de pierdere, furt sau deteriorare fizică a cardului, acesta se anulează şi se eliberează un alt card contra sumei de 20 lei, reluându-se cele de mai sus;
	• cardul se returnează la încheierea activităţii în UPT la bibliotecă pentru a obţine viza de lichidare
`,

      `Vei beneficia de cont de student, care înseamnă, pe lângă o căsuţă de e-mail: 
	• calculatoarele din cadrul Bibliotecii Centrale UPT, cu acces la internet şi resurse UPT;
	• reţeaua Wifi Eduroam, disponibilă în cele mai multe din locaţiile UPT;
	• Microsoft Office 365;
	• avizierul electronic al studenților UPosT.


O365 îţi este oferit în baza licenţelor O365 Pro Plus, principalele facilităţi fiind următoarele:

1.  Ai întotdeauna cea mai recentă versiune de Office;

2.  Office – instalează suita Office completă pe computere PC şi Mac, pe tablete Windows, iPad® şi Android™, precum şi pe majoritatea dispozitivelor mobile. Ai posibilitatea de a instala Office pe 5 dispozitive (PC sau Mac, tablete,  telefoane);

3.  Stocare – OneDrive pentru business oferă spațiu de stocare în cloud, care poate fi accesat de oriunde. Poţi partaja cu ușurință aceste documente şi le puteţi sincroniza cu fişiere stocate pe dispozitivele tale (instalând One drive);

4.  Office online – creezi şi editezi documente Word, OneNote, PowerPoint şi Excel dintr-un browser;

5.  Comunicare – prin Skype for business poţi comunica cu colegii tăi, trimite fişiere, partaja ecranul şi ţine conferinţe.

Informaţii utile privind livrarea şi utilizarea conturilor:
	• datele conturilor sunt livrate de către secretariate la începerea anului universitar. Aceste date sunt folosite pentru toate aplicaţiile descrise mai sus;
	• autentificarea se face pe http://mail.upt.ro . Din această interfaţă web se poate folosi întreaga gamă de aplicaţii O365 online şi se pot accesa linkurile necesare pentru a descărca şi instala aplicaţiile pe dispozitivele dumneavoastră;
	• dacă doreşti să faci un bookmark pentru această interfața web, trebuie să faci bookmark la adresa http://mail.upt.ro. 
`,


      `Baza sportivă 1 poate fi găsită în imediata vecinătate a facultăților de Mecanică, Construcții sau a grupului Electro și a noii biblioteci şi pune la dispoziţie următoarele facilităţi:
	• un teren de fotbal cu gazon;
	• o pistă de atletism;
	• două terenuri de minifotbal cu gazon sintetic cu posibilitate de acoperire iarna;
	• o sală de culturism.

Baza Sportivă  2 se află pe strada Diaconu Coresi, după stadionul Dan Păltinișanu şi dispune de:
	• o sală multifuncţională (baschet, volei, tenis de câmp);
	• un bazin de înot acoperit;
	• un bazin de înot în aer liber;
	• patru terenuri de tenis de câmp cu nocturnă;
	• o sală de fitnes;
	• două terenuri de baschet;
	• două terenuri de handbal/minifotbal;
	• două terenuri de fotbal cu gazon;
` ,
      `Meniuri avantajoase la Fast Food C1 (la parterul Restaurantului Universitar Politehnica) sau Fast Food 1 MV (la parterul căminului cu acelaşi nume). Ca student al UPT poţi servi masa la preţul de 8 lei, însă doar dacă cumperi pachetul de minim 5 cartele de masă de la administraţia căminelor UPT sau direct de la Cantina UPT, unde trebuie să prezinţi carnetul de student.
`,
      `Poţi beneficia de controale medicale, consultaţii, tratamente gratuite, servicii de
 medicină generală, stomatologie, ORL, dermato-venerologie, interne, ginecologie, 
 oftalmologie, recoltare analize de laborator, planning familial. Policlinica este 
 situată în Complexul Studenţesc.`,

      `Dacă la sfârșit de săptămână bănuții nu îți sunt suficienți ca să ajungi acasa, trebuie să știi că, student fiind, beneficiezi 
      de 100% reducere pentru transportul feroviar. Tot ce trebuie să faci este să ai legitimația de călătorie vizată. 
      De asemenea, ai reducere 100% pentru transportul în comun cu cardul RATT. Informează-te la punctele de vânzare de bilete 
      cum poți intra în posesia acestui card.` ];

    this.imageLink = [
      'upt/biblioteca.jpg',
      'upt/biblioteca.jpg',
      'upt/cont.jpg',
      'upt/baza1.jpg',
      'upt/cantina.jpg',
      'upt/policlinica.jpg',
      'upt/transport.jpg'];
    this.typeOfPage = [0, 1, 0];

    this.items = [];
    for (let i = 0; i < this.title.length; i++) {
      this.items.push({
        title: this.title[i] ,
        content: this.content[i],
        imageLink: this.imageLink[i],
        typeOfPage: this.typeOfPage[i],
        preview: this.preview[i]
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Beneficii');
  }
  showContent(item) {
    this.modalCtrl.create('ShowContent', { item: item }).present();
    // this.navCtrl.push('ShowContent', {item:item});
  }

  
}
