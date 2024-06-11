
 SetDateFomat = () =>{

       
       const Months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

       const date = new Date()
       const Year = date.getFullYear()
       const Month =  Months[date.getMonth()] 
       const Day = date.getUTCDate()
        
       return   RegisteredDate = `${Day}-${Month}-${Year}`
      
 }

 SetTimeFormat = () =>{

          const date = new Date()
           let Hour = date.getUTCHours()
           let Minutes = date.getUTCMinutes()
           let Second = date.getUTCSeconds()
           const MiliSecond = date.getUTCMilliseconds()
            Hour = (Hour % 12) || 12
           const AmOrPm = Hour >= 12 ? 'pm' : 'am'
           
           
          return  FullTime = `${Hour}:${Minutes}:${Second} ${AmOrPm}`


 }



 module.exports = {SetDateFomat,SetTimeFormat}