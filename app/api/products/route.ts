import { db } from "../../../firebase/firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

export default async function handler(req: any, res: any) {
    // CREATE
  if (req.method === "POST") {
    try {
      const { name, price, description } = req.body;
      const docRef = await addDoc(collection(db, "products"), { name, price, description });
      res.status(200).json({ id: docRef.id, name, price, description });
    } catch (error) {
      res.status(500).json({ message: "Failed to add product", error });
    }
    // GET
  } else if (req.method === "GET") {
    try {
      const productsSnapshot = await getDocs(collection(db, "products"));
      const products = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to get products", error });
    }
    // UPDATE
  } else if (req.method === "PUT") {
    try {
      const { id } = req.body;
      const { name, price, description } = req.body;
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, { name, price, description });
      res.status(200).json({ id, name, price, description });
    } catch (error) {
      res.status(500).json({ message: "Failed to update product", error });
    }
    // DELETE
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.body;
      const productRef = doc(db, "products", id);
      await deleteDoc(productRef);
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete product", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
