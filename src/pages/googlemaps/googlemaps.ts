import { identifierModuleUrl } from '@angular/compiler/compiler';
import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, ActionSheetController, AlertController, App, LoadingController, NavController, Platform, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Getlocation } from '../../providers/getlocation';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { Diagnostic } from '@ionic-native/diagnostic';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
declare var google: any;
@IonicPage()
@Component({
  selector: 'page-googlemaps',
  templateUrl: 'googlemaps.html'
})
export class Googlemaps {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('searchbar', { read: ElementRef }) searchbar: ElementRef;
  addressElement: HTMLInputElement = null;

  listSearch: string = '';

  map: any;
  marker: any;
  loading: any;
  search: boolean = false;
  error: any;
  switch: string = "map";
  watchlocaiton: number = 1;

  regionals: any = [];
  currentregional: any;
  markersArray = [];
  public myLocation: boolean = true;
  public locatieNavigator: any = [];
  constructor(
    private iab: InAppBrowser,
    private diagnostic: Diagnostic,
    private launchNavigator: LaunchNavigator,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public getlocation: Getlocation,
    public app: App,
    public nav: NavController,
    public zone: NgZone,
    public platform: Platform,
    public alertCtrl: AlertController,
    public storage: Storage,
    public actionSheetCtrl: ActionSheetController,
    public geolocation: Geolocation
  ) {
    this.platform.ready().then(() => this.loadMaps());
    this.regionals = [{
      "title": "Facultatea de Automatica si Calculatoare",
      "website": "http://www.ac.upt.ro",
      "latitude": 45.747322,
      "longitude": 21.2262,
      "img": 'ac/descriereac.jpg',
      "logo": 'ac/ac.png'
    }, {
      "title": "Facultatea de Electrotehnica si Electroenergetica",
      "website": "http://www.et.upt.ro",
      "latitude": 45.746837,
      "longitude": 21.227275,
      "img": 'ee/descriereee.jpg',
      "logo": 'ee/ee.png'
    }, {
      "title": "Facultatea de Electronica si Telecomunicatii",
      "website": "http://www.etc.upt.ro",
      "latitude": 45.747286,
      "longitude": 21.2263,
      "img": 'etc/descriereetc.jpg',
      "logo": 'etc/etc.png'
    }, {
      "title": "Facultatea de Mecanica",
      "website": "http://www.mec.upt.ro",
      "latitude": 45.745953,
      "longitude": 21.225835,
      "img": 'mt/descrieremt.jpg',
      "logo": 'mt/mt.png'
    }, {
      "title": "Facultatea de Management în Producţie şi Transporturi",
      "website": "http://www.mpt.upt.ro",
      "latitude": 45.745718,
      "longitude": 21.222742,
      "img": 'mpt/descrierempt.jpg',
      "logo": 'mpt/mpt.png'
    }, {
      "title": "Facultatea de Constructii",
      "website": "http://www.ct.upt.ro",
      "latitude": 45.745552,
      "longitude": 21.229909,
      "img": 'ostl/descriereostl.jpg',
      "logo": 'ostl/ostl.png'
    }, {
      "title": "Facultatea de Arhitectura și Urbanism",
      "website": "http://www.arh.upt.ro",
      "latitude": 45.745495,
      "longitude": 21.229845,
      "img": 'a4/descrierea4.jpg',
      "logo": 'a4/a4.png'
    }, {
      "title": "Rectorat Universitatea Politehnica Timisoara",
      "website": "http://www.upt.ro",
      "latitude": 45.753621,
      "longitude": 21.225085,
      "img": 'upt/legitimatie.jpg',
      "logo": 'icon.png'
    }, {
      "title": "Facultatea de Chimie Industriala si Ingineria Mediului",
      "website": "http://www.chim.upt.ro/ro/",
      "latitude": 45.747674,
      "longitude": 21.233203,
      "img": 'ct/descrierect.jpg',
      "logo": 'ct/ct.png'
    }, {
      "title": "Facultatea de Ştiinţe ale Comunicării",
      "website": "https://sc.upt.ro/ro/",
      "latitude": 45.74557,
      "longitude": 21.229878,
      "img": 'fsc/descrierefsc.jpg',
      "logo": 'fsc/fsc.png'
    }, {
      "title": "Restaurant universitar",
      "website": '',
      "latitude": 45.748358,
      "longitude": 21.239724,
      "img": 'upt/cantina.jpg',
      "logo": "icon.png"
    }];
  }

