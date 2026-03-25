import type { LucideIcon } from 'lucide-react'
import { createElement } from 'react'

type AuthModeProps = {
  title: string
  description: string
  icon: LucideIcon
}

export const AuthMode = ({ title, description, icon }: AuthModeProps) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-end gap-2 text-lg font-bold text-white">
        {createElement(icon, { className: 'h-6 w-6 text-yellow-500' })}
        <span>{title}</span>
      </div>
      <p className="mt-2">{description}</p>
    </div>
  )
}
