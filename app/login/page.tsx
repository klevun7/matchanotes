'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login, signup } from "@/app/actions/actions"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleLogin = async (formData: FormData) => {
    setIsLoading(true)
    setMessage('')
    
    try {
      const result = await login(formData)
      setMessage(result.message)
      
      if (result.success && result.redirectPath) {
        router.push(result.redirectPath)
      }
    } catch (error) {
      setMessage('An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (formData: FormData) => {
    setIsLoading(true)
    setMessage('')
    
    try {
      const result = await signup(formData)
      setMessage(result.message)
      
      if (result.success && result.redirectPath) {
        router.push(result.redirectPath)
      }
    } catch (error) {
      setMessage('An error occurred during signup')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      className="max-w-[350px] mx-auto mt-12 p-8 border border-gray-200 rounded-lg bg-white shadow-md flex flex-col gap-4"
    >
      <label htmlFor="email" className="font-medium">
        Email:
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        className="p-2 border border-gray-300 rounded text-base"
      />
      <label htmlFor="password" className="font-medium">
        Password:
      </label>
      <input
        id="password"
        name="password"
        type="password"
        required
        className="p-2 border border-gray-300 rounded text-base"
      />
      
      {message && (
        <div className={`p-2 rounded text-sm ${
          message.includes('successful') || message.includes('check your email') 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}
      
      <div className="flex gap-2 mt-4">
        <button
          type="button"
          onClick={(e) => {
            const form = e.currentTarget.closest('form') as HTMLFormElement
            const formData = new FormData(form)
            handleLogin(formData)
          }}
          disabled={isLoading}
          className="flex-1 p-2 bg-matcha text-white border-none rounded font-semibold cursor-pointer hover:bg-green-700 transition disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Log in'}
        </button>
        <button
          type="button"
          onClick={(e) => {
            const form = e.currentTarget.closest('form') as HTMLFormElement
            const formData = new FormData(form)
            handleSignup(formData)
          }}
          disabled={isLoading}
          className="flex-1 p-2 bg-gray-100 text-gray-900 border border-gray-300 rounded font-semibold cursor-pointer hover:bg-gray-200 transition disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Sign up'}
        </button>
      </div>
    </form>
  )
}