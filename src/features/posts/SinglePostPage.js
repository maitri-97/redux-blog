import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGetPostsQuery } from "./postsSlice";
import Loading from "../../components/Loading";
import { IMAGE_BASEURL } from "./PostsExcerpt";

const SinglePostPage = () => {
  const { postId } = useParams();

  const { post, isLoading } = useGetPostsQuery("getPosts", {
    selectFromResult: ({ data, isLoading }) => ({
      post: data?.entities[postId],
      isLoading,
    }),
  });

  if (isLoading) return <Loading />;

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <div className="container">
      <div className="mb-3 d-flex align-items-start justify-content-between">
        <div>
          <h2 className="text-capitalize mb-0">{post?.title}</h2>
          <div>
            <PostAuthor userId={post?.userId} />
            <div className="ms-2 d-inline-block">
              <TimeAgo timestamp={post?.date} />
            </div>
          </div>
        </div>
        <Link to={`/post/edit/${post?.id}`} className="text-dark fs-12px mt-3">
          <i className="fa fa-edit me-1"></i> Edit Blog
        </Link>
      </div>
      <img
        src={`${IMAGE_BASEURL}${postId}`}
        alt=""
        className="w-100 object-fit-cover mb-3 h-450px"
      />
      <p className="text-muted">{post?.body}</p>
      <div className="d-flex aling-items-start justify-content-between">
        <ReactionButtons post={post} />
        <Link to={`/post/edit/${post?.id}`} className="text-dark fs-12px me-2">
          <i className="fa fa-edit me-1"></i> Edit Blog
        </Link>
      </div>
    </div>
  );
};

export default SinglePostPage;
