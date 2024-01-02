import { Form , Formik} from 'formik'
import React, { useEffect, useState } from 'react'
import DropDown from '../../components/Input/dropdown'
import { addProduct, getBrandByCategory, getCategories } from '../../api'
import Button from '../../components/button';
import Input from '../../components/Input/text';
import TextArea from '../../components/Input/textArea';
import { AiFillPicture } from "react-icons/ai";
import { ToastContainer} from 'react-toastify';
import errorMessage from '../../helper/toasts/errorMessage'
import successMessage from '../../helper/toasts/successMessage'
import { useNavigate } from 'react-router-dom';

function AddProduct() {
    const token = localStorage.getItem('token');
    const navigate =useNavigate();
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [brands, setBrands] = useState([0]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedButton, setSelectedButton] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);         //token kontrol
    const buttonData = [
        { id: 1, variant: "PurpleOutline",label: 'Çok İyi' },
        { id: 2, variant: "PurpleOutline",label: 'İyi' },
        { id: 3, variant: "PurpleOutline",label: 'Orta' },
        { id: 4, variant: "PurpleOutline",label: 'Kötü' },
      ];
      

    useEffect(() => {
        setIsLoggedIn(!!token);
        getCategories()
            .then((result) => {
                setCategories(result?.data.data);
                console.log("kategoriler: ", categories);
            })
            .catch((error) => {
                console.log(error);
                errorMessage("bir hata oluştu")
            });
    }, []);

    const handleChangeCategory =(id)=>{
        getBrandByCategory(id)
        .then((result) => {
            setBrands(result.data.data)
            console.log("response brands: ", brands);
        })
        .catch((error) => {
            console.log(error);
            errorMessage("bir hata oluştu")
            
        });
    };
    const handleButtonClick = (buttonId) => {
            console.log(`Tıklanan buton: ${buttonId}`);
            setSelectedButton(buttonId);
    };
    const handleFileChange = (event, setFieldValue, index) => {
        const newSelectedFiles = [...selectedFiles];
        newSelectedFiles[index] = event.target.files[0];
        setSelectedFiles(newSelectedFiles);

         // resmi divin içinde göstermek için kod bloğu
        const reader = new FileReader();
        reader.onload = (e) => {
            const newImagePreviews = [...imagePreviews];
            newImagePreviews[index] = e.target.result;
            setImagePreviews(newImagePreviews);
        };
        reader.readAsDataURL(event.target.files[0]);

        };
    const handleSubmit = (values) => {
        console.log(values);

        const productAddReq = new FormData()
        var product = {
            "Name": values?.header,
            "Description": values?.description,
            "Price": values?.price,
            "UserId": 12,
            "IsActive": true,
            "Rating": 5,
            "Status": values?.state,
            "MaxRentalPeriod": 18,
            "MinRentalPeriod": 18,
            "IsHighlight":false,
            "BrandId":  values?.brand
        }
        productAddReq.append("data", JSON.stringify(product))
        selectedFiles.forEach((file, index) => {
            productAddReq.append(`FILE_URL_${index + 1}`, file)
        });

        // API e GÖNDER 
        addProduct(productAddReq)
        .then(data => {
        console.log(data);

        // Başarılı giriş durumunda yönlendir
        if (data.status === 200) {
            console.log("product add başarılı");
            successMessage("Ürün başarıyla eklendi padişahım")
            setTimeout(() => {
                navigate("/",{replace:true});
              }, 2000);
            
        }
        })
        .catch(error => {
        console.error("product add error:", error);
        errorMessage("Ürün eklenirken bir hata oluştu. Tekrar dene bakalımm :( ")
        });
        
    }

    return (
        <>
        <ToastContainer />
        <div className='flex justify-center p-5 sm:p-2 mt-5'>
            <div className='text-center border rounded-2xl w-3/4 sm:w-3/4'>
                <div className='w-full p-5 '>
                    <Formik
                        initialValues={{
                            brand: "",
                            category: "",
                            subCategory:"",
                            header:"",
                            description:"",
                            state:"",
                            price:0,
                            imageFile1:"",
                            imageFile2:"",
                            imageFile3:"",

                        }}
                        onSubmit={(values)  => {
                            
                            if (selectedButton === undefined) {
                                console.log('Lütfen bir durum seçin.');
                                errorMessage("HOOPS ! Bir durum seç")
                                return;
                            }
                            if (selectedFiles.length === 0) {
                                console.log('En az 1 resim seçmelisiniz.');
                                errorMessage("En az 1 resim seçmelisiniz")
                                return;
                            }
                            console.log(values);
                            handleSubmit(values);
                        }}
                        
                        
                        >
                        {({ setFieldValue}) => (
                            <Form>
                                <label className="font-bold text-2xl sm:text-md">İlan Yayınla</label>
                        {/* // kategori ve marka */}
                                <div className='grid grid-cols-3 sm:grid-cols-1 gap-4'>

                                    <DropDown
                                        placeholder="Kategori"
                                        name="category"
                                        options={categories.map(category => ({
                                            label: category.name,
                                            value: category.id,
                                        }))}
                                        onChange={async (selectedValue) => {
                                            console.log("Seçilen category:", selectedValue);
                                            setFieldValue("category", selectedValue);
                                            setSelectedCategory(selectedValue);
                                            await handleChangeCategory(selectedValue)

                                            
                                        }}
                                    
                                    />
                                    
                                        <DropDown
                                            placeholder="Alt Kategori"
                                            name="subCategory" 
                                            options={categories.flatMap((cat) =>
                                                (cat.id==selectedCategory)
                                                    ? cat.subCategories.map((subCat) => ({
                                                        label: subCat.name,
                                                        value: subCat.id,
                                                        }))
                                                    : []
                                    )}
                                             
                                            onChange={async (selectedValue) => {
                                                console.log("Seçilen sub category:", selectedValue);
                                                await handleChangeCategory(selectedValue)
                                                setFieldValue("subCategory", selectedValue);
                                                
                                            }}
                                        
                                        />

                                    {brands && (
                                        <DropDown
                                            placeholder='Marka'
                                            name='brand'
                                            options={brands.map((brand) => ({
                                                label: brand.name,
                                                value: brand.id,
                                            }))}
                                            onChange={(selectedValue) => {
                                                console.log("Seçilen brand:", selectedValue);
                                                setFieldValue("brand", selectedValue);
                                            }}
                                        />)}
                                </div>

                                <label className="text-start block text-xl m-3">İlan Başlığı : </label>
                                <Input className="m-3" name="header" placeholder="İlan Başlığı" />

                                <label className="text-start block text-xl m-3">İlan Açıklaması : </label>
                                <TextArea className="m-3" name="description" placeholder="Açıklama" />
                        {/* // state butonları */}
                                <div>
                                    <label className="text-start grid grid-cols-3 sm:grid-cols-1 text-xl sm:text:sm m-3">Durumu : </label>
                                    <div className='grid grid-cols-4 sm:grid-cols-1 gap-2 w-2/4 '>
                                        {buttonData.map((button) => (
                                            <Button
                                            className="text-sm"
                                            type="button"
                                            key={button.id}
                                            variant={selectedButton === button.id ? 'Purple' : button.variant}
                                            onClick={async () =>{ 
                                                setFieldValue("state", button.label);
                                                await handleButtonClick(button.id);
                                                
                                            }}
                                            >
                                            {button.label}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                <label className="text-start block text-xl m-3">Ürün Fiyatı (Aylık) : </label>
                                <Input type="number" className="m-3" name="price" placeholder="Fiyat" />

                                <label className="text-start block text-xl m-3">Ürün Fotoğrafları : </label>
                                <div className="grid grid-cols-3 w-3/4 sm:grid-cols-2 sm:w-full gap-1">
                                    {[1, 2, 3].map((index) => (
                                        <label
                                        key={index}
                                        htmlFor={`fileInput${index}`}
                                        className="relative inline-block w-40 h-40 md:w-32 md:h-32 sm:w-20 sm:h-20 border border-gray-400 rounded-md overflow-hidden cursor-pointer"
                                        >
                                        <input
                                            onChange={(e) => handleFileChange(e, setFieldValue, index - 1)}
                                            type="file"
                                            id={`fileInput${index}`}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <div className="flex flex-col items-center justify-center justify-items-center text-center text-white">
                                            <div className="ml-2 text-black text-lg sm:text-sm ali">
                                            Görsel {index}
                                            </div>
                                            {imagePreviews[index - 1] && (
                                                <img src={imagePreviews[index - 1]} alt={`Preview ${index}`} className="w-1/2 h-1/2 object-cover" />
                                            )}
                                            <Button
                                            className="p-1 md:p-3 sm:p-1 text-xl sm:text-sm hover:shadow-none"
                                            variant="TransparentButton"
                                            >
                                            <AiFillPicture />
                                            </Button>
                                        </div>
                                        </label>
                                    ))}
                                </div>
                                <Button variant="Green" className="m-5" size="large">Ekle</Button>

                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
        </>
    )
}

export default AddProduct;