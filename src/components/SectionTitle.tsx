type SectionTitleProps = {
  title: string
}

export const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="h-px w-10 bg-yellow-500/70" />
      <h2 className="font-title text-2xl font-semibold tracking-tight text-white">
        {title}
      </h2>
    </div>
  )
}
