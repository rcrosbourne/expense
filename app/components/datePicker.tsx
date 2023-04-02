import React from "react";
import Datepicker from "react-tailwindcss-datepicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";
dayjs.extend(timezone);
dayjs.extend(utc);
const DatePicker = ({
  useRange = false,
  asSingle = true,
  value = {
    startDate: `${dayjs().tz("America/Jamaica").format("YYYY-MM-DD")}`,
    endDate: `${dayjs().tz("America/Jamaica").format("YYYY-MM-DD")}`,
  },
  onDateChanged,
  placeholder = `${dayjs().tz("America/Jamaica").format("YYYY-MM-DD")}`,
}: {
  useRange: boolean;
  asSingle: boolean;
  value: DateValueType;
  onDateChanged: (
    value: DateValueType,
    e?: HTMLInputElement | null | undefined
  ) => void;
  placeholder?: string;
}) => {
  return (
    <Datepicker
      useRange={useRange}
      primaryColor={"teal"}
      asSingle={asSingle}
      value={value}
      inputClassName="w-full rounded-md !bg-slate-100 !border-0 py-2.5 pr-10 text-slate-900 ring-1 ring-inset !ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:!ring-inset focus:!ring-cyan-600 sm:text-sm sm:leading-6"
      onChange={onDateChanged}
      placeholder={placeholder}
    />
  );
};
export default DatePicker;
