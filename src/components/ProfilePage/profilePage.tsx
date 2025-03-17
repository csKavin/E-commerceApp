import React, { useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonText, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonList, IonFooter, IonModal, IonInput, IonTextarea, IonButtons } from "@ionic/react";
import { pencil, logOutOutline, closeCircle, arrowBackCircleOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { user as defaultUser } from "../user";
import AppLayout from "../BottomNavigation";
import { Box, Button, TextField } from "@mui/material";

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(defaultUser);

  const toggleEdit = () => setIsEditing(false);
  const openEdit = () => setIsEditing(true);

  const handleChange = (e: any, field: string) => {
    setUser({ ...user, [field]: e.target.value });
  };

  const history = useHistory()
  return (
    <IonPage>
      <AppLayout />
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="ion-text-center">My Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" style={{
        backgroundColor: "#f4f4f4",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
      }}>
        <div>
          <div style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            background: "#0070f3",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "60px auto 15px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}>
            <h2 style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "#ffffff",
              textTransform: "uppercase",
            }}>
              {user.name.charAt(0)}
            </h2>
          </div>

          <h2 style={{ fontSize: "22px", fontWeight: "bold", color: "#333" }}>{user.name}</h2>

          <hr style={{
            margin: "15px 0",
            border: "none",
            borderTop: "1px solid #ddd",
          }} />

          <IonList style={{ background: "transparent" }}>
            <IonItem lines="none" style={{
              background: "#fff",
              borderRadius: "8px",
              marginBottom: "10px",
              padding: "12px",
            }}>
              <IonLabel style={{ fontWeight: "bold", color: "#333" }}>📞 Contact:</IonLabel>
              <IonText style={{ color: "#555" }}>{user.contact}</IonText>
            </IonItem>

            <IonItem lines="none" style={{
              background: "#fff",
              borderRadius: "8px",
              marginBottom: "10px",
              padding: "12px",
            }}>
              <IonLabel style={{ fontWeight: "bold", color: "#333" }}>✉️ Email:</IonLabel>
              <IonText style={{ color: "#555" }}>{user.email}</IonText>
            </IonItem>

            <IonItem lines="none" style={{
              background: "#fff",
              borderRadius: "8px",
              marginBottom: "10px",
              padding: "12px",
            }}>
              <IonLabel style={{ fontWeight: "bold", color: "#333" }}>🎂 DOB:</IonLabel>
              <IonText style={{ color: "#555" }}>{user.dob}</IonText>
            </IonItem>

            <IonItem lines="none" style={{
              background: "#fff",
              borderRadius: "8px",
              padding: "12px",
            }}>
              <IonLabel style={{ fontWeight: "bold", color: "#333" }}>📍 Address:</IonLabel>
              <IonText style={{ color: "#555" }}>{user.address}</IonText>
            </IonItem>
          </IonList>

          <div onClick={openEdit} style={{
            borderRadius: "12px",
            background: "linear-gradient(135deg, #0070f3, #0045a2)",
            color: "#fff",
            padding: "12px 20px",
            fontSize: "1.1rem",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
            transition: "0.3s ease-in-out",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",

            textAlign: "center",
            marginTop: "50px"
          }}>
            Edit Profile
          </div>
        </div>
      </IonContent>

      <IonModal isOpen={isEditing} onDidDismiss={toggleEdit} >
        <IonHeader>
          <IonToolbar className="modal-toolbar" color="primary">
            <IonTitle>Edit Profile</IonTitle>
            <IonButtons slot="end">
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <Box
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            paddingBottom:"60%"
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 400 }}>
            <TextField fullWidth label="Full Name" variant="outlined" margin="normal" value={user.name} onChange={(e) => handleChange(e, "name")} sx={{ borderRadius: 2 }} />
            <TextField fullWidth label="Email Address" variant="outlined" margin="normal" type="email" value={user.email} onChange={(e) => handleChange(e, "email")} sx={{ borderRadius: 2 }} />
            <TextField fullWidth label="Phone Number" variant="outlined" margin="normal" type="tel" value={user.contact} onChange={(e) => handleChange(e, "contact")} sx={{ borderRadius: 2 }} />
            <TextField fullWidth label="Date of Birth" variant="outlined" margin="normal" type="date" InputLabelProps={{ shrink: true }} value={user.dob} onChange={(e) => handleChange(e, "dob")} sx={{ borderRadius: 2 }} />
            <TextField fullWidth label="Home Address" variant="outlined" margin="normal" multiline rows={3} value={user.address} onChange={(e) => handleChange(e, "address")} sx={{ borderRadius: 2 }} />
          </Box>

          {/* Buttons */}
          <Box sx={{ display: "flex", gap: 2, width: "100%", maxWidth: 400, mt: 3 }}>
            <Button fullWidth variant="outlined" color="error" sx={{ borderRadius: 3, fontSize: "1rem", height: 45 }} onClick={toggleEdit}>Cancel</Button>
            <Button fullWidth variant="contained" color="primary" sx={{ borderRadius: 3, fontSize: "1rem", height: 45 }} onClick={toggleEdit}>Save</Button>
          </Box>
        </Box>
      </IonModal>






    </IonPage>
  );
};

export default ProfilePage;