export interface ILangItem {
  add: {
    caption: string;
  };
  edit: {
    caption: string;
  };
  list: {
    caption: string;
  };
}

export interface ILang {
  Client: ILangItem;
  Ingredient: ILangItem;
  Inventory: ILangItem;
  Menu: ILangItem;
  Product: ILangItem;
  ProductCategory: ILangItem;
  Storehouse: ILangItem;
  Pages: {
    IndexCrm: any;
    LoginP: {
      title: string;
      login: string;
      pass: string;
      button: string;
    };
  };
}
