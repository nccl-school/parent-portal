// import {
//   Links,
//   Meta,
//   Outlet,
//   Scripts,
//   ScrollRestoration,
//   isRouteErrorResponse,
// } from "react-router";
// import { css } from "@linaria/core";
// import { Toaster } from "@nccl/components";

import { css } from "@linaria/core";
import { Toaster } from "@nccl/components";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import "@nccl/theme/reset.css";
import "@nccl/theme/root.css";
import "@nccl/components/css";
import type { Route } from "./+types/root";
// // import { HighlightInit } from "@highlight-run/remix/client";

const rootStyles = css`
  :global() {
    padding: 0;
    margin: 0;

    body {
      padding: 0;
      margin: 0;
    }
  }
`;

export async function loader(args: Route.LoaderArgs) {
  return {
    ENV: {
      ENVIRONMENT: args.context.env.NCCL_ENVIRONMENT,
      HIGHLIGHT_PROJECT_ID: args.context.env.HIGHLIGHT_PROJECT_ID,
    },
  };
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={rootStyles}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
          rel="stylesheet"
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Toaster.Render />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

// export function ErrorBoundary({ error, loaderData }: Route.ErrorBoundaryProps) {
//   let message = "Oops!";
//   let details = "An unexpected error occurred.";
//   let stack: string | undefined;

//   if (isRouteErrorResponse(error)) {
//     message = error.status === 404 ? "404" : "Error";
//     details =
//       error.status === 404
//         ? "The requested page could not be found."
//         : error.statusText || details;
//   } else if (import.meta.env.DEV && error && error instanceof Error) {
//     details = error.message;
//     stack = error.stack;
//   }

//   return (
//     <main className="pt-16 p-4 container mx-auto">
//       {/* <script src="https://unpkg.com/highlight.run"></script> */}
//       {/* <script
//         dangerouslySetInnerHTML={{
//           __html: `
// 							H.init('${loaderData?.ENV.HIGHLIGHT_PROJECT_ID}');
// 						`,
//         }}
//       /> */}
//       <h1>{message}</h1>
//       <p>{details}</p>
//       {stack && (
//         <pre className="w-full p-4 overflow-x-auto">
//           <code>{stack}</code>
//         </pre>
//       )}
//     </main>
//   );
// }

// {
//   /* <HighlightInit
//   projectId={loaderData?.ENV.HIGHLIGHT_PROJECT_ID}
//   serviceName="NCCL Parent Portal | Client"
//   environment={loaderData?.ENV.ENVIRONMENT}
//   tracingOrigins
//   networkRecording={{ enabled: true, recordHeadersAndBody: true }}
// />; */
// }
