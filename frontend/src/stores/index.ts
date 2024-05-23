import { defineStore } from 'pinia'
import axios from 'axios'
import { url } from '../lib/url'
type User = {
  _id: string
  username: string
}
export const useAuthStore = defineStore('authStore', {
  state: () => {
    return {
      currentUser: null as User | null,
      jwt_token: null as string | null
    }
  },
  actions: {
    setJwtToken(token: string | null) {
      console.log('setJwtToken', token);
      this.jwt_token = token
    },
    setCurrentUser() {
      console.log('token', this.jwt_token);
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `${url}/auth/currentUser`,
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${this.jwt_token}`
          }
        })
          .then((response) => {
            console.log('setCurrentUser', response);
            this.currentUser = response.data
            resolve(this.currentUser)
          })
          .catch((error) => {
            console.log('error', error);
            reject(error)
          })
      })
    },
    logout() {
      return new Promise((resolve, reject) => {
        this.currentUser = null
        this.jwt_token = null

        resolve('success')
      })
      // return new Promise((resolve, reject) => {
      //   axios({
      //     method: 'POST',
      //     url: 'https://vue3-nest-js-backeng.vercel.app/auth/logout',
      //     headers: {
      //       'Access-Control-Allow-Origin': '*',
      //       Authorization: `Bearer ${this.jwt_token}`
      //     }
      //   })
      //     .then((response) => {
      //       this.currentUser = null
      //       resolve(response.data)
      //     })
      //     .catch((error) => {
      //       reject(error)
      //     })
      // })
    }
  },
  persist: {
    paths: ['jwt_token']
  }
})
