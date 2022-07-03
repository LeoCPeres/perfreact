import { useCallback, useState } from "react";
import { SearchResults } from "../components/SearchResults";

type Results = {
  totalPrice: number;
  data: any[];
};

interface ProductType {
  id: number;
  title: string;
  price: number;
  priceFormatted: string;
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Results>({ totalPrice: 0, data: [] });

  async function handleSearch() {
    event?.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const products = data.map((product: ProductType) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price),
      };
    });

    const totalPrice = data.reduce((total: number, product: ProductType) => {
      return total + product.price;
    }, 0);

    //é mais performático formatar os dados quando temos o acesso na API do que direto no componente.

    setResults({ totalPrice, data: products });
  }

  const addToWithList = useCallback(() => {
    async (id: number) => {
      console.log(id);
    };
  }, []);

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">Buscar</button>
      </form>

      <SearchResults
        results={results.data}
        onAddToWishList={addToWithList}
        totalPrice={results.totalPrice}
      />
    </div>
  );
}
