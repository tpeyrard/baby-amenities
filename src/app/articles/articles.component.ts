import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  articles = [
    {
      name: 'Body',
      size: '18 mois',
      value: '10€ Max',
      category: 'home',
      image: 'https://media.vertbaudet.fr/Pictures/vertbaudet/38620/lot-de-2-bodies-de-noel-coton-stretch-manches-longues.jpg?width=200',
      desc: 'Lot de 2 bodies de noël coton stretch manches longues. \nRouge moyen imprimé'
    },
    {
      name: 'Bonnet',
      size: '18 mois',
      value: 'De la marque',
      category: 'shopping_cart',
      image: 'https://www.centraledesmultiples.com/img_product/s/t/400/st127097557.jpg',
      desc: '    Le bonnet de naissance en jersey de coton s’associera parfaitement aux deux pyjamas du thème et gardera la tête de bébé bien au chaud.\n' +
      '    Matière: 100% coton.\n' +
      '    Taille unique: naissance.'
    },
    {
      name: 'Tétines',
      size: '36 mois',
      value: 'Premier prix',
      category: 'child_friendly',
      image: 'https://www.centraledesmultiples.com/img_product/c/h/400/ch061258860.jpg',
      desc: 'Etui porte-sucette stérilisable : Pour ranger les sucettes ou les emporter en balade.\n Sans Bpa'
    },
    {name: 'Manteau', size: '24 mois', value: '', category: 'wb_cloudy', image: '', desc: ''},
    {
      name: 'Jean',
      size: '24 mois',
      value: 'Pour trainer à la maison',
      category: 'shopping_cart',
      image: '',
      desc: 'Pantalon jean bébé. Denim stretch stone used avec plis aux cuisses.\n' +
      ' Taille pressionnée ajustable par élastiques et boutons intérieurs.\n' +
      ' 5 poches avec poche ticket bicolore.\n ' +
      'Passant fantaisie animobaïbi devant.\n' +
      ' Jacron Obaïbi au dos. Revers libre en bas de jambe. '
    }];

  removeArticle(id: number) {
    if (id > -1) {
      this.articles.splice(id, 1);
    }
  }
}
