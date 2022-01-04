
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CATEGORIES } from 'src/app/models/categories.model';
import { CategoriesClass } from 'src/app/models/categoriesModels';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
 
})


export class TodosComponent implements OnInit {

  formValue!: FormGroup;
  
  categories : CATEGORIES[] = [];
 
  tCategory: CategoriesClass = new CategoriesClass();

  edit: any = false;
  add: any = true;
 

  constructor(private apiService:ApiService, private FormBuilder:FormBuilder) { }

  ngOnInit(): void {

    this.formValue = this.FormBuilder.group({
      categoryName: ['']
    })

    this.apiService.getCategories().subscribe(
      (res =>  {
        this.edit=false;
        this.add=true;
        this.categories = res
      return this.categories
      } )
    )
   
  
  }



  onDelete(id:number): void {
    this.apiService.removeCategories(id).subscribe((res) => {
      alert('Category deleted')
       this.categories = this.categories.filter(category => category.id !== id)
    })
   
  }

  

  addCategory(): void {
    this.tCategory.name = this.formValue.value.categoryName;
    
    this.tCategory.id = Math.random() * 100;
    this.tCategory.createdAt = new Date();
    this.apiService.addCategories(this.tCategory).subscribe((res:CategoriesClass) => {
      alert("Added New category")
      this.categories.push(res)
    })

    this.formValue.reset()
    
  } 

  editCategory(category:any): void {
    alert("Edit " + category.name)
    this.tCategory.id = category.id;
    this.tCategory.createdAt = category.createdAt;
    this.formValue.controls['categoryName'].setValue(category.name)
    this.edit=true;
    this.add=false;
  }

  updateCategory(): void{
    this.tCategory.name = this.formValue.value.categoryName;
    this.apiService.updateCategories(this.tCategory, this.tCategory.id).subscribe((res:CategoriesClass) => {
      alert("Updated category")
      this.categories = this.categories.map(category => {
        if(category.id === this.tCategory.id){
          return res
        }
        return category
      })
    })
    this.formValue.reset()
  }
   
    

   
  

  // changeBackground(i:number): void {
  //   (i%2 === 0) ? "red" : ""
  // }

}
