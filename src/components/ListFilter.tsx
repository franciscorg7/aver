import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ListFilterProps<T> = {
  currentFilter?: T;
  filters: T[];
  content: React.ReactNode[];
  onFilterChange: (filter: T) => void;
};

export function ListFilter<T extends string>({
  currentFilter,
  filters,
  content,
  onFilterChange,
}: ListFilterProps<T>) {
  const defaultFilter = currentFilter || filters[0];
  return (
    <Tabs
      defaultValue={defaultFilter}
      onValueChange={(value) => onFilterChange(value as T)}
    >
      <TabsList>
        {filters.map((filter) => (
          <TabsTrigger className="cursor-pointer" key={filter} value={filter}>
            {filter}
          </TabsTrigger>
        ))}
      </TabsList>
      {content.map((item, index) => (
        <TabsContent key={index} value={filters[index]}>
          {item}
        </TabsContent>
      ))}
    </Tabs>
  );
}
