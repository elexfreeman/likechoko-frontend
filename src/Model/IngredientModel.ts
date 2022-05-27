import { BaseModel } from '../Module/Sys/BaseModel';
import { SearchS } from 'lc-common/lib/Service/SearchS';
import { IngredientI } from 'lc-common/lib/Interfaces/IngredientI';
export class IngredientModel extends BaseModel {
  async faList(search: SearchS): Promise<IngredientI[]> {
    const resp: IngredientI[] = [];

    return resp;
  }
}
