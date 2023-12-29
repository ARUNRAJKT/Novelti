import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: []
    },
    reducers: {
        getUser: (state, action) => {
            state.users = action.payload.map(user => {
                  return {id:user._id,
                          firstname:user.firstname,
                          lastname:user.lastname,
                          email:user.email,
                          phone:user.phone,
                          address1:user.address1,
                          address2:user.address2,
                          country:user.country,
                          state:user.state,
                          zipcode:user.zipcode
                        }
            })
        },
        addUser:(state,action)=>{
            state.users.push(action.payload)
        },
        updateUser:(state,action)=>{
         const index=state.users.findIndex(x=>x.id===action.payload.id)
         state.users[index]={
            id:action.payload.id,
            action.payload.firstname
            action.payload.lastname,
            action.payload.email,
            action.payload.phone,
            action.payload.address1,
            action.payload.address2,
            action.payload.country,
            action.payload.state,
            action.payload.zipcode,
         }
        },
        deleteUser:(state,action)=>{
            const id=action.payload.id;
            state.users=state.filter(u=>u.id!==id)
        }
    }

})
export const { getUser,addUser,updateUser,deleteUser } = userSlice.actions;
export default userSlice.reducer