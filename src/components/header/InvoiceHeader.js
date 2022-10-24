import "./invoiceHeader.css";

import { useState } from 'react';

function InvoiceHeader(){

    const [dueDate, setDueDate] = useState(new Date(Date.now() + 604800000).toISOString().substring(0, 10))

    const onDateChange = e => { setDueDate(new Date(e.target.valueAsNumber + 604800000).toISOString().substring(0, 10)) }; /* Set date 7 days into the future */

    return(
        <div className="invoice-header">
            <div className="invoice-field">
                <label htmlFor="client-name" className="invoice-header-left">Kliendi nimi</label>
                <input type="text" id="client-name" className="invoice-header-right" name="client-name" maxLength={"32"} placeholder="n. Peeter Paan" required></input>
            </div>
            <div className="invoice-field">
                <label htmlFor="creation-date" className="invoice-header-left">Kuupäev</label>
                <input type="date" id="creation-date" className="invoice-header-right" name="creation-date" onChange={onDateChange} defaultValue={new Date().toISOString().substring(0, 10)}></input>
            </div>
            <div className="invoice-field">
                <label htmlFor="due-date" className="invoice-header-left">Maksetähtpäev</label>
                <input type="date" id="due-date" className="invoice-header-right" name="creation-date" value={dueDate} readOnly="readonly"></input>
            </div>
        </div>
    )
}

export default InvoiceHeader;