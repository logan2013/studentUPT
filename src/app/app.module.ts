import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { Auth } from '../providers/auth';
import { DataTabs } from '../providers/datatabs';
import { Getlocation } from '../providers/getlocation';
import { Connectivity } from '../providers/connectivity-service';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { HTTP } from '@ionic-native/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { FileChooser } from '@ionic-native/file-chooser';
import { Transfer } from '@ionic-native/transfer';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { OneSignal } from '@ionic-native/onesignal';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { NgCalendarModule } from 'ionic2-calendar';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Device } from '@ionic-native/device';
import { AppMinimize } from '@ionic-native/app-minimize';
import { AppVersion } from '@ionic-native/app-version';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { IonicImageLoader } from 'ionic-image-loader';
import { SocialSharing } from '@ionic-native/social-sharing';
import { BotDetectCaptchaModule } from 'angular-captcha';

// import { Timer } from '../components/countdown-timer/timer';
// import { TimerProgress } from '../components/timer-progress/timer-progress';
// import { FlashCardComponent } from '../components/flash-card/flash-card';
import { ToastService } from '../providers/util/toast.service';
import { AlertService } from '../providers/util/alert.service';
import { CameraProvider } from '../providers/util/camera.provider';
import * as firebase from 'firebase';
// import { AngularFireModule } from 'angularfire2';
import { registerLocaleData } from '@angular/common';
import localeZh from '@angular/common/locales/ro';

import { RecaptchaModule } from 'ng-recaptcha';
import { Crop } from '@ionic-native/crop';
registerLocaleData(localeZh);


export var config = {
  apiKey: "AIzaSyB8ANQHC7RqJVUNqEgb8jN39iO8TwQ-enE",
  authDomain: "studentupt-9adeb.firebaseapp.com",
  databaseURL: "https://studentupt-9adeb.firebaseio.com",
  projectId: "studentupt-9adeb",
  storageBucket: "studentupt-9adeb.appspot.com",
  messagingSenderId: "312625259441"
};
firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      pageTransitionDelay: 15
    }),
    NgCalendarModule,
    BrowserModule,
    IonicImageViewerModule,
    HttpModule,
    RecaptchaModule.forRoot(),
    // AngularFireModule.initializeApp(config),
    IonicImageLoader.forRoot(),
    SuperTabsModule.forRoot(),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    ToastService,
    AlertService,
    CameraProvider,
    StatusBar,
    SplashScreen,
    Network,
    HTTP,
    PhotoViewer,
    NativeStorage,
    IonicImageViewerModule,
    Auth,
    DataTabs,
    Getlocation,
    Camera,
    AppMinimize,
    AppVersion,
    SocialSharing,
    File,
    LocalNotifications,
    FilePath,
    Transfer,
    BackgroundGeolocation,
    LocationAccuracy,
    Geolocation,
    Diagnostic,
    Device,
    OneSignal,
    Connectivity,
    InAppBrowser,
    FileChooser,
    LaunchNavigator,
    DocumentViewer,
    NativePageTransitions,
    Crop,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: LOCALE_ID, useValue: 'ro-RO' },

  ]
})
export class AppModule { }
