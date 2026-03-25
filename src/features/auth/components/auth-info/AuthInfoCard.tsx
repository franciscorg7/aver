import { AuthInfoHeader } from './AuthInfoHeader'
import { AuthInfoContent } from './AuthInfoContent'

export const AuthInfoCard = () => {
  return (
    <aside className="rounded-4xl border border-white/10 bg-black/25 p-8 shadow-2xl shadow-black/20">
      <AuthInfoHeader />
      <AuthInfoContent />
    </aside>
  )
}
