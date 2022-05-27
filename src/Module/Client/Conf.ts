import { ILangItem } from '../../lang/LangI';
import { fGetLang } from '../../lang';

export const modName = 'Client';
export const route = 'client';

export const lang: ILangItem = fGetLang()[modName];
