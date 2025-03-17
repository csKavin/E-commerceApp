import React from "react";
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg } from "@ionic/react";
import './productCard.css'
import { useHistory } from "react-router";

interface ProductProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
  };
  onAddToCart: (id: number) => void;

}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  console.log(product.id);

  const history = useHistory();

  return (
    <IonCard className="product-card border-0 shadow-lg p-3">
      <div className="position-relative">
        <IonImg src={product.image} alt={product.name} className="rounded-top" />

        {/* Price Badge at the Top Right */}
        <span className="price-badge position-absolute top-0 end-0 m-2 px-3 py-2 rounded-pill">
          ₹{product.price}
        </span>
      </div>

      <IonCardHeader className="text-center">
        <IonCardTitle className="fw-bold text-dark">{product.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>

        {/* Product Description */}
        <p className="text-muted text-center small mb-3">{product.description}</p>

        {/* View Details Button */}
        <div className="d-flex justify-content-center">
          <button
            className="custom-btn w-100"
            onClick={() => history.push(`/viewProduct/${product.id}`)}
          >
            View Details
          </button>
        </div>

      </IonCardContent>
    </IonCard>
  );
};

export default ProductCard;
