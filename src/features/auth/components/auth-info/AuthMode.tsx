type AuthModeProps = {
  title: string
  description: string
  icon: React.ReactNode
}

export const AuthMode = ({ title, description, icon }: AuthModeProps) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-end gap-2 text-lg font-bold text-white">
        <span>{icon}</span>
        <span>{title}</span>
      </div>
      <p className="mt-2">{description}</p>
    </div>
  )
}
