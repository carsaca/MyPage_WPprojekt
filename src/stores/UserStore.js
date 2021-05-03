import {extendObservable } from 'mobx';

/**
 * user store
 */

 class UserStore {
     constructor() {
         extendObservable(this,  {

            loading: true,
            isLoggedIn: false,
            username: ''

         })
     }
 }

 export default new UserStore();