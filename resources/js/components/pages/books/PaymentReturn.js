import React, {useEffect} from "react";
import api from "../../../api";

function PaymentReturn(){
    useEffect(() => {
        getData();

    }, []);
    async function getData() {
        api.test().then(res => {


        });
    }
    return(
        <h1>hi</h1>
    )
}

export default PaymentReturn;
