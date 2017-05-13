import { IonicPage, NavController, Platform, AlertController, ViewController, ToastController } from 'ionic-angular';
import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '../../providers/google-maps';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Getlocation } from '../../providers/getlocation';
import { Http } from '@angular/http';

declare var google;

@IonicPage()
@Component({
  selector: 'page-googlemaps',
  templateUrl: 'googlemaps.html',
})
export class Googlemaps {
 
    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
    @ViewChild('directionsPanel') directionsPanel: ElementRef;
    public service;
    public latitude: number;
    public longitude: number;
    public autocompleteService: any;
    public placesService: any;
    public query: string = '';
    public places: any = [];
    public searchDisabled: boolean;
    public saveDisabled: boolean;
    public routeDisabled: boolean;
    public location: any;  
    public autocompleteItems:any = [];
    public autocomplete:any = [];
    public descriptions:any = [];
    public markerArray: any[] = [];
    public markerArrayy: any[] = [];
    private marker: any ;
    private infoWindow: any; 
    private testRadioResult: string = 'store';
    public restartMap: any;
    public map: any;
    constructor(public navCtrl: NavController,
                public alertCtrl: AlertController, 
                public toastCtrl: ToastController,
                private diagnostic: Diagnostic,
                public zone: NgZone,
                public maps: GoogleMaps, 
                public http: Http,
                public platform: Platform,
                public geolocation: Geolocation, 
                public getlocation: Getlocation,
                public viewCtrl: ViewController) {
       this.getlocation.startTracking();
    
    this.autocompleteItems = [];
      this.descriptions = [];
      this.autocomplete = {
        query: ''
    };
        this.searchDisabled = true;
        this.saveDisabled = true;
        this.routeDisabled = true;
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
    
    let successCallback = (isAvailable) => { if(!isAvailable) { this.loadSetGoogle(); }  };
    let errorCallback = (e) => console.log(e);
    this.diagnostic.isGpsLocationAvailable().then(successCallback).catch(errorCallback);
  //  this.diagnostic.isGpsLocationEnabled().then(successCallback, errorCallback);
  }

