// app.js
import React from 'react';
import SelectBox from './components/Input/dropdown';
import Input from './components/Input/text';
import Button from './components/Button';
import { Form, Formik } from 'formik';
import TextArea from './components/Input/textArea';
import { clear } from '@testing-library/user-event/dist/clear';
import CheckBox from './components/Input/checkbox';

const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Option 4', value: 'option4' },
];
const options2 = [
  { label: 'Option 8', value: 'option8' },
  { label: 'Option 5', value: 'option5' },
  { label: 'Option 6', value: 'option6' },
  { label: 'Option 7', value: 'option7' },
];
const coptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Option 4', value: 'option4' },
  { label: 'Option 5', value: 'option5' },
  { label: 'Option 6', value: 'option6' },
  { label: 'Option 7', value: 'option7' },
];

function App() {
  
   const handleSubmit = (values) => {
    console.log(values);
  }

 return (
    <div className="App">
      
      <Formik
      initialValues={{
        ad:"",
        soyad:"",
        opt1:"",
        opt2:""

      }}
        onSubmit={values => {
          handleSubmit(values)
        }}>
{({ setFieldValue,}) => (
        <Form>
          <Input label="adınız" name="ad" />
          <Input label="soyadınız" name="soyad" />
          <SelectBox 
                options={options} 
                label="metinnssn" 
                name="opt1" 
                onChange={(selectedValue) => {
                                // Değer değiştiğinde burada yapılacak işlemleri gerçekleştirin.
                                console.log("Seçilen değer:", selectedValue);
                                setFieldValue("opt1", selectedValue);
                            }}/>
            <SelectBox 
                options={options2} 
                variant="secondary"
                label="adsdsdsd" 
                name="opt2" 
                onChange={(selectedValue) => {
                                // Değer değiştiğinde burada yapılacak işlemleri gerçekleştirin.
                                console.log("Seçilen değer:", selectedValue);
                                setFieldValue("opt2", selectedValue);
                            }}/>
          <TextArea label="acıklama" name="ack" />
          <CheckBox name="chck" options={coptions} />
          <Button type="submit"variant="Green" onClick={() =>console.log("Button clicked")}> Gönder</Button>
        </Form>
)}
      </Formik>

    </div>
 );
}

export default App;