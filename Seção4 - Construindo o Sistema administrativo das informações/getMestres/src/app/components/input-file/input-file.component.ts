import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

export class FileManager {
  name!: string
  extension!: string
  base64Data!: string
}

@Component({
  selector: 'app-input-file',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './input-file.component.html',
  styleUrl: './input-file.component.scss'
})
export class InputFileComponent implements OnInit, OnChanges{

  @ViewChild('fileinput') fileinput!: ElementRef
  @Output() select  = new EventEmitter()
  @Input() image!: string
  @Input() label: string = 'Selecione o arquivo'
  fileCurrent: FileManager = new FileManager()
  file: any
  localChange: boolean = false
  
  ngOnChanges(changes: SimpleChanges): void {
    if(!this.localChange){
      const image = changes['image'].currentValue
      this._populatePreLoadImage(image)
    }
  }

  ngOnInit(): void {
    
  }

  selectFile(): void{
    this.fileinput.nativeElement.click()
  }

  handleFileSelect(evt:any ): void{
    const files = evt.target.files
    const file = files[0]

    if( files && file ){
      this.localChange = true
      this.fileCurrent.name = file.name
      const ext = file.name.split('.')
      this.fileCurrent.extension = ext[1]

      const reader = new FileReader()
      reader.onload = this._handleReaderLoaded.bind(this)
      reader.readAsBinaryString(file)
    }else{
      this.fileCurrent = new FileManager()
    }
  }

  private _populatePreLoadImage(image: string): void{
    if( image ){
      const ext = image.split('.')
      const isBase64 = image.indexOf('base64') > -1
      if( isBase64 ){
        this._setPictureFromCamera(image)
      }else{
        console.log(`ext ${ext}`)
        this.fileCurrent.extension = ext[1]
        this.fileCurrent.name = image
        this.fileCurrent.base64Data = `${enviroment.production}/storage/${image}`
      }
    }    
  }

  private _setPictureFromCamera(picture:any): void{
    this.fileCurrent.name = new Date().getTime().toString()
    this.fileCurrent.extension = 'jpg'
    this.fileCurrent.base64Data = picture
  }

  private _handleReaderLoaded(readerEvt:any): void{
    const binaryString = readerEvt.target.result
    const base64extString = btoa(binaryString) //esta função nativa converte string em base64
    //atoa() -> faz o inverso da btoa(), converte base64 para string
    this.fileCurrent.base64Data = `data:imagem/${this.fileCurrent.extension};base64,${base64extString}`
    this.select.emit(this.fileCurrent)
  }
}
