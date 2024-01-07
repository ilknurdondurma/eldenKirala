import PropTypes from "prop-types";

export default function CommentCard({ comments, variant }) {
  function renderStars(starCount) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
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
    return (
      <div className="grid grid-cols-1 w-3/4 sm:w-full self-center gap-5 font-sans">
        {comments.map((comment) => (
          <div key={comment.id} className="w-full rounded-lg shadow-md p-5 h-96 m-2 bg-gray-100">
            <h3 className="flex justify-start text-lg font-black pt-2 text-start overflow-hidden line-clamp-2 ">
              {comment.productId}
            </h3>
            <h1 className="flex justify-start py-2 text-start overflow-hidden line-clamp-1 ">
              {"category"}
            </h1>
            <h6 className="flex justify-start text-sm/60 pb-2 overflow-hidden line-clamp-1">
              <span className="flex justify-between w-full mb-10">
                <span className="px-1 ">{comment.userName}</span>
                <span className="px-1">{renderStars(comment.userRating/2)}</span>
              </span>
            </h6>
            <h5 className="flex justify-start text-sm/50 py-2 font-semibold "> {comment.createdDate}</h5>
            <h4 className="flex justify-start text-lg/50 py-2 max-h-52">
              <div className="overflow-hidden line-clamp-5 ">
                {comment.commentContent}
              </div>
            </h4>
          </div>
        ))}
      </div>
    );
  } else if (variant === "primary") {
    return (
      
      <div className=" rounded-lg w-3/4 sm:w-full self-center grid grid-cols-1 gap-5 border-2 p-5">
        {comments.map((comment) => {
          const formattedDate = new Date(comment.createdDate).toLocaleDateString('tr-TR');
          return (
            <div key={comment.id} className="w-full rounded-lg shadow-md p-7 m-2 bg-gray-100">
              <h6 className="flex justify-start text-sm/60 pb-1  ">
                <span className="flex justify-between w-full mb-1">
                  <span className=" font-semibold">{comment.userName} {comment.userSurname}</span>
                  <span className="px-1">{renderStars(comment.userRating/2)}</span>
                </span>
              </h6>
              <h5 className="flex justify-start text-sm/50  "> {formattedDate}</h5>
              <h4 className="flex justify-start text-lg/50 pt-3 ">
                <div className={`overflow-auto opacity-60 ${comment.commentContent.length > 100 ? 'max-h-40' : 'max-h-96'}`}>
                  {comment.commentContent}
                </div>
              </h4>
            </div>
          );
        })}
        {(!comments || (Array.isArray(comments) && comments.length === 0)) && (
        <div className="w-full rounded-lg shadow-md p-5 m-2 bg-gray-100 text-center">
          Comment yok
        </div>
      )}
      </div>
    );
  }
}

CommentCard.propTypes = {
  comments: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  variant: PropTypes.oneOf(['primary', 'secondary']),
};

CommentCard.defaultProps = {
  variant: 'primary',
};
