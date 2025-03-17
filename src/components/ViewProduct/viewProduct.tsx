import React from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import {
  cartOutline,
  arrowBackCircleOutline,
  checkmarkCircleOutline,
} from "ionicons/icons";

import './viewProduct.css';
import { products } from "../product";

const ViewProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="danger">
            <IonTitle>Product Not Found</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-text-center ion-padding">
          <h2>Oops! Product not found.</h2>
          <IonButton expand="full" color="dark" onClick={() => history.push("/home")}>
            Back to Home
          </IonButton>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      {/* Header */}
      <IonHeader>
        <IonToolbar style={{ background: "linear-gradient(135deg, #0070f3, #0045a2)" }}>
          <IonTitle className="text-center">{product.category}</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Content */}
      <IonContent
        style={{
          background: "linear-gradient(135deg, #F0F4F8, #D9E2EC)",
          paddingBottom: "20px",
        }}
      >
        <IonGrid>
          {/* Product Image */}
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" className="ion-text-center">
              <IonCard style={{ borderRadius: "10px", overflow: "hidden", boxShadow: "0px 5px 15px rgba(0,0,0,0.3)", height: "300px" }}>
                <IonImg src={product.image} alt={product.name} />
              </IonCard>
            </IonCol>
          </IonRow>

          {/* Product Info */}
          <IonRow>
            <IonCol size="12">
              <div style={{ padding: "15px", textAlign: "center" }}>
                <IonCardHeader>
                  <IonCardTitle style={{ fontWeight: "bold", fontSize: "1.8rem", color: "#333", paddingBottom: "10px" }}>
                    {product.name}
                  </IonCardTitle>
                  <h3 style={{ color: "#0070f3", fontSize: "1.2rem" }}>
                    {product.category}
                  </h3>
                </IonCardHeader>
                <IonCardContent>
                  <p style={{ fontSize: "1rem", color: "#555", padding: "0 10px" }}>
                    {product.description}
                  </p>
                </IonCardContent>
              </div>
            </IonCol>
          </IonRow>

          {/* Price & Availability */}
          <IonRow>
            <IonCol size="12" className="ion-text-center">
              <h2 style={{ color: "#28a745", fontWeight: "bold", fontSize: "2rem" }}>
                ₹{product.price}
              </h2>
              <h5 style={{ color: product.availability === "In Stock" ? "#28a745" : "red", fontSize: "1.2rem" }}>
                <IonIcon icon={checkmarkCircleOutline} /> {product.availability}
              </h5>
            </IonCol>
          </IonRow>

          {/* Features */}
          <IonRow>
            <IonCol size="12">
              <div>
                <IonCardHeader>
                  <IonCardTitle style={{ textAlign: "center" }}>
                    Key Features
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList lines="none">
                    {product.specifications}
                  </IonList>
                </IonCardContent>
              </div>
            </IonCol>
          </IonRow>

          {/* Warranty & Shipping */}
          <IonRow>
            <IonCol size="12">
              <div style={{ textAlign: "center" }}>
                <IonCardContent>
                  <h5><strong>Warranty:</strong> {product.availability}</h5>
                  <h5><strong>Delivery Time:</strong> {product.shipping.deliveryTime}</h5>
                  <h5><strong>Shipping Cost:</strong> {product.shipping.shippingCost}</h5>
                </IonCardContent>
              </div>
            </IonCol>
          </IonRow>

          {/* Buttons */}
          <IonRow className="ion-justify-content-center ion-margin-top">
            <IonCol size="12" className="ion-text-center">
              <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
                <IonButton
                  shape="round"
                  color="primary"
                  className="custom-button"
                  onClick={() => history.push("/orderpage", { productId: product.id })}
                >
                  <IonIcon icon={cartOutline} slot="start" />
                  Order Now
                </IonButton>

                <IonButton
                  shape="round"
                  fill="outline"
                  color="primary"
                  className="custom-button"
                  onClick={() => history.push('/home')}
                >
                  <IonIcon icon={arrowBackCircleOutline} slot="start" />
                  Back
                </IonButton>
              </div>
            </IonCol>
          </IonRow>


        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ViewProduct;
