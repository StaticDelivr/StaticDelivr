import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function LegalPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to terms of service by default
    router.push('/legal/terms-of-service')
  }, [router])

  return null
}
