
import { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: string[];
  onSelectCategory: (category: string | null) => void;
  selectedCategory: string | null;
}

export const CategoryFilter = ({
  categories,
  onSelectCategory,
  selectedCategory,
}: CategoryFilterProps) => {
  return (
    <div className="mb-6">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-2 p-1">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => onSelectCategory(null)}
            className="flex-shrink-0 rounded-full"
          >
            All Places
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => onSelectCategory(category)}
              className="flex-shrink-0 rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
