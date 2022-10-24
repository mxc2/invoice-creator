/* import "./SelfDesign.css";*/

import SingleInvoice from "./SingleInvoice"

function InvoiceBody(props){

    return(
        <div>
            {props.invoices.map(invoice =>(
            <SingleInvoice
                key={invoice.id}
                id={invoice.id}
                total={props.total}
                funcDelete={props.funcDelete}
            />
            ))}
        </div>
    )
}

export default InvoiceBody;