import Button from './components/Button';
import { IoIosAddCircle, IoIosPrint, IoMdFunnel } from 'react-icons/io';

function App() {
  return (
    <div className="App">
      <header className="App-header">

      <div className='grid grid-cols-3 gap-3 justify-items-center'>
          <div className='px-5 '>
              <Button
                size="xsmall" variant="Green"
                onClick={() => console.log("Button clicked")}
                children="Subscribe" >               
            </Button> 
          </div>
          <div  className='px-5'>
              <Button
                size="small" variant="Purple"
                onClick={() => console.log("Button clicked")}
                children="Subscribe" >               
            </Button> 
            </div>

          <div className='px-5'>
              <Button
                size="normal" variant="GreenOutline"
                onClick={() => console.log("Button clicked")}
                children="Subscribe" >               
            </Button> 
          </div>     
          
            <div  className='px-5'>
              <Button
                size="large" variant="PurpleOutline"
                onClick={() => console.log("Button clicked")}
                children="Subscribe" >               
            </Button> 
            </div>
          <div className='px-5'> 
              <Button
                size="normal" variant="TransparentButton"
                onClick={() => console.log("Button clicked")}>
                  <IoIosAddCircle className="mx-2" />Subscribe             
            </Button>
          </div>
          <div className='px-5'> 
              <Button
                size="normal" variant="TextButton"
                onClick={() => console.log("Button clicked")}
                children="Subscribe">         
            </Button>
          </div>
          <div className='px-5'>
              <Button
                size="small" variant="DeleteButton"
                onClick={() => console.log("Button clicked")}
                children="Subscribe" >               
            </Button> 
          </div>
      </div>
      
      <h1 className='text-center'>merhaba</h1>

      </header>
    </div>
  );
}

export default App;
