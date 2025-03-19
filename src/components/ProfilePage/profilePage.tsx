import React, { useEffect, useState, useCallback } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonText, IonList, IonModal, IonButtons, IonButton } from "@ionic/react";
import { getData, updateData } from "../../Utils/service";
import { collections } from "../../firebaseConfig";
import AppLayout from "../BottomNavigation";
import { Box, Button, TextField } from "@mui/material";
import { useHistory } from "react-router";

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<any>({});
  const [data, setData] = useState<any>(null);
  const [payload, setPayload] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  const userID = localStorage.getItem("userId");

  // Function to fetch data by user ID
  const getDataByUserId = () => {
    setIsLoading(true);
    getData(collections.USERS, "").then((res: any) => {
      const userData = res.find((user: any) => user.uid === userID);
      if (userData) {
        setData(userData);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getDataByUserId();
  }, []);

  const history = useHistory();

  const Logout = () =>{
    history.push("/");
    
  }

  // Handle input changes for the form
  const handleChange = useCallback((e: any, field: string) => {
    setPayload((prevPayload: any) => ({ ...prevPayload, [field]: e.target.value }));
  }, []);

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(false);
    getDataByUserId();
  };

  // Handle saving the profile data
  const handleSave = () => {
    if (JSON.stringify(payload) !== JSON.stringify(data)) {
      updateData(data.info.table, payload, data.info.id);
      setIsEditing(false);
      getDataByUserId();
    } else {
      alert("No changes made.");
    }
  };

  // Show loading state if data is being fetched
  if (isLoading) {
    return <IonContent>Loading...</IonContent>;
  }

  return (
    <IonPage>
      <AppLayout />
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="ion-text-center">My Account</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ backgroundColor: "#f4f4f4", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
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
              {data?.name?.charAt(0)}
            </h2>
          </div>

          <h2 style={{ fontSize: "22px", fontWeight: "bold", color: "#333" }}>{data?.name}</h2>

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
              <IonText style={{ color: "#555" }}>{data?.contact}</IonText>
            </IonItem>

            <IonItem lines="none" style={{
              background: "#fff",
              borderRadius: "8px",
              marginBottom: "10px",
              padding: "12px",
            }}>
              <IonLabel style={{ fontWeight: "bold", color: "#333" }}>✉️ Email:</IonLabel>
              <IonText style={{ color: "#555" }}>{data?.email}</IonText>
            </IonItem>

            <IonItem lines="none" style={{
              background: "#fff",
              borderRadius: "8px",
              marginBottom: "10px",
              padding: "12px",
            }}>
              <IonLabel style={{ fontWeight: "bold", color: "#333" }}>🎂 DOB:</IonLabel>
              <IonText style={{ color: "#555" }}>{data?.dob}</IonText>
            </IonItem>

            <IonItem lines="none" style={{
              background: "#fff",
              borderRadius: "8px",
              padding: "12px",
            }}>
              <IonLabel style={{ fontWeight: "bold", color: "#333" }}>📍 Address:</IonLabel>
              <IonText style={{ color: "#555" }}>{data?.address}</IonText>
            </IonItem>
          </IonList>

          <div onClick={() => setIsEditing(true)} style={{
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

          <div onClick={Logout} style={{
            borderRadius: "12px",
            background: "linear-gradient(135deg, #ff0000, #b20000)",
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
            Logout
          </div>
        </div>
      </IonContent>

      {/* Modal for editing profile */}
      <IonModal isOpen={isEditing} onDidDismiss={toggleEdit}>
        <IonHeader>
          <IonToolbar className="modal-toolbar" color="primary">
            <IonTitle>Edit Profile</IonTitle>
            <IonButtons slot="end"></IonButtons>
          </IonToolbar>
        </IonHeader>

        <Box sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          paddingBottom: "60%"
        }}>
          <Box sx={{ width: "100%", maxWidth: 400 }}>
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              margin="normal"
              value={payload?.name || data?.name}
              onChange={(e) => handleChange(e, "name")}
              sx={{ borderRadius: 2 }}
              aria-label="Full Name"
            />
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              margin="normal"
              type="email"
              value={payload?.email || data?.email}
              onChange={(e) => handleChange(e, "email")}
              sx={{ borderRadius: 2 }}
              aria-label="Email Address"
            />
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              margin="normal"
              type="tel"
              value={payload?.contact || data?.contact}
              onChange={(e) => handleChange(e, "contact")}
              sx={{ borderRadius: 2 }}
              aria-label="Phone Number"
            />
            <TextField
              fullWidth
              label="Date of Birth"
              variant="outlined"
              margin="normal"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={payload?.dob || data?.dob}
              onChange={(e) => handleChange(e, "dob")}
              sx={{ borderRadius: 2 }}
              aria-label="Date of Birth"
            />
            <TextField
              fullWidth
              label="Home Address"
              variant="outlined"
              margin="normal"
              multiline
              rows={3}
              value={payload?.address || data?.address}
              onChange={(e) => handleChange(e, "address")}
              sx={{ borderRadius: 2 }}
              aria-label="Home Address"
            />
          </Box>

          {/* Buttons */}
          <Box sx={{ display: "flex", gap: 2, width: "100%", maxWidth: 400, mt: 3 }}>
            <Button fullWidth variant="outlined" color="error" sx={{ borderRadius: 3, fontSize: "1rem", height: 45 }} onClick={toggleEdit}>
              Cancel
            </Button>
            <Button fullWidth variant="contained" color="primary" sx={{ borderRadius: 3, fontSize: "1rem", height: 45 }} onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Box>
      </IonModal>
    </IonPage>
  );
};

export default ProfilePage;
