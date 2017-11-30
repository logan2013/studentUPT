import { ViewCompiler } from '@angular/compiler';
import { Component, keyframes } from '@angular/core';
import { App, NavController, NavParams, ModalController, ViewController, Events, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { AlertService } from '../../../providers/util/alert.service';
import { IonicPage } from 'ionic-angular';
import { Auth } from '../../../providers/auth';
import { Http, Headers, RequestOptions } from '@angular/http';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-setari',
  templateUrl: 'setari.html',
})
export class SetariPage {
  public userData: any = [];
  public userToken: any = localStorage.getItem('token');
  profilePicture: string;
  profileRef: any;
  errorMessage: any;
  placeholderPicture = 'http://api.adorable.io/avatar/200/bob';
  enableNotifications = true;
  language: any;
  currency: any;
  paymentMethod: any;
  languages = ['English', 'Portuguese', 'French'];
  paymentMethods = ['Paypal', 'Credit Card'];
  currencies = ['USD', 'BRL', 'EUR'];
  user = {
    name: 'Marty Mcfly',
    imageUrl: "http://193.226.9.153/upload/" + localStorage.getItem("photo")
  };
  public photo: string = localStorage.getItem("photo");
  public userKeyAndVal: Array<{ key: any, value: any }> = [];
  public userSet: any = [];
  public userKey: any = [];

  lastImage: string = null;
  loading: Loading;
  constructor(
    private http: Http,
    public toastCtrll: ToastController,
    public platform: Platform,
    public events: Events,
    public viewCtrl: ViewController,
    public app: App,
    public alertService: AlertService,
    public toastCtrl: ToastService,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public auth: Auth,
    public camera: Camera,
    private transfer: Transfer,
    private file: File,
    private filePath: FilePath,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController
  ) {
    this.userToken = localStorage.getItem('token');
    
    if(localStorage.getItem("enableNotification") == "1") {
      this.enableNotifications = true;
    } else {
      this.enableNotifications = false;
    }
    this.events.subscribe("updatePhoto", (photo) => {
      this.photo = photo;
    });
    try {
      this.auth.login().then((isLoggedIn) => {
        this.userData = isLoggedIn;
      });
      this.userSet = localStorage.getItem("dataUser");
      this.userKey = Object.keys(JSON.parse(this.userSet));
      for (let i = 0; i < 20; i++) {
        this.userKeyAndVal.push({
          key: this.userKey[i],
          value: JSON.parse(this.userSet)[this.userKey[i]]
        })
      }
    }
    catch (r) { }
  }

  toggleNotifications() {
    console.log("asdads")
    if (this.enableNotifications) {
      this.toastCtrl.create('Notifications enabled.');
      this.enableNotifications = true;
      localStorage.setItem("enableNotifiation", "1")
      this.http.get("http://193.226.9.153/enableNotification.php?phoneid="+ localStorage.getItem("phoneid")).subscribe(() => {

      });
    } else {
      this.toastCtrl.create('Notifications disabled.');
      this.enableNotifications = false;
      localStorage.setItem("enableNotifiation", "0")
      this.http.get("http://193.226.9.153/enableNotification.php?phoneid="+ localStorage.getItem("phoneid")).subscribe(() => {
        
      });
    }
  }

  updateImage(value) {
    this.profilePicture = 'data:image/jpeg;base64,' + value.val();
  }

  updateProfileImage() {
    this.camera.getPicture({
      quality: 50,
      allowEdit: true,
      cameraDirection: this.camera.Direction.FRONT,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.user.imageUrl = imageData;
    }, (err) => {
      this.toastCtrl.create('Error: ' + err);
    });
  }

  logOut() {
    this.alertService.presentAlertWithCallback('Are you sure?',
      'This will log you out of this application.').then((yes) => {
        if (yes) {
          this.events.publish('user:logout');
        }
      });
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

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 50,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());

          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = localStorage.getItem("user") + n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  private presentToast(text) {
    this.toastCtrll.create({
      message: text,
      duration: 3000,
      position: 'top'
    })
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }


  public uploadImage() {
    // Destination URL
    var url = "http://193.226.9.153/upload.php";

    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);

    // File name only
    var filename = this.lastImage;

    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: { 'fileName': filename }
    };

    const fileTransfer: TransferObject = this.transfer.create();

    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();

    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      this.loading.dismissAll()
      alert('Image succesful uploaded.');
      this.http.get('http://193.226.9.153/userPhoto.php?photo=' + filename + "&user=" + localStorage.getItem("user")).map(res => res.json()).subscribe(data => {
        if (data.success) {
          this.events.publish("updatePhoto", filename);
          localStorage.setItem("photo", filename);
        } else {
          alert("nup")
        }
      }, (err) => {
        alert(JSON.stringify(err))
      })
    }, err => {
      this.loading.dismissAll()
      alert('Error while uploading file.' + JSON.stringify(err));
    });
  }
}