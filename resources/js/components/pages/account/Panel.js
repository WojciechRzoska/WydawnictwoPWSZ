import React, {useEffect, useState} from "react";
import api from "../../../api";


function Panel(props){
    const [us,setUs] = useState(props.user.name);
    return(
        <h1>Panel {us} </h1>
    )
}
export default Panel;
