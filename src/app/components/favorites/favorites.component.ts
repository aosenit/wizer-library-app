import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { BOOKS } from 'src/app/models/books.models';
import { BooksClass } from 'src/app/models/booksModel';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites : any = [];
 
  favoriteBooks: BooksClass = new BooksClass();

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.apiService.favoriteBooks().subscribe(
      (res =>  {
        this.favorites = res
        return this.favorites
      } )
    )
  }

}
