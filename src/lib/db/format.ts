export function formatPrice(price: number){
    return (price / 100).toLocaleString("ru-RU", {
        style: "currency",
        currency: "UAH",
    });
}