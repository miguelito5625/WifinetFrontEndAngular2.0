import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PruebasDatatableService } from 'src/app/servicios/pruebas/pruebas-datatable.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';


declare var $:any;

@Component({
  selector: 'app-prueba-datatable',
  templateUrl: './prueba-datatable.component.html',
  styleUrls: ['./prueba-datatable.component.css']
})
export class PruebaDatatableComponent implements OnInit {

  profileForm = new FormGroup({
    inputName: new FormControl('Marco'),
    inputPosition: new FormControl('tecnico'),
    inputOffice: new FormControl('TI')
  });

  rows = [];

  temp = [];

  columns = [{ name: 'Name' }, { name: 'Company' }, { name: 'Gender' }, {name: 'Age'}];
  @ViewChild(DatatableComponent,) table: DatatableComponent;

  ColumnMode = ColumnMode;

  constructor(
    private servicioPrueba: PruebasDatatableService
  ) {
    // this.fetch(data => {
    //   // cache our list
    //   this.temp = [...data];

    //   // push our inital complete list
    //   this.rows = data;
    // });
    this.temp = [...this.servicioPrueba.persons];
    this.rows = this.servicioPrueba.persons;
  }

  ngOnInit(){

  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/data.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  async onSubmit(){
    let newPerson = {
      name: this.profileForm.controls.inputName.value,
      gender: this.profileForm.controls.inputPosition.value,
      company: this.profileForm.controls.inputOffice.value,
      age: 40
    };

    // {
    //   "name": "Claudine Neal",
    //   "gender": "female",
    //   "company": "Sealoud",
    //   "age": 55
    // }

    await this.servicioPrueba.persons.push(newPerson);
    this.temp = [...this.servicioPrueba.persons];
    this.rows = this.temp;
    // console.log(this.persons);
   
  }

}
