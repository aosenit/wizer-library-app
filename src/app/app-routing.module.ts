import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BooksComponent } from './components/books/books.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { TodosComponent } from './components/todos/todos.component';

const routes: Routes = [
  { path: 'category', component: TodosComponent  },
  { path: 'books', component: BooksComponent},
  { path: 'favorites', component:FavoritesComponent },
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
