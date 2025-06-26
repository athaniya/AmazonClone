import { Link } from "react-router-dom";


export default function Header() {
    return (
        <div className="w-[95%] mx-auto p-5 mb-4 bg-gray-100 rounded-lg mt-1">
            <div className="w-full p-8">
                <h1 className="text-4xl font-bold mb-4">Order your favorite food here</h1>
                <p className="md:w-2/3 text-2xl mb-6">Discover the best food and drinks in Tokyo</p>
                <Link
                    to="/explore"
                    className="inline-block bg-blue-600 text-white px-6 py-3 text-lg rounded-md hover:bg-blue-700 transition"
                >
                    Explore
                </Link>
            </div>
        </div>


    )
}
