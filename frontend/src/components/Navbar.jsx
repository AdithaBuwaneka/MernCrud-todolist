import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between mb-20">
      <h1 className="text-lg font-bold">MERN CRUD APP NEW</h1>
      <div>
        <Link to="/" className="mx-2">Home</Link>
        <Link to="/create" className="mx-2">Add Item</Link>
        <Link
          to="/forgot-password"
          className="bg-white text-blue-500 px-4 py-2 rounded-lg"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;