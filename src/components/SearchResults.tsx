import { ProductItem } from "./ProductItem";
import { useMemo } from "react";

type SearchResultsProps = {
  results: Array<{
    id: number;
    price: number;
    title: string;
    priceFormatted: string;
  }>;
  totalPrice: number;
  onAddToWishList: (id: number) => void;
};

export function SearchResults({
  results,
  onAddToWishList,
  totalPrice,
}: SearchResultsProps) {
  return (
    <div>
      <h2>{totalPrice}</h2>

      {results.map((product) => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            onAddToWishList={onAddToWishList}
          />
        );
      })}
    </div>
  );
}

// o useMemo é um hook que permite que você memoize um valor, ou seja,
// ele só calcula o valor quando o valor é diferente do valor anterior
// https://pt-br.reactjs.org/docs/hooks-reference.html#usememo

// não utilizar useMemo em cálculos "simples".

// podemos utilizar o useMemo para repassar uma info a um componente filho
