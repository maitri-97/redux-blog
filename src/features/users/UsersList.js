import { Link } from "react-router-dom";
import { useGetUsersQuery } from "./usersSlice";
import Loading from "../../components/Loading";


export const RANDOM_USER_BASEURL = "https://xsgames.co/randomusers/assets/avatars/pixel/";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("getUsers");

  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (isSuccess) {
    const renderedUsers = Object.keys(users?.entities)?.map((userId) => {
      const user = users?.entities[userId];
      return (
        <div className="col-sm-4 col-6 mb-4" key={userId}>
          <div className="card border-0 shadow rounded-0">
            <div className="card-body">
              <div className="mb-2">
                <img src={`${RANDOM_USER_BASEURL}${userId}.jpg`} className="mw-100 h-auto w-25" alt="" />
              </div>
              <h5 className="card-title">{user?.name}</h5>
              <p className=" mb-0">
                <Link className="text-muted text-decoration-none" to={`mailTo:${user.email}`}>
                  {user?.email}
                </Link>
              </p>
              <p className="mb-0">
                <Link className="text-muted text-decoration-none">{user?.phone}</Link>
              </p>
              <p className="mb-0">
                <a
                  className="text-muted text-decoration-none"
                  href={`https://${user?.website}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {user?.website}
                </a>
              </p>
              <p className="mb-0">
                <Link to={`/user/${userId}`} className="text-muted text-decoration-none">See Blogs</Link>
              </p>
            </div>
          </div>
        </div>
      );
    });

    content = (
      <div className="container">
        <h2 className="text-capitalize mb-3">Bloggers</h2>

        <div className="row">{renderedUsers}</div>
      </div>
    );
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return content;
};

export default UsersList;
