
// import { useEffect } from "react";
// import CategoryItem from "../components/CategoryItem"
// import {useProductStore} from "../stores/useProductStore"
// import FeaturedProducts from "../components/FeaturedProducts";



// const categories = [
// 	{ href: "/ancient", name: "Ancient Coins", imageUrl: "/ancient.png" },
// 	{ href: "/east-india", name: "East India Company Coins", imageUrl: "/eastindia.jpg" },
// 	{ href: "/rare", name: "Rare Coins", imageUrl: "/rare.png" },
// 	{ href: "/error-coins", name: "Error Currency", imageUrl: "/error.png" },
// 	{ href: "/old-notes", name: "Old Notes", imageUrl: "/oldnote.jpg" },
// 	{ href: "/1900-2000", name: "1900-2000", imageUrl: "/centuryold.jpg" },
// 	// { href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
// ];
// const HomePage = () => {

//   const { fetchFeaturedProducts, products, isLoading } = useProductStore();

// 	useEffect(() => {
// 		fetchFeaturedProducts();
// 	}, [fetchFeaturedProducts]);

//   return (
//     <div className='relative min-h-screen text-white overflow-hidden'>
//     <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
//     <h1
//   className='text-center text-5xl sm:text-6xl font-bold bg-gradient-to-r from-yellow-500 via-red-400 to-yellow-600 text-transparent bg-clip-text mb-4'
// >
//   Explore Our Categories
// </h1>


//       <p className='text-center text-xl text-gray-300 mb-12'>
//       Explore our exquisite collection of Indian old coins today!
//       </p>

//       <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
//         {categories.map((category) => (
//           <CategoryItem category={category} key={category.name} />
//         ))}
//       </div>

//       {!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}
//     </div>
//   </div>
//   )
// }

// export default HomePage




import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import toast from "react-hot-toast"; // Import react-hot-toast

const categories = [
  { href: "/ancient", name: "Ancient Coins", imageUrl: "/ancient.png" },
  { href: "/east-india", name: "East India Company Coins", imageUrl: "/eastindia.jpg" },
  { href: "/rare", name: "Rare Coins", imageUrl: "/rare.png" },
  { href: "/error-coins", name: "Error Currency", imageUrl: "/error.png" },
  { href: "/old-notes", name: "Old Notes", imageUrl: "/oldnote.jpg" },
  { href: "/1900-2000", name: "1900-2000", imageUrl: "/centuryold.jpg" },
];

const HomePage = () => {
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();

    // Show the toast notification every time the user visits the homepage
    toast("This website is in test mode, please do not make any payments.", {
      icon: "⚠️",
      style: {
        backgroundColor: "#ffcc00",
        color: "#333",
      },
    });
  }, [fetchFeaturedProducts]);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-center text-5xl sm:text-6xl font-bold bg-gradient-to-r from-yellow-500 via-red-400 to-yellow-600 text-transparent bg-clip-text mb-4">
          Explore Our Categories
        </h1>

        <p className="text-center text-xl text-gray-300 mb-12">
          Explore our exquisite collection of Indian old coins today!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>

        {!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}
      </div>
    </div>
  );
};

export default HomePage;
