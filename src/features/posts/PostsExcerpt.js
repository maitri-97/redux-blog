import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";
import { useGetPostsQuery } from "./postsSlice";

export const IMAGE_BASEURL = "https://picsum.photos/1200/800?random=";

const PostsExcerpt = ({ postId }) => {
  const { post } = useGetPostsQuery("getPosts", {
    selectFromResult: ({ data }) => ({
      post: data?.entities[postId],
    }),
  });

  return (
    <div className="col-4 mb-4">
      <div className="shadow h-100 d-flex flex-column justify-content-start aling-content-start">
        <div>
          <img src={`${IMAGE_BASEURL}${postId}`} alt="" className="w-100" />
        </div>
        <div className="d-flex flex-column justify-content-between px-3 pt-2 pb-3 flex-grow-1">
          <div>
            <div className="d-flex align-items-center justify-content-between mb-1">
              <PostAuthor userId={post?.userId} />
              <TimeAgo timestamp={post?.date} />
            </div>
            <h2 className="fs-4 text-capitalize text-dark text-truncate">
              {post?.title}
            </h2>
            <p className="text-muted">{post?.body.substring(0, 75)}...</p>
          </div>
          <div className="d-flex aling-items-center justify-content-between">
            <p className="mb-0 text-dark">
              <Link to={`/post/${post?.id}`} className="text-dark fs-12px me-2">
                <i className="fa fa-eye me-1"></i>View Post
              </Link>
              <Link to={`/post/edit/${post?.id}`} className="text-dark fs-12px">
                <i className="fa fa-edit me-1"></i>Edit Post
              </Link>
            </p>
            <ReactionButtons post={post} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsExcerpt;
