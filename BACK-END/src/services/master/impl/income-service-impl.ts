import { CommonResponse } from "../../../common/dto/common-response";
import { IncomeDao } from "../../../dao/income-dao";
import { IncomeDaoImpl } from "../../../dao/impl/income-dao-impl";
import { IncomeDto } from "../../../dto/master/income-dto";
import { CommonResSupport } from "../../../support/common-res-sup";
import { ErrorHandlerSup } from "../../../support/error-handler-sup";
import { IncomeService } from "../income-service";

/**income
 * income service layer
 *
 */
export class IncomeServiceImpl implements IncomeService {
  incomeDao: IncomeDao = new IncomeDaoImpl();

  /**
   * save new income
   * @param incomeDto
   * @returns
   */
  async save(incomeDto: IncomeDto): Promise<CommonResponse> {
    let cr = new CommonResponse();
    try {

      // save new income
      let newIncome = await this.incomeDao.save(incomeDto);
      cr.setStatus(true);
    } catch (error) {
      cr.setStatus(false);
      cr.setExtra(error);
      ErrorHandlerSup.handleError(error);
    }
    return cr;
  }
  /**
   * update income
   * @param incomeDto
   * @returns
   */
  async update(incomeDto: IncomeDto): Promise<CommonResponse> {
    let cr = new CommonResponse();
    try {
    
      // update income
      let updateIncome = await this.incomeDao.update(incomeDto);
      if (updateIncome) {
        cr.setStatus(true);
      } else {
        cr.setStatus(false);
        cr.setExtra("Income Not Found !");
      }
    } catch (error) {
      cr.setStatus(false);
      cr.setExtra(error);
      ErrorHandlerSup.handleError(error);
    }
    return cr;
  }
  /**
   * delete income
   * not delete from db.just update its status as offline
   * @param incomeDto
   * @returns
   */
  async delete(incomeDto: IncomeDto): Promise<CommonResponse> {
    let cr = new CommonResponse();
    try {
      // delete income
      let deleteIncome = await this.incomeDao.delete(incomeDto);
      if (deleteIncome) {
        cr.setStatus(true);
      } else {
        cr.setStatus(false);
        cr.setExtra("Income Not Found !");
      }
    } catch (error) {
      cr.setStatus(false);
      cr.setExtra(error);
      ErrorHandlerSup.handleError(error);
    }
    return cr;
  }
  /**
   * find all incomes
   * @returns
   */
  async find(incomeDto: IncomeDto): Promise<CommonResponse> {
    let cr = new CommonResponse();
    try {
      // find income
      let incomes = await this.incomeDao.findAll(incomeDto);
      let incomeDtoList = new Array();
      for (const incomeModel of incomes) {
        let incomeDto = new IncomeDto();
        incomeDto.filViaDbObject(incomeModel);
        incomeDtoList.push(incomeDto);
      }
      cr.setStatus(true);
      cr.setExtra(incomeDtoList);
    } catch (error) {
      cr.setStatus(false);
      cr.setExtra(error);
      ErrorHandlerSup.handleError(error);
    }
    return cr;
  }
  /**
   * find income by id
   * @param incomeId
   * @returns
   */
  async findById(incomeId: number): Promise<CommonResponse> {
    let cr = new CommonResponse();
    try {
      // find income
      let income = await this.incomeDao.findById(incomeId);

      let incomeDto = new IncomeDto();
      incomeDto.filViaDbObject(income);

      cr.setStatus(true);
      cr.setExtra(incomeDto);
    } catch (error) {
      cr.setStatus(false);
      cr.setExtra(error);
      ErrorHandlerSup.handleError(error);
    }
    return cr;
  }
}
