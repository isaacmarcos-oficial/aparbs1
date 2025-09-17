"use client"

import * as React from "react"
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { type DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface Calendar23Props {
  range: DateRange | undefined;
  setRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}


export default function Calendar23({ range, setRange }: Calendar23Props) {
  const setToCurrentMonth = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    setRange({ from: start, to: end });
  };

  const navigateMonth = (direction: "prev" | "next") => {
    if (!range?.from) return;

    const baseDate = new Date(range.from);
    const newStart =
      direction === "prev"
        ? new Date(baseDate.getFullYear(), baseDate.getMonth() - 1, 1)
        : new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 1);

    const newEnd = new Date(newStart.getFullYear(), newStart.getMonth() + 1, 0);
    setRange({ from: newStart, to: newEnd });
  };


  return (
    <div className="flex items-center gap-4 bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center gap-3 ">
        <Label htmlFor="dates" className="text-base font-semibold text-gray-900 cursor-pointer">
          Período
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="dates"
              className="h-10 px-4 py-2 bg-blue-50 rounded-lg min-w-[180px] text-center text-sm font-medium text-blue-900 w-56 justify-between border-none"
            >
              {range?.from && range?.to
                ? `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`
                : "Selecione o período"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="range"
              selected={range}
              captionLayout="dropdown"
              onSelect={(range) => {
                setRange(range)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateMonth("prev")}
          title="Mês anterior"
          className="bg-blue-50"
        >
          <ChevronLeftIcon className="h-4 w-4 text-blue-900" />
        </Button>

        <Button
          variant="ghost"
          className="h-10 px-4 py-2 bg-blue-50 rounded-lg text-center text-sm text-blue-900 justify-between border-none"
          onClick={setToCurrentMonth}
        >
          Mês atual
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateMonth("next")}
          title="Próximo mês"
          className="bg-blue-50"
        >
          <ChevronRightIcon className="h-4 w-4  text-blue-900" />
        </Button>
      </div>

    </div>
  )
}
