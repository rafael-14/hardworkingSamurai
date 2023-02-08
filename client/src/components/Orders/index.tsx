import { Container } from "./styles";
import { OrdersBoard } from "../OrdersBoard";
import { Order } from "../../types/Order";

const orders: Order[] = [
  {
    _id: "63e2fa636d1945f292c50f13",
    table: "1",
    status: "WAITING",
    products: [
      {
        product: {
          name: "Pizza quatro queijos",
          imagePath: "1675816938126-quatro-queijos.png",
          price: 49.9,
        },
        quantity: 2,
        _id: "63e2fa636d1945f292c50f14",
      },
      {
        product: {
          name: "Coca-Cola",
          imagePath: "1675817844773-coca-cola.png",
          price: 9.9,
        },
        quantity: 1,
        _id: "63e2fa636d1945f292c50f15",
      },
    ],
  },
];

export function Orders() {
  return (
    <Container>
      <OrdersBoard icon="🕒" title="Fila de espera" orders={orders} />
      <OrdersBoard icon="👨‍🍳" title="Em preparação" orders={[]} />
      <OrdersBoard icon="✅" title="Pronto!" orders={[]} />
    </Container>
  );
}
