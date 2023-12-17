import { Link } from "react-router-dom";
import { useGetUsersQuery } from "../users/usersSlice";

const PostAuthor = ({ userId }) => {
  const { user: author } = useGetUsersQuery("getUsers", {
    selectFromResult: ({ data, isLoading }) => ({
      user: data?.entities[userId],
    }),
  });

  return (
    <span className="fs-12px">
      {author ? (
        <Link to={`/user/${userId}`} className="text-dark fs-12px">
          <i className="fas fa-user-circle me-1"></i>
          {author.name}
        </Link>
      ) : (
        "Unknown author"
      )}
    </span>
  );
};
export default PostAuthor;
