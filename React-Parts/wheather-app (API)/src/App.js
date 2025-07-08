                                        //Creating Weather App Using Fetch Api
import React, { useEffect, useState } from 'react';

export default function App() {
  let [city, setCity] = useState('');
  let [wDetails, setWDetails] = useState()
  let [isLoading, setLoading] = useState(false)
  let [counter, setCounter] = useState(1)


  let getData = (event) => {
    setLoading(true)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1073b813a0048b3c3cbc726220c6d279&units=metric`)
    .then((res) => res.json())
    .then((finalRes) => {
      if (finalRes.cod == 404){
        alert("please enter a correct city")
      }
      else {
        setWDetails(finalRes)
        setLoading(false)
      }
    })
    

    console.log(wDetails)
    event.preventDefault()
    setCity('')
  }


  let changeCounter = () => {
    setCounter(counter += 1)
  }
  
  
  
  useEffect(() => {
    console.log("welcome")
  },[counter])

  return (
    <div className='w-[100%] h-[100vh] bg-[#4aacb1]'>

      {counter}
      <button className='bg-blue-900' onClick={changeCounter}>Count</button>

      <div className='max-w-[1320px] mx-auto'> 
        <h1 className='text-[40px] font-bold py-[50px] text-white'>Simple weather App</h1> 

          <form onSubmit={getData}> 
            <input type='text' className='w-[300px] h-[40px] p1-3' value={city} onChange={(e) => setCity(e.target.value)} placeholder='City Name' /> 
            <button className='bg-sky-500/100 w-40 h-10 m-2'>Submit</button>
          </form> 

          <div className='w-[400px] mx-auto bg-white shadow-1g mt-[40px] p-[25px] relative' > 

            <img alt='' src='https://i.gifer.com/ZKZg.gif' width={100} className={`absolute left-[40%] ${isLoading ? '' : 'hidden' } `}/>

            {wDetails !== undefined ?
            <>
            <h3 className='font-bold text-[30px]'>{wDetails.name}
              <span className='bg-[yellow] m-2'>{wDetails.sys.country}</span>
            </h3> 
            <h2 className='font-bold text-[40px]'>{wDetails.main.temp}<sup>o</sup> C</h2> 
            <img alt='img' src={`http://openweathermap.org/img/w/${wDetails.weather[0].icon}.png` }/> 
            <p>{wDetails.weather[0].main}</p>
            </>

            :

            "No Data Found"
            }
            

          </div>
      </div>

    </div>
  )
}
