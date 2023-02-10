import { useState } from "react";
import { Order } from "../../types/Order";
import api from "../../utils/api";
import { OrderModal } from "../OrderModal";
import { Board, OrdersContainer } from "./styles";
import { toast } from "react-toastify";

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
  onChangeOrderStatus?: (orderId: string, status: Order["status"]) => void;
}

export function OrdersBoard(props: OrdersBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenModal(order: Order) {
    setIsModalVisible(true);
    setSelectedOrder(order);
  }
  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }
  async function handleCancelOrder() {
    setIsLoading(true);
    await api.delete(`/orders/${selectedOrder?._id}`);
    toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado`);
    props.onCancelOrder(selectedOrder!._id);
    setIsLoading(false);
    setIsModalVisible(false);
  }

  async function handleChangeOrderStatus() {
    setIsLoading(true);
    const status =
      selectedOrder?.status === "WAITING" ? "IN_PRODUCTION" : "DONE";
    await api.patch(`/orders/${selectedOrder?._id}`, { status });
    toast.success(
      `O pedido da mesa ${selectedOrder?.table} teve o status alterado!`
    );
    props.onChangeOrderStatus!(selectedOrder!._id, status);
    setIsLoading(false);
    setIsModalVisible(false);
  }

  return (
    <Board>
      <OrderModal
        onCancelOrder={handleCancelOrder}
        visible={isModalVisible}
        order={selectedOrder}
        onClose={handleCloseModal}
        isLoading={isLoading}
        onChangeOrderStatus={handleChangeOrderStatus}
      />
      <header>
        <span>{props.icon}</span>
        <strong>{props.title}</strong>
        <span>({props.orders.length})</span>
      </header>
      {props.orders.length && (
        <OrdersContainer>
          {props.orders.map((order) => (
            <button
              type="button"
              key={order._id}
              onClick={() => handleOpenModal(order)}
            >
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length}</span>
            </button>
          ))}
        </OrdersContainer>
      )}
    </Board>
  );
}
