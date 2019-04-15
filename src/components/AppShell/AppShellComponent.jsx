import * as React from "react";

// If I use the component as below, then
// "react-dom.development.js:506 Warning: Expected server HTML to contain a matching <div> in <div>."
// warning appears on all routes i.e. /, '/about-us', '/contact-us' etc.

// const AppShellComponent = () => (
//   <main className="font-size-16" data-test="main">
//     Loading...
//   </main>
// );

// If I use the component as below, then
// "react-dom.development.js:506 Warning: Expected server HTML to contain a matching <div> in <div>."
// warning goes away for the home route i.e. '/'.
// Please note the HTML content of this component is exactly the same as HomeComponent.
// If I use any other route to refresh the offline page i.e. '/about-us' or '/contact-us', the warning comes back.

const AppShellComponent = () => (
  <main className="font-size-16" data-test="main">
    Home page
  </main>
);

export default AppShellComponent;
