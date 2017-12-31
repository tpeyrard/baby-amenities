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
