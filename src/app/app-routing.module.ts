import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ArticlesComponent} from "./articles/articles.component";
import {AccountComponent} from "./account/account.component";

const routes: Routes = [
  {path: 'list/:listName', component: ArticlesComponent},
  {path: 'account', component: AccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
