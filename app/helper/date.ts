export function changeDate(dateString: string) {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function onlyDate(dateString: string) {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

export function onlyYear(dateString: string) {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
  });
}