import { Component, ViewChild } from '@angular/core';
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
  @ViewChild('fileInput') fileInput;
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
  public isBrowser: any;
  public ckeditorContent:any;
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
    this.isBrowser = this.platform.is('core');
    console.log(this.isBrowser);
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
        text: this.iddd.content || this.iddd.text,
        icon: this.iddd.icon,
        id: this.iddd.id
      })
    this.ckeditorContent = this.iddd.text;    
    } else { }
    this.idd = navParams.get('idd');
    this.facultate = navParams.get('facultate');
  }

  onChange(ev, val) {
    ///console.log(ev, val)
    this.myForm.value.text = encodeURIComponent(ev);
  }

  logForm() {
    localStorage.setItem('text', this.myForm.value.text);
    if (this.idd === 1) {
      let headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers });
      let postParams = {
        inserttitle: this.myForm.value.title,
        inserttext: this.myForm.value.text,
        insertimage: localStorage.getItem('upt'),
        facultate: this.facultate,
        token: localStorage.getItem("token")
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

      if (this.myForm.value.title && this.myForm.value.text === "" && localStorage.getItem('upt') === null) { //100
        this.myForm.value.text = this.id[0].text;
        localStorage.setItem('upt', this.id[0].icon);
      }
      else if (this.myForm.value.title && this.myForm.value.text == "" && localStorage.getItem('upt')) { //101
        this.myForm.value.text = this.id[0].text;
      } else if (this.myForm.value.title && this.myForm.value.text && localStorage.getItem('upt') === null) {//110
        localStorage.setItem('upt', this.id[0].icon);
      }
      else if (this.myForm.value.title && this.myForm.value.text && localStorage.getItem('upt')) {//111
      }
      else if (this.myForm.value.title == "" && this.myForm.value.text == "" && localStorage.getItem('upt') === null) {//000
        localStorage.setItem('upt', this.id[0].icon);
        this.myForm.value.text = this.id[0].text;
        this.myForm.value.title = this.id[0].title;
      }
      else if (this.myForm.value.title == "" && this.myForm.value.text == "" && localStorage.getItem('upt')) {//001
        this.myForm.value.title = this.id[0].title;
        this.myForm.value.text = this.id[0].text;
      }
      else if (this.myForm.value.title == "" && this.myForm.value.text && localStorage.getItem('upt') === null) {//010
        this.myForm.value.title = this.id[0].title;
        localStorage.setItem('upt', this.id[0].icon);
      }
      else if (this.myForm.value.title == "" && this.myForm.value.text && localStorage.getItem('upt')) {//011
        this.myForm.value.title = this.id[0].title;
      }

      this.postParamss = {
        inputtitle: this.myForm.value.title + " ",
        inputtext: this.myForm.value.text + " ",
        inputimage: localStorage.getItem('upt'),
        id: this.id[0].id,
        token: localStorage.getItem("token")
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

  fileChange(event) {
    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });

    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      var name = fileBrowser.files[0].name;
      localStorage.setItem('upt', fileBrowser.files[0].name);
      formData.append('file', fileBrowser.files[0]);
      if (fileBrowser.files[0].type == "image/jpeg" || fileBrowser.files[0].type == "image/png") {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://193.226.9.153/upload.php', true);
        let scope = this;
        this.loading.present();
        xhr.onload = function () {
          if (this['status'] === 200) {
            const responseText = this['responseText'];
            const files = JSON.parse(responseText);
            if (files.success) {
              scope.loading.dismiss();
              alert('Image Uploaded with Success');
            } else {
              alert('Error. Something goes wrong upload another photo.')
            }
          } else {
          }
        };
        xhr.send(formData);
      } else {
        alert("please select an image .jpg or .png . Thank you")
      }
    }

  }

  navigateToSecondPage() {
    this.logForm();
    this.navCtrl.pop();
  }

  navigateToSecondPageBack() {
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