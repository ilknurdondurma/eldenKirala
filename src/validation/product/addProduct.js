import Yup from "..";

export const productSchema = Yup.object().shape({
  brand: Yup.string().required("Marka seçiniz"),
  category: Yup.string().required("Kategori seçiniz"),
  subCategory: Yup.string().required("Alt Kategori seçiniz"),
  header: Yup.string().required("İlan Başlığı Giriniz")
  .max(50,"max 50 karakter girilebilir"),
  description: Yup.string().required("İlan Açıklaması Giriniz")
    .max(200,"max 200 karakter girilebilir"),
  state: Yup.string().required("Durum seçiniz"),
  price: Yup.number().required("Fiyat Giriniz"),
  MinRentalPeriod: Yup.number()
    .required("Min Kiralama Süresi Giriniz")
    .min(1, 'Min Kiralama Süresi 1\'den küçük olamaz')
    .max(18, 'Min Kiralama Süresi 18\'den büyük olamaz')
    .test(
        'is-less-than-or-equal',
        'Max Kiralama Süresi Min Kiralama Süresinden büyük olamaz',
        function (value) {
          return value <= this.parent.MaxRentalPeriod;
        }
      ),

  MaxRentalPeriod: Yup.number()
    .required("Max Kiralama Süresi Giriniz")
    .min(1, 'Max Kiralama Süresi 1\'den küçük olamaz')
    .max(18, 'Max Kiralama Süresi 18\'den büyük olamaz')
    
})