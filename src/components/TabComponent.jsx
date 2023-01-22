import { useEffect, useState } from 'react';
import '../App.css';

export default function TabComponent({tap,shoes}){
    
    let [fade, setFade] = useState('');

    useEffect(()=>{
        let a = setTimeout(()=>{
            setFade('end') 
        },100)
        console.log(1)
        return()=>{
            clearTimeout(a);
            setFade('')
        }
    },[tap])
    
    return (
    <div className={`start  ${fade}`}>
        {[<div>{shoes[0].title}</div>,<div>내용1</div>,<div>내용2</div>][tap]}
    </div>
    )
}