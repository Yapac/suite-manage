import dayjs from "dayjs";

type DateColors = "success" | "processing" | "error" | "default" | "warning";

export const getDateColor = (args: {
  date: string;
  defaultColor?: DateColors;
}): DateColors => {
  const date = dayjs(args.date);
  const today = dayjs();

  if (date.isSame(today, "day")) {
    return "success"; // Today
  }

  if (date.isSame(today.subtract(1, "day"), "day")) {
    return "warning"; // Yesterday
  }

  if (date.isSame(today.subtract(2, "day"), "day")) {
    return "processing"; // Two days ago
  }

  if (date.isBefore(today)) {
    return "error"; // older than 2 days
  }

  return args.defaultColor ?? "default";
};
