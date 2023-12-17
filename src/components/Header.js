import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header z-3 bg-dark position-sticky top-0 start-0 text-white py-2">
      <div className="container d-flex align-items-center justify-content-between">
        <h1 className="mb-0 fs-4 lh-base">Blogs</h1>
        <ul className="d-flex aling-items-center list-unstyled mb-0 p-0">
          <li className="me-4">
            <Link to="/" className="text-white fs-14px text-decoration-none">
              <i className="fa fa-home me-2"></i>Home
            </Link>
          </li>
          <li className="me-4">
            <Link to="post" className="text-white fs-14px text-decoration-none">
            <i className="fa fa-rss-square me-2"></i>Write New Blog
            </Link>
          </li>
          <li>
            <Link to="user" className="text-white fs-14px text-decoration-none">
            <i className="fa fa-users me-2"></i>Bloggers
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
