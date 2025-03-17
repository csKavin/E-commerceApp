type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  specifications: string;
  availability: string;
  shipping: {
    deliveryTime: string;
    shippingCost: string;
  };
};

export const products: Product[] = [
{
        id: 1,
        name: "Lenovo Ideapad Gaming 3",
        category: "Electronics",
        price: 55000,
        image: "https://picsum.photos/seed/laptop/600/600",
        description:
            "A powerful laptop designed for professionals and gamers. Equipped with the latest technology for seamless performance.",
        specifications: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        availability: "In Stock",
        shipping: {
            deliveryTime: "2-4 business days",
            shippingCost: "Free",
        },
    },
{
        id: 2,
        name: "paragon Footwear for mens and Womens",
        category: "Wears",
        price: 5000,
        image: "https://picsum.photos/seed/laptop/600/600",
        description:
            "A powerful laptop designed for professionals and gamers. Equipped with the latest technology for seamless performance.",
        specifications: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        availability: "In Stock",
        shipping: {
            deliveryTime: "2-4 business days",
            shippingCost: "Free",
        },
    },
{
        id: 3,
        name: "paragon Footwear for Kids",
        category: "Wears",
        price: 5000,
        image: "https://picsum.photos/seed/laptop/600/600",
        description:
            "A powerful laptop designed for professionals and gamers. Equipped with the latest technology for seamless performance.",
        specifications: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        availability: "In Stock",
        shipping: {
            deliveryTime: "2-4 business days",
            shippingCost: "Free",
        },
    },
{
        id: 4,
        name: "Ryzen 7 5500 for more performance",
        category: "Wears",
        price: 5000,
        image: "https://picsum.photos/seed/laptop/600/600",
        description:
            "A powerful laptop designed for professionals and gamers. Equipped with the latest technology for seamless performance.",
        specifications: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        availability: "In Stock",
        shipping: {
            deliveryTime: "2-4 business days",
            shippingCost: "Free",
        },
    },
];
