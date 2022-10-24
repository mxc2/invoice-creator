import "./invoiceBody.css";

import { useState } from 'react';

import InvoiceList from "./InvoiceList"

function InvoiceBody(props){

    const [amountCreated, setAmountCreated] = useState(0) /* Used for ID-s to be unique */
    const [invoiceItems, setInvoiceItems] = useState([])

    /* Run when adding one of the invoice items */
    const addInvoiceItem = e => {
        const newInvoiceItems = [...invoiceItems, {id: amountCreated + 1}];
        setInvoiceItems(newInvoiceItems)
        setAmountCreated(amountCreated + 1)
    };

    /* Run when removing one of the invoice items */
    const removeInvoiceItem = (data) => {
        setInvoiceItems(current =>      /* Remove from invoiceItems object */
            current.filter(item => {
                return item.id !== data["id"];
            }))

        props.total(data["total"]) /* Remove the single invoice items total from the absolute total */
    }

    return(
        <div>
            <InvoiceList style={{marginBottom: "8px"}} invoices={invoiceItems} total={props.total} funcDelete={removeInvoiceItem} />
            <button type="button" onClick={addInvoiceItem}>Lisa arverida</button>
        </div>
    )
}

export default InvoiceBody;