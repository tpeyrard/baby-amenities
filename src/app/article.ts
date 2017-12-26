export class Article {
  key: string;
  name: string;
  size: string;
  value: string;
  category: string;
  image: string;
  desc: string;
  taken: boolean;

  constructor(key?: string, val?: object) {
    this.key = key;
    let from = (<Article>val);
    if (val) {
      this.taken = from.taken || false;
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
}
