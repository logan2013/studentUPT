import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Chart } from 'chart.js';

/**
 * Generated class for the ShowChart page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-show-chart',
  templateUrl: 'show-chart.html',
})
export class ShowChart {

  // @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas1') doughnutCanvas1;
  @ViewChild('doughnutCanvas2') doughnutCanvas2;
  @ViewChild('doughnutCanvas3') doughnutCanvas3;
  @ViewChild('doughnutCanvas4') doughnutCanvas4;
  @ViewChild('doughnutCanvas5') doughnutCanvas5;
  @ViewChild('doughnutCanvas6') doughnutCanvas6;
  @ViewChild('doughnutCanvas7') doughnutCanvas7;
  @ViewChild('doughnutCanvas8') doughnutCanvas8;
  @ViewChild('doughnutCanvas9') doughnutCanvas9;
  @ViewChild('doughnutCanvas10') doughnutCanvas10;
  @ViewChild('doughnutCanvas11') doughnutCanvas11;
  
  
  // @ViewChild('lineCanvas') lineCanvas;
  barChart: any;
  doughnutChart: any;
  lineChart: any;
  valori: any;
  public hide1: boolean = true;
  public hide2: boolean = true;
  public hide3: boolean = true;
  public hide4: boolean = true;
  public hide5: boolean = true;
  public hide6: boolean = true;
  public hide7: boolean = true;
  public hide8: boolean = true;
  public hide9: boolean = true;
  public hide10: boolean = true;
  public hide11: boolean = true;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.valori = navParams.get('item');
    console.log(this.valori.statistici[0].chart[0].sectia)
 
  }

  ionViewDidLoad() {

    this.showChart(this.valori.statistici[0].chart)
  }
  showChart(data :any) {
    console.log(data);
    // this.barChart = new Chart(this.barCanvas.nativeElement, {

    //   type: 'bar',
    //   data: {
    //     labels: data[0].nume,
    //     datasets: [{
    //       label: '# candidați înscriși ',
    //       data: data[0].valori,
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.2)',
    //         'rgba(54, 162, 235, 0.2)',
    //         'rgba(255, 206, 86, 0.2)',
    //         'rgba(75, 192, 192, 0.2)',
    //         'rgba(153, 102, 255, 0.2)',
    //         'rgba(255, 159, 64, 0.2)'
    //       ],
    //       borderColor: [
    //         'rgba(255,99,132,1)',
    //         'rgba(54, 162, 235, 1)',
    //         'rgba(255, 206, 86, 1)',
    //         'rgba(75, 192, 192, 1)',
    //         'rgba(153, 102, 255, 1)',
    //         'rgba(255, 159, 64, 1)'
    //       ],
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     scales: {
    //       yAxes: [{
    //         ticks: {
    //           beginAtZero: true
    //         }
    //       }]
    //     }
    //   }

    // });

    this.doughnutChart = new Chart(this.doughnutCanvas1.nativeElement, {

      type: 'doughnut',
      data: {
        labels: data[0].nume,
        datasets: [{
          label: '# candidați înscriși',
          data: data[0].valori,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
      }

    });

    this.doughnutChart = new Chart(this.doughnutCanvas2.nativeElement, {

      type: 'doughnut',
      data: {
        labels: data[1].nume,
        datasets: [{
          label: '# candidați înscriși',
          data: data[1].valori,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
      }

    });

  this.doughnutChart = new Chart(this.doughnutCanvas3.nativeElement, {

      type: 'doughnut',
      data: {
        labels: data[2].nume,
        datasets: [{
          label: '# candidați înscriși',
          data: data[2].valori,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
      }

    });
      this.doughnutChart = new Chart(this.doughnutCanvas4.nativeElement, {

      type: 'doughnut',
      data: {
        labels: data[3].nume,
        datasets: [{
          label: '# candidați înscriși',
          data: data[3].valori,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
      }

    });
      this.doughnutChart = new Chart(this.doughnutCanvas5.nativeElement, {

      type: 'doughnut',
      data: {
        labels: data[4].nume,
        datasets: [{
          label: '# candidați înscriși',
          data: data[4].valori,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
      }

    });
      this.doughnutChart = new Chart(this.doughnutCanvas6.nativeElement, {

      type: 'doughnut',
      data: {
        labels: data[5].nume,
        datasets: [{
          label: '# candidați înscriși',
          data: data[5].valori,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
      }

    });
      this.doughnutChart = new Chart(this.doughnutCanvas7.nativeElement, {

      type: 'doughnut',
      data: {
        labels: data[6].nume,
        datasets: [{
          label: '# candidați înscriși',
          data: data[6].valori,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
      }

    });
      this.doughnutChart = new Chart(this.doughnutCanvas8.nativeElement, {

      type: 'doughnut',
      data: {
        labels: data[7].nume,
        datasets: [{
          label: '# candidați înscriși',
          data: data[7].valori,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
      }

    });
      this.doughnutChart = new Chart(this.doughnutCanvas9.nativeElement, {

      type: 'doughnut',
      data: {
        labels: data[8].nume,
        datasets: [{
          label: '# candidați înscriși',
          data: data[8].valori,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
      }

    });
       this.doughnutChart = new Chart(this.doughnutCanvas10.nativeElement, {

      type: 'doughnut',
      data: {
        labels: data[9].nume,
        datasets: [{
          label: '# candidați înscriși',
          data: data[9].valori,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
      }

    });
     this.doughnutChart = new Chart(this.doughnutCanvas11.nativeElement, {

      type: 'doughnut',
      data: {
        labels: data[10].nume,
        datasets: [{
          label: '# candidați înscriși',
          data: data[10].valori,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
                 'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
                 'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ]
        }]
      }

    });
    // this.lineChart = new Chart(this.lineCanvas.nativeElement, {

    //   type: 'line',
    //   data: {
    //     labels: data[0].nume,
    //     datasets: [
    //       {
    //         label: "My First dataset",
    //         fill: false,
    //         lineTension: 0.1,
    //         backgroundColor: "rgba(75,192,192,0.4)",
    //         borderColor: "rgba(75,192,192,1)",
    //         borderCapStyle: 'butt',
    //         borderDash: [],
    //         borderDashOffset: 0.0,
    //         borderJoinStyle: 'miter',
    //         pointBorderColor: "rgba(75,192,192,1)",
    //         pointBackgroundColor: "#fff",
    //         pointBorderWidth: 1,
    //         pointHoverRadius: 5,
    //         pointHoverBackgroundColor: "rgba(75,192,192,1)",
    //         pointHoverBorderColor: "rgba(220,220,220,1)",
    //         pointHoverBorderWidth: 2,
    //         pointRadius: 1,
    //         pointHitRadius: 10,
    //         data: data[0].valori,
    //         spanGaps: false,
    //       }
    //     ]
    //   }

    // });

  }

  
  chart1() {
    this.hide1 = !this.hide1;
  }
  chart2() {
    this.hide2 = !this.hide2;
    
  }
  chart3() {
    this.hide3 = !this.hide3;
  
}
  chart4() {
    this.hide4 = !this.hide4;
    
  }
  chart5() {
    this.hide5 = !this.hide5;
    
  }
  chart6() {
    this.hide6 = !this.hide6;
    
  }
  chart7() {
    this.hide7 = !this.hide7;
    
  }
  chart8() {
    this.hide8 = !this.hide8;
    
  }
  chart9() {
    this.hide9 = !this.hide9;
    
  }
chart10() {
    this.hide10 = !this.hide10;

  }
  chart11() {
    this.hide11 = !this.hide11;

  }
  goBack() {
    this.navCtrl.pop();
  }
}
