export class List {
  public name: string;
  public isAdmin: boolean;
  public invitationCode: string;

  constructor(name: string, isAdmin?: boolean, invitationCode?: string) {
    this.name = name;
    this.isAdmin = isAdmin || false;
    this.invitationCode = invitationCode;
  }

}
