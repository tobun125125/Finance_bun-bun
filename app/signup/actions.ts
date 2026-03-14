'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function signUpWithEmail(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!email || !password) {
    return { error: 'กรุณากรอก Email และ Password' }
  }

  if (password !== confirmPassword) {
    return { error: 'Password ไม่ตรงกัน' }
  }

  if (password.length < 6) {
    return { error: 'Password ต้องมีอย่างน้อย 6 ตัวอักษร' }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/login?message=สมัครสมาชิกสำเร็จ กรุณาตรวจสอบอีเมลเพื่อยืนยันบัญชี')
}
