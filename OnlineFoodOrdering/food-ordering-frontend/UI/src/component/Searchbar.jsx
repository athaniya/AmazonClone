import { BsSearch } from "react-icons/bs";

export default function Searchbar({setCategory,setSearchText,searchText}) {
    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex justify-center">
                <div className="w-full md:w-2/3 lg:w-1/2">
                    <form className="flex" onSubmit={(e) => e.preventDefault()}>
                        {/* Select Dropdown */}
                        <select
                            className="px-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option >All</option>
                            <option value="Biryani">Biryani</option>
                            <option value="Burger">Burger</option>
                            <option value="Cakes">Cakes</option>
                            <option value="Ice Creams">Ice Creams</option>
                            <option value="Pizza">Pizza</option>
                            <option value="Roll">Rolls</option>
                            <option value="Salad">Salad</option>
                        </select>

                        {/* Input */}
                        <input
                            type="text"
                            className="flex-1 px-4 text-sm border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
                            placeholder="Search your favourite dish..."
                            onChange={(e) => setSearchText(e.target.value)}
                            value={searchText}
                        />

                        {/* Search Button (Icon only) */}
                        <button
                            type="submit"
                            className="flex items-center justify-center w-10 bg-blue-600 text-white border border-blue-600 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
                        >
                            <BsSearch />
                        </button>
                    </form>
                </div>
            </div>
        </div>

    )
}
