import PropTypes from "prop-types"

export default function CommentCard ({product,category,comment,date,commenter,star,variant,onClick,className ,...props}){
    
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
      
      if (variant === "secondary") {
        // Card yapısı
        return (
          <div className="w-full rounded-lg shadow-md p-5 h-96">
            <h3 className="flex justify-start text-lg font-black pt-2 text-start overflow-hidden line-clamp-2 ">
              {product}
            </h3>
            <h1 className="flex justify-start py-2 text-start overflow-hidden line-clamp-1 ">
              {category}
            </h1>
            <h6 className="flex justify-start text-sm/60 pb-2 overflow-hidden line-clamp-1">
              <span className="flex justify-between w-full mb-10">
                <span className="px-1 ">{commenter}</span>
                <span className="px-1">{renderStars(star)}</span>
              </span>
            </h6>
            <h5 className="flex justify-start text-sm/50 py-2 font-semibold "> {date}</h5>
            <h4 className="flex justify-start text-lg/50 py-2 max-h-52">
              <div className="overflow-hidden line-clamp-5 ">
                {comment}
              </div>
            </h4>
          </div>
        );
      } 

      else if (variant === "primary") {
        // Comment yapısı
        return (
          <div className="w-full rounded-lg shadow-md p-5">
            <h6 className="flex justify-start text-sm/60 pb-1  ">
              <span className="flex justify-between w-full mb-1">
                <span className=" font-semibold">{commenter}</span>
                <span className="px-1">{renderStars(star)}</span>
              </span>
            </h6>
            <h5 className="flex justify-start text-sm/50 py-1 font-semibold "> {date}</h5>
            <h4 className="flex justify-start text-lg/50 pt-3 ">
              <div className={`overflow-auto ${comment.length > 100 ? 'max-h-40' : 'max-h-96'}`}>
                {comment}
              </div>
            </h4>
          </div>
        );
      }
}
CommentCard.propTypes={
    product:PropTypes.string,
    variant:PropTypes.oneOf(['primary','secondary']),
    category:PropTypes.string,
    comment:PropTypes.string.isRequired,
    date:PropTypes.string,
    commenter:PropTypes.string.isRequired,
    star:PropTypes.number.isRequired,
    onClick:PropTypes.func, // hata gelirse burdan olabilir
    props:PropTypes.object,
    className:PropTypes.string
}
CommentCard.defaultProps={
    variant:'primary',
}
/**
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