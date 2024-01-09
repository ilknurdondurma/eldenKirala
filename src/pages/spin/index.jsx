import { useEffect } from 'react';
import './spin.css';
import { GiImpLaugh } from "react-icons/gi";

const  Spin =({label})=>{
  useEffect(() => {
   console.log("ağğğğğğğğğğğğğğğğğğğğğğ")
}, []);
  
    return(
      <div className="spinner-container">
            <div className="spinner">
                
            </div>
            {label ? label :<GiImpLaugh size="50px" className='m-5' />}
      </div>
    );
}
export default Spin;
