import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiclient } from "../../../shared/services/api-client";
//createAsyncThunk handel the async functions
export const fetchNotes=createAsyncThunk('notes/fetch',async()=>{
   try{
    const response=await apiclient.read();//HTTP call
    console.log('response',response);
    return response;
   }
   catch(err){
    console.log('Err is:::',err);
    throw err;
   }
    
})
const noteSlice = createSlice({
    name:'noteslice',
    // initialState:{'notes':[], 'total':0,ascendingOrder:true,searchResult:[]},
    initialState:{'notes':[], 'total':0,'searchResult':[],isLoading:false,err:null},
    reducers:{
        // CRUD Operations
        // Sync Operations 
        // action - coming from the component 
        // state - update the centeralized store.
        addNote(state, action){
            const noteObject = action.payload;
            console.log('Add Note Reducer Operation Called.... ', action.payload);
            state.notes.push(noteObject);
            
        },
        getTotalRecords(state, action){
            state.total = state.notes.length;
        },
        removeNote(state, action){

        },
        searchNote(state, action) {
            // const searchTerm = action.payload;
            // state.searchResult = searchTerm ? state.notes.filter(note =>
            //   note.title.toLowerCase().includes(searchTerm.toLowerCase())
            // ) : [];
            // state.searchResult.push(searchTerm);
            // console.log("search result is ", state.searchResult);
            const searchObj=action.payload;
            console.log('Search Obj :::: ', searchObj);
          state['searchResult']=state.notes.filter(note=>note.title.includes(searchObj.search));
              
        },
        sortNote(state, action){
            //-->>using a toggle button
            // state.notes.sort((a, b) => a.title.toLowerCase().localeCompare(b.title));
            // state.ascendingOrder = !state.ascendingOrder; // Toggle the sorting order
            // if (!state.ascendingOrder) {
            //   state.notes.reverse(); // Reverse the order if descending
            // }
            const sortObject = action.payload;
            const key=sortObject.sortBy;
            state.notes.sort((first,second)=>{
                if(key==='id')
                {
                    return first[key]-second[key];
                }
                else{
                    return first[key].localeCompare(second[key]);
                }
            })
             
        }
    },
    //sabhi async activity
    extraReducers:(builder)=>{
         // Async Operations
        builder.addCase(fetchNotes.pending,(state,action)=>{

            state.isLoading=true;
           console.log('Pending.....',action.payload);
        })
        .addCase(fetchNotes.fulfilled,(state,action)=>{
            console.log('FullFilled.....',action.payload);
            state.isLoading=false;
            state.notes=action.payload;//gives array of object

        }).addCase(fetchNotes.rejected,(state,action)=>{
            console.log('Rejected.....',action.payload);
            state.isLoading=false;
            state.notes=[];
            state.err=action.payload;
        })

    }
       



    
});
export const {addNote, removeNote, getNote,getTotalRecords,sortNote,searchNote} =  noteSlice.actions; // Component
export default  noteSlice.reducer;