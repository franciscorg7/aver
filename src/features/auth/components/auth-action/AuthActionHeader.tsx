import { PillBadge } from '@/components/PillBadge'

export const AuthActionHeader = () => {
  return (
    <div>
      <PillBadge label="TMDB Authentication" />
      <h1 className="font-title text-4xl font-semibold tracking-tight text-white lg:text-5xl">
        Get the most out of AVER with your{' '}
        <b className="text-yellow-500">TMDB</b> account or keep browsing as a
        guest.
      </h1>
    </div>
  )
}
