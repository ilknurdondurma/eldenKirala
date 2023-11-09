// app.js
import React from 'react';
import ProductCard from './components/productCard';
import Footer from './components/footer';
import { Router } from 'react-router-dom';


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
  return (
      <div className="App min-h-screen flex flex-col">
      <div className='flex-grow'>
      
      </div>
      <footer>
        
        <Footer/>
      </footer>
    </div>
  );
}

export default App;
/**
 const handleSubmit = (values) => {
    console.log(values);
  }
  const handleAddToCart = (productName) => {
    // Sepete ekleme işlemleri burada gerçekleştirilebilir.
    console.log(`${productName} sepete eklendi.`);
  };
  const products = [
    {
      productID:1,
      image: 'https://yandex-images.clstorage.net/B1F003I19/f58f35asnH/k4WpoqjL1vx1zxTzy464bv7619Tqse4CI5Lx_sDkxBdlOQONqHWX1g70ekvTRkZVj8iab9t-dIWEHTfUOCHRwoHW6-7tj82gJosKp8ONvWzjp5TF9uvqXznQraqCvp9MMTpk5tgCtOojxQo-qmoGFsDU0TbUeCHImhtpgXUxlPm6xJSBnMm7-3LQW9vfrK9F84LW9N3v1nwfvbuKoPWQGFVcQdj7GaX8ANgqPo11JDb0sMUt2G8x1tMdTaMCLafgtLy7gZjOsvxi03PvxIuxU-228OXdzOFEAJG2pZHtpThJfmvp1Raf_jjaNSm2awI3-IDHH81oEsrnK060IRGj86-iqrqNyZL_ec9d-Oyhj27jo9Lf_d3BTSuilZ6K9ZYmR35ozcwzu_Mq2ygosGMII9Ogxw7Pdwfl4SJvqC4Cgeq8tq-ute2q61PfXP7Gsb5P17LU9_XxwHE6vKa3n-CpAHdCfvjuMILlB9gvDo9oHwDYjv0_9lgs_tAZa70SA6jigJyxuonOuf1Q7XDs2a-eWMOOwPzx_PNPHKKorZfRojpFaF_31DCewibjNAuuQh815Yv_MO5vD9LkFGCuASijy6GWtq-P9q3fZ957w8KSpHzKsvz_--_Bbjq0pLGG86QeUUxa8ewMsuA-2Ds3iUE5B_icwgfZTAHT5QtvizQCgs-TkJaKtuicyHboWMDLqp9O0oD-59XZ020vlY-qoeOrIFJBQczNK7faKfElO5JCEBvxnfA-ylY1wdY_RakaA5bBnay0gJjpv-lr1Wn_-7OwfN6H6uHazeJ2HbWPjITgtRZPbW7L0gSG8h3FBiuqfhMm2bnGHMhKL8DfPm-PDCeA1p-Tv6iKwLbddPd92vOmmVjgjffh_8vwbxm7hqyRy5glcn1UwPYVufAd0yQYh1MoN9qYzw7McxL39xBjuy8Igs6nlLCnst2C1X7YQsfMoqRJy5vV_9z5_nQDsYuxqs0',
      description:"Yeni gibi hiç bir hasarı yok. Sadece bataryası zayıf",
      information:"Samsung 6.6 inç 5G 8 GB Ram 128 GB Depolama Samsung 6.6 inç 5G 8 GB Ram 128 GB Depolama",
      title: 'IPHONE 14',
      price: 100.99,
      availability: 5,
    },
    {
      productID:2,
      image: 'https://avatars.mds.yandex.net/i?id=9542cc3f062410eeccc307d0468273254ccbf831-8769045-images-thumbs&n=13',
      description:"Yeni gibi hiç bir hasarı yok. Sadece bataryası zayıf",
      information:"Samsung 6.6 inç 5G 8 GB Ram 128 GB Depolama",
      title: 'Bebek Arabası',
      price: 75.99,
      availability: 10,
    },
    {
      productID:3,
      image: 'https://media.gqmagazine.fr/photos/5ede283413fadf7081f1a1a9/4:3/w_1200,h_900,c_limit/sony-playstation-5.jpg',
      description:"Yeni gibi hiç bir hasarı yok. Sadece bataryası zayıf",
      information:"Samsung 6.6 inç 5G 8 GB Ram 128 GB Depolama",
      title: 'Playstation 5',
      price: 755.99,
      availability: 10,
    },
    {
      productID:4,
      image: 'https://avatars.mds.yandex.net/i?id=93aa06bb6964435633294612465fd8d833472b3f-9837140-images-thumbs&n=13',
      description:"Yeni gibi hiç bir hasarı yok. Sadece bataryası zayıf.Yeni gibi hiç bir hasarı yok. Sadece bataryası zayıf",
      information:"Samsung 6.6 inç 5G 8 GB Ram 128 GB Depolama",
      title: 'Güneş Gözlüğü',
      price: 757.89,
      availability: 10,
    },
    {
      productID:5,
      image: 'https://www.bulvarpazari.com/wp-content/uploads/KG86NHI30N.jpg',
      description:"sdsdsdssb sdjkshd djshdjs sjdhjhd jshdjshdsj",
      information:"Samsung 6.6 inç 5G 8 GB Ram 128 GB Depolama",
      title: 'Buzdolabı',
      price: 487.99,
      availability: 10,
    },
    // Diğer ürünler
  ];
  const likedProducts=[1,2,3];
  const comments=[
    {
      product:"Xbox Series X Oyun Konsolu",
      category:"Oyun konsolu & VR",
      comment:" Spor salonunda test etmek için kiraladım, direkt sıfır olarak alıp heveslenip bir kenara atacağım düşüncesi ile direkt almadım. Ürün tertemiz, özenle hazırlanmış şekilde geldi. Sonrasında zaten başka ürünler de kiraladım.Spor salonunda test etmek için kiraladım, direkt sıfır olarak alıp heveslenip bir kenara atacağım düşüncesi ile direkt almadım. Ürün tertemiz, özenle hazırlanmış şekilde geldi. Sonrasında zaten başka ürünler de kiraladım. ",
      date:"02/11/2023",
      star:5,
      commenter:"İlknur Dondurma",
      variant:"primary"
    },
    {
      product: "PlayStation 5 Oyun Konsolu",
      category: "Oyun konsolu & VR",
      comment: "Harika bir deneyimdi, konsol çok hızlı çalışıyor ve oyunlar harika görünüyor. Kesinlikle tavsiye ederim!",
      date: "02/11/2023",
      star:2,
      commenter: "Ahmet Yılmaz",
      variant:"primary"
    },
    {
      product: "Samsung 4K UHD Akıllı TV",
      category: "Televizyon",
      comment: "Bu televizyonu yatak odam için aldım ve kalitesinden çok memnunum. 4K görüntü harika!",
      date: "02/11/2023",
      star:5,
      commenter: "Ayşe Demir",
      variant:"primary"
    },
    {
      product: "MacBook Pro 2022",
      category: "Bilgisayar",
      comment: "Mükemmel bir bilgisayar, iş için kullanıyorum ve performansı harika. Özellikle Retina ekranı beni büyüledi!",
      date: "02/11/2023",
      star:5,
      commenter: "Mehmet Kaya",
      variant:"primary"
    },
    {
      product: "Sony WH-1000XM4 Kulaklık",
      category: "Kulaklık",
      comment: "Ses kalitesi ve gürültü engelleme harika! Uzun uçuşlar için mükemmel bir seçenek.",
      date: "02/11/2023",
      star:5,
      commenter: "Selin Aydın",
      variant:"primary"
    },
    {
      product: "Nespresso Lattissima Kahve Makinesi",
      category: "Kahve Makinesi",
      comment: "Kahve severler için harika bir seçenek. Espresso ve süt bazlı içecekler mükemmel yapılıyor. ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!vMükemmel bir taşınabilir hoparlör ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!vMükemmel bir taşınabilir hoparlör ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!vMükemmel bir taşınabilir hoparlör ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!vMükemmel bir taşınabilir hoparlör",
      date: "02/11/2023",
      star:3,
      commenter: "Hasan Çelik",
      variant:"primary"
    },
    {
      product: "DJI Mavic Air 2 Drone",
      category: "Drone",
      comment: "Muhteşem bir drone! Harika çekimler yapabilirsiniz. Ancak uçuş kurallarına dikkat edin!",
      date: "02/11/2023",
      star:1,
      commenter: "Elif Gök",
      variant:"primary"
    },
    {
      product: "GoPro HERO10 Aksiyon Kamera",
      category: "Aksiyon Kamera",
      comment: "Mükemmel bir taşınabilir hoparlör, ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!Mükemmel bir taşınabilir hoparlör, ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!Mükemmel bir taşınabilir hoparlör, ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!Mükemmel bir taşınabilir hoparlör, ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!Mükemmel bir taşınabilir hoparlör, ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!Mükemmel bir taşınabilir hoparlör, ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!Mükemmel bir taşınabilir hoparlör, ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!Mükemmel bir taşınabilir hoparlör, ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!Mükemmel bir taşınabilir hoparlör, ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!Mükemmel bir taşınabilir hoparlör, ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!Mükemmel bir taşınabilir hoparlör, ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!Mükemmel bir taşınabilir hoparlör, ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!Mükemmel bir taşınabilir hoparlör, ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!vMükemmel bir taşınabilir hoparlör, ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum! ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!vMükemmel bir taşınabilir hoparlör ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!vMükemmel bir taşınabilir hoparlör ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!vMükemmel bir taşınabilir hoparlör ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!vMükemmel bir taşınabilir hoparlör ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!vMükemmel bir taşınabilir hoparlör ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!vMükemmel bir taşınabilir hoparlör ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!vMükemmel bir taşınabilir hoparlör ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!vMükemmel bir taşınabilir hoparlör ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!vMükemmel bir taşınabilir hoparlör",
      date: "02/11/2023",
      star:5,
      commenter: "Emre Yıldız",
      variant:"primary"
    },
    {
      product: "Bose SoundLink Renkli Taşınabilir Hoparlör",
      category: "Hoparlör",
      comment: "Mükemmel bir taşınabilir hoparlör, ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!Mükemmel bir taşınabilir hoparlör, ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!Mükemmel bir taşınabilir hoparlör, ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!Mükemmel bir taşınabilir hoparlör, ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!Mükemmel bir taşınabilir hoparlör, ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!Mükemmel bir taşınabilir hoparlör, ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!Mükemmel bir taşınabilir hoparlör, ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!Mükemmel bir taşınabilir hoparlör, ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!Mükemmel bir taşınabilir hoparlör, ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!Mükemmel bir taşınabilir hoparlör, ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!Mükemmel bir taşınabilir hoparlör, ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!Mükemmel bir taşınabilir hoparlör, ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!Mükemmel bir taşınabilir hoparlör, ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!vMükemmel bir taşınabilir hoparlör, ses kalitesi ve pil ömrü harika. Seyahatlerde kullanıyorum!",
      date: "02/11/2023",
      star:5,
      commenter: "Zeynep Şimşek",
      variant:"primary"
    }
  ];
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
                                    console.log("Seçilen değer:", selectedValue);
                                    setFieldValue("opt1", selectedValue);
                                }}/>
                <SelectBox 
                    options={options2} 
                    variant="secondary"
                    label="adsdsdsd" 
                    name="opt2" 
                    onChange={(selectedValue) => {
                                    console.log("Seçilen değer:", selectedValue);
                                    setFieldValue("opt2", selectedValue);
                                }}/>
              <TextArea label="acıklama" name="ack" />
              <CheckBox name="chck" options={coptions} />
              <Button type="submit"variant="Green" onClick={() =>console.log("Button clicked")}> Gönder</Button>
            </Form>
    )}
          </Formik>
          

        
             <div className=' gap-8 m-2 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
              {products.map((product, index) => (
                      <ProductCard
                        key={index}
                        productID={product.productID}
                        likedProducts={likedProducts}
                        image={product.image}
                        title={product.title}
                        description={product.description}
                        information={product.information}
                        price={product.price}
                        availability={product.availability}
                        onClick={() => handleAddToCart(product.title)}
                      />
                    ))}
          </div>
        

          
             <div className='grid grid-cols-1 gap-5'>
              {comments.map((comment, index) => (
                      <CommentCard
                        key={index}
                        variant={comment.variant}
                        product={comment.product}
                        category={comment.category}
                        comment={comment.comment}
                        date={comment.date}
                        star={comment.star}
                        commenter={comment.commenter}
                      />
                    ))}
          </div>
            
 */