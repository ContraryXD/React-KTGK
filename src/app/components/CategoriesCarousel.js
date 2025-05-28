import Link from "next/link";
import Image from "next/image";

const CategoriesCarousel = () => {
  // Placeholder for carousel logic
  // For now, displaying a few static items as an example
  const categories = [
    { name: "Fresh Fruit", img: "/img/categories/cat-1.jpg" },
    { name: "Dried Fruit", img: "/img/categories/cat-2.jpg" },
    { name: "Vegetables", img: "/img/categories/cat-3.jpg" },
    { name: "drink fruits", img: "/img/categories/cat-4.jpg" },
    { name: "drink fruits", img: "/img/categories/cat-5.jpg" },
  ];

  return (
    <section className="categories">
      <div className="container">
        <div className="row">
          {/* Placeholder for owl-carousel - rendering static items for now */}
          <div className="categories__slider">
            {categories.map((category, index) => (
              <div className="col-lg-3" key={index}>
                {" "}
                {/* Adjust col size as needed if not using a carousel library */}
                <div className="categories__item set-bg" style={{ backgroundImage: `url(${category.img})` }}>
                  <h5>
                    <Link href="#">{category.name}</Link>
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesCarousel;
