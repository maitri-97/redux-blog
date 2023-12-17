import { Link, useParams } from "react-router-dom";
import { useGetPostsByUserIdQuery } from "../posts/postsSlice";
import { useGetUsersQuery } from "../users/usersSlice";
import PostsExcerpt from "../posts/PostsExcerpt";
import Loading from "../../components/Loading";

const UserPage = () => {
  const { userId } = useParams();

  const {
    user,
    isLoading: isLoadingUser,
    isSuccess: isSuccessUser,
    isError: isErrorUser,
    error: errorUser,
  } = useGetUsersQuery("getUsers", {
    selectFromResult: ({ data, isLoading, isSuccess, isError, error }) => ({
      user: data?.entities[userId],
      isLoading,
      isSuccess,
      isError,
      error,
    }),
  });

  const {
    data: postsForUser,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsByUserIdQuery(userId);

  let content;
  if (isLoading || isLoadingUser) {
    content = <Loading />;
  } else if (isSuccess && isSuccessUser) {
    const { entities } = postsForUser;
    content = (
      <div className="container">
        <h2 className="text-capitalize mb-3">Blogs Of {user?.name}</h2>
        <div className="row">
          {Object.keys(entities)?.length > 0 &&
            Object.keys(entities)?.map((postId) => {
              return <PostsExcerpt key={postId} postId={postId} />;
            })}
        </div>
      </div>
    );
  } else if (isError || isErrorUser) {
    content = <p>{error || errorUser}</p>;
  }

  return content;
};

export default UserPage;
