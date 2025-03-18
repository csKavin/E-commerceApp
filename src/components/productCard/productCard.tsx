import React from "react";
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg } from "@ionic/react";
import './productCard.css';
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
  const history = useHistory();

  return (
    <IonCard className="product-card border-0 shadow-lg p-3">
      <div className="position-relative image-container">
        {/* Image with Fixed Size */}
        <IonImg
          src={product.image}
          alt={product.name}
          className="product-image"
        />

        {/* Price Badge */}
        <span className="price-badge position-absolute top-0 end-0 m-2 px-3 py-2 rounded-pill">
          ₹{product.price}
        </span>
      </div>

      <IonCardHeader className="text-center">
        <IonCardTitle className="fw-bold text-dark">{product.name}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <p className="text-muted text-center small mb-3">{product.description}</p>

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
