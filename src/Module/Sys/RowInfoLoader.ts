import * as TableI from 'lc-common/lib/Interfaces/TableI';
import { BaseModel } from './BaseModel';
import { ApiResponseI } from 'lc-common/lib/Interfaces/ApiResponseI';
import { BaseLoader } from './BaseLoader';

/**
 * Загрузчик информации о строке в таблице
 */
export class RowInfoLoader extends BaseLoader {
  protected sUrl: string;
  protected baseModel: BaseModel;

  public async faLoadInfo(id: number): Promise<ApiResponseI<TableI.GetRowByIdResponseI<any>>> {
    const url = `${this.sUrl}/${TableI.sGetInfoByIdR}`;

    const respApi: ApiResponseI<TableI.GetRowByIdResponseI<any>> = await this.baseModel.faApiRequest({ id: id }, url);

    return respApi;
  }
}
