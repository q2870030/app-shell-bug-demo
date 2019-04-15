import * as express from "express";
import { resolve } from "path";
import * as React from "react";
import { renderToNodeStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import App from "./components/App";

const runTimeEnvironment =
  process.env.NODE_ENV === "production" ? "prod" : "dev";

const distPathPublic = resolve(__dirname, "../public");

const port = 3000;

const server = express();

server.disable("x-powered-by");

server.use(
  express.static(distPathPublic, {
    index: false,
    dotfiles: "deny",
    setHeaders(response) {
      if (runTimeEnvironment === "prod") {
        response.set(
          "Cache-Control",
          "public, max-age=31536000, s-maxage=31536000"
        );
      }
    }
  })
);

// This was the first approach I used i.e. creating a seperate handler for the app-shell path.
// However, it doesn't fix the following bug:
// "react-dom.development.js:506 Warning: Expected server HTML to contain a matching <div> in <div>."

// server.get("/app-shell", (request, response) => {
//   response.set("content-type", "text/html");

//   response.write(`<!DOCTYPE html>
//     <html>
//       <head>
//         <meta charset="UTF-8" />
//         <title>App shell</title>
//         <link rel="stylesheet" href="styles.css"/>
//       </head>
//       <body>
//         <div id="root"></div>
//         <script src="client.js"></script>
//         <script src="vendor.js"></script>
//         <script>
//           if ('serviceWorker' in navigator) {
//             window.addEventListener('load', () => {
//               navigator.serviceWorker
//                 .register('/service-worker.js', { scope: '/' })
//                 .then((registration) => {
//                   if ('${runTimeEnvironment}' !== 'prod') {
//                     console.log('ServiceWorker registration successful with scope: ', registration.scope);
//                   }
//                 })
//                 .catch((registrationError) => {
//                   if ('${runTimeEnvironment}' !== 'prod') {
//                     console.log('SW registration failed: ', registrationError);
//                   }
//                 });
//             });
//           }
//         </script>
//       </body>
//     </html>`);
//   response.end();
// });

server.get("*", (request, response) => {
  response.set("content-type", "text/html");

  response.write(`<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>App shell</title>
        <link rel="stylesheet" href="styles.css"/>
      </head>
      <body>
        <div id="root">`);

  const stream = renderToNodeStream(
    <StaticRouter context={{}} location={request.url}>
      <App />
    </StaticRouter>
  );

  stream.pipe(
    response,
    { end: false }
  );

  stream.on("end", () => {
    response.write(`</div>
        <script src="client.js"></script>
        <script src="vendor.js"></script>
        <script>
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
              navigator.serviceWorker
                .register('/service-worker.js', { scope: '/' })
                .then((registration) => {
                  if ('${runTimeEnvironment}' !== 'prod') {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                  }
                })
                .catch((registrationError) => {
                  if ('${runTimeEnvironment}' !== 'prod') {
                    console.log('SW registration failed: ', registrationError);
                  }
                });
            });
          }
        </script>
      </body>
    </html>`);
    response.end();
  });
});

server.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
