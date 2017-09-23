import { AnimationStyleMetadata, Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController} from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Auth } from '../../providers/auth';
import { Http } from '@angular/http';
import { OneSignal } from '@ionic-native/onesignal';
import { DataTabs } from '../../providers/datatabs';

@IonicPage()
@Component({
  templateUrl: 'organizatii.html',
})
export class Organizatii {
  private selectedItem: any;
  private posts: any;
  private postss: any;
  private id: any;
  private icons: string[];
  private faculties: string[];
  private user: string;
  private danger: string = "danger";
  private favorite: string = "Follow";
  private info: any = [];
  private notes: any[];
  private series: any[];
  private descriereAC: any;
  private conducereAC: Array<{ functie: string, nume: string, telefon: string, email: string, image: string }> = [];
  private proiecteAC: Array<{ descriere: any, image: any }> = [];
  private descriereEE: any;
  private conducereEE: Array<{ functie: any, nume: any, telefon: any, email: any, image: any }> = [];
  private proiecteEE: Array<{ descriere: any, image: any }> = [];
  private descriereOSTL: any;
  private conducereOSTL: Array<{ functie: any, nume: any, telefon: any, email: any, image: any }> = [];
  private proiecteOSTL: Array<{ descriere: any, image: any }> = [];
  private descriereMPT: any;
  private conducereMPT: Array<{ functie: any, nume: any, telefon: any, email: any, image: any }> = [];
  private proiecteMPT: Array<{ descriere: any, image: any }> = [];
  private descriereMT: any;
  private conducereMT: Array<{ functie: any, nume: any, telefon: any, email: any, image: any }> = [];
  private proiecteMT: Array<{ descriere: any, image: any }> = []
  private descriereETC: any;
  private conducereETC: Array<{ functie: any, nume: any, telefon: any, email: any, image: any }> = [];
  private proiecteETC: Array<{ descriere: any, image: any }> = [];
  private descriereA4: any;
  private conducereA4: Array<{ functie: any, nume: any, telefon: any, email: any, image: any }> = [];
  private proiecteA4: Array<{ descriere: any, image: any }> = [];
  private descriereCT: any;
  private conducereCT: Array<{ functie: any, nume: any, telefon: any, email: any, image: any }> = [];
  private proiecteCT: Array<{ descriere: any, image: any }> = [];
  private items: Array<{ title: string, note: string, iconActive: any, faculties: string, favorite: string, serie: string[], imagelink: any, short: any }> = [];
  constructor(
    private auth: Auth,
    private http: Http,
    private dataTabs: DataTabs,
    private oneSignal: OneSignal,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private navParams: NavParams) {
    this.dataTabs.setMessage('');
    this.dataTabs.setCoducere('');
    this.dataTabs.setDescriere('');
    this.dataTabs.setOrar('');
    this.dataTabs.setProiecte('')
    this.user = localStorage.getItem('user');
    this.auth.login().then((isLoggedIn) => {


      this.descriereAC = [
        `Liga Studenților din Facultatea de Automatică și Calculatoare (Liga AC) este o organizaţie non-guvernamentală studențească care s-a înființat în 1990, având ca scop principal reprezentarea studenților din facultatea menţionată anterior. Organizația numără peste 150 de membri și este una dintre cele mai puternice organizații studențești din țară. 
Unul din principalele obiective ale organizației este informarea studenților. În acest scop, Liga AC menține o legătură constantă cu facultatea, profesorii, companiile din domeniu, media, dar și diverse organizații din Timișoara sau de la nivel local.
`,
        'ligaac/descriereac.jpg'
      ];


      this.proiecteAC.push({
        descriere: `<b><h1>Chess Contest</h1></b><br>Când în holul Electro apar piese de şah de mărimea unui om mic, ştim că se apropie 
        o nouă ediţie a concursului de şah desfăşurat la nivel naţional, 
        <b>Chess Contest</b>. Proiectul îşi propune să promoveze sportul minţii atât 
        printre jucătorii legitimaţi, cât şi printre cei nelegitimati, cele 2 
        categorii având în comun sistemul de joc elvețian, de 7 runde.
        <br>
         `,
        image: 'ligaac/sah.jpg'
      });

      this.proiecteAC.push({
        descriere: `<b><h1>Prichindel</h1></b><br>Proiectul umanitar al Ligii AC, <b>Prichindel</b>, se concentrează pe ajutorarea
        copiilor cu o situație materială precară, prin strângerea de donații, 
        în special de la studenții care odată au fost și ei copii.
        <br>
        `,
        image: 'ligaac/prichindel.jpg'
      });

      this.proiecteAC.push({
        descriere: `<b><h1>Liga AC LABS</h1></b><br><b>Laboratoare aplicate în beneficiul studenților (Liga AC LABS)</b> este proiectul desfășurat 
        pe parcursul semestrului II, care urmărește completarea cunoștințelor teoretice acumulate 
        de către studenți în timpul anilor de studii printr-o serie de  laboratoare susținute de 
        marile companii de IT&C din Timișoara, care își cresc vizibilitatea în mediul universitar.
        <br>
        `,
        image: 'ligaac/labs.jpg'
      });

      this.proiecteAC.push({
        descriere: ` <b><h1>RoboTEC</h1></b><br><b> RoboTEC (RoboT Engineering Contest) </b>este un concurs dedicat studenţilor de la facultăţi
         de profil din ţară şi din străinătate, pasionaţi de robotică şi inteligenţă artificială.
          Proiectul are ca scop aprofundarea cunoştinţelor de programare şi testare.
          <br>
        `,
        image: 'ligaac/robotec.jpg'
      });

      this.proiecteAC.push({
        descriere: `<b><h1>“Comoara Ligii AC” </h1></b><br> La baza proiectului <b>“Comoara Ligii AC” </b>stă celebrul joc al vânătorii de comori. Participanții,
           membri ai organizațiilor studențești afiliate ANOSR (Alianța Națională a Organizațiilor 
           Studențești din România), gonesc spre cele mai frumoase locații ale Timișoarei unde primesc
           diverse indicii şi task-uri, toate acestea pentru a ajunge la mult râvnita „comoară”.
           <br>
        `,
        image: 'ligaac/comoara.jpg'
      });

      this.proiecteAC.push({
        descriere: `  <b><h1>iTEC</h1></b><br><b>iTEC</b> (IT Engineering Contest) este unul dintre cele mai importante evenimente IT&C destinate atât
            studenților, cât și elevilor. Participanții au posibilitatea să aleagă dintre șase probe diferite: 
            Algoritmică, Graphic Design, Application Development, Embedded Development, Mobile Development și
             Web Development, cele patru din urmă fiind probe de tip maraton. 
             <br>
        <hr>`,
        image: 'ligaac/itec.jpg'
      });

      this.proiecteAC.push({
        descriere: `<b><h1>ISWinT </h1></b><br><b>ISWinT (International Student Week in Timişoara)</b> este un festival internaţional ajuns la cea de-a 24-a ediție, 
             dedicat studenţilor din toate colţurile lumii, care pune accentul pe unitate, multiculturalitate şi prietenie.`,
        image: 'ligaac/iswint.jpg'
      });

      this.descriereEE = [
        `   L.S.F.E.E. este o organizaţie non-profit, creată pentru a apăra şi promova drepturile şi interesele studenților din Facultatea de Electrotehnică 
        şi Electroenergetică Timişoara, indiferent de sex, religie, naţionalitate sau convingeri politice, prin toate mijloacele de care dispune.
Înfiinţată în anul 1990 sub denumirea L.S.F.E.T., cu o activitate specific studenţească, civică şi sindicală, liga a fost constituită în baza unei libere 
asocieri de către studenţii din Facultatea de Electrotehnică şi Electroenergetică Timişoara.  Ulterior, în anul 2006, denumirea sa a fost schimbată în L.S.F.E.E.
 L.S.F.E.E. este membră a Alianţei Naţională a Organizaţiilor Studenţeşti din România (A.N.O.S.R.), prima şi cea mai importantă federaţie studenţească, neguvernamentală 
 şi apartidică, dar si  membru fondator al Convenției Organizațiilor Studențești din Politehnică (COSPol) și al Minds Hub.

`,
        'ligaee/descriereee.jpg'
      ];


      this.proiecteEE.push({
        descriere: `<b>	<h1>CUPA POLI</h1></b><br>
Este cel mai mare proiect sportiv al L.S.F.E.E., care, sub sloganul PLAY, FIGHT & WIN, promovează ideea de competiție, spiritul de echipă, comunicarea și fairplay-ul, studenții având posibilitatea de a  ı̂mbina efortul fizic cu cel intelectual. Acesta cuprinde 13 sporturi, sub două categorii: 
 1.Fizice: FOTBAL, BASCHET, FREE RUNNING, DARTS, ÎNOT, TENIS 	 DE MASĂ, TENIS DE CÂMP, BILIARD 	  
  	  
 2.Electronice: DOTA 2, LOL, FIFA 17, HEARTHSTONE, CS;GO 
 <br>
 
`,
        image: 'ligaee/cupapoli.jpg'
      });

      this.proiecteEE.push({
        descriere: `<b><h1>DESCOPERĂ ELECTRO </h1></b><br>
 Acest proiect se desfășoară în prima săptămâna a anului universitar și are că scop 
 acomodarea bobocilor cu viața de student. Aceștia au posibilitatea să învețe mai
  multe despre facultate, să se descurce în incinta acesteia și să cunoasa din ce 
  în ce mai bine noul oraș în care vor studia.
  <br>
  
`,
        image: 'ligaee/descoperaelectro.jpg'
      });

      this.proiecteEE.push({
        descriere: `<b><h1>RECRUTĂRI L.S.F.E.E.</h1> </b><br>
 Se desfășoară în două etape. Prima și cea mai mare are loc la începutul anului 
 universitar, iar cea de-a doua are loc în luna Mai. Studenții care vor să devină 
 membrii în cadrul L.S.F.E.E. sunt așteptați la sediul ligii pentru un interviu. 
 <br>
`,
        image: 'ligaee/recrutariee.jpg'
      });

      this.proiecteEE.push({
        descriere: `<b><h1>BALUL ELECTRO</h1> </b><br>
 Se adresează oricărui boboc ce vrea să se afirme  și se desfășoară în parteneriat
  cu celelalte ligi ale facultăților din  corpul Electro al Universității Politehnica
  Timișoara, în primele luni ale anului Universitar.
  <br>
`,
        image: 'ligaee/balelectro.jpg'
      });

      this.proiecteEE.push({
        descriere: `<b><h1>COLINDE </b></h1></br><br>
 Proiect cu tradiție al L.S.F.E.E., „Colinde” încearcă să aducă spiritul sărbătorilor
  de iarnă mai aproape de noi, astfel colindăm studenții, cadrele didactice și nu 
  numai,pentru a-i transpune în atmosfera și bucuria acestor sărbători.
  <br>
`,
        image: 'ligaee/colind.jpg'
      });

      this.proiecteEE.push({
        descriere: `<b><h1>POLITEHNICA , UN PAS SPRE VIITORUL TĂU </h1></b><br>
 Se adresează elevilor interesați de o viitoare criera de inginer. Doritorii se pot
  înscrie la un concurs de fizică, Intelligent Electricity Generation, prin care se 
  dorește să  se facă cunoscută, în mod direct, oferta de studiu a Facultătii de
   Electrotehnică și Electroenergetică din Timișoara. De aceea mare parte din 
   procedurile de concurs se derulează la Timișoara, în laboratoarele facultătii.
   <br>
`,
        image: 'ligaee/viitor.jpg'
      });

      this.proiecteEE.push({
        descriere: `<b><h1>SIMULEAZĂ-ȚI  ANGAJAREA</h1></b><br>
 Proiectul, de factură educativă, constă într-un training susținut de un specialist
  de la Centrul de Consiliere și Orientare în Carieră (C.C.O.C.), pe tema „Tot ce
   trebuie să știi pentru a merge la anagajare” și de o SIMULARE DE INTERVIU,
   cu sprijinul celor de la Business Partners. <br>
`,
        image: 'ligaee/angajare.jpg'
      });

      this.proiecteEE.push({
        descriere: `<b>	<h1>Sesiunea de Comunicări Ştiinţifice Studenţeşti </h1></b><br>

 SCSS este un simpozion ce oferă studenților oportunitatea de a privatea o lucrare stiitifică și de a debuta cu dreptul în cariera de inginer. 
 Sesiunea se adresează studenților de la ciclurile de licentă și master din 
 domeniile Ingineriei Electrotehnice și Electroenergetice, în două secțiuni, 
 cu scopul de a susține și promova preocupările științifice în rândul acestora.  
 <br>
`,
        image: 'ligaee/scss.jpg'
      });


      this.descriereOSTL = [
        `Organizaţia Studenţească "Traian Lalescu" are ca scop reprezentarea studenţilor 
        din Facultatea de Construcţii din Universitatea Politehnica Timișoara. Această 
        reprezentare constă în diverse activităţi cu misiunea de a face viaţa studenţilor
         cât mai mult pe placul acestora. Susţinem drepturile studenţilor, ne străduim 
         de a crea un mediu ideal de dezvoltare a acestora, le oferim ajutor pentru 
         orice fel de probleme studenţești și nu în ultimul rând le oferim oportunităţi
          de distracţie. Proiectele noastre cuprind oportunităţi  de dezvoltare atât
           pe plan personal cât și profesional. Suntem o echipă cu poftă de viaţă, cu 
           dorinţa de a schimba în bine tot ce e posibil fără a uita zâmbetul
         pe buze și atitudinea pozitivă. Ne dezvoltăm și clădim împreună.`,
        'ligaostl/descriereostl.jpg'
      ];



      this.proiecteOSTL.push({
        descriere: ` <b><h1>Teambuildingul</h1></b><br>Când ne gândim la proiectele OSTL, primul care
         se merită menționat este  <b>Teambuildingul</b>
         nostru anual. Aici echipa noastră se pune pe drum ca într-un weekend, separat
          de mediul obișnuit, să învețe, să lucreze, să se cunoască mai bine și să 
          se distreze. Acest eveniment ne ajută să lucrăm mai bine pe următoarele 
          proiecte, și prin timpul petrecut împreună să fim mai apropiați între noi, 
          devenind o echipă de succes<br>`,
        image: ''
      });

      this.proiecteOSTL.push({
        descriere: `<b><h1>Cupa OSTL</h1></b><br><b>Cupa OSTL</b> este proiectul care pune în mișcare studenții iubitori 
        de sport, prin care atregem atenția a cât mai multor tineri de la Facultatea de
         Construcții spre importanța sportului, a mișcării în viața de zi cu zi și jocului în echipă.<br>`,
        image: ''
      });

      this.proiecteOSTL.push({
        descriere: `<b><h1>Building Construct</h1> </b><br><b>Building Construct </b>care a luat amploare în anul 2017 pune accentul pe creativitatea, talentul și
         calitatea muncii în domeniul construcțiilor. Un concurs de machete cu scopul de a premia cei talentați și
          devotați în construcții prespune punerea la încercare a muncii tinerilor, prin diferite probe de stabilitate, 
          creativitate și unitate. <br> `,
        image: ''
      });




      this.descriereMPT = [
        `Încă de la infintarea ei în anul 2009, LSFMPT are drept principal obiectiv reprezentarea studentilori din facultate. Altfel spus, este vocea ce face cunoscute nevoile lor. Prin proiectele şi activităţile pe care le organizează, liga contribuie la dezvoltarea personală şi profesională a membrilor săi şi nu numai.
Membrii organizaţiei au în comun plăcerea de a fi voluntari. Se implică în viaţă socetatii pentru a obţine, printre altele, sporirea prestigiului studentului, crearea unor legături bune cu cadrele didactice, dar şi revendicarea drepturilor tuturor studenţilor.
Liga aşteaptă noi voluntari, de aceea nu ezită să participi la sesiunea de recrutări care are loc la fiecare început de semestru. 
`,
        'ligampt/descrierempt.jpg'
      ];

 
      this.proiecteMPT.push({
        descriere: `<b><h1>Student Exchange</h1></b><br>
Ești curios cum ar fi dacă ai studia în alt centru universitar? Proiectul Student Exchange
 îți lansează tocmai această propunere. Pentru o săptămână, vei fi student la universitățile
  tehnice din Iași, Sibiu sau Cluj acestea fiind doar câteva dintre destinațiile proiectului.
   Vei participa la cursuri și laboratoare, dar vei și gusta din plin viața de student din orașul 
   gazdă. <br>
`,
        image: 'ligampt/exchange.jpg'
      });
      this.proiecteMPT.push({
        descriere: `<b><h1>MTalks</h1></b><br>
Sesiunile de discuții MTalks își propun să aducă antreprenori de succes față în față 
cu studenții MPT. Astfel, studenții au ocazia să afle de la cei mai buni din domeniu, 
cum au reușit în afaceri, care au fost cheile succesului lor, dar și care sunt cele mai
 mari provocări ale unui antreprenor în ziua de astăzi. <br> 
`,
        image: 'ligampt/mtalks.jpg'
      });
      this.proiecteMPT.push({
        descriere: `<b><h1>Cupa MPT</h1></b><br>
Cupa MPT este o competiţie sportivă care se desfăşoară anual, şi care promovează sportul
 în rândul studenţilor.<br>
`,
        image: 'ligampt/cupampt.jpg'
      });

      this.proiecteMPT.push({
        descriere: `<b><h1>MPT are inimă</h1></b><br>
În fiecare an , LSFMPT organizează o acţiune caritabilă care are ca obiectiv strângerea de 
fonduri în scopuri umanitare.<br>
`,
        image: 'ligampt/inima.jpg'
      });

      this.proiecteMPT.push({
        descriere: `<b><h1>Unravel adventures</h1></b><br>
Un proiect dedicat studenţilor nefamiliarizaţi cu oraşul, dar nu numai. Prin participarea la
 acest eveniment studenţii pot cunoaşte oraşul într-un mod interactiv, de asemenea vor avea
  ocazia să îşi dezvolte simţurile orientative dar şi să cunoască colegi din univestitate.<br>
`,
        image: 'ligampt/unravel.jpg'
      });



      this.descriereMT = [
        `Liga Studenților din Facultatea de Mecanică din Timișoara (LSFMT) este o organizație non-guvernamentală și non-profit, înființată în 1990, fiind prima organizație studențească din România, având ca scop principal reprezentarea drepturilor și intereselor studenților prin menținerea  legăturii constante cu facultatea, profesorii, companiile din domeniu, media, dar și diverse organizații din Timișoara .
LSFMT este membru fondator al  Alianței Naționale a Organizațiilor Studențești din România (ANOSR),  al Convenției Organizațiilor Studențești din Politehnică  (COSPol) și membru al Fundației Județene pentru Tineret Timiș (FITT).
De asemenea organizăm training-uri de dezvoltare atât profesională cât și personală, workshopuri și seri sociale.
`,
        'ligamt/descrieremt.jpg'
      ];

      this.proiecteMT.push({
        descriere: `<b><h1>MECART</h1></b><br>
          <b>MECART</b>Acest proiect este dedicat elevilor în ani terminali(cls. 11-12) şi are ca scop atât atragerea acestora în cadrul facultăţiilor disponibile în Universitatea Politehnica Timişoara, cât şi dezvoltarea elevilor pe cale nonformală prin intermediul workshop-urilor specifice fiecărei dintre cele 5 probe. Totodată, proiectul urmăreşte şi dezvoltarea abilităţilor de comunicare, lucru în echipă şi performanţa elevilor, atât în mod individual cât şi în echipă prin intermediul modului de lucru, ce diferă de la o probă la alta.
 
O altă idee ce stă la baza proiectului MecArt este familiarizarea elevilor cu mediul universitar dar şi cu cerinţele ofertelor de muncă, propuse de marile companii, aspect foarte important de menţionat, având în vedere faptul că Timişoara este unul dintre cele mai recunoscute oraşe universitare din România, ceea ce sugerează întru-un mod foarte direct numărul foarte mare al companiilor ce sunt în căutare de viitori angajaţi în domeniul ingineriei.
 
Probele acestui proiect sunt:
-Creativitate
-Design și grafică 3D
-Desen și pictură
-Fotografie
-Roboți mobili

`,
        image: `ligamt/mecart.jpg`
      });

      this.proiecteMT.push({
        descriere: ` 
<b></h1>DISCUȚIA DE LA CAFEA</h1></b><br>
În acest proiect studenții din Facultatea de Mecanică își pot expune punctul de vedere sau opinia personală legată de nelămuririle sau dificultățile întâmpinate în facultate,pe baza unor chestionare propuse de membrii Ligii Studenților din Facultatea de Mecanică.
Numele ales pentru acest proiect nu este întâmplător, dat fiind faptul ca participanții vor primi o cafea in urma completării chestionarelor
`,
        image: 'ligamt/lacafea.jpg'
      });

      this.proiecteMT.push({
        descriere: `<b><h1>UN DAR, UN ZAMBET DE CRĂCIUN </h1></b><br>Acest proiect are ca scop strângerea de fonduri pentru copiii nevoiași sau cu probleme grave de sănătate. Studenții Facultății de Mecanică din Timișoara 
          se mobilizează în grupuri și merg la colindat în căminele din Complexul Studențesc.`,
        image: 'ligamt/craciun.jpg'
      });

      this.proiecteMT.push({
        descriere: `<b><h1>UN MĂRȚIȘOR DIN PARTEA LSFMT</h1></b><br> LSFMT o să împartă mărțișoare la doamne și domnișoare prin facultate, rectorat, administrații, cămine, bibliotecă și bineînțeles,se vor împărți
           și în celelalte sedii ale ligilor studențești din Timișoara `,
        image: 'ligamt/'
      });

      this.proiecteMT.push({
        descriere: `<b><h1>ZILELE TEHNICE STUDENȚEȘTI TIMIȘOARA</h1></b><br>Valorificarea potențialului creativ al tinerilor în domeniul 
          tehnico-științific și familiarizarea acestora cu tehnica de vârf.`,
        image: 'ligamt/zts.jpg'
      });

   

      this.descriereETC = [
        `Liga Studenților din Facultatea de Electronică și Telecomunicații(LSFETc) este o organizaţie non-guvernamentală, non-profit, non-partizană, 
        fondată în anul 1993, de către studenţii din Facultatea de Electronică, Telecomunicaţii și Tehnologii Informaționale, din cadrul Universităţii 
        Politehnica Timișoara. Scopul principal al organizației este reprezentarea studenților, atât la nivelul întregii universități, cât și la nivel local și național. 
Acțiunile și demersurile acestei organizații sunt menite să îmbunătățească mediul educațional, social și profesional al studenților pe care îi reprezentăm. 
La nivel local suntem membru fondator al COSPol(Convenția Organizațiilor Studențești din Politehnică) și membru a FITT(Fundația Județeană pentru Tineret Timiș).
 La nivel național suntem membru fondator al ANOSR, singura federație studențească din România recunoscută la nivel internațional ca membră cu drepturi depline 
 în cadrul Organizației Europene a Studenților (ESU).
`,
        'ligaetc/descriereetc.jpg'
      ];

      this.proiecteETC.push({
        descriere: `<b><h1>Exchange</h1></b><br>
Proiectul se adresează studenților din Facultatea de Electronică, Telecomunicații și
 Tehnologii Informaționale și facultăților de același profil din 7 centre universitare
  din țară. Scopul acestuia este de a creea un schimb de experiență, pe perioada unei
   săptămâni, în care studenții să experimenteze mediul academic dintr-un alt centru
    din țară. În cadrul acestui schimb, studenții vor fi puși în contact direct cu
     materiile facultății noastre prin participarea la cursuri, seminarii și 
     laboratoare, având totodată parte de seri sociale tematice și tururi culturale 
     ale orașului.<br>
`,
        image: 'ligaetc/exchange.jpg'
      });

      this.proiecteETC.push({
        descriere: `<b><h1>Masa rotundă</h1></b><br>
Masa rotundă își propune crearea unui mediu în care studenții pot colabora eficient
 și amiabil cu cadrele didactice. Prima fază a proiectului presupune informarea 
 studenților facultății referitor la drepturile și obligațiile acestora, deoarece 
 considerăm că un student informat este un student pregătit în procesul educațional.
  Ultima fază a proiectului presupune chestionarea a celor 1500 de studenți ai 
  facultății în legătură cu activitatea cadrelor didactice pe parcursul întregului
   semestru, rezultatele chestionarelor fiind înaintate conducerii facultății spre a
    fi interpretate și soluționate.<br>
`,
        image: ''
      });

      this.proiecteETC.push({
        descriere: `<b><h1>Lead to success</h1></b><br>
Intrarea studenților pe piața muncii este un proces elaborat. Astfel LSFETc vine în 
ajutorul studenților prin creearea unor ateliere cu experți HR și tehnic, din 
companiile de interes pentru aceștia, care să consolideze cunoștințele lor în
 materie de abilități, scrierea unui CV și a unei Scrisori de intenție și să 
 ofere informații despre desfășurarea acestor interviuri în aceste companii.<br>
`,
        image: ''
      });

      this.proiecteETC.push({
        descriere: `<b><h1>Network and Electronics Workshops – NEW</h1></b><br>
Alegerea unui domeniu specific este marea dilemă a studenților. NEW vine în ajutorul 
acestora prin creearea unor workshop-uri cu ajutorul firmelor partenere, timp de 3 
luni, în care participanții vor putea să își consolideze cunoștințele teoretice 
dobândite dar să și contribuie la pregătirea practică acumulată pe parcursul anului 
universitar. Astfel, studenții facultății noastre își vor crește gradul de
 profesionalism personal înainte de momentul intrării lor pe piața muncii.<br>
`,
        image: ''
      });

      this.proiecteETC.push({
        descriere: `<b><h1>Fii tu Fratele Mai Mare </h1></b><br>
Prin acest proiect dorim implicarea voluntarilor în domeniul social al societății și
 totodată înfrumusețarea zilei de 1 Iunie pentru 100 de copii din centrele de 
 plasament din țară. Proiectul de suflet al LSFETc își propune petrecerea zilei
  copilului pe domeniul facultății împreună cu copii din centrele de plasament 
  prin activități recreative și jocuri de rol menite să le întărească stima de 
  sine și încrederea. <br>
`,
        image: 'ligaetc/frate.jpg'
      });

      this.proiecteETC.push({
        descriere: `<b><h1>Electronics Summer University – ESU</h1></b><br>
Abandonul școlar timpuriu este una dintre problemele principale la nivel național.
 ESU militează spre combaterea acestuia prin integrarea a 60 de elevi de clasa a XI-a,
  timp de 2 săptămâni, în mediul academic. Aceștia vor participa la 5 cursuri 
  construite pe fundamente practice cu ajutorul cărora se vor putea orienta pe
   viitor spre urmarea studiilor superioare. Totodată, proiectul contribuie și 
   în direcția educației non-formale prin includerea participanților în training-uri 
   pe diverse teme de interes ca private speaking și time management. Pe 
   lângă acestea, elevii vor beneficia și de seri sociale și activități 
   recreative și sportive.<br>
`,
        image: 'ligaetc/esu.jpg'
      });

      this.descriereA4 = [
        `Asociaţia de la Patru (A4) este organizaţia non-guvernamentală şi non-profit a studenţilor
de la Facultatea de Arhitectură și Urbanism din Timişoara. A4 devine o entitate ce promovează o educaţie alternativă celei academice prin proiectele, conferinţele, expoziţiile, workshop-urile, trainingurile, concursurile şi activităţile realizate.
Asociaţia de la Patru îşi asumă reprezentarea intereselor şi a drepturilor studenţilor Facultăţii
de Arhitectură, dar și dezvoltarea competenţelor profesionale şi personale ale acestora. 
A4 invită la dialog studenții și corpul didactic, militează pentru proiecte studențești multidiscplinare care să ajute în conturarea unei comunități studențești locale.

...și probabil cea mai des auzită întrebare: de ce Asociația de la 4? Pentru că Facultatea de
Arhitectură și Urbanism împarte aceeași clădire cu Facultatea de Construcții, iar Arhitectura
începe de la etajul....4!
`, 'ligaa4/descrierea4.jpg'
      ];


      this.proiecteA4.push({
        descriere: `<b><h1>Seri(i)le D’arc </h1></b><br>
Seri(i)le D’arc reprezintă o platformă de comunicare între studenții arhitecți
 și mediul profesional, creată ca o completare a sistemului educațional, ce 
 propune printr-o atitutine degajată generarea unor discuții libere între studenți
  și profesioniști din diferite domenii.<br>
`,
        image: 'ligaa4/seriile.png'
      });

      this.proiecteA4.push({
        descriere: `<b><h1>C | A | S | A </h1></b> <br>
Concursul Anual al Studenţilor Arhitecţi se adresează studenţilor de anul II ai 
Facultăţilor de Arhitectură din ţară, dar şi din străinătate. A apărut din dorinţa
 studenţilor de a se implica şi a participa la concursuri de arhitectură. Astfel,
  un grup de studenţi au observat că temele de proiectare din anul II ale tuturor
   facultăţilor din România sunt asemănătoare şi se concentrează în jurul locuirii
    şi atunci a luat naştere C|A|S|A ! <br>
`,
        image: 'ligaa4/casa.jpg'
      });

      this.proiecteA4.push({
        descriere: `<b><h1>Joia Culturala</h1></b> <br>
Joia Culturală este un eveniment ținut în facultate, menit să promoveze studenții 
cu hobbby-uri diferite de domeniul arhitectural. Prin expoziții, târguri și altele 
asemănătoare era intenționată crearea unor seri mai interactive și ieșite din 
tipicul evenimentelor pe teme de arhitectură .<br>
`,
        image: 'ligaa4/joiaculturala.png'
      });

      this.proiecteA4.push({
        descriere: `<b><h1>Harta culturală</h1></b><br>
Acest proiect a dorit să abordeze o nouă formă de promovare a evenimentelor 
culturale timișorene, propunând o variantă interactivă a panourilor de privateitate
 și expunere. La intervale de 2 săptămâni, cele mai interesante evenimente 
 depistate, și-au găsit locul printre cartonașe colorate atârnate de „clădirea” 
 unde vor avea loc, alături de detalii legate de dată, oră, temă și înscrieri.<br>
`,
        image: 'ligaa4/hartaculturala.jpg'
      });

      this.proiecteA4.push({
        descriere: `<b><h1>Labirintul din castel</h1></b><br>
Inițial, gândită ca o structură la scară urbană, incitând la interacțiune prin realizarea 
unei părți de string art aplicată pe structură,această instalație dorește să anime un
 parc de transit din centrul orașului, Parcul Castelului, făcând parte din proiectul 
 Capitalei Tineretului Timișoara, “Anima- un parc! “ prin care,atât Capitala Tineretului 
 Timișoara cât și noi dorim revitalizarea mai multor spații urbane din oraș.<br>
`,
        image: 'ligaa4/labirintcastel.jpg'
      });

      this.proiecteA4.push({
        descriere: `
<b><h1>Street Delivery</h1></b><br>
Asociația de la 4 a transformat strada Profesor Dionisie Linția în Strada Arhitecturii! 
Alături de În comunitate, Planzero, AltfelStudio am propus patrimoniul ca temă generală,
 aducând în atenția privateă situația în care se află acesta. Prin prisma atelierelor, 
 workshop-urilor, happening-urilor și al celorlalte evenimente desfășurate în perioada
 10-12 iunie, am dezbătut, analizat, radiografiat și interpretat artistic situația 
 generală în care se află patrimoniul orașului, modul în care ne raportăm la acesta, 
 cum îl pierdem dar și ce putem face pentru a-l recupera/proteja. <br>
`,
        image: 'ligaa4/street.jpg'
      });

      this.proiecteA4.push({
        descriere: `<b><h1>A4 te primeşte</h1></b><br>
Acest proiect reprezintă o metodă interactivă de a întâmpina și a integra bobocii în 
atmosfera Facultății și Asociației la fiecare început de an. Tot prin acest proiect 
oferim noilor veniți o serie de informații noi legate de facultate, cămine, univeristate, 
facilități și regulament, transmise atât într-un cadru informal cât și prin broșuri și 
ghiduri informative. <br>
`,
        image: 'ligaa4/primeste.jpg'
      });

      this.proiecteA4.push({
        descriere: ` <b><h1>Balul bobocilor</h1></b><br>
Balul bobocilor arhitecți este un proiect în cadrul Asociației de la Patru prin care 
atât membrii asociației dar și membrii facultății de arhitectură doresc să ofere
 studenților proaspăt intrați în această facultate o seară, sentimentul de apartenență 
 în cadrul facultății. Este o seară tematică, tema fiind aleasă de către membrii din
  organizare, în care este încurajată socializarea, studenții având posibilitatea de a 
  se cunoaște ei între ei, cât și cadrul didactic al facultății în afara orelor de curs.
  <br>
`,
        image: 'ligaa4/balulbobocilor.jpg'
      });


      this.descriereCT = [
        `Liga Studenților Chimiști din Timișoara este una dintre cele 8 Organizații Studențești 
        din cardul UPT.  Ca principal scop ne propunem să apărăm și să reprezentăm drepturile
         studenților din Facultatea de Chimie Industrială și Ingineria Mediului pe plan local 
         cât și național. Prin proiectele pe care le organizăm pentru studenți (Un pas spre Voluntariat, 
         Simpozionul Științific Studențesc)  dorim dezvoltarea lor din punct de vedere profesional, 
          educațional și social.În rest, suntem o echipă plină de viață, serioasă și dedicată. Suntem 
          și noi studenți și ne stă capul la distracții și evenimente prin țară. Dar seriozitatea
           este punctul nostru forte: când ne punem pe treabă, ies cele mai bune idei și proiecte.`,
        'ligact/descrierect.jpg'
      ];

   

      this.proiecteCT.push({
        descriere: `<b><h1>Săptămâna L.S.C.T. </h1></b><br>
In fiecare început de an L.S.C.T. încearcă să ajute studenții de anul 1, iar în prima
 săptămână desfășoară mai multe activități prin care să învete cum să citească orarul,
  care sunt clădirile în care au ore și activități de socializare.<br>
`,
        image: ''
      });

      this.proiecteCT.push({
        descriere: `<b><h1>Un pas spe voluntariat</h1></b><br>
-pentru că voluntariatul este un mod de a învăța și a te dezvolta noi ne propunem să le
 explicăm studenților importața voluntariatului și să încercăm să îi aducem aproape de L.S.C.T.<br>
`,
        image: 'ligact/voluntariat.jpg'
      });

      this.proiecteCT.push({
        descriere: `<b><h1>Simpozinul Ștințific Studențesc</h1></b><br>
-studenții facultății (licență, master, doctorat) își prezintă oral sau prin  postere lucrările 
de cercetare și rezultatele pe care le-au avut. Participanții au ocazia de a îmbunătății modul de 
prezentare și de a discuta și schimba relația dintre student si cadrul didactic.<br>
`,
        image: 'ligact/simpozion.jpg'
      });

      this.proiecteCT.push({
        descriere: `<b><h1>Concursul Național Coriolan Drăgulescu</h1></b><br>
-este adresat elevilor de clasele IX-XII prin care ei pot să își testeze cunoștințele dobândite. Pe
 lângă componenta cometițională a evenimentului, există și o componentă instructivă unde se redă o 
 imagine cât mai clară a muncii în domeniul chimiei.<br>
`,
        image: 'ligact/dragulescu.jpg'
      });

      this.proiecteCT.push({
        descriere: `<b><h1>Mersul cu colinda</h1></b><br>
-în fiecare an membrii ligii merg să colinde cadrele didactice din facultate, conducerea facultății,
 a universității, dar și colegii din alte organizații.<br>
`,
        image: 'ligact/colinda.jpg'
      });

      this.info = isLoggedIn;
      this.selectedItem = navParams.get('item');
      this.notes = [
        'ligaa4upt',
        'ligaacupt',
        'ligactupt',
        'ligaeeupt',
        'ligaetcupt',
        'ligamtupt',
        'ligamptupt',
        'ligaostlupt',
      ];
      this.faculties = [
        'Asociația de la 4',
        'Liga Studenților din Facultatea de Automatică și Calculatoare',
        'Liga Studenților Chimiști Timișoara',
        'Liga Studenților din Facultatea de Electrotehnică și Electroenergetică',
        'Liga Studenților din Facultatea de Electronică și Telecomunicații',
        'Liga Studenților din Facultatea de Mecanică Timișoara',
        'Liga Studenților din Facultatea de Management în Producție și Transporturi',
        'Organizația Studenților “Traian Lalescu”',
      ];
      let short = ['A4', 'Liga AC', 'LSCT', 'LSFEE', 'LSFEtc', 'LSFMT', 'LSFMPT', 'OSTL'];
      let logos = ['ligaa4/a4.png', 'ligaac/ac.png', 'ligact/ct.png', 'ligaee/ee.png', 'ligaetc/etc.png', 'ligamt/mt.png', 'ligampt/mpt.png', 'ligaostl/ostl.png'];

      this.items = [];
      // If we navigated to this page, we will have an item available as a nav param
      if (this.info.data == "user") {
        for (let i = 0; i < this.faculties.length; i++) {
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
        for (let i = 0; i < this.faculties.length; i++) {
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
  }

  /**
   * 
   * @param event 
   * @param item 
   */
  itemTapped(event, item) {
    console.log(item.notes)
    if (item.note == 'ligaacupt') {

      this.navCtrl.push('PaginaLiga', {
        item: item,
        descriere: this.descriereAC,
        conducere: this.conducereAC,
        proiecte: this.proiecteAC
      });

    } else if (item.note == 'ligaeeupt') {

      this.navCtrl.push('PaginaLiga', {
        item: item,
        descriere: this.descriereEE,
        proiecte: this.proiecteEE,
        conducere: this.conducereEE
      });

    } else if (item.note == 'ligaetcupt') {

      this.navCtrl.push('PaginaLiga', {
        item: item,
        descriere: this.descriereETC,
        proiecte: this.proiecteETC,
        conducere: this.conducereETC
      });

    } else if (item.note == 'ligaostlupt') {

      this.navCtrl.push('PaginaLiga', {
        item: item,
        descriere: this.descriereOSTL,
        proiecte: this.proiecteOSTL,
        conducere: this.conducereOSTL
      });

    } else if (item.note == 'ligamptupt') {

      this.navCtrl.push('PaginaLiga', {
        item: item,
        descriere: this.descriereMPT,
        proiecte: this.proiecteMPT,
        conducere: this.conducereMPT
      });

    } else if (item.note == 'ligactupt') {
      this.navCtrl.push('PaginaLiga', {
        item: item,
        descriere: this.descriereCT,
        proiecte: this.proiecteCT,
        conducere: this.conducereCT
      });
    } else if (item.note == 'ligaa4upt') {
      this.navCtrl.push('PaginaLiga', {
        item: item,
        descriere: this.descriereA4,
        proiecte: this.proiecteA4,
        conducere: this.conducereA4
      });
    } else if (item.note == 'ligamtupt') {
      this.navCtrl.push('PaginaLiga', {
        item: item,
        descriere: this.descriereMT,
        proiecte: this.proiecteMT,
        conducere: this.conducereMT
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