import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Animal } from './Animal'
function AnimalSearch(){
  const [animals,setAnimals ] = useState([])
  useEffect(()=>{
    const lastQuery=localStorage.getItem('lastQuery');
    search(lastQuery)
  },[]);
  const search = async(q) =>{
    const response = await fetch(
      'http://localhost:8080?' +new URLSearchParams({q})
    );
    const data = await response.json();
    setAnimals(data);
    localStorage.setItem('lastQuery',q)
  };
  return {search,animals}
}
function App() {
const {search,animals}=AnimalSearch()
 

  return (
    <main>
      <h1>Animal Farm</h1>
        <input type="text" placeholder='Search' onChange={(e)=> search(e.target.value)} />
        <ul>
        {animals.map((animal) => (
          <Animal key={animal.id} {...animal} />
        ))}

        {animals.length === 0 && 'No animals found'}
      </ul>
      </main>
  )
}

export default App
