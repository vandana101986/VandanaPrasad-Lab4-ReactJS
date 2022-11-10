import IExpenseItem from "../models/expense";
import {Table} from 'react-bootstrap';

type ExpenseItemsModel = {
    expenseItems :IExpenseItem[];
}

//const ExpenseItems =(model : ExpenseItemsModel) => {
    const ExpenseItems =({expenseItems} : ExpenseItemsModel) => {
        return (
        <>  {
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Expense Description</th>
          <th>Payee Name</th>
          <th>Price</th>
		<th>Date</th>
        </tr>
      </thead>
      <tbody>
        
            {
                expenseItems.map((expenseItem, index)=> (
                    <tr key={expenseItem.id}>
                        <td> {index +1}</td>
                        <td> {expenseItem.expenseDescription}</td>
                        <td> {expenseItem.payeeName}</td>
                        <td> {expenseItem.date.toString()}</td>
                        <td> {expenseItem.price}</td>
                    </tr>
                ))
            }
          
        
      </tbody>
    </Table>
            }
        </>
        )
        
}

export default ExpenseItems;