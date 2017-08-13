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
import { Transfer } from '@ionic-native/transfer';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { OneSignal } from '@ionic-native/onesignal';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { NgCalendarModule } from 'ionic2-calendar';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Device } from '@ionic-native/device';
import { AppMinimize } from '@ionic-native/app-minimize';
import { AppUpdate } from '@ionic-native/app-update';
import { AppVersion } from '@ionic-native/app-version';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { DocumentViewer } from '@ionic-native/document-viewer';
// import { Timer } from '../components/countdown-timer/timer';
// import { TimerProgress } from '../components/timer-progress/timer-progress';
// import { ExpandableHeader } from '../components/expandable-header/expandable-header';
// import { FlashCardComponent } from '../components/flash-card/flash-card';
import { ToastService } from '../providers/util/toast.service';
import { AlertService } from '../providers/util/alert.service';
import { CameraProvider } from '../providers/util/camera.provider';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    NgCalendarModule,
    BrowserModule,
    IonicImageViewerModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      pageTransitionDelay: 10
    }),
    SuperTabsModule.forRoot(),
    IonicStorageModule.forRoot()
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
    File,
    AppUpdate,
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
    LaunchNavigator,
    DocumentViewer,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: LOCALE_ID, useValue: 'ro-RO' }
    
  ]
})
export class AppModule { }
