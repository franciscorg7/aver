import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { ListFilterOption } from '@/types/list-filters'

type ListFilterProps<T extends string> = {
  currentFilter?: T
  filters: Array<ListFilterOption & { id: T }>
  content: React.ReactNode[]
  onFilterChange: (filter: T) => void
}

export function ListFilter<T extends string>({
  currentFilter,
  filters,
  content,
  onFilterChange,
}: ListFilterProps<T>) {
  const selectedFilter = currentFilter ?? filters[0]?.id

  return (
    <Tabs
      value={selectedFilter}
      onValueChange={(value) => onFilterChange(value as T)}
    >
      <TabsList>
        {filters.map((filter) => (
          <TabsTrigger
            className="cursor-pointer"
            key={filter.id}
            value={filter.id}
          >
            {filter.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {content.map((item, index) => (
        <TabsContent
          key={filters[index]?.id ?? index}
          value={filters[index].id}
        >
          {item}
        </TabsContent>
      ))}
    </Tabs>
  )
}
