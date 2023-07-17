// import { configureStore } from "@reduxjs/toolkit";
// import noteSlice from "../../modules/notes/redux/note-slice";
// export default configureStore({
//     reducer:{
//         //key value
//         'noteSlice':noteSlice
//     }
// });
//we can also write in the  as new introduce in ECMA-
import {configureStore} from '@reduxjs/toolkit';
import noteSlice from '../../modules/notes/redux/note-slice';
export default configureStore({
    reducer:{
        noteSlice
    }
});