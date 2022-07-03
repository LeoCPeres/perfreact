import { memo } from "react";

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
  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => onAddToWishList(product.id)}>
        Add to wish list
      </button>
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
