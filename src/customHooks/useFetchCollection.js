import React,{useEffect, useState} from 'react'
import { db, storage } from "../firebase/config";
import { toast } from 'react-toastify';
import { collection, query, where, onSnapshot,orderBy,get } from "firebase/firestore";
const useFetchCollection = (collectionName) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const getCollection = () => {
        setIsLoading(true)
        try {
          const docsRef = collection(db, collectionName);
          const q = query(docsRef, orderBy("createdAt", "desc"));
    
          onSnapshot(q, (Snapshot) => {
            const  allData= Snapshot.docs.map((doc)=>({ 
              id: doc.id,
              ...doc.data()
            }))
            console.log(allData)
            setData(allData)
            setIsLoading(false)
           
           
          });
    
        } catch (error) {
          setIsLoading(false)
          toast.error(error.message)
    
        }
      }
      useEffect(()=>{{
        getCollection()
      }},[])
  return {data,isLoading}
}

export default useFetchCollection