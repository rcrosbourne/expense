import { type DateValueType } from "react-tailwindcss-datepicker/dist/types";
import dayjs from "dayjs";

type DateType = null | Date | string;
const formatDateOrReturnDefault = (
  date: DateValueType | string | null | undefined
): string => {
  if (date === null || date === undefined) {
    return dayjs()
        // .tz("America/Jamaica")
    .format("MMMM DD, YYYY");
  }
  if (isDateValueType(date)) {
    if (date.startDate) {
      return dayjs(date.startDate)
        // .tz("America/Jamaica")
        .format("MMMM DD, YYYY");
    }
  }
  return dayjs()
      // .tz("America/Jamaica")
  .format("MMMM DD, YYYY");
};

function isDateValueType(obj: any): obj is DateValueType {
  return (
    obj &&
    (typeof obj.startDate === "string" ||
      obj.startDate instanceof Date ||
      obj.startDate === null) &&
    (typeof obj.endDate === "string" ||
      obj.endDate instanceof Date ||
      obj.endDate === null)
  );
}
export default formatDateOrReturnDefault;
