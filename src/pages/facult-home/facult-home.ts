import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { Camera, } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Transfer } from '@ionic-native/transfer';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-facult-home',
  templateUrl: 'facult-home.html',
})
export class FacultHome {
  public nativepath: any;
  public firestore = firebase.storage();
  public imgsource: any;
  correctPath: any = null;
  lastImage: string = null;
  loading: Loading;
  myForm: any;
  posts: any;
  image: any;
  postParamss: any;
  iddd: any;
  id: Array<{ title: string, text: string, icon: string, id: string }> = [{ title: '', text: '', icon: '', id: '' }];
  idd: any; //parametru inserare 
  facultate: any; // parametru trasnmis de la viewac pt inserare
  public tabBar: any;
  constructor(
    public camera: Camera,
    public file: File,
    public filePath: FilePath,
    public transfer: Transfer,
    public http: Http,
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public loadingCtrl: LoadingController) {

    this.myForm = this.formBuilder.group({
      text: [''],
      title: [''],
      nothing: ['']
    });

    if (navParams.get('id')) {
      this.id.pop();
      this.iddd = navParams.get('id');
      this.id.push({
        title: this.iddd.title,
        text: this.iddd.text,
        icon: this.iddd.icon,
        id: this.iddd.id
      })
    }
    else { }

    this.idd = navParams.get('idd');
    this.facultate = navParams.get('facultate');
  }

  logForm() {
    localStorage.setItem('text', this.myForm._value.text);
    if (this.idd === 1) {
      let headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers });

      let postParams = {
        inserttitle: this.myForm._value.title,
        inserttext: this.myForm._value.text,
        insertimage: localStorage.getItem('upt'),
        facultate: this.facultate
      }
      this.http.post('http://193.226.9.153/insert.php', JSON.stringify(postParams), options).map(res => res.json())
        .subscribe(data => {
          console.log(data);
        }, error => {
          console.log(error);
        });
    }
    else {

      let headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers });

      console.log(this.id)
      console.log(localStorage.getItem('upt'));
      //  alert(this.myForm._value.title+this.myForm._value.text+localStorage.getItem('upt')+this.id[0].id)
      if (this.myForm.value.title && this.myForm.value.text === "" && localStorage.getItem('upt') === null) { //100
        this.myForm.value.text = this.id[0].text;
        console.log(this.id);
        localStorage.setItem('upt', this.id[0].icon);
      }
      else if (this.myForm.value.title && this.myForm.value.text == "" && localStorage.getItem('upt')) { //101
        console.log(this.id);
        this.myForm.value.text = this.id[0].text;
      } else
        if (this.myForm.value.title && this.myForm.value.text && localStorage.getItem('upt') === null) {//110
          console.log(this.id);
          localStorage.setItem('upt', this.id[0].icon);
        }
        else
          if (this.myForm.value.title && this.myForm.value.text && localStorage.getItem('upt')) {//111
            console.log(this.id);
          }
          else
            if (this.myForm.value.title == "" && this.myForm.value.text == "" && localStorage.getItem('upt') === null) {//000
              localStorage.setItem('upt', this.id[0].icon);
              this.myForm.value.text = this.id[0].text;
              this.myForm.value.title = this.id[0].title;
              console.log(this.id);
            }
            else
              if (this.myForm.value.title == "" && this.myForm.value.text == "" && localStorage.getItem('upt')) {//001
                this.myForm.value.title = this.id[0].title;
                this.myForm.value.text = this.id[0].text;
                console.log(this.id);
              }
              else
                if (this.myForm.value.title == "" && this.myForm.value.text && localStorage.getItem('upt') === null) {//010
                  this.myForm.value.title = this.id[0].title;
                  localStorage.setItem('upt', this.id[0].icon);
                  console.log(this.id);
                }
                else
                  if (this.myForm.value.title == "" && this.myForm.value.text && localStorage.getItem('upt')) {//011
                    this.myForm.value.title = this.id[0].title;
                    console.log(this.id);

                  }
      console.log(this.myForm)
      this.postParamss = {
        inputtitle: this.myForm.value.title + " ",
        inputtext: this.myForm.value.text + " ",
        inputimage: localStorage.getItem('upt'),
        id: this.id[0].id
      }
      this.http.post('http://193.226.9.153/edit.php', JSON.stringify(this.postParamss), options)
        .subscribe(data => {
          console.log(data);
        }, error => {
          console.log(error);
        });


    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LigaacPage');
  }


  navigateToSecondPage() {
    this.navCtrl.pop();
  }
  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      encodingType: this.camera.EncodingType.JPEG,
    };
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            this.correctPath = filePath;
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentNameBuilder = imagePath.substr(imagePath.lastIndexOf('/') + 1);
            let currentName = currentNameBuilder.substr(0, currentNameBuilder.lastIndexOf('?'));
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      }
    }, (err) => {
      this.presentToast('23' + JSON.stringify(err));
    });
  }

  private createFileName() {
    var d = new Date().getTime(),
      newFileName = '' + localStorage.getItem('user') + d + ".jpg";
    localStorage.setItem('upt', newFileName);
    return newFileName;
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 5000,
      position: 'top'
    });
    toast.present();
  }


  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public uploadImage() {

    // Destination URL
    var url = "http://193.226.9.153/upload.php";
    // File for Upload
    var targetPath = this.correctPath;
    // File name only
    var filename = this.createFileName();

    this.uploadimage(targetPath, filename);
    this.id[0].icon = localStorage.getItem('upt');

    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: { 'fileName': filename }
    };

    const fileTransfer = this.transfer.create();

    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();

    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      this.presentToast('Image succesful uploaded.');
    }, err => {
      this.loading.dismissAll()
      this.presentToast(err);
    });
  }

  uploadimage(filePath, filename) {
    (<any>window).resolveLocalFileSystemURL(filePath, (res) => {
      res.file((resFile) => {
        var reader = new FileReader();
        reader.readAsArrayBuffer(resFile);
        reader.onloadend = (evt: any) => {
          var imgBlob = new Blob([evt.target.result], { type: 'image/jpg' });
          var imageStore = this.firestore.ref().child(filename);
          imageStore.put(imgBlob).then((res) => {
            this.loading.dismissAll();
            alert('Upload Success to firebase');
          }).catch((err) => {
            alert('Upload Failed' + err);
          })
        }
      })
    })
  }
}