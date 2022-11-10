import axios from "axios";
import IExpenseItem, { IExpenseCreateItem } from "../models/expense";

const getAllExpenseItems = async () =>{

    const getItemsUrl = "http://localhost:4000/items";
    console.log("at services/expense, getItemsUrl = "+getItemsUrl);

    const responseData = await axios.get<IExpenseItem[]>(getItemsUrl);
    console.log("at services/expense, responseData ="+responseData);
    console.log("at services/expense, responseData.data ="+responseData.data);
    return responseData.data;
}

const postExpenseItem = async (expenseCreateItem : IExpenseCreateItem) =>{

    const postItemsUrl = "http://localhost:4000/items";
    console.log("at services/expense, postItemsUrl = "+postItemsUrl);

    const responseData = await axios.post<IExpenseItem>(
        postItemsUrl, expenseCreateItem,
        {
            headers : {
                'Content-Type' : 'application/json'
            }
        }
    );

    return responseData.data;
}

export {getAllExpenseItems, postExpenseItem};