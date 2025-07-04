
export default async function laySanPham({sl = 3}){
    const data = await fetch(`https://dummyjson.com/products?limit=${sl}&select=title,price,thumbnail`)
    return data.json();
}