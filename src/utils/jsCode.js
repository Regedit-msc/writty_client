export const jsCode = `
class EventEmmitter {
     constructor(){
         this.eventSubbedTo = [];
         this.functionToRunForEvent=[];
     }


   subscribe(eventName, callback){
       if(this.eventSubbedTo.indexOf(eventName) === -1){
           this.eventSubbedTo.push(eventName);
           this.functionToRunForEvent.push(callback);

       } else {
           console.log("The event already exists");
       }
   }
   emit(eventName){
       if(this.eventSubbedTo.indexOf(eventName) !== -1){
           this.functionToRunForEvent[this.eventSubbedTo.indexOf(eventName)]();
       } else {
           console.log("Please subscribe to the event");
       }
   }

   unsubscribe(eventName){
       const indexOfEvent = this.eventSubbedTo.indexOf(eventName);
      if(indexOfEvent !== -1){
          this.functionToRunForEvent = this.functionToRunForEvent.filter((_, index) => index !== indexOfEvent);
          this.eventSubbedTo = this.eventSubbedTo.filter((event, _) => event !== eventName);
          console.log("unsubscribed from event " + eventName);
      } else {
        console.log("You cannot unsubscribe from an event that has not been subscribed to");
      }
   }

}
                    `