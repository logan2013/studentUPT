import { MyApp } from '../../app/app.component';
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
import { LocationAccuracy } from '@ionic-native/location-accuracy';

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
  public mytheme: string = 'searchbar searchbar-md searchbar-left-aligned ';
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
  public canNavigate: any = false;
  public myLocation: boolean = true;
  public locatieNavigator: any = [];
  public locatie: any = [];
  music: string;
  musicAlertOpts: { title: string, subTitle: string };
  public infoWindow: any;
  constructor(
    public global: MyApp,
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
    private locationAccuracy: LocationAccuracy,
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
    }, {
      "title": "Căminul C4 Complexul Studenţesc",
      "website": '',
      "latitude": 45.747327,
      "longitude": 21.237525,
      "img": 'caminc4.jpg',
      "logo": "icon.png"
    }];
  }

  viewPlace(id) {
    //console.log('Clicked Marker', id);
  }

  loadSetGoogle() {
    let successCallback = (isAvailable) => {
      if (!isAvailable) {
        this.locationAccuracy.canRequest().then((canRequest: boolean) => {

          if (canRequest) {
            // the accuracy option will be ignored by iOS
            this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
              () => this.choosePosition(),
              error => console.log('Error requesting location permissions' + error)
            );
          }

        });
      } else {
        this.choosePosition()
      }
    };
    let errorCallback = (e) => console.log(e);
    this.diagnostic.isGpsLocationAvailable().then(successCallback).catch(errorCallback);
  }

  loadMaps() {
    if (!!google) {
      this.initializeMap();
      this.initAutocomplete();
    } else {
      this.errorAlert('Error', 'S-a întâmplat ceva în legătură cu conexiunea la Internet. Verificați-vă Internetul.')
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
      // console.log('Searchdata', location);

      let options = {
        center: location.geometry.location,
        zoom: 15
      };
      this.map.setOptions(options);
      try {
        console.log('asda')
        this.addMarker(location.geometry.location, '<div style="padding:3px;"><p><b>' + location.name +
          '</b></p>' + location.adr_address +
          '<br></div> <div style="text-align:center;display:block;"><img  align="middle" src=' + location.photos[0].getUrl({ 'maxWidth': 200, 'maxHeight': 200 }) +
          ' imageViewer /></div>', false);
      }
      catch (e) {
        if (location.photos == undefined) {
          this.addMarker(location.geometry.location, '<div style="padding:3px;"><p><b>' + location.name + '</b></p>' + location.adr_address + '<br></div> <div style="text-align:center;display:block;">', false);
        }
      }
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
        styles: [{ elementType: 'geometry', stylers: [{ color: '#ebe3cd' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#523735' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f1e6' }] },
        {
          featureType: 'administrative',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#c9b2a6' }]
        },
        {
          featureType: 'administrative.land_parcel',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#dcd2be' }]
        },
        {
          featureType: 'administrative.land_parcel',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#ae9e90' }]
        },
        {
          featureType: 'landscape.natural',
          elementType: 'geometry',
          stylers: [{ color: '#dfd2ae' }]
        },
        {
          featureType: 'poi',
          elementType: 'geometry',
          stylers: [{ color: '#dfd2ae' }]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#93817c' }]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry.fill',
          stylers: [{ color: '#a5b076' }]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#447530' }]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ color: '#f5f1e6' }]
        },
        {
          featureType: 'road.arterial',
          elementType: 'geometry',
          stylers: [{ color: '#fdfcf8' }]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{ color: '#f8c967' }]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#e9bc62' }]
        },
        {
          featureType: 'road.highway.controlled_access',
          elementType: 'geometry',
          stylers: [{ color: '#e98d58' }]
        },
        {
          featureType: 'road.highway.controlled_access',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#db8555' }]
        },
        {
          featureType: 'road.local',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#806b63' }]
        },
        {
          featureType: 'transit.line',
          elementType: 'geometry',
          stylers: [{ color: '#dfd2ae' }]
        },
        {
          featureType: 'transit.line',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#8f7d77' }]
        },
        {
          featureType: 'transit.line',
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#ebe3cd' }]
        },
        {
          featureType: 'transit.station',
          elementType: 'geometry',
          stylers: [{ color: '#dfd2ae' }]
        },
        {
          featureType: 'water',
          elementType: 'geometry.fill',
          stylers: [{ color: '#b9d3c2' }]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#92998d' }]
        }],
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
          img: regional.img,
          icon: 'http://maps.google.com/mapfiles/ms/icons/red-pushpin.png'

        };

        regional.marker = new google.maps.Marker(markerData);
        this.markersArray.push(regional.marker);
        this.addMarker(markerData.position, "<div><table><tr><td><img align='middle' style='margin-top:5px;padding:3px;' width='40px;'src='http://193.226.9.153/images/" + regional.logo +
          "' imageViewer/>&nbsp;&nbsp;</td><td><p style='text-align:center;display:block;'><b>" + regional.title +
          "</p></b></td></table><div style='text-align:center;display:block;'><img  width='180px;'src='http://193.226.9.153/images/" + regional.img + "'/ > <div><br></div>", true);
        regional.marker.addListener('click', () => {
          for (let c of this.regionals) {
            c.current = false;
          }
          this.currentregional = regional;
          regional.current = true;
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
    for (let i = 0; i < this.markersArray.length; i++) {
      if (markerInfo.title == this.markersArray[i].title) {
        this.map.panTo(this.markersArray[i].getPosition());

        this.map.setZoom(16);
        try {
          this.infoWindow.close()
        } catch (error) {

        }
        this.infoWindow = new google.maps.InfoWindow({
          content: "<div><table><tr><td><img style='margin-top:5px;' width='35px;'src='http://193.226.9.153/images/" + markerInfo.logo +
            "' /> &nbsp;&nbsp;</td><td><p><b>" + markerInfo.title + "</p></b></td></table><img width='200px;'src='http://193.226.9.153/images/" + markerInfo.img +
            "'/ > <br></div>"
        });
        this.infoWindow.open(this.map, this.markersArray[i]);

      }
    }
  }

  openBrowser(website) {
    this.iab.create(website);
  }

  openNavigator(location) {
    try {
      let options: LaunchNavigatorOptions = {
        start: this.locatieNavigator
      };

      this.launchNavigator.navigate([location.latitude, location.longitude], options)
        .then(
          success => console.log('Launched navigator'),
          error => alert('Error launching navigator' + error)
        );
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
        let marker = this.addMarker(myPos, "Ultima mea locație salvată ", false);

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
          title: 'Ultima Locatie: ' + result.location,
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
                this.showToast('Locatie stearge!');
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
      content: 'Căuta locație...'
    });
    this.loading.present();

    let locationOptions = { frequency: 3000, enableHighAccuracy: true, timeout: 10000, maximumAge: 3000 };

    this.geolocation.getCurrentPosition(locationOptions).then(
      (position) => {
        this.loading.dismiss().then(() => {

          this.showToast('Locație gasita!');
          this.myLocation = false;
          this.mytheme = "searchbar searchbar-md searchbar-left-aligned show";
          this.watchlocaiton = 0;
          this.locatieNavigator = [position.coords.latitude, position.coords.longitude];
          let myPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          this.locatie = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

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
        this.loading.dismiss().then(() => {
          this.showToast('Locația nu a fost găsită. Activați GPS-ul dvs. sau reporniți această aplicație sau telefon! Mulțumesc !');

          console.log(error);
        });
      }
    )
  }

  getPlaces(type) {
    var service = new google.maps.places.PlacesService(this.map);
    let request = {
      location: this.locatie,
      radius: 1000,
      type: type
    };
    return new Promise((resolve, reject) => {
      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(results);
        }
      });
    });

  }

  toggleSearch() {
    if (this.search) {
      this.search = false;
    } else {
      this.search = true;
    }
  }



  addMarker(position, content, data) {
    if (data != false && data != true) {

      let marker = new google.maps.Marker({
        map: this.map,
        position: position,
      });

      this.addInfoWindow(marker, content);
      return marker;
    } else if (data == false) {
      console.log('asda')
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
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-pushpin.png'
      });

      this.addInfoWindow(marker, content);
      return marker;
    }
  }

  addInfoWindow(marker, content) {

    google.maps.event.addListener(marker, 'click', () => {
      this.canNavigate = true;
      try {
        this.infoWindow.close();
      } catch (error) {

      }
      this.infoWindow = new google.maps.InfoWindow({
        content: content
      });
      this.infoWindow.open(this.map, marker);
    });
  }


  public searchPlaces(data) {
    this.initializeMap();
    this.getPlaces(data).then((results: Array<any>) => {
      for (let i = 0; i < results.length; i++) {
        this.getInfoPlaces(results[i]).then((data: any) => {
          try {

            this.addMarker(data.geometry.location, '<div style="text-align:center;display:block;"><p><b>' + data.name +
              '</div><div style="text-align:justify;display:block;"></b></p> <p><b>Adresa :</b> ' + data.formatted_address +
              '</p><p><b>Telefon : </b>' + data.formatted_phone_number +
              '</p><p><b>Deschis : </b>' + data.opening_hours.open_now +
              '</p><p><b>Website : </b><a href=' + data.website + '>' + data.website +
              '</a></p><p><b>Rating : </b>' + data.rating +
              '</p><br></div> <div style="text-align:center;display:block;"><img  align="middle" src=' + data.photos[0].getUrl({ 'maxWidth': 200, 'maxHeight': 200 }) + ' imageViewer /></div>', data.icon);
          }
          catch (e) {
            if (data.website == undefined && data.photos == undefined) {
              this.addMarker(data.geometry.location, '<div style="text-align:center;display:block;"><p><b>' + data.name +
                '</div><div style="text-align:justify;display:block;"></b></p> <p><b>Adresa :</b> ' + data.formatted_address +
                '</p><p><b>Telefon : </b>' + data.formatted_phone_number +
                '</p><p><b>Deschis : </b>' + data.opening_hours.open_now +
                '</a></p><p><b>Rating : </b>' + data.rating +
                '</p><br></div>', data.icon);
            } else if (data.website == undefined && data.photos != undefined) {
              this.addMarker(data.geometry.location, '<div style="text-align:center;display:block;"><p><b>' + data.name +
                '</div><div style="text-align:justify;display:block;"></b></p> <p><b>Adresa :</b> ' + data.formatted_address +
                '</p><p><b>Telefon : </b>' + data.formatted_phone_number +
                '</p><p><b>Deschis : </b>' + data.opening_hours.open_now +
                '</a></p><p><b>Rating : </b>' + data.rating +
                '</p><br></div> <div style="text-align:center;display:block;"><img  align="middle" src=' + data.photos[0].getUrl({ 'maxWidth': 200, 'maxHeight': 200 }) + ' imageViewer /></div>', data.icon);
            } else if (data.photos == undefined) {
              this.addMarker(data.geometry.location, '<div style="padding:3px;"><p><b>' + data.name + '</b></p>' + data.vicinity + '<br></div> <div style="text-align:center;display:block;">', data.icon);
            }
          }
        });
      }
    }, (status) => console.log(status));
  }

  public getInfoPlaces(data) {
    var service = new google.maps.places.PlacesService(this.map);
    let request = {
      placeId: data.place_id
    };
    return new Promise((resolve, reject) => {
      service.getDetails(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(results);
        } else {
          reject(status);
        }
      })
    });
  }
}