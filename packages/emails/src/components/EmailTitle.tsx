import { Heading } from "@react-email/components";

export function EmailTitle({ children }: { children: string }) {
  return (
    <Heading
      style={{
        fontSize: 18,
        fontWeight: 600,
        fontFamily:
          '"Montserrat", system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      }}
    >
      {children}
    </Heading>
  );
}
