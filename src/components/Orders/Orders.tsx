import React, { useEffect, useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonAvatar, IonButton, IonIcon, IonText, IonGrid, IonRow, IonCol, IonImg, IonCheckbox } from "@ionic/react";
import { addCircleOutline, cartOutline, removeCircleOutline, trashOutline } from "ionicons/icons";
import { Card, CardContent, IconButton, Select, MenuItem, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Orders.css";
import AppLayout from "../BottomNavigation";
import { getData } from "../../Utils/service";
import { collections } from "../../firebaseConfig";

const quantity = 1;

const Orders: React.FC = () => {
    const [userId, setUserId] = useState("");
    const [data, setData] = useState<any>();

    useEffect(() => {
        let temp: any = localStorage.getItem("userId");
        setUserId(temp);
        getOrders()
    }, []);
    
    const getOrders = async () => {
        try {
            const res : any = await getData(collections.ORDERS, "");
            console.log("allproducts",res);
            
            const tempArrayPromises : any = res.map(async (item: any) => {
                const product = await orderProduct(item.id);
                return product;
            });
            let dummy = [];
            // Wait for all product data
            const allProducts = await Promise.all(tempArrayPromises);
            dummy.push(allProducts)
            setData(dummy);
            
            // Do something with allProducts
            console.log(dummy,"sjnfolfhn");
            
        } catch (err) {
            console.log(err, "Error fetching orders");
        }
    };
    
    const orderProduct = async (id: string) => {
        try {
            const res : any = await getData(collections.PRODUCTS, "");
            const tempArray = res?.map((item: any) => ({
                id: item?.info?.id,
                name: item?.name,
                notes: item?.notes,
                description: item?.description,
                price: item?.price,
                image: item?.image,
            }));
    
            console.log(tempArray, "Product list");
    
            // Find the product by ID
            const product = tempArray.find((p: any) => p.id === id);
    
            if (product) {
                console.log(product, "Product found");
                setData([product]);  // Wrapping the product in an array
                return product;
            } else {
                console.log("Product not found");
                return null;  // Return null if not found
            }
        } catch (err) {
            console.log(err, "Error fetching product");
        }
    };
    


    return (
        <IonPage>
            <AppLayout />
            <IonHeader>
                <IonToolbar color="primary">

                    <IonTitle className="ion-text-center">Orders <IonIcon icon={cartOutline} style={{ fontSize: "30px" }} /></IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="orders-content">
                <IonList>
              {
                data ? 
                <div>
                {data?.[0]?.map((order:any) => (
            <Card key={order?.id} className="order-card">
                <CardContent>
                    <IonGrid>
                        <div className="d-flex align-items-center justify-content-between">
                        <IonImg src={order?.image} className="order-img" />
                        <h3 className="order-item-title">{order?.name}</h3>
                            <div className="mt-3">
                            <p className="order-price discount-badge text-center">IDR {order?.price}</p>
                            <p className="quantity">Quantity 1</p>
                            </div>
                        </div>
                    
                    </IonGrid>
                </CardContent>
            </Card>
        ))}
            </div> : <Typography className="fw-bold text-center text-danger mt-4 pt-4" >No Orders</Typography>
              }
                       
               
                    
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Orders;