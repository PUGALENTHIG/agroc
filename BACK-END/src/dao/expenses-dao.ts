import { ExpensesDto } from "../dto/master/expenses-dto";
import { ExpensesEntity } from "../entity/master/Expenses";

export interface ExpensesDao {
    save(expensesDto: ExpensesDto): Promise<ExpensesEntity>;
    update(expensesDto: ExpensesDto): Promise<ExpensesEntity>;
    delete(expensesDto: ExpensesDto): Promise<ExpensesEntity>;
    findAll(expensesDto: ExpensesDto): Promise<ExpensesEntity[]>;
    findById(expenses_id: number): Promise<ExpensesEntity>;
}