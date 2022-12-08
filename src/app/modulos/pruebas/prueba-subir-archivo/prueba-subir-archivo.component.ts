import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { SubirArchivoService } from 'src/app/servicios/pruebas/subir-archivo.service';

declare var $:any;

@Component({
  selector: 'app-prueba-subir-archivo',
  templateUrl: './prueba-subir-archivo.component.html',
  styleUrls: ['./prueba-subir-archivo.component.css']
})
export class PruebaSubirArchivoComponent implements OnInit, AfterViewInit {

  @ViewChild('labelImport') labelImport: ElementRef;
  @ViewChild('inputFilePdf', { static: false }) inputFilePdf: ElementRef;

  fileToUpload: File = null;

  onFileChange(files: FileList) {
    this.labelImport.nativeElement.value = Array.from(files)
      .map(f => f.name)
      .join(', ');
    this.fileToUpload = files.item(0);
  }

  formularioPrueba = new FormGroup({
    correo: new FormControl(''),
    password: new FormControl(''),
    importFile: new FormControl('')
  });

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private servicioSubirArchivo: SubirArchivoService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
     // FileInput
    //  $('.form-file-simple .inputFileVisible').click(function() {
    //   $(this).siblings('.inputFileHidden').trigger('click');
    // });

    // $('.form-file-simple .inputFileHidden').change(function() {
    //   var filename = $(this).val().replace(/C:\\fakepath\\/i, '');
    //   $(this).siblings('.inputFileVisible').val(filename);
    // });

    $('.form-file-multiple .inputFileVisible, .form-file-multiple .input-group-btn').click(function() {
      $(this).parent().parent().find('.inputFileHidden').trigger('click');
      $(this).parent().parent().addClass('is-focused');
    });

    // $('.form-file-multiple .inputFileHidden').change(function() {
    //   var names = '';
    //   for (var i = 0; i < $(this).get(0).files.length; ++i) {
    //     if (i < $(this).get(0).files.length - 1) {
    //       names += $(this).get(0).files.item(i).name + ',';
    //     } else {
    //       names += $(this).get(0).files.item(i).name;
    //     }
    //   }
    //   $(this).siblings('.input-group').find('.inputFileVisible').val(names);
    // });

    // $('.form-file-multiple .btn').on('focus', function() {
    //   $(this).parent().siblings().trigger('focus');
    // });

    // $('.form-file-multiple .btn').on('focusout', function() {
    //   $(this).parent().siblings().trigger('focusout');
    // });
  }

  onSubmit() {
    const arhivoPdf = this.inputFilePdf.nativeElement.files[0];

    const formulario = new FormData();
    formulario.set('correo', this.formularioPrueba.controls.correo.value);
    formulario.set('password', this.formularioPrueba.controls.password.value);
    formulario.set('archivo', arhivoPdf);

    this.servicioSubirArchivo.subirArchivo(formulario).subscribe(
      res => {
        console.log(res);
        
      },
      err => {
        console.log(err);
        
      }
    )

  }

}
