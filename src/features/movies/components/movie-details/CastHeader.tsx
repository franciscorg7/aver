import { SectionTitle } from '@/components/SectionTitle'

type CastHeaderProps = {
  onViewAllClick?: () => void
}

export const CastHeader = ({ onViewAllClick }: CastHeaderProps) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <SectionTitle title="Cast & Crew" />
      <button
        type="button"
        className="font-title cursor-pointer text-xs font-semibold tracking-[0.18em] text-yellow-500 uppercase transition hover:text-yellow-400"
        onClick={onViewAllClick}
      >
        View All
      </button>
    </div>
  )
}
