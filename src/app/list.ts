export class List {
  public name: string;
  public type: string;
  public invitationCode: string;

  constructor(name?: string, type?: string, invitationCode?: string) {
    this.name = name;
    this.type = type;
    this.invitationCode = invitationCode;
  }

}
