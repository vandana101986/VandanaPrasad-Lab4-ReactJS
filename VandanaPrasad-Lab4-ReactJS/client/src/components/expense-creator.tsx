import { Button, Modal, Form } from 'react-bootstrap';
import { FormEvent, useState, useRef } from 'react';
import { getAllPayeeNames } from '../services/expense-utils';
import IExpenseItem , {IExpenseCreateItem} from "../models/expense";
import {postExpenseItem} from "../services/expense";
import dateFormat from 'dateformat';



type ExpenseCreatorModel = {
    expenseItems: IExpenseItem[];
    refreshParent : (newExpenseItem : IExpenseItem) => void ;
}

const ExpenseCreator = ({expenseItems, refreshParent} : ExpenseCreatorModel) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const expenseDescriptionRef = useRef<HTMLInputElement>(null);
    const payeeRef = useRef<HTMLSelectElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    


    const handleAddExpense = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(`${expenseDescriptionRef.current?.value}`);
        console.log(`${payeeRef.current?.value}`);  
        console.log(`${priceRef.current?.value}`);

        const expenseCreateItem : IExpenseCreateItem = {
            expenseDescription : expenseDescriptionRef.current?.value as string,
            payeeName : payeeRef.current?.value as string,
            price : parseFloat(priceRef.current?.value as string),
            date : dateFormat(new Date(),"yyyy-mm-dd")
        }

        const updatedExpenseCreateItem = await postExpenseItem(expenseCreateItem);
        console.log(updatedExpenseCreateItem);

        refreshParent(updatedExpenseCreateItem);

        handleClose();
       
    }

    return (
        <>
            <Button variant="primary" className="float-end" onClick={handleShow}>
                New Expense</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Expense Item</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form onSubmit={handleAddExpense}>

                        <Form.Group className="mb-3" controlId="expenseDescription">
                            <Form.Label>Expense Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter description" 
                            ref={expenseDescriptionRef} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="payeeName">
                            <Form.Label>Payee Name</Form.Label>
                            <Form.Select aria-label="Default select example" ref={payeeRef}>
                                <option>Select Payee</option>
                                
                                {
                                    getAllPayeeNames(expenseItems).map((payeeName) => {
                                        return <option value={payeeName} key={payeeName}>{payeeName}</option>
                                    })
                                }

                            </Form.Select>

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" placeholder="Enter the amount" 
                            ref={priceRef}/>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Add Expense
                        </Button>

                        <Button variant="secondary" onClick={handleClose}>
                        Close
                        </Button>

                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export { ExpenseCreator };