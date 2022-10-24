import { useState, useRef } from 'react';

import InvoiceHeader from './header/InvoiceHeader'
import InvoiceBody from './body/InvoiceBody';
import InvoiceFooter from './footer/InvoiceFooter';

function InvoiceCreator(){
    const [total, setTotal] = useState(0)
    const [output, setOutput] = useState("")
    const form = useRef(null);

    /* Calculate the absolute total of all invoice items. */
    /* The calculation here is quite simple. f.e. If item's price increases by 5 euros, then add 5 euros to total. */
    const calculateTotal = (data) => { 
        if (!isNaN(+data)){ /* Only calculate if numbers inserted */
            setTotal((parseFloat(total) + parseFloat(data)).toFixed(2)) 
        }
    }

    /* What to do when submit has been pressed */
    const handleClickEvent = (e) => {
        e.preventDefault();
        
        // Error checks
        if ((form.current['client-name'].value).trim().length == 0){
            setOutput("Kliendi nimi ei ole sisestatud!"); // Client's name not entered
            return false;
        }else if (!isNaN(form.current['client-name'].value)){
            setOutput("Kliendi nimes ei tohi numbreid olla!"); // Client's name not entered
            return false;
        }

        if (typeof(form.current['description']) == "undefined"){
            setOutput("Arvel pole ühtegi rida!"); // No Invoice Items
            return false;
        }

        // Check that all input fields have data in them
        let inputs = form.current.getElementsByTagName('input');
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].hasAttribute("required")){
                if (inputs[i].value < 0){
                    setOutput("Negatiivsed numbrid ei ole lubatud!"); // Found a field with negative data in it
                    return false;
                }
                else if (inputs[i].value == ""){
                    setOutput("Palun kontrollige, et kõikidesse lahtritesse on korralikult andmed sisestatud! NB, teatud lahtritesse tohib ainult numbreid sisestada! "); // Found a field with no data or with an unknown error
                    return false;
                }
            }
        }

        setOutput("Salvestamine õnnestus!");
     }

    return(
        <div>
            <h1>Arve Looja</h1>
            <form ref={form}>
                <InvoiceHeader/>
                <hr />
                <InvoiceBody total={calculateTotal}/>
                <hr />
                <InvoiceFooter total={total} />
                <input type="submit" value="Salvesta" onClick={handleClickEvent} />
                <div>
                    {output}
                </div>
            </form>
        </div>
    )
}

export default InvoiceCreator;