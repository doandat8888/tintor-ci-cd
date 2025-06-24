import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const MentorPagination = ({
  data,
  page,
  size,
  onPageChange,
  onSizeChange,
}: {
  data: any[];
  page: number;
  size: number;
  onSizeChange: (value: any) => void;
  onPageChange: (value: any) => void;
}) => {
  const totalPages = Math.ceil(data.length / size);

  const handleSizeChange = (value: string) => {
    onSizeChange(parseInt(value, 10));
    onPageChange(1);
  };

  return (
    <div className="flex items-center justify-between px-8 pb-4 mt-auto">
      <div className="flex gap-4 items-center text-zinc-500">
        <Pagination>
          <PaginationContent
            className={cn(
              totalPages > 1 ? "border-r-2 pr-2 border-zinc-500" : ""
            )}
          >
            {page > 1 && (
              <PaginationItem onClick={() => onPageChange(page - 1)}>
                <PaginationPrevious className="text-xs" />
              </PaginationItem>
            )}
            {(() => {
              const pagesToShow = 5;
              const startPage = Math.max(1, page - Math.floor(pagesToShow / 2));
              const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

              const adjustedStartPage = Math.max(1, endPage - pagesToShow + 1);

              const visiblePages = Array.from(
                { length: endPage - adjustedStartPage + 1 },
                (_, i) => adjustedStartPage + i
              );

              return visiblePages.map((pg) => (
                <PaginationItem key={pg}>
                  <PaginationLink
                    onClick={() => onPageChange(pg)}
                    className="text-xs"
                    isActive={page === pg}
                  >
                    {pg}
                  </PaginationLink>
                </PaginationItem>
              ));
            })()}
            {page < totalPages && (
              <PaginationItem onClick={() => onPageChange(page + 1)}>
                <PaginationNext className="text-xs" />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
        <div className="flex gap-2 items-center text-xs">
          <span>Show</span>
          <Select
            onValueChange={(value) => handleSizeChange(value)}
            defaultValue={size.toString()}
          >
            <SelectTrigger className="w-16 h-8 border-2 border-zinc-500 focus:ring-0 focus-visible:ring-none focus-visible:ring-offset-0">
              <SelectValue defaultValue={size.toString()} />
            </SelectTrigger>
            <SelectContent className="w-16">
              <SelectGroup>
                {[6, 9, 12, 15, 18].map((opt) => (
                  <SelectItem key={opt} value={opt.toString()}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <span>mentors</span>
        </div>
      </div>
      <p className="text-sm text-zinc-500">
        Total:{" "}
        <span className="font-semibold text-foreground">{data.length}</span>{" "}
        items
      </p>
    </div>
  );
};
