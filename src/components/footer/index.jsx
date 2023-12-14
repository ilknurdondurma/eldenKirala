import { Form, Formik } from "formik";
import Button from "../button";
import Input from "../Input/text"
import TextArea from "../Input/textArea"
import { useEffect, useState } from "react";
import { getCategories } from "../../api";
import { NavLink ,useNavigate } from "react-router-dom";


export function  Footer({ ...props}){
    const handleSubmit=(values)=>{
        console.log(values);
    }

    const followLinks=["İnstagram","Twitter","Facebook","Youtube"]

    const helperRoutes=[
        {id:1 , title:"Sıkça Sorulan Sorular" ,route:"yardim/sorular"},
        {id:2 , title:"Canlı Yardım" ,route:"yardim/canli"},
        {id:3 , title:"Nasıl İade Ederim" ,route:"yardim/iade"},
        {id:4 , title:"Fırsatlar" ,route:"firsatlar"},
    ]
    const contactRoutes=[
        {id:1 , title:"Adres" ,route:"iletisim/adres"},
        {id:2 , title:"E posta" ,route:"iletisim/adres"},
        {id:3 , title:"Telefon" ,route:"iletisim/adres"},
        {id:4 , title:"Destek Hattı" ,route:"iletisim/adres"},
    ]

    const [categories, setCategories] = useState([])
    const firstFiveItems = categories.slice(0, 5);
    const endFiveItems = categories.slice(6, 11);


    useEffect(() => {
        getCategories()
        .then((result)=>{
            setCategories(result?.data.data)
            console.log(categories)
        })
        .catch((error)=>{
            console.log(error)

        })
    }, [])

    const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    // Seçili kategoriye ait ürünlerin bulunduğu sayfaya yönlendirme yap
    navigate(`/products/${category.id}`);
  };

    
    return(
        <div className="text-center flex flex-col justify-end ">

            {/**          GREY SECTİON       */}
 
            <div className="bg-tertiary  p-5 ">
                {/**      İNDİRME LİNKLERİ   */}
                <div className="">
                    <span className=" p-6 w-40"> 
                        <Button variant="Purple" size="normal">
                            <a href="https://www.instagram.com/ilknrddma"><div className="text-xl sm:text-lg hover:underline p-2 my-2 px-5 font-bold">Google Play</div></a>
                        </Button>
                    </span>
                    <span className="p-6 w-40"> 
                        <Button variant="Purple" size="normal" className="my-6">
                            <a href="https://www.instagram.com/ilknrddma"><div className="text-xl sm:text-lg hover:underline p-2 my-2 px-5 font-bold"> App Store  </div></a>
                        </Button>
                    </span>
                </div>  
                <div className="grid grid-col-4 p-5 content-center text-white ">    
                    {/**         HELP VE Kategoriler  */}
                        <div className="sm:col-start-1 sm:col-end-3 / md:col-start-1 md:col-end-2 / lg:col-start-1 lg:col-end-2 / xl:col-start-1 xl:col-end-2 / 2xl:col-start-1 2xl:col-end-2   ">

                            <div className="grid grid-cols-2 sm:grid-cols-1">
                                <div className="text-left">
                                    <div className="font-extrabold underline text-xl">
                                        KATEGORİLER
                                    </div>
                                    <div className="grid grid-cols-2 gap-0">
                                        <span>
                                            {firstFiveItems.map((help, index) => (
                                                        <span key={index} className="p-2  hover:underline font-medium"  onClick={() => handleCategoryClick(help)}>
                                                            <li key={index} className="list-none">
                                                                {help.name}
                                                            </li>
                                                        </span>
                                                    ))}
                                            </span>
                                            
                                    </div>
                                </div>
                            
                                <div className="text-left">
                                    <div className="font-extrabold underline text-xl">
                                        Help
                                    </div>
                                    <div>
                                    {helperRoutes.map((route,index)=>(
                                        <span key={index} className="p-2  hover:underline">
                                            <li key={index} className="list-none font-medium">
                                                <NavLink to={route.route} key={index}>{route.title}</NavLink>
                                            </li>
                                        </span>
                                        ))}
                                            
                                    </div>
                                    <div>
                                        <Button variant="TransparentButton" size="small" className="text-white border border-1 sm:text-xs p-1 m-1">
                                            <a href="https://www.instagram.com/ilknrddma"><div className="text-xl sm:text-lg hover:underline p-2 my-2 px-5 font-bold">Troy</div></a>
                                        </Button>
                                        <Button variant="TransparentButton" size="small" className="text-white border border-1 sm:text-xs p-1 m-1">
                                            <a href="https://www.instagram.com/ilknrddma"><div className="text-xl sm:text-lg hover:underline p-2 my-2 px-5 font-bold">Visa</div></a>
                                        </Button>
                                        <Button variant="TransparentButton" size="small" className="text-white border border-1 sm:text-xs p-1 m-1">
                                            <a href="https://www.instagram.com/ilknrddma"><div className="text-xl sm:text-lg hover:underline p-2 my-2 px-5 font-bold">MasterCard</div></a>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    {/**         İLETİŞİM VE BİZİ TAKİP EDİN  */}
                        <div className="sm:col-start-3 sm:col-end-5 / md:col-start-2 md:col-end-3 / lg:col-start-2 lg:col-end-3 / xl:col-start-2 xl:col-end-3 / 2xl:col-start-2 2xl:col-end-3 ">

                            <div className="grid grid-cols-2 sm:grid-cols-1">
                                <div className="text-left">
                                    <div className="font-extrabold underline text-xl">
                                        İletişim
                                    </div>
                                    <div>
                                        {contactRoutes.map((contact, index) => (
                                                        <span key={index} className="p-2 hover:underline ">
                                                            <li key={index}  className="list-none font-medium">
                                                                <NavLink to={contact.route} key={index}>{contact.title}</NavLink>
                                                            </li>
                                                        </span>
                                                    ))}
                                    </div>
                                </div>
                            
                                <div className="text-left">
                                    <div className="font-extrabold underline text-xl">
                                        Bizi Takip Edin
                                    </div>
                                    <div>
                                        {followLinks.map((follow, index) => (
                                                        <span key={index} className="p-2 hover:underline">
                                                            <li key={index} className="list-none font-medium">
                                                                {follow}
                                                            </li>
                                                        </span>
                                                    ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    {/**         ULAŞIM FORMU    */}
                        <div className="sm:col-start-1 sm:col-end-5 / md:col-start-3 md:col-end-5 / lg:col-start-3 lg:col-end-5 / xl:col-start-3 xl:col-end-5 / 2xl:col-start-3 2xl:col-end-5 sm:my-10 my-2">
                            <div className="font-extrabold">
                                Bize Ulaşın
                            </div>
                            <div>
                                <Formik  
                                    initialValues={{
                                        name:"",
                                        email:"",
                                        ack:""
                                    }}
                                        onSubmit={values => {
                                        handleSubmit(values)
                                        }}>
                                    {({ setFieldValue,}) => (
                                        <Form>
                                        <Input  name="name" placeholder="Adınız" />
                                        <Input  name="email" type="email" placeholder="E-mail" />
                                    
                                        <TextArea name="ack"placeholder="Mesajınız.." />
                                        <Button type="submit"variant="Purple" className="w-full m-2"> Gönder</Button>
                                        </Form>
                                )}
                                    </Formik>
                            </div>
                        </div>
                </div>
            </div>




                {/**     GREEN SECTİON   */}
             <div className="bg-primary text-white text-lg font-bold flex flex-col justify-center h-16 border border-black/50 ">
             Copyright © 2023 | Made by İlknur Dondurma
             </div>
        </div>
    )
}
//linkleri kaldırdım route yaılcak app jse ayar çekilcek