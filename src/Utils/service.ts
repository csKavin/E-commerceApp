import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, collections, db, storageBucket } from "../firebaseConfig";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import moment from "moment";
import { removeNullKeys } from "./helpers";
import { query, where, } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const getFileURL = async (file : any, folder: any, name: any) => {
  try {
    const uniqueID = Date.now() + Math.floor(Math.random()).toString();
    const fileRef = ref(storageBucket, `/${folder}/${uniqueID}-${name}`);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  } catch (err) {
    return `Failed to Generate URL and ${err}`;
  }
};

export const getDataById = async (table: any, documentId: any) => {
  const documentRef = doc(db, table, documentId);

  try {
    const document = await getDoc(documentRef);

    if (document.exists()) {
      return { ...document.data(), info: { id: document.id, table } };
    } else {
      throw new Error(`No document found with ID: ${documentId}`);
    }
  } catch (err) {
    return err;
  }
};

export const getDataByDateRange = async (table: any, startDate: any, endDate: any) => {
  let collectionRef = collection(db, table);

  try {
    // Fetch data from Firestore
    const data = await getDocs(collectionRef);
    const actualData = data.docs;
    const newData = [];

    for (let i = 0; i < actualData.length; i++) {
      const doc = actualData[i];
      let datas = { ...doc.data() };

      newData.push({ ...datas, info: { id: doc.id, table } });
    }

    // Apply date filtering if both startDate and endDate are provided
    if (startDate && endDate) {
      // Convert startDate & endDate to timestamps
      const start = new Date(startDate + "T00:00:00Z").getTime(); // Start of the day
      const end = new Date(endDate + "T23:59:59Z").getTime(); // End of the day

      return newData.filter((item : any) => {
        // Convert createdAt string to timestamp
        const itemDate = item?.createdAt ? new Date(item?.createdAt).getTime() : null;
        return itemDate && itemDate >= start && itemDate <= end;
      });
    }

    return newData;
  } catch (err) {
    return err;
  }
};



export const getDataByUserId = async (table : any, userId : any) => {
  const tableRef = collection(db, table); // Dynamic table name
  const q = query(tableRef, where("user", "==", userId)); // Query for the 'user' field

  try {
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const data : any = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id }); // Include the document ID in the results
      });
      return data;
    } else {
      throw new Error(`No records found in table "${table}" for user: ${userId}`);
    }
  } catch (err : any) {
    return err.message;
  }
};

export const getData = async (table : any, userId : any) => {
  let collectionRef = collection(db, table);

  try {
    const data = await getDocs(collectionRef);

    const actualData = data.docs;
    const newData = [];
    for (let i = 0; i < actualData.length; i++) {
      const doc = actualData[i];
      const hasUser = doc.data()?.user;
      let datas = { ...doc.data() };
      if (hasUser) {
        const userData : any = await getData(collections.USERS,"")

        datas["user"] = userData?.find((users : any) => {
          return users.info.id === hasUser
        })
      }
      newData.push({ ...datas, info: { id: doc.id, table: table } })
    }

    if (userId) {
      return newData.filter((items : any) => {
        return items?.user?.info?.id === userId;
      });
    } else {
      return newData;
    }
  } catch (err) {
    return err;
  }
};

export const addData = async (table : any, data : any, userId: any) => {
  let dataRef = collection(db, table);

  try {
    const response = await addDoc(
      dataRef,
      removeNullKeys({
        ...data,
        createdAt: moment().utc().format(),
        user: userId,
      })
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const updateData = async (table:any, data:any, docId:any) => {
  let dataRef = doc(db, table, docId);

  try {
    await updateDoc(dataRef, { ...data, lastUpdated: moment().utc().format() });
  } catch (err) {
    return err;
  }
};

export const deleteData = async (table : any, docId : any) => {
  let dataRef = doc(db, table, docId);

  try {
    await deleteDoc(dataRef);
  } catch (err) {
    return err;
  }
};

export const getDocument = async (table : any, documentId : any, userId : any) => {
  let documentRef = doc(db, table, documentId);

  try {
    const data = await getDoc(documentRef);
    const newData : any = data.data() ? { ...data.data(), info: { id: data.id, table: table } } : [];

    if (userId) {
      return newData.filter((items : any) => {
        return items?.user === userId;
      });
    } else {
      return newData;
    }
  } catch (err) {
    return err;
  }
}

  export const login = async (data : any) => {
    const response = await signInWithEmailAndPassword(auth, data.email, data.password);
    // setTrigger(trigger + 1);
    return response;
  };
  
  // Logout function
  export const logout = async () => {
    await auth.signOut();
    // setTrigger(trigger + 1);
  };
  
  // Register function (creating a user in Firestore)
  export const register = async (data: any) => {
    try {
        if (data.password !== data.confirmPassword) {
            throw new Error("Passwords do not match");
        }

        // Create a new user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);

        // Create a user document in Firestore
        await addDoc(collection(db, collections.USERS), {
            uid: userCredential.user.uid,
            email: data.email,
            role: 'ADMIN', // Default role, you can adjust as needed
            createdAt: new Date(),
        });

        await login(data);
    } catch (error) {
        console.error("Error creating user: ", error);
        throw error;
    }
};





