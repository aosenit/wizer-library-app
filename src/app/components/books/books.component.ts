import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { BOOKS } from 'src/app/models/books.models';
import { BooksClass } from 'src/app/models/booksModel';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  formValue!: FormGroup;
  
  books : BOOKS[] = [];
 
  tbook: BooksClass = new BooksClass();
 
  edit: any = false;
  add: any = true;


  constructor(private apiService:ApiService, private FormBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.FormBuilder.group({
      bookName: ['']
    })

    this.apiService.getBooks().subscribe(
      (res =>  {
        this.edit=false;
        this.add=true;
        this.books = res
      return this.books
      
      } )
      
    )
  }


  onDelete(id:number): void {
    this.apiService.removeBooks(id).subscribe((res) => {
      alert('Book deleted ')
       this.books = this.books.filter(book => book.id !== id)
    })
   
  }

  

  

  addBook(): void {
    this.tbook.name = this.formValue.value.bookName;
    
    this.tbook.id = Math.random() * 100;
    this.tbook.createdAt = new Date();
    this.tbook.isFavorite = false;
    this.apiService.addBooks(this.tbook).subscribe((res:BooksClass) => {
      alert("Added New Book " +  res.name)
      this.books.push(res)
    })

    this.formValue.reset()
    
  } 

  editBook(book:any): void {
    alert("Edit " + book.name)
    this.tbook.id = book.id;
    this.tbook.createdAt = book.createdAt;
    this.tbook.isFavorite = book.isFavorite;
    this.formValue.controls['bookName'].setValue(book.name)
    this.edit=true;
        this.add=false;
  }

  updateBook(): void{
    this.tbook.name = this.formValue.value.bookName;
    this.apiService.updateBooks(this.tbook, this.tbook.id).subscribe((res:BooksClass) => {
      alert("Updated book" + res.name)
      this.books = this.books.map(book => {
        if(book.id === this.tbook.id){
          
          return res
        }
        return book
      })
    })
    this.formValue.reset()
  }

  changeFavorite(book:any): void {
    this.tbook.id = book.id;
    this.tbook.createdAt = book.createdAt;
    this.tbook.isFavorite = !book.isFavorite;
    this.tbook.name = book.name;
    this.apiService.changeFavorite(this.tbook, this.tbook.id).subscribe((res:BooksClass) => {
      (res.isFavorite ===true? alert("added as Favorite"): alert("Removed From Favorites"))
      this.books = this.books.map(book => {
        if(book.id === this.tbook.id){
          return res
        }
        return book
      })
    })

  }

}
