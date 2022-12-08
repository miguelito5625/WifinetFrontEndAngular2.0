import { Component } from '@angular/core';
import { NavigationStart, NavigationEnd, Router } from '@angular/router';

declare var Swal:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wifinet';

  constructor(
    private router: Router
  ){

    router.events.forEach((event) => {      
      if(event instanceof NavigationStart) {

        Swal.fire({
          title: 'Cargando',
          icon: 'info',
          html: 'Por favor, espere',
          timerProgressBar: true,
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading()
          }
        });
        
      }

      if(event instanceof NavigationEnd) {
        Swal.close();
        
      }
    });

  }

}
