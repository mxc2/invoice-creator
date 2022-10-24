/* import "./SelfDesign.css";*/

import { useState } from 'react';

function SingleInvoice(props){

    const [state, setState] = useState({
        amount: 1,
        price: 0.00
    });

    const [total, setTotal] = useState(0);

    /* Calculate total when data changes and update values state */
    const onDataChange = e => { 
        if (!isNaN(e.target.valueAsNumber)){
            setState({
            ...state,
            [e.target.name]: e.target.valueAsNumber
            });

            let newTotal; /* Create new variable, so we can use it later, without needing to wait for the state to refresh */

            /* Calculate */
            if([e.target.name] == "amount"){
                newTotal = (e.target.valueAsNumber * state["price"]).toFixed(2)
                if (newTotal.length <= 8){ // MAX 8 characters allowed
                    setTotal(newTotal);
                }else{ return false; }
            }else{
                newTotal = (e.target.valueAsNumber * state["amount"]).toFixed(2)
                if (newTotal.length <= 8){ // MAX 8 characters allowed
                    setTotal(newTotal);
                }else{ return false; }
            }

            /* Calculate the difference between new total and old total, and send that to InvoiceCreator.js */
            props.total(newTotal - total);
        }
    };

    /* Send ID and flipped total to InvoiceBody. That way we know what we want to remove and how to calculate the absolute total*/
    const removeInvoiceItem = e => {
        props.funcDelete({"id": props.id, "total": -Math.abs(total)});
    }

    return(
        <div className='invoice-body'>
            <label htmlFor="item-description">Kirjeldus</label>
            <input type="text" id="item-description" className='invoice-body-input' name="description" maxLength={"32"} required></input>

            <label htmlFor="amount">Kogus</label>
            <input type="number" id="amount" className='invoice-body-input' name="amount" maxLength={"8"} onChange={onDataChange} defaultValue={"1"} step="1" min="1" required></input>

            <label htmlFor="price">Hind</label>
            <input type="number" id="price" className='invoice-body-input' name="price" onChange={onDataChange} maxLength={"8"} defaultValue={"0.00"} step="0.01" min="0" required></input>

            <label htmlFor="total">Kokku:</label>
            <input type="text" id="total" className='invoice-body-input' name="total" maxLength={"8"} value={total} readOnly="readonly" required></input>

            <button type="delete" onClick={removeInvoiceItem}>Eemalda</button>
        </div>
    )
}

export default SingleInvoice;