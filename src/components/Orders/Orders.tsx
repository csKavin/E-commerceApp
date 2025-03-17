import React, { useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonAvatar, IonButton, IonIcon, IonText, IonGrid, IonRow, IonCol, IonImg, IonCheckbox } from "@ionic/react";
import { addCircleOutline, cartOutline, removeCircleOutline, trashOutline } from "ionicons/icons";
import { Card, CardContent, IconButton, Select, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Orders.css";
import AppLayout from "../BottomNavigation";
import { products as initialOrders } from "../product";

const quantity =   1; 

const Orders: React.FC = () => {
    const [orders, setOrders] = useState(initialOrders);


    return (
        <IonPage>
            <AppLayout />
            <IonHeader>
                <IonToolbar color="primary">
                    
                    <IonTitle className="ion-text-center">Orders <IonIcon icon={cartOutline} style={{fontSize: "30px" }} /></IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="orders-content">
                <IonList>
                    {orders.map((order) => (
                        <Card key={order.id} className="order-card">
                            <CardContent>
                                <IonGrid>
                                    <IonRow className="ion-align-items-center">
                                        <IonCol size="3">
                                            <IonImg src={order.image} className="order-img" />
                                        </IonCol>
                                        <IonCol size="5">
                                            <IonText>
                                                <h3 className="order-item-title">{order.name}</h3>
                                            </IonText>
                                        </IonCol>
                                        <IonCol size="3" className="">
                                            <p className="order-price discount-badge text-center">IDR {order.price.toLocaleString()}</p>
                                            <p className="quantity">Quantity {quantity}</p>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </CardContent>
                        </Card>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Orders;