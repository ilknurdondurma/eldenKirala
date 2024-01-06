import { useEffect } from 'react';
import './spin.css';

const  Spin =({label})=>{
  useEffect(() => {
   console.log("ağğğğğğğğğğğğğğğğğğğğğğ")
}, []);
  
    return(
      <div className="spinner-container">
            <div className="spinner">
                
            </div>
            {label ? label :"F5 ÇEK BELKİ DÜZELİR sdönösdnsödn ..."}
      </div>
    );
}
export default Spin;
