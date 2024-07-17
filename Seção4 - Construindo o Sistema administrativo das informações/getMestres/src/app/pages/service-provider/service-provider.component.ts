import { Component, OnInit } from '@angular/core';
import { ServiceProviderModel } from '../../model/ServiceProviderModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ServiceProviderService } from '../../services/service-provider.service';
import { FileManager } from '../../components/input-file/input-file.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputFileComponent } from '../../components/input-file/input-file.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { SubCategoryModel } from '../../model/SubCategoryModel';
import { CategoryModel } from '../../model/CategoryModel';
import { CategoryService } from '../../services/category.service';
import { SubCategoryService } from '../../services/subCategory.service';
import { AddressService } from '../../services/address.service';
import { IAddressState } from '../../interfaces/IAddressState';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-service-provider',
  standalone: true,
  imports: [
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    InputFileComponent,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    MatListModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './service-provider.component.html',
  styleUrl: './service-provider.component.scss'
})
export class ServiceProviderComponent implements OnInit {
  //É Este atributo que o html faz referência quando é usado ngModel nos campos
  model: ServiceProviderModel = new ServiceProviderModel()

  subCategoriesSelect: Array<SubCategoryModel> = new Array<SubCategoryModel>()
  categories: Array<CategoryModel> = new Array<CategoryModel>()
  subCategories: Array<SubCategoryModel> = new Array<SubCategoryModel>()
  categoriesCare: Array<String> = new Array<string>()
  subCategorySelect: SubCategoryModel = new SubCategoryModel()
  categorySelect!: string
  cities: Array<string> = new Array<string>()
  citiesCare: Array<string> = new Array<string>()
  states: Array<IAddressState> = new Array<IAddressState>()

  constructor(
    private serviceSrv: ServiceProviderService,
    private categorySrv: CategoryService,
    private subCategorySrv: SubCategoryService,
    private addressSrv: AddressService,
    private matSnack: MatSnackBar,
    private router: Router,
    private active: ActivatedRoute
  ){}
  
  ngOnInit(): void {
    //este método fica ouvindo o que é recebido por paramêtro pela URL
    //Caso o paramêtro no id seja igual a new, então será aberta a tela de com os campos vazios para cadastrar nova subcategoria
    //Caso o paramêtro venha com um código, então a tela será aberta com os campos já preenchidos para apenas alteração
    this.active.params.subscribe( p => this.getId(p['id']))
    this.bindCategories()
    this.bindState()
  }

  async bindCategories(): Promise<void>{
    const result = await this.categorySrv.getAll()
    if( result.success ){
      this.categories = result.data as Array<CategoryModel>
    }
  }

  async bindState(): Promise<void>{
    const result = await this.addressSrv.getAllStates()
    if( result.success ){
      this.states = result.data as Array<IAddressState>
    }
  }

  async bindCities(state: string): Promise<void>{
    this.citiesCare = new Array<string>
    const result = await this.addressSrv.getAllCities(state)
    if( result.success ){
      this.cities = result.data as Array<string>
    }
  }

  async bindSubCategories(categoryUid: string): Promise<void>{
    const result = await this.subCategorySrv.getAllByCategory(categoryUid)
    if( result.success ){
      this.subCategories = result.data as Array<SubCategoryModel>
    }
  }

  //Este método que verifica se o vem com id new ou vem com o código
  async getId(uid: string): Promise<void>{
    if( uid === 'new' ){
      return
    }
    const result = await this.serviceSrv.getById(uid)
    this.model = result.data as ServiceProviderModel        
    this.bindCities(this.model.state)
    this.citiesCare = this.model.citiesCare.split(',')
    this.categoriesCare = this.model.categoriesCare.split(',')
  }

  async save(): Promise<void>{
    this.model.citiesCare = this.citiesCare.join(', ')
    this.model.categoriesCare = this.categoriesCare.join(', ')
    const result = await this.serviceSrv.createServiceProvider(this.model)
    if( result.success ){
      this.matSnack.open('Prestador salvo com sucesso', undefined, { duration: 3000 })
      this.router.navigateByUrl('/serviceProviders')
    }    
  }

  selectedFile(file: FileManager): void{
    if( file.base64Data ){
      this.model.photo = file.base64Data
    }
  }

  selectSubCategory(subcategory: SubCategoryModel): void{
    const exists = this.categoriesCare.filter(x => x == subcategory.name).length > 0
    if( !exists ){
      this.categoriesCare.push(subcategory.name)
    }else{
      this.matSnack.open(`A SubCategoria ${subcategory.name} já foi adicionada!`, undefined, { duration: 3000 })
    }
  }

  selectCitieCare(city: string): void{
    const exists = this.citiesCare.indexOf(city) > -1
    if ( !exists ){
      this.citiesCare.push(city)
    }else{
      this.matSnack.open(`A Cidade ${city} já foi adicionada!`, undefined, { duration: 3000 })
    }
  }


  removeCitiesCare(index: number): void{
    //Este método splice, apaga o valor do array, mas passando um índice como paramêtro
    this.citiesCare.splice(index, 1)
  }

  removeCategoryCare(index: number): void{
    this.categoriesCare.splice(index, 1)
  }
}
