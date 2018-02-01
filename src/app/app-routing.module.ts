import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ArticlesComponent} from "./articles/articles.component";
import {AccountComponent} from "./account/account.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'list/:listName', component: ArticlesComponent},
  {path: 'cart', component: AccountComponent},
  {path: 'account', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
