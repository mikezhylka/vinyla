export const orderDetails = ["Order code", "Date", "Total", "Payment method"]

function countCurrentTime(): string {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function countRandomOrderNumber(): number {
  return Math.floor(Math.random() * 100000000);
}

  export const createOrderData = (total: number, paymentMethod: string) => {
    return [
      {
        title: "Order code:",
        value: countRandomOrderNumber(), // just to show-case
      },
      {
        title: "Date:",
        value: countCurrentTime(),
      },
      {
        title: "Total:",
        value: `$${total}`,
      },
      {
        title: "Payment method:",
        value: paymentMethod,
      },
    ];
  }