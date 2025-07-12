export const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatDueDate = (dateString: string) => {
  if (!dateString) return "No Deadline";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "No Deadline";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};