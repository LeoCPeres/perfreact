import { memo, useState } from "react";
import dynamic from "next/dynamic";
import { AddProductToWishlistProps } from "./AddProductToWishlist";
// import { AddProductToWishlist } from "./AddProductToWishlist";

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(
  () => {
    return import("./AddProductToWishlist").then(
      (mod) => mod.AddProductToWishlist
    );
  },
  {
    ssr: false,
    loading: () => <span>Carregando...</span>,
  }
);

type ProductItemProps = {
  product: {
    id: number;
    price: number;
    title: string;
    priceFormatted: string;
  };
  onAddToWishList: (id: number) => void;
};

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishlist(true)}>
        Adicionar aos favoritos
      </button>
      {isAddingToWishlist && (
        <AddProductToWishlist
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      )}
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product); //comparação profunda (custa mais processamento)
  }
);

//o memo vai fazer com que o componente seja reutilizado, ou seja, se o componente não tiver mudado,
//ele não será renderizado novamente
//https://pt-br.reactjs.org/docs/react-api.html#reactmemo

//shallow compare -> comparação superficial, ou seja, só compara o que tem dentro do componente
//tipo {} === {}
