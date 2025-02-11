
 SetDateFomat = () =>{

       
       const Months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

       const date = new Date()
       const Year = date.getFullYear()
       const Month =  Months[date.getMonth()] 
       const Day = date.getUTCDate()
        
       return   RegisteredDate = `${Day}-${Month}-${Year}`
      
 }

 const SetTimeFormat = () => {
      
      const date = new Date();
    
      // Convert to Nigerian local time (UTC+1)
      let Hour = date.getHours(); // Local hour (not UTC)
      const Minutes = date.getMinutes();
      const Second = date.getSeconds();
      const MiliSecond = date.getMilliseconds();
    
      // Determine AM or PM before converting to 12-hour format
      const AmOrPm = Hour >= 12 ? 'pm' : 'am';
    
      // Convert to 12-hour format
      Hour = (Hour % 12) || 12;
    
      // Format minutes and seconds with leading zeros 
      const formattedMinutes = String(Minutes).padStart(2, '0');
      const formattedSeconds = String(Second).padStart(2, '0');
    
      // Construct the full time string
      const FullTime = `${Hour}:${formattedMinutes}:${formattedSeconds} ${AmOrPm}`;
      return FullTime;

    };


 module.exports = {SetDateFomat,SetTimeFormat}