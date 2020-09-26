import React, {useContext} from 'react';
import { ColorContext } from "./Color";
const ShowArea = () => {
    const {color} = useContext(ColorContext)
    return (
        <div style={{color}}> 测试字符串 </div>
    );
}

export default ShowArea;
