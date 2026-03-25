type PillBadgeProps = {
  label: string
  className?: string
}

export const PillBadge = ({ label, className }: PillBadgeProps) => {
  return (
    <span
      className={`mb-4 inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs font-semibold tracking-[0.24em] text-yellow-200 uppercase ${className}`}
    >
      {label}
    </span>
  )
}
