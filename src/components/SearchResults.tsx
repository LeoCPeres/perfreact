import { ProductItem } from "./ProductItem";

import {
  List,
  AutoSizer,
  ListRowRenderer,
  ListRowProps,
} from "react-virtualized";
//Autosizer é um componente que permite que o lista seja renderizada com o tamanho que for necessário
//https://react-virtualized.js.org/docs/autosizer.html

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
  const rowRenderer: ListRowRenderer = ({ key, index, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results[index]}
          onAddToWishList={onAddToWishList}
        />
      </div>
    );
  };

  return (
    <div>
      <h2>{totalPrice}</h2>

      <List
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />

      {/* {results.map((product) => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            onAddToWishList={onAddToWishList}
          />
        );
      })} */}
    </div>
  );
}

// o useMemo é um hook que permite que você memoize um valor, ou seja,
// ele só calcula o valor quando o valor é diferente do valor anterior
// https://pt-br.reactjs.org/docs/hooks-reference.html#usememo

// não utilizar useMemo em cálculos "simples".

// podemos utilizar o useMemo para repassar uma info a um componente filho