  viewPlace(id) {
    //console.log('Clicked Marker', id);
  }

  loadSetGoogle() {
    let confirm = this.alertCtrl.create({
      title: 'Nu s-a putut determina locatia',
      message: 'Pentru a putea obtine locatia curenta va rugam sa activati GPS cu optiunea de precizie ridicata!',
      buttons: [
        {
          text: 'Renunta',
          handler: () => {
            this.toastCtrl.create({
              message: 'Nu s-a putut determina locatia cu acuratete maxima !',
              duration: 3000
            }).present();
          }
        },
        {
          text: 'Activeaza',
          handler: () => {
            this.diagnostic.switchToLocationSettings();
          }
        }
      ]
    });
    confirm.present();
  }


  public ionViewCanEnter() {

    let successCallback = (isAvailable) => { if (!isAvailable) { this.loadSetGoogle(); } };
    let errorCallback = (e) => console.log(e);
    this.diagnostic.isGpsLocationAvailable().then(successCallback).catch(errorCallback);
    //  this.diagnostic.isGpsLocationEnabled().then(successCallback, errorCallback);
  }


  loadMaps() {
    if (!!google) {
      this.initializeMap();
      this.initAutocomplete();
    } else {
      this.errorAlert('Error', 'Something went wrong with the Internet Connection. Please check your Internet.')
    }
  }

  errorAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            this.loadMaps();
          }
        }
      ]
    });
    alert.present();
  }

  mapsSearchBar(ev: any) {
    // set input to the value of the searchbar
    //this.search = ev.target.value;
    console.log(ev);
    const autocomplete = new google.maps.places.Autocomplete(ev);
    autocomplete.bindTo('bounds', this.map);
    return new Observable((sub: any) => {
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          sub.error({
            message: 'Autocomplete returned place with no geometry'
          });
        } else {
          sub.next(place.geometry.location);
          sub.complete();
        }
      });
    });
  }

  initAutocomplete(): void {
    // reference : https://github.com/driftyco/ionic/issues/7223
    this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
    this.createAutocomplete(this.addressElement).subscribe((location) => {
      console.log('Searchdata', location);

      let options = {
        center: location.geometry.location,
        zoom: 15
      };
      this.map.setOptions(options);
      this.addMarker(location.geometry.location, '<p><b>'+location.name+ '</b></p>'+location.adr_address +'<br><img src='+ location.photos[0].getUrl({'maxWidth': 200, 'maxHeight': 200})+' imageViewer />', false);

    });
  }

  createAutocomplete(addressEl: HTMLInputElement): Observable<any> {
    const autocomplete = new google.maps.places.Autocomplete(addressEl);
    autocomplete.bindTo('bounds', this.map);
    return new Observable((sub: any) => {
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          sub.error({
            message: 'Autocomplete returned place with no geometry'
          });
        } else {
          console.log(place)
          console.log('Search Lat', place.geometry.location.lat());
          console.log('Search Lng', place.geometry.location.lng());
          sub.next(place);
          //sub.complete();
        }
      });
    });
  }

  initializeMap() {
    this.zone.run(() => {
      var mapEle = this.mapElement.nativeElement;
      google.maps.InfoWindow.prototype.opened = false;

      this.map = new google.maps.Map(mapEle, {
        zoom: 15,
        center: { lat: 45.747252, lng: 21.229041 }, //complex
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        // styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }],
      });

      for (let regional of this.regionals) {
        regional.distance = 0;
        regional.visible = false;
        regional.current = false;
        //console.log(regional)
        let markerData = {
          position: {
            lat: regional.latitude,
            lng: regional.longitude
          },
          map: this.map,
          title: regional.title,
          img: regional.img
        };

        regional.marker = new google.maps.Marker(markerData);
        this.markersArray.push(regional.marker);
        this.addMarker(markerData.position, "<div><table><tr><td><img style='margin-top:5px;' width='40px;'src='http://193.226.9.153/images/" + regional.logo + "' imageViewer/>&nbsp;&nbsp;</td><td><p><b>" + regional.title + "</p></b></td></table><img width='200px;'src='http://193.226.9.153/images/" + regional.img + "'/ imageViewer> <br></div>", true)
        regional.marker.addListener('click', () => {
          for (let c of this.regionals) {
            c.current = false;
            //c.infoWindow.close();
          }
          this.currentregional = regional;
          regional.current = true;

          // regional.infoWindow.open(this.map, regional.marker);
          this.map.panTo(regional.marker.getPosition());
        });
      }


      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        google.maps.event.trigger(this.map, 'resize');
        mapEle.classList.add('show-map');
        this.bounceMap(this.markersArray);
        this.getCurrentPositionfromStorage(this.markersArray)
      });

      google.maps.event.addListener(this.map, 'bounds_changed', () => {
        this.zone.run(() => {
          this.resizeMap();
        });
      });


    });
  }
  openLocation(markerInfo) {
    console.log(this.markersArray, markerInfo)

    for (let i = 0; i < this.markersArray.length; i++) {

      if (markerInfo.title == this.markersArray[i].title) {
        this.map.panTo(this.markersArray[i].getPosition());
        this.map.setZoom(16);
        let infoWindow = new google.maps.InfoWindow({
          content: "<div><table><tr><td><img style='margin-top:5px;' width='35px;'src='http://193.226.9.153/images/" + markerInfo.logo + "' imageViewer/> &nbsp;&nbsp;</td><td><p><b>" + markerInfo.title + "</p></b></td></table><img width='200px;'src='http://193.226.9.153/images/" + markerInfo.img + "'/ imageViewer> <br></div>"
        });
        infoWindow.open(this.map, this.markersArray[i]);
        console.log(this.markersArray, markerInfo)

      }
    }

  }

  openBrowser(website) {
    this.iab.create(website);
  }

  openNavigator(location) {
    //alert(location.latitude)
    try {
      window.open('geo://' + this.locatieNavigator[0] + ',' + this.locatieNavigator[1] + '?q=' + location.latitude + ',' + location.longitude + '(' + location.title + ')', '_system');


      // console.log(this.locatieNavigator, location)
      // let options: LaunchNavigatorOptions = {
      //   start: [location.latitude , location.longitude]
      // };

      // this.launchNavigator.navigate([this.locatieNavigator[0],this.locatieNavigator[1]] , options)
      //   .then(
      //   success => console.log('Launched navigator'),
      //   error => alert('Error launching navigator' + error)
      //   );
    }
    catch (e) {
      alert(e)
    }
  }
  //Center zoom
  //http://stackoverflow.com/questions/19304574/center-set-zoom-of-map-to-cover-all-visible-markers
  bounceMap(markers) {
    let bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < markers.length; i++) {
      bounds.extend(markers[i].getPosition());
    }

    this.map.fitBounds(bounds);
  }

  resizeMap() {
    setTimeout(() => {
      google.maps.event.trigger(this.map, 'resize');
    }, 20);
  }

  getCurrentPositionfromStorage(markers) {
    this.storage.get('lastLocation').then((result) => {
      if (result) {
        let myPos = new google.maps.LatLng(result.lat, result.long);
        this.map.setOptions({
          center: myPos,
          zoom: 14
        });
        let marker = this.addMarker(myPos, "My last saved Location ", false);

        markers.push(marker);
        this.bounceMap(markers);

        this.resizeMap();
      }
    });
  }

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  choosePosition() {
    this.storage.get('lastLocation').then((result) => {
      if (result) {
        let actionSheet = this.actionSheetCtrl.create({
          title: 'Last Location: ' + result.location,
          buttons: [
            {
              text: 'Reload',
              handler: () => {
                this.getCurrentPosition();
              }
            },
            {
              text: 'Delete',
              handler: () => {
                this.storage.set('lastLocation', null);
                this.showToast('Location deleted!');
                this.initializeMap();
              }
            },
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
              }
            }
          ]
        });
        actionSheet.present();
      } else {
        this.getCurrentPosition();

      }
    });
  }

  // go show currrent location
  getCurrentPosition() {
    this.loading = this.loadingCtrl.create({
      content: 'Searching Location ...'
    });
    this.loading.present();

    let locationOptions = { frequency: 3000, enableHighAccuracy: true, timeout: 10000, maximumAge: 3000 };

    this.geolocation.getCurrentPosition(locationOptions).then(
      (position) => {
        this.loading.dismiss().then(() => {

          this.showToast('Location found!');
          this.myLocation = false;

          this.watchlocaiton = 0;
          // console.log(position.coords.latitude, position.coords.longitude);
          this.locatieNavigator = [position.coords.latitude, position.coords.longitude];
          let myPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          let options = {
            center: myPos,
            zoom: 14
          };
          this.map.setOptions(options);
          this.addMarker(myPos, "Locatia mea!", false);

          let alert = this.alertCtrl.create({
            title: 'Location',
            message: 'Do you want to save the Location?',
            buttons: [
              {
                text: 'Cancel'
              },
              {
                text: 'Save',
                handler: data => {
                  let lastLocation = { lat: position.coords.latitude, long: position.coords.longitude };
                  console.log(lastLocation);
                  this.storage.set('lastLocation', lastLocation).then(() => {
                    this.showToast('Location saved');
                  });
                }
              }
            ]
          });
          alert.present();

        });
      },
      (error) => {
        // this.myLocation = true;

        // this.watchlocaiton = 1;
        // if (this.watchlocaiton == 1) {

        //   this.showToast('Locația dvs. nu poate fi stabilită cu acuratete maxima.');
        //   console.log(this.getlocation.lat, this.getlocation.lng);
        //   this.locatieNavigator = [this.getlocation.lat, this.getlocation.lng];

        //   let myPos = new google.maps.LatLng(this.getlocation.lat, this.getlocation.lng);
        //   let options = {
        //     center: myPos,
        //     zoom: 14
        //   };
        //   this.map.setOptions(options);
        //   this.addMarker(myPos, "Locatia mea!", false);

        //   let alert = this.alertCtrl.create({
        //     title: 'Location',
        //     message: 'Do you want to save the Location?',
        //     buttons: [
        //       {
        //         text: 'Cancel'
        //       },
        //       {
        //         text: 'Save',
        //         handler: data => {
        //           let lastLocation = { lat: this.getlocation.lat, long: this.getlocation.lng };
        //           console.log(lastLocation);
        //           this.storage.set('lastLocation', lastLocation).then(() => {
        //             this.showToast('Location saved');
        //           });
        //         }
        //       }
        //     ]
        //   });
        //   alert.present();

        //   this.watchlocaiton = 0;
        // } else {
        this.loading.dismiss().then(() => {
          this.showToast('Location not found. Please enable your GPS or restart this app or phone! Thank you !');

          console.log(error);
        });
        // }

      }
    )
  }

  toggleSearch() {
    if (this.search) {
      this.search = false;
    } else {
      this.search = true;
    }
  }

  addMarker(position, content, data) {
    if (data == false) {

      let marker = new google.maps.Marker({
        map: this.map,
        position: position,
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
      });

      this.addInfoWindow(marker, content);
      return marker;
    } else {
      let marker = new google.maps.Marker({
        map: this.map,
        position: position,
      });

      this.addInfoWindow(marker, content);
      return marker;
    }
  }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

}