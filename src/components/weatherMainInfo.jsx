

import styles from './weatherMainInfo.module.css';

export default function WeatherMainInfo({weather,citycords,weatherImg,weatherCondition}){



return(

<div className={styles.mainInfo}>
  <div className={styles.city}>{citycords?.results[0].name}</div>
  <div className={styles.country}>{citycords?.results[0].country}</div>
   
   <div> 
   <div className={styles.row}>

   <img src={weatherImg} width="128" alt="imagen 1"/>
      

     <div className={styles.weatherConditions}>
     <div className={styles.condition}>{weatherCondition}</div>
     <div className={styles.current}>{weather?.current_weather.temperature}°</div>

    </div>
   </div>

    <div>
    <iframe 
     title="mapa"
     src= {`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d279567.0686459611!2d${citycords?.results[0].longitude}71!3d${citycords?.results[0].latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sdo!4v1686447295165!5m2!1ses!2sdo`}
     width="100%" 
     height="450" 
     style={{border:0}}
     allowfullscreen="" 
     loading="lazy" 
     referrerpolicy="no-referrer-when-downgrade">

     </iframe>



    </div>




   </div>
  </div>

//`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d279567.0686459611!2d${-3.6517971448337}71!3d40.46610577416703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sdo!4v1686447295165!5m2!1ses!2sdo`


);


}

//<img src={weatherImg} width="128" alt="imagen 1"/>