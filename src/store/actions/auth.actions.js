import axios from 'axios';


// LOGIN
export const SignIn = (user, password) => {
	return async (dispatch, getState) => {
		axios
			.post('http://localhost:3001/login', {
				email: user,
				password: password,
			})
			.then((response) => {
        console.log(response)
        if(response.data.token){
          dispatch({
					type: 'SIGNIN_SUCCESS',
					token: response.data.token,
					profile: response.data.user,
          err: ''
				});
      }else{
        dispatch({type: 'SIGNIN_ERROR',  err: response.data});
      }
	
			})
			.catch((err) => {
				// Handle error.
				dispatch({type: 'SIGNIN_ERROR',  err: err});
			});
	};
};

// REGISTER
export const signUp = (user) => {
	return async (dispatch, getState) => {
    const {email, password , firstName , lastName} = user;
    axios
    .post('http://localhost:3001/register', {
      CORREO: email,
      PASSWORD_HASH: password,
      NOMBRE: firstName,
      APELLIDO_P: lastName,
      ROL_ID:2
    })
    .then(response => {
      // Handle success.
      console.log(response)
      if(response.data === true) {dispatch({
        type: 'SIGNUP_SUCCESS',
        err: ''
      });}else{
        dispatch({type: 'SIGNUP_ERROR', err : response.data});
      }
     
    })
    .catch(err => {
      // Handle error.
      dispatch({type: 'SIGNUP_ERROR', err});
    });
  }
}
// RECOVERD PASSWORD
// export const recoverPw = (email) => {
// 	return async (dispatch, getState) => {
//   axios
//   .post('http://localhost:1337/auth/forgot-password', {
//     email: email, // user's email
//   })
//   .then(response => {
//     dispatch({
//       type: 'SEND_RECOVERPW_SUCCESS'
//     });

//   })
//   .catch(err => {
//     dispatch({
//       type: 'ERROR_PROFILE',
//       err

//     });
//   });
// }}


export const signOut = () => {
	return async (dispatch, getState) => {
    dispatch({
      type: 'SIGNOUT_SUCCESS'
    });

  }
}
////
export const fetchAuth = (id,token) =>{
	return async (dispatch, getState) => {
    axios
    .get('http://localhost:3001/users/'+ id,
   { headers: { 
      'Authorization': 'Bearer ' +  token
    }}).
    then((response)=>{
      dispatch({
        type: 'FETCH_SUCCESS',
        profile: response.data,
        token: token
      });

    }).catch(err => {
      dispatch({
        type: 'ERROR_PROFILE',
        err
      });
    })
  }
}


