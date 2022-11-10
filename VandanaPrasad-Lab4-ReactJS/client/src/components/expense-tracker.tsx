import React from 'react';
import {useEffect, useState} from 'react';
import {getAllExpenseItems} from '../services/expense';
import IExpenseItem from '../models/expense';
import { Container, Alert, Spinner } from 'react-bootstrap';
import ExpenseItems from './expene-items';
import {ExpenseCreator} from './expense-creator';
import { ExpenseByPayees } from './expense-by-payees';


const ExpenseTracker = () => {

    const [expenseItems, setExpenseItems] = useState<IExpenseItem[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const brStyle : React.CSSProperties = {
        marginBottom: "10px"
    };

    useEffect(() => {

        const getAllExpenseItemsInvoker = async () => {

            try{
                const responseData = await getAllExpenseItems();
                console.log(responseData);
                setExpenseItems(responseData);
                //setLoading(false);
            }catch(error){
                setError(error as Error);
                //setLoading(false);
            }
            finally{
                setLoading(false);
            }
            
        }
        getAllExpenseItemsInvoker();
    }, []);

    const refreshParent = (newExpenseItem : IExpenseItem) => {
        setExpenseItems(
            [
                ...expenseItems,
                newExpenseItem
            ]
        );
    } 

    return (
        <Container className="my-4">
            <h2 style={brStyle}>
                <label>Expense Manager</label>
                <ExpenseCreator  expenseItems={expenseItems}
                refreshParent={refreshParent}></ExpenseCreator>
            </h2>
            <br></br>
            {
                loading && (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...Tracker App</span>
                    </Spinner>
                )
            }
            
            {
                error && !loading &&(
                    <Alert variant="danger">
                        {error.message}
                    </Alert>
                )
            }

            {
                !error && !loading && (
                    <ExpenseItems expenseItems={expenseItems}></ExpenseItems>
                )
            }

            {
                !error && !loading && (
                    <ExpenseByPayees expenseItems={expenseItems}></ExpenseByPayees>
                )
            }
            
        </Container>
    )
}

export default ExpenseTracker;