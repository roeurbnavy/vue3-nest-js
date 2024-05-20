import { defineStore } from 'pinia'
import axios from 'axios'

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
      this.jwt_token = token
    },
    setCurrentUser() {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: 'http://127.0.0.1:8080/auth/currentUser',
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${this.jwt_token}`
          }
        })
          .then((response) => {
            this.currentUser = response.data
            resolve(this.currentUser)
          })
          .catch((error) => {
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
      //     url: 'http://127.0.0.1:8080/auth/logout',
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
