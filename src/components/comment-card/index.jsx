import PropTypes from "prop-types"

export default function CommentCard ({product,category,comment,date,commenter,star,onClick,className ,...props}){
    function renderStars(starCount) {
        const stars = [];
        for (let i = 0; i < 5; i++) {
          // Yıldızın sarı veya gri olup olmadığını kontrol et
          const isYellow = i < starCount;
      
          stars.push(
            <span key={i} className={isYellow ? "text-yellow-500" : "text-gray-400"}>
              ★
            </span>
          );
        }
        return stars;
      }
      
    return(
        <div className=     "w-full rounded-lg shadow-md p-5 h-96">
            <h3 className=  "flex justify-start text-lg font-black pt-2 text-start overflow-hidde line-clamp-2">{product}</h3>
            <h1 className=  "flex justify-start  py-2 text-start overflow-hidde line-clamp-1 ">{category}</h1>
            <h6 className=  "flex justify-start text-sm/60 pb-2 overflow-hidde line-clamp-1">
                <span className="flex justify-between w-full mb-10">
                    <span className="px-1">{commenter}</span>
                    <span className="px-1" >{renderStars(star)}</span>
                </span> 
            </h6>
            <h5 className=  "flex justify-start text-sm/50  py-2 font-semibold"> {date}</h5>
            <h4 className=  "flex justify-start text-lg/50  py-2 max-h-52">
                <div className="overflow-hidden line-clamp-5">
                    {comment}
                </div>
            </h4>
            
        </div>
    )
}
CommentCard.propTypes={
    product:PropTypes.string,
    category:PropTypes.string,
    comment:PropTypes.string,
    date:PropTypes.string,
    commenter:PropTypes.string,
    star:PropTypes.number,
    onClick:PropTypes.func, // hata gelirse burdan olabilir
    props:PropTypes.object,
    className:PropTypes.string

}