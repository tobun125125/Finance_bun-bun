"use client"

import { createClient } from '@/utils/supabase/client'
import { User, Lock, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { LoginIllustration } from '@/components/auth/LoginIllustration'
import { signInWithEmail } from './actions'

export default function LoginPage() {
  const supabase = createClient()
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(searchParams.get('error'))
  const [message, setMessage] = useState<string | null>(searchParams.get('message'))
  const [loading, setLoading] = useState(false)

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  const handleEmailLogin = async (formData: FormData) => {
    setError(null)
    setMessage(null)
    setLoading(true)

    const result = await signInWithEmail(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-4 font-sans relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-[80px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-green-100/30 blur-[100px]"></div>
      </div>

      <div className="w-full max-w-[400px] bg-white rounded-[32px] px-8 py-10 shadow-xl shadow-gray-200/50 flex flex-col items-center relative z-10">
        
        <LoginIllustration />

        <h1 className="text-[28px] font-bold text-[#1a1f36] mb-2 tracking-tight">Sign In</h1>
        <p className="text-[13px] text-gray-400 mb-8 text-center max-w-[250px]">
          Enter valid email &amp; password to continue
        </p>

        {/* Error Message */}
        {error && (
          <div className="w-full bg-red-50 border border-red-200 rounded-2xl px-4 py-3 mb-4 text-red-600 text-[13px] font-medium">
            {error}
          </div>
        )}

        {/* Success Message */}
        {message && (
          <div className="w-full bg-green-50 border border-green-200 rounded-2xl px-4 py-3 mb-4 text-green-600 text-[13px] font-medium">
            {message}
          </div>
        )}

        <form action={handleEmailLogin} className="w-full">
          <div className="w-full space-y-4 mb-3">
            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-[18px] flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
              </div>
              <input 
                name="email"
                type="email" 
                className="w-full pl-[52px] pr-4 py-[14px] bg-white border border-gray-200 rounded-2xl text-[14px] text-gray-800 placeholder-gray-400 hover:border-blue-400 focus:outline-none focus:ring-[1px] focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
                placeholder="Email"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-[18px] flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
              </div>
              <input 
                name="password"
                type={showPassword ? "text" : "password"} 
                className="w-full pl-[52px] pr-12 py-[14px] bg-white border border-gray-200 rounded-2xl text-[14px] text-gray-800 placeholder-gray-400 hover:border-blue-400 focus:outline-none focus:ring-[1px] focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
                placeholder="Password"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-300 hover:text-gray-500"
              >
                {showPassword ? <EyeOff className="h-4 w-4" strokeWidth={2.5} /> : <Eye className="h-4 w-4" strokeWidth={2.5} />}
              </button>
            </div>
          </div>

          <div className="w-full flex justify-end mb-6">
            <a href="#" className="text-[13px] text-[#0066ff] font-semibold hover:text-blue-700 transition-colors">
              Forget password
            </a>
          </div>

          {/* Login Button */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#0066ff] hover:bg-blue-700 text-white font-semibold py-[14px] rounded-2xl shadow-[0_8px_16px_-6px_rgba(0,102,255,0.4)] transition-all active:scale-[0.98] mb-8 text-[15px] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        {/* Divider */}
        <div className="w-full flex items-center justify-between mb-8">
          <hr className="w-[30%] border-gray-200" />
          <span className="text-[12px] text-gray-400 px-2 font-medium">Or Continue with</span>
          <hr className="w-[30%] border-gray-200" />
        </div>

        {/* Google Login Button */}
        <div className="w-full flex justify-center mb-10">
          <button 
            onClick={handleGoogleLogin}
            type="button"
            className="flex-1 flex items-center justify-center gap-2 bg-gray-50/80 hover:bg-gray-100 border border-gray-100 py-3.5 rounded-2xl transition-all font-medium text-[13px] text-gray-600 shadow-sm max-w-[200px]"
          >
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
        </div>

        <p className="text-[13px] text-gray-500">
          Don&apos;t have an account? <a href="/signup" className="text-[#0066ff] font-semibold hover:text-blue-700">Sign up</a>
        </p>
      </div>
    </div>
  )
}
