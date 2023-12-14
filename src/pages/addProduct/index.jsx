import { Form , Formik} from 'formik'
import React, { useEffect, useState } from 'react'
import DropDown from '../../components/Input/dropdown'
import { getCategories } from '../../api'
import Button from '../../components/button';
import Input from '../../components/Input/text';
import TextArea from '../../components/Input/textArea';

function AddProduct() {
    const marks = ["ARÇELİK", "BEKO", "SAMSUNG", "VESTEL", "LG"];
    const [categories, setCategories] = useState([]);
    const [selectedButton, setSelectedButton] = useState(null);
    const [selectedCity, setSelectedCity] = useState("");  
    // Şehir ve ilçe verileri
    const cities = [
     { value: "istanbul", label: "İstanbul" },
     { value: "ankara", label: "Ankara" },
     { value: "izmir", label: "İzmir" },
     { value: "antalya", label: "Antalya" },
    ];
  
    const districts = {
     istanbul: [
       { value: "besiktas", label: "Beşiktaş" },
       { value: "kadikoy", label: "Kadıköy" },
       { value: "uskuadar", label: "Üsküdar" },
       { value: "fatih", label: "Fatih" },
       // Diğer İstanbul ilçelerini buraya ekleyin
     ],
     ankara: [
       { value: "cankaya", label: "Çankaya" },
       { value: "kizilay", label: "Kızılay" },
       { value: "yakindogu", label: "Yakındoğu" },
       // Diğer Ankara ilçelerini buraya ekleyin
     ],
     izmir: [
       { value: "karsiyaka", label: "Karşıyaka" },
       { value: "bornova", label: "Bornova" },
       { value: "alsancak", label: "Alsancak" },
       // Diğer İzmir ilçelerini buraya ekleyin
     ],
     antalya: [
       { value: "muratpasa", label: "Muratpaşa" },
       { value: "konyaalti", label: "Konyaaltı" },
       { value: "kepez", label: "Kepez" },]
    };

    useEffect(() => {
        getCategories()
            .then((result) => {
                setCategories(result?.data.data);
                console.log("kategoriler: ", categories);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []); // useEffect'i bir defa çalıştırmak için boş dependency array kullanılır

    const handleSubmit = (values) => {
        // Form submit işlemleri
    }

    return (
        <div className='flex justify-center p-5 sm:p-2 mt-5'>
            <div className='text-center border rounded-2xl w-3/4 sm:w-3/4'>
                <div className='w-full p-5 '>
                    <Formik
                        initialValues={{
                            marka: "",
                            kategori: ""
                        }}
                        onSubmit={(values) => {
                            handleSubmit(values);
                        }}>
                        {({ setFieldValue }) => (
                            <Form>
                                <label className="font-bold text-2xl sm:text-md">İlan Yayınla</label>
                                <div className='grid grid-cols-2 gap-1'>
                                    <DropDown
                                        placeholder="Kategori"
                                        name="kategori"
                                        options={categories.map(category => ({
                                            label: category.name,
                                            value: category.id
                                        }))}
                                        onChange={(selectedValue) => {
                                            console.log("Seçilen değer:", selectedValue);
                                            setFieldValue("kategori", selectedValue);
                                        }}
                                    />
                                </div>
                                <div className='grid grid-cols-2 gap-1'>
                                    <DropDown
                                        placeholder="Marka"
                                        name="marka"
                                        options={marks.map(mark => ({
                                            label: mark,
                                            value: mark
                                        }))}
                                        onChange={(selectedValue) => {
                                            console.log("Seçilen değer:", selectedValue);
                                            setFieldValue("marka", selectedValue);
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="text-start block text-xl m-3">Durumu : </label>
                                    <div className='grid grid-cols-4 gap-2 w-2/4'>
                                        <Button variant="GreenOutline">Çok İyi</Button>
                                        <Button variant="GreenOutline">İyi</Button>
                                        <Button variant="GreenOutline">İdare eder</Button>
                                        <Button variant="GreenOutline">Yıpranmış</Button>

                                    </div>
                                </div>
                                <label className="text-start block text-xl m-3">İlan Başlığı : </label>
                                <Input className="m-3" name="aciklama" placeholder="İlan Başlığı" />
                                <label className="text-start block text-xl m-3">İlan Açıklaması : </label>
                                <TextArea className="m-3" name="aciklama" placeholder="Açıklama" />
                                <label className="text-start block text-xl m-3">Ürün Fiyatı : </label>
                                <Input type="number" className="m-3" name="aciklama" placeholder="Fiyat" />

                                <label className="text-start block text-xl m-3">Konum Bilgisi : </label>
                                <div className='grid grid-cols-2 gap-1'>
                                    <DropDown
                                    placeholder="Şehir"
                                    name="city"
                                    options={cities}
                                    onChange={(selectedValue) => {
                                        console.log("Seçilen değer:", selectedValue);
                                        setFieldValue("city", selectedValue);
                                        setSelectedCity(selectedValue);
                                        
                                    }}
                                    />
                                {selectedCity && (
                                    <DropDown
                                    placeholder='İlçe'
                                    name='district'
                                    options={districts[selectedCity]}
                                    onChange={(selectedValue) => {
                                        console.log("Seçilen ilçe:", selectedValue);
                                        setFieldValue("district", selectedValue);
                                    }}
                                    />
                                )}
                                
                                    
                </div>

                <label className="text-start block text-xl m-3">Ürün Fotoğrafları : </label>
                <div className="grid grid-cols-3 gap-1">
                    <div className="bg-gray-300 p-4 h-40 w-40 flex items-center justify-center">
                        IMAGE
                    </div>
                    <div className="bg-gray-300 p-4 h-40 w-40 flex items-center justify-center">
                        IMAGE
                    </div>
                    <div className="bg-gray-300 p-4 h-40 w-40 flex items-center justify-center">
                        IMAGE
                    </div>
                </div>
                <Button variant="Green" className="m-5" size="large">Ekle</Button>

                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default AddProduct;

