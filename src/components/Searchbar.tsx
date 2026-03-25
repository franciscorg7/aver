import { Input } from './ui/input'

type SearchbarProps = {
  searchQuery: string
  placeholder?: string
  ariaLabel?: string
  onSearchChange: (query: string) => void
}

export const Searchbar = ({
  searchQuery,
  placeholder,
  ariaLabel,
  onSearchChange,
}: SearchbarProps) => {
  return (
    <Input
      type="search"
      value={searchQuery}
      onChange={(event) => onSearchChange(event.target.value)}
      placeholder={placeholder}
      aria-label={ariaLabel}
      className="h-11 border-white/10 bg-white/5 px-4 text-white placeholder:text-slate-400"
    />
  )
}
