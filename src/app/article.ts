export const CATEGORIES = [
  {value: 'naissance', viewValue: 'Affaires de Naissance'},
  {value: 'chambre', viewValue: 'Chambre'},
  {value: 'dehors', viewValue: 'Extérieur'},
  {value: 'jouet', viewValue: 'Jouets'},
  {value: 'maman', viewValue: 'Maman'},
  {value: 'nuit', viewValue: 'Nuit'},
  {value: 'repas', viewValue: 'Repas'},
  {value: 'poussette', viewValue: 'Transport'},
  {value: 'body', viewValue: 'Vêtements de bébé'},
  {value: 'habits', viewValue: 'Vêtements classics'},
];

export const CAT_TO_IMAGE = {
  'habits': '/assets/images/jean.jpg',
  'body': '/assets/images/body.jpg',
  'jouet': '/assets/images/velo.jpg',
  'poussette': '/assets/images/poussette.jpg',
  'rangement': '/assets/images/coffre.jpg',
  'maman': '/assets/images/enceinte.jpg',
  'dehors': '/assets/images/bonnet.jpg',
  'naissance': '/assets/images/berceau.jpg',
  'nuit': '/assets/images/lit.jpg',
  'repas': '/assets/images/repas.jpg',
  'chambre': '/assets/images/chambre.jpg'
};

export class Article {
  key: string;
  name: string;
  size: string;
  value: string;
  category: string;
  image: string;
  desc: string;
  taken: boolean;
  purchased: boolean;

  constructor(key?: string, val?: object) {
    let from = (<Article>val);
    if (val) {
      this.key = from.key || key;
      this.taken = from.taken || false;
      this.purchased = from.purchased || false;
      this.name = from.name || '';
      this.size = from.size || '';
      this.value = from.value || '';
      this.category = from.category || '';
      this.image = from.image || '';
      this.desc = from.desc || '';
    }
  }

  take(): Article {
    this.taken = true;
    return this;
  }

  purchase() {
    this.purchased = true;
    return this;
  }

  public isAvailable(): boolean {
    return (this.taken === undefined || !this.taken)
      && this.isNotBought();
  }

  public isNotBought(): boolean {
    return this.purchased === undefined || !this.purchased;
  }
}
