//Back end call and perform  crud
import axios from "axios";
 export const apiclient={
   async read(){
    try{
        const response= await axios.get(process.env.REACT_APP_NOTES_URL);
        return response.data.notes;
    }
    catch(err){
        throw err;
      }
    },

    insert(){

    },
    update(){

    },
    remove(){

    }
 }
