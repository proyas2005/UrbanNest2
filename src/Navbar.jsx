const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">UrbanNest</h1>

        <div className="hidden md:flex space-x-8">
          <a href="#" className="hover:text-blue-600">Home</a>
          <a href="#" className="hover:text-blue-600">Rentals</a>
          <a href="#" className="hover:text-blue-600">Housemaids</a>
          <a href="#" className="hover:text-blue-600">Shops</a>
        </div>

        <div className="space-x-4">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
            Login
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;