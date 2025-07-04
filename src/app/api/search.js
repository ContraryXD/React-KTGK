// import axios from "axios";

// export function timKiemSanPham(tuKhoa, options = {}) {
//    const { limit = 20, skip = 0 } = options;

//    if (!tuKhoa || tuKhoa.trim() === "") {
//       return Promise.resolve({
//          products: [],
//          total: 0,
//          skip: 0,
//          limit: limit
//       });
//    }

//    return axios
//       .get(`https://dummyjson.com/products/search?q=${encodeURIComponent(tuKhoa.trim())}&limit=${limit}&skip=${skip}`)
//       .then((response) => {
//          const data = response.data;
//          console.log(`[Search API] Found ${data.total} products for "${tuKhoa}"`);

//          const ketQuaTimKiem = {
//             products: data.products.map((product) => ({
//                id: product.id,
//                title: product.title,
//                description: product.description,
//                price: `$${product.price}`,
//                originalPrice:
//                   product.discountPercentage > 0
//                      ? `$${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}`
//                      : null,
//                discount: product.discountPercentage > 0 ? `-${Math.round(product.discountPercentage)}%` : null,
//                discountPercentage: product.discountPercentage,
//                rating: product.rating,
//                stock: product.stock,
//                brand: product.brand,
//                category: product.category,
//                thumbnail: product.thumbnail,
//                image: product.thumbnail,
//                images: product.images || [product.thumbnail]
//             })),
//             total: data.total,
//             skip: data.skip,
//             limit: data.limit,
//             tuKhoa: tuKhoa
//          };

//          return ketQuaTimKiem;
//       })
//       .catch((error) => {
//          console.log(error);
//       });
// }
