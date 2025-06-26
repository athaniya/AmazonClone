import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen fixed ">
      <div className="p-4 text-xl font-semibold">Admin Dashboard</div>
      <div className="mt-8">
        <ul>
          <li>
            <Link to="/add-food" className="block py-2 px-4 hover:bg-gray-700">
              Add Food
            </Link>
          </li>
          <li>
            <Link to="/show-all-food" className="block py-2 px-4 hover:bg-gray-700">
              Show All Food
            </Link>
          </li>
          <li>
            <Link to="/orders" className="block py-2 px-4 hover:bg-gray-700">
              Orders
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
