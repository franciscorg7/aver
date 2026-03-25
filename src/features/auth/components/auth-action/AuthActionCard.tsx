import { AuthActionButtons } from './AuthActionButtons'
import { AuthRegister } from './AuthRegister'
import { AuthActionDescription } from './AuthActionDescription'
import { AuthActionHeader } from './AuthActionHeader'

type AuthActionCardProps = {
  loginWithAPI: () => void
  loginAsGuest: () => void
}

export const AuthActionCard = ({
  loginWithAPI,
  loginAsGuest,
}: AuthActionCardProps) => {
  return (
    <section className="rounded-4xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl lg:p-10">
      <AuthActionHeader />
      <AuthActionDescription />
      <AuthActionButtons
        loginWithAPI={loginWithAPI}
        loginAsGuest={loginAsGuest}
      />
      <AuthRegister />
    </section>
  )
}
