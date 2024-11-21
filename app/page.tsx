"use client";

import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc, getDocs, onSnapshot, updateDoc, doc, deleteDoc } from "firebase/firestore";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const productsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    });

    return () => unsubscribe(); 
  }, []);

  const addProduct = async () => {
    if (name && price && description) {
      await addDoc(collection(db, "products"), { name, price, description });
      setName("");
      setPrice("");
      setDescription("");
    }
  };

  const updateProduct = async (id: string) => {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, { name, price, description });
  };

  const deleteProduct = async (id: string) => {
    await deleteDoc(doc(db, "products", id));
  };
  return (
    <div className="container mx-auto p-4">
      <div>
        <h2 className="text-xl font-bold mb-4">Products</h2>
        <div className="mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product Name"
            className="p-2 border border-gray-300 rounded mr-2"
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="p-2 border border-gray-300 rounded mr-2"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="p-2 border border-gray-300 rounded mr-2"
          />
          <button onClick={addProduct} className="p-2 bg-blue-500 text-white rounded">Add Product</button>
        </div>

        <ul>
          {products.map((product) => (
            <li key={product.id} className="mb-2">
              <div className="flex justify-between items-center">
                <div>
                  <strong>{product.name}</strong> - ${product.price}
                  <p>{product.description}</p>
                </div>
                <div>
                  <button onClick={() => updateProduct(product.id)} className="bg-green-500 text-white p-1 rounded mr-2">
                    Update
                  </button>
                  <button onClick={() => deleteProduct(product.id)} className="bg-red-500 text-white p-1 rounded">
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
