
interface IExpenseItem{
        expenseDescription: string,
        payeeName: string,        
        price: number,
        date: string,
        id: number
}

/* 2 ways -> (1)
interface IExpenseCreateItem{
        expenseDescription: string,
        payeeName: string,        
        price: number,
        date: Date
}*/

//(2) create new Datatype out of excisting datatype
export type IExpenseCreateItem = Omit<IExpenseItem, "id">;

export default IExpenseItem;