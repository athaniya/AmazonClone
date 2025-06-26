import { useRef } from "react";
import { categories } from "../assets/assets";
import { SlArrowLeftCircle } from "react-icons/sl";
import { SlArrowRightCircle } from "react-icons/sl";


export default function ExploreMenu({ category, setCategory }) {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -150 : 150;
            scrollRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="px-4">
            {/* Header with scroll icons */}
            <div className="flex items-center justify-between border-b pb-2 mb-4">
                <h1 className="text-2xl font-semibold flex items-center gap-3">
                    Explore Menu
                </h1>
                <div className="flex gap-2 text-2xl items-center">
                    <button
                        onClick={() => scroll('left')}
                        className="transition transform hover:scale-110 hover:text-red-500"
                    >
                        <SlArrowLeftCircle />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="transition transform hover:scale-110 hover:text-red-500"
                    >
                        <SlArrowRightCircle />
                    </button>
                </div>

            </div>

            <p className="mb-4 text-gray-600">Explore curated lists of dishes from top categories</p>

            {/* Scrollable category row */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto space-x-4 sm:space-x-6 md:space-x-8 snap-x snap-mandatory scrollbar-hide scroll-smooth"
            >
                {categories.map((item, i) => (
                    <div
                        key={i}
                        className="min-w-[120px] flex-shrink-0 snap-start text-center cursor-pointer"
                        onClick={() =>
                            setCategory(prev => (prev === item.category ? 'All' : item.category))
                        }
                    >
                        <img
                            src={item.icon}
                            alt={item.category}
                            className={`mx-auto mb-2 w-24 h-24 object-contain transition-all duration-200 rounded-md
                            ${item.category === category ? 'ring-2 ring-blue-500 scale-105' : 'hover:opacity-90'}`}
                        />
                        <p className="text-sm text-gray-800">{item.category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
