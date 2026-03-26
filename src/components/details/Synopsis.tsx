import { SectionTitle } from '@/components/SectionTitle'

type SynopsisProps = {
  overview?: string
}

export const Synopsis = ({ overview }: SynopsisProps) => {
  return (
    <section className="flex w-1/2 flex-col gap-2">
      <SectionTitle title="Synopsis"></SectionTitle>
      <p className="text-white/70">{overview}</p>
    </section>
  )
}
