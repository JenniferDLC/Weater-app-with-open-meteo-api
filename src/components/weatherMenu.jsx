
export default function WeatherMenu({citylist}){


return(

<div>


 {citylist.map(city =>(

<div>{city.name}</div>
 
     
  ))}

 
</div>

 
 

);


//<div>{citycords?.results[0].name}</div>
//<li key="1">{citycords?.results[0].name} </li>

//<li key={city.id}>{city.name}</li>

/*  {citylist.map(city =>(
     
    <li key="1">{citylist?.results[city].name} </li>
     
            
            
    ))}
    
    
   {citylist.map(city =>(

     
     <div>{city.name}</div>
      
           
             
     ))} 
    
    
    
    
    
  {citylist.map(city =>(

     
<div>{citylist.results[city].name}</div>
 
      
        
 ))}   */
 


}