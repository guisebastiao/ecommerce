import type { OrderDTO } from "@/types/orderTypes";

interface ProductOrderProps {
  order: OrderDTO;
}

const ProductOrder = ({ order }: ProductOrderProps) => {
  return (
    <div>
      <h1>{order.orderNumber}</h1>
    </div>
  );
};

export default ProductOrder;
