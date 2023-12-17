import Loading from "../../components/Loading";
import PostsExcerpt from "./PostsExcerpt";
import { useGetPostsQuery } from "./postsSlice";

const PostsList = () => {
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery("getPosts");

  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (isSuccess) {
    content = (
      <div className="row">
        {posts?.ids?.map((postId, idx) => {
          return <PostsExcerpt key={postId} postId={postId} />;
        })}
      </div>
    );
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <>
      <div className="container">
        <h2 className="text-capitalize mb-3">All blogs</h2>
        <section>{content}</section>
      </div>
    </>
  );
};
export default PostsList;
