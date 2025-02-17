
import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from './components/auth';
import {db,auth} from './config/firebase';
import {getDocs,collection,addDoc,deleteDoc,doc,updateDoc} from 'firebase/firestore'

function App() {
  const [movieList,setMovieList] =useState([])
  const [newMovieTitle, setNewMovieTitle]=useState('');
  const [newRealseDate, setNewRealseDate]=useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar]=useState(false);
  const [updateTitle,setUpdateTitle]=useState('')

  const moviesCollectionRef = collection(db,"movies")
   const getMovieList = async()=>{
         // Read the Data
         try {
           const data = await getDocs(moviesCollectionRef)
           const filteredData = data.docs.map((doc)=>({
            ...doc.data(),
            id: doc.id
           }))
           setMovieList(filteredData)

           console.log(data)
         } catch (error) {
          console.error(error)
         }
        }

   const deleteMovie = async (id)=>{
        const movieDoc = doc(db,"movies",id)
        await deleteDoc(movieDoc)
   }
   const updateMovieTitle = async(id)=>{
      const movieDoc = doc(db,"movies",id)
      await updateDoc(movieDoc,{title:updateTitle})
   }
  useEffect(()=>{
     
        
         // Set the movie list
       
        getMovieList();
  },[])

  const onSubmitMovie = async ()=>{
    try {
       await addDoc(moviesCollectionRef,{
      title:newMovieTitle, 
      releaseDate:newRealseDate,
      receivedAnOscar:isNewMovieOscar,
      userId:auth?.currentUser?.uid
    });
     getMovieList();
    } catch (error) {
      console.error(error)
      
    }
    
  }
  
  
  return (
    <div className="App">
     <Auth/>
     <div>
        <input placeholder='Movie title ...'
               onChange={(e)=>setNewMovieTitle(e.target.value)}/>
        <input placeholder='Realsed Date ...'
               type='number'
               onChange={(e)=>setNewRealseDate(e.target.value)} />
        <input type='checkBox'
               checked={isNewMovieOscar}
               onClick={(e)=>setIsNewMovieOscar(e.target.checked)}/>
        <label>Recived and Oscar</label>
        <button onClick={onSubmitMovie} >Submit Movie</button>

     </div>
     <div>
      {
        movieList.map((movie)=>(
          <div>
            <h1>{movie.title}</h1>
            <p>Date : {movie.releaseDate}</p>
            <button onClick={()=>deleteMovie(movie.id)}>Delete Movie</button>
            <input placeholder='new title ..' onChange={(e)=>setUpdateTitle(e.target.value)}/>
            <button onClick={()=>updateMovieTitle(movie.id)}>Update Title</button>
          </div>
        ))
      }

     </div>
    </div>
  );
}

export default App;
