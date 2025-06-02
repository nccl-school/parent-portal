export class DateFactory {
  private static instance: DateFactory;

  private constructor() {}

  static getInstance(): DateFactory {
    if (!DateFactory.instance) {
      DateFactory.instance = new DateFactory();
    }
    return DateFactory.instance;
  }

  format(
    dateInput: Date | string | number | null,
    pattern:
      | "MM/DD/YYYY"
      | "YYYY-MM-DD"
      | "MMM DD, YYYY"
      | "Relative" = "MM/DD/YYYY"
  ): string {
    if (!dateInput) return "Unknown date";
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) throw new Error("Invalid date");

    if (pattern === "Relative") {
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays < 0) return "In the future";
      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Yesterday";
      if (diffDays <= 6) return `${diffDays} days ago`;

      // fallback to default pattern
      pattern = "MM/DD/YYYY";
    }

    switch (pattern) {
      case "MM/DD/YYYY":
        return this.formatWithParts(date, "MM/DD/YYYY");
      case "YYYY-MM-DD":
        return this.formatWithParts(date, "YYYY-MM-DD");
      case "MMM DD, YYYY":
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        });
      default:
        return date.toDateString();
    }
  }

  private formatWithParts(date: Date, pattern: string): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    switch (pattern) {
      case "MM/DD/YYYY":
        return `${mm}/${dd}/${yyyy}`;
      case "YYYY-MM-DD":
        return `${yyyy}-${mm}-${dd}`;
      default:
        throw new Error("Unsupported pattern");
    }
  }
}

export const dates = DateFactory.getInstance();
