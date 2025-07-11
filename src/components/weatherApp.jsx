import { result } from "lodash";
import { useEffect, useState } from "react";
import WeatherForm from "./weatherForm";
import WeatherMainInfo from "./weatherMainInfo";
import WeatherMenu from "./weatherMenu";

import styles from "./weatherApp.module.css";
import Loading from "./loading";



export default function WeatherApp(){

    const [weather, setWeather] = useState(null);
    const [citycords, setcitycords]= useState(null);
    const [citylist, setcitylist]= useState([]);
    const [weatherImg,setweatherimg]= useState("/forecast_img/clear");
    const [weatherCondition,setweathercondition]= useState("");

    useEffect(()=>{

     loadCords();
     loadInfo();
  
    },[]);

    useEffect(()=>{

     document.title = `Weather | ${citycords?.results[0].name ?? ""}`;

    },[weather]);

    
    
      ///cargando cordenadas

    async function loadCords(city='london'){

      //armando cadena de url
       const namecity = city;
       
  
       const url= new URL('https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=10&language=en&format=json');
    
       url.searchParams.set('name', namecity);
       
       url.toString();
      
       
     try{
  
        const requestcity= await fetch(url);
         
         const jsoncord= await requestcity.json();        
         setcitycords(jsoncord);
         console.log(citycords);

        
      }catch(error)
      {
  
      }

     }



  ///cargando cordenadas exactas de pais y ciudad

   function useDatos(){

      ////llenando la lista de ciudades///
      
        /*   
         const newlist={
          
          id:crypto.randomUUID(),
          country:citycords?.results.country,
          city:citycords?.results.name,
          country_code:citycords?.results.country_code, 
          latitude:citycords?.results.latitude,
          longitude:citycords?.results.longitude,
 
         };*/
          
         /*const newlist={
          
          id:crypto.randomUUID(),
          country:citycords?.results[0].country,
          city:citycords?.results[0].name,
          country_code:citycords?.results[0].country_code, 
          latitude:citycords?.results[0].latitude,
          longitude:citycords?.results[0].longitude,
 
         };*/



         const list=[...citylist];
         list.slice(citycords);
        // const citys= 
         
       //  list.slice(newlist);

         setcitylist(list);

         console.log(citylist);
      


  }
   




   ///cargando informacion del clima///

    async function loadInfo(latit='51.50853',long='-0.12574'){


      const urlcord= new URL('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&timezone=auto&current_weather=true&daily=precipitation_probability_max&hourly=precipitation_probability');

       urlcord.searchParams.set('latitude',latit);
       urlcord.searchParams.set('longitude',long);

       urlcord.toString();
       


     
   
    try {
    


       const request = await fetch(urlcord);
     

        const json = await request.json();

        setTimeout(() => {

        setWeather(json);  
          
        }, 2000);
        
        console.log(json);

        
         
        LoadWeatherImage(weather?.current_weather.weathercode);
        

        console.log("mensaje en consola");
        
    } catch (error) {
        
    }

    
   }

   
////cargando imagen del clima////

   function LoadWeatherImage(wheatherId=0){
    
    let Id= wheatherId;
    console.log(wheatherId);
    let weatherimg="/forecast_img/Clear.jpeg";
    let weathercond="";

    if(Id==0){weatherimg="/forecast_img/Clear.jpeg"; weathercond="Clear"};
    if(Id==1  || Id==2  || Id==3){weatherimg="/forecast_img/Mainly_clear.jpeg"; weathercond="Mainly clear"}; 
    if(Id==45 || Id==48){weatherimg="/forecast_img/Fog.jpeg"; weathercond="Mainly Clear"};
    if(Id==51 || Id==53 || Id==55){weatherimg="/forecast_img/Drizzle.jpeg";weathercond="Drizzle"};
    if(Id==56 || Id==57 ){weatherimg="/forecast_img/Freezing_Drizzle.jpeg";weathercond="Freezing Drizzle"};
    if(Id==61 || Id==63 || Id==65){weatherimg="/forecast_img/Rain.jpeg";weathercond="Rain"};    
    if(Id==66 || Id==67){weatherimg="/forecast_img/Freezing_Rain.jpeg";weathercond="Freezing Rain"}; 
    if(Id==71 || Id==73 || Id==75){weatherimg="/forecast_img/Snow_fall.jpeg";weathercond="Snow Fall"}; 
    if(Id==77){weatherimg="/forecast_img/Snow_grains.jpeg";weathercond="Snow Grains"};
    if(Id==80 || Id==81 || Id==82){weatherimg="/forecast_img/Rain_showers.jpeg";weathercond="Rain Showers"};
    if(Id==85 || Id==86){weatherimg="/forecast_img/Snow_showers.jpeg";weathercond="Snow Showers"};  
    if(Id==95){weatherimg="/forecast_img/Thunderstorm.jpeg";weathercond="Thunderstorm"}; 
    if(Id==96 || Id==99){weatherimg="/forecast_img/Thunderstorm_heavy.jpeg";weathercond="Thunderstorm Heavy"};        
    
    
     setweatherimg(weatherimg);
     setweathercondition(weathercond);
     //console.log(weatherImg);

   }


  


   function handleChangeCity(city){

    setWeather(null);
    setcitycords(null);
    //loadInfo(city);
    loadCords(city);
    loadInfo(citycords?.results[0].longitude,citycords?.results[0].latitude);

    
   }


   function handleChangeCityMenu(city){
   
    setWeather(null);
    setcitycords(null);
    loadCords(city);
    useDatos();
    


   }




    return (
    <div>

      <div className={styles.weatherContainer}>   
        <WeatherForm onChangeCity={handleChangeCity} />       
        {weather ? <WeatherMainInfo weather={weather} citycords={citycords} weatherImg={weatherImg} weatherCondition={weatherCondition}/> : <Loading /> }

      </div>

      
    
    </div>
   
        
   );

  

}