    public ionViewDidLoad(): void {
 
        this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {
            this.infoWindow =  new google.maps.InfoWindow;
            this.service = new google.maps.places.AutocompleteService();
            this.autocompleteService = new google.maps.places.AutocompleteService();
            this.placesService = new google.maps.places.PlacesService(this.maps.map);
            this.searchDisabled = false;
            this.routeDisabled = false;
        }); 
           
    }

    public ionViewWillUnload(): void {
      this.getlocation.stopTracking();
    }

    public setMap() {
        
        let me = this;
        for(let i = 0; i < this.markerArray.length; i++) {
          this.markerArray[i].setMap(null);
        }
        this.infoWindow =  new google.maps.InfoWindow;
        this.map = this.maps.map;
         let directionService = new google.maps.DirectionsService;
            let myLocation = new google.maps.LatLng(this.getlocation.lat, this.getlocation.lng);
            console.log(myLocation)
            let directionDisplay = new google.maps.DirectionsRenderer({map:me.map});
            this.marker = new google.maps.Marker({map:me.map,position:myLocation})
            google.maps.event.addListener(me.marker, 'click', function() {
                me.infoWindow.setContent('My Location !');
                me.infoWindow.open(me.map, this);
            })

            me.infoWindow.setContent('My location !');
            me.infoWindow.open(me.map, this.marker);
            let service = new google.maps.places.PlacesService(me.map);
                service.nearbySearch({
                location: myLocation,
                radius: 1000,
                type: me.testRadioResult
                }, callback);
            
            function callback(results, status) {
                if(status === google.maps.places.PlacesServiceStatus.OK) {
                    for(let i = 0; i < results.length; i++) {
                        createMarker(results[i], directionDisplay, directionService);
                    }
            }
            }

            function createMarker(place, directionDisplay, directionService) {
                
                console.log(place);
                let pointB = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
                let pointA = new google.maps.LatLng(me.getlocation.lat, me.getlocation.lng);
                let marker = new google.maps.Marker({
                    map:me.map,
                    position: place.geometry.location,
                    zIndex:99999999
                });
                me.markerArray.push(marker);
                let contentString:string = `<img style="width:24px;height:24px;" src =`+place.icon+` /><br>
                <strong> Info : </strong> `+place.name+`<br>
                <strong> Address : </strong>`+place.vicinity;
                google.maps.event.addListener(marker, 'click', function() {
                    me.infoWindow.setContent(contentString);
                    me.infoWindow.open(me.map, this);
                    me.calculateAndDisplayRoute(directionDisplay, directionService, me.infoWindow, me.map, pointA, pointB);
                    
                
                // this.http.get('http://atestate-inf.tk/ghidtest/date.php?user='+
                //  localStorage.getItem('user')+'&lat='+position.coords.latitude
                //  +'&lng='+position.coords.longitude
                //  +'&speed='+ position.coords.speed).map(res => res.json()).subscribe(data => { });
                    // Run update inside of Angular's zone
                    // 	this.zone.run(() => {
                        // this.lat = position.coords.latitude;
                    // 	this.lng = position.coords.longitude;
                    // });
                me.marker.setMap(null)
                me.marker = new google.maps.Marker({map: me.map, position:myLocation})
                me.saveDisabled = false;
                    me.calculateAndDisplayRoute(directionDisplay, directionService, me.infoWindow, me.map, pointA, pointB);
                    me.save(place.vicinity, place.geometry.location.lat(), place.geometry.location.lng())
                    })
                
       
            }
    }

    public selectPlace(place){
 
        this.places = [];
        let me = this;
        let location = {
            lat: null,
            lng: null,
            name: place.name
        };
        let stepDisplay = new google.maps.InfoWindow;

        this.placesService.getDetails({placeId: place.place_id}, (details) => {
 
            this.zone.run(() => {
 
                location.name = details.name;
                location.lat = details.geometry.location.lat();
                location.lng = details.geometry.location.lng();
                this.saveDisabled = false;
                this.routeDisabled = false;
                
                this.maps.map.setCenter({lat: location.lat, lng: location.lng}); 
                 let marker = new google.maps.Marker;
                    marker.setMap(null)
                    marker.setMap(me.maps.map);
                    marker.setPosition({lat: location.lat, lng: location.lng});
                    google.maps.event.addListener(marker, 'click', function() {
                    stepDisplay.setContent(location.name);
                    stepDisplay.open(me.maps.map, marker);
                  })
                this.location = location;
 
            });
 
        });
 
    }
 
    public searchPlace(){
 
        this.saveDisabled = true;
        this.routeDisabled = true;
        
        if(this.query.length > 0 && !this.searchDisabled) {
 
            let config = {
                types: ['geocode'],
                input: this.query
            }
 
            this.autocompleteService.getPlacePredictions(config, (predictions, status) => {
 
                if(status == google.maps.places.PlacesServiceStatus.OK && predictions){
 
                    this.places = [];
                    predictions.forEach((prediction) => {
                        this.places.push(prediction);
                    });
                }
 
            });
 
        } else {
            this.places = [];
        }
 
    }
 
    public save(place, placeLat, placeLng){
            this.showPrompt(place, placeLat, placeLng);
    }
 
    public close(){
        //nothing
    }   

    /**
   * startNavigating
   */
  public startNavigating() {
        let directionsService = new google.maps.DirectionsService;
        let directionsDisplay = new google.maps.DirectionsRenderer;
                     
 
        directionsDisplay.setMap(this.maps.map);
        directionsDisplay.setPanel(this.directionsPanel.nativeElement);
        directionsService.route({
          origin:  new google.maps.LatLng( this.getlocation.lat, this.getlocation.lng ),
            destination:new google.maps.LatLng( this.location.lat, this.location.lng ),
            travelMode: google.maps.TravelMode['WALKING']
        }, (res, status) => {
 
            if(status == google.maps.DirectionsStatus.OK){
                directionsDisplay.setDirections(res);
            } else {
                console.warn(status);
            }
 
        });
 
  }

   /**
  * 
  * @param address 
  * @param lat 
  * @param lng 
  */
  private showPrompt(address, lat, lng ) {
    let prompt = this.alertCtrl.create({
      title: 'Locatie',
      message: "Seteaza un nume pentru aceasta locatie !",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save ',
          handler: data => {
            if(data.title) {
              this.http.get('http://atestate-inf.tk/ghidtest/sendData.php?user='+localStorage.getItem('user')
                            +'&lat='+lat
                            +'&lng='+lng
                            +'&address='+address
                            +'&location='+data.title).
              map(res=>res.json()).
              subscribe(data);
            } else {
              this.http.get('http://atestate-inf.tk/ghidtest/sendData.php?user='+localStorage.getItem('user')
                            +'&lat='+lat
                            +'&lng='+lng
                            +'&address='+address
                            +'&location='+address).
              map(res=>res.json()).
              subscribe(data);
            }
          }
        }
      ]
    });
    prompt.present();
  }


   /**
   * 
   * @param directionDisplay 
   * @param directionService 
   * @param stepDisplay 
   * @param map 
   * @param pointA 
   * @param pointB 
   */
  public calculateAndDisplayRoute(directionDisplay, directionService, stepDisplay, map, pointA, pointB) {
    console.log('da')
    let me = this;
    directionService.route({
        origin:pointA,
        destination:pointB,
        travelMode:'WALKING'
    }, function(response, status) {
          if(status === 'OK') {
            console.log(response)
               directionDisplay.setDirections(response);
               directionDisplay.setPanel(null);
               directionDisplay.setPanel(me.directionsPanel.nativeElement);
               
               //directionDisplay.setPanel(document.getElementById('right'));
               /**
                * sectiunea urmatoare va genera indicatii pe traseu
                */
               let myRoute = response.routes[0].legs[0];
                for(let i = 0; i < myRoute.steps.length; i++) {
                    let marker = me.markerArrayy[i] = me.markerArrayy[i] || new google.maps.Marker;
                    marker.setMap(map);
                    marker.setPosition(myRoute.steps[i].start_location);
                    google.maps.event.addListener(marker, 'click', function() {
                    stepDisplay.setContent(myRoute.steps[i].instructions);
                    stepDisplay.open(map, marker);
                  })
               }
          } else {
            alert('Error'+status);
          }
    });
  }
 
}