import AboutUs from "./components/AboutUs";
import AppShell from "./components/AppShell";
import ContactUs from "./components/ContactUs";
import Home from "./components/Home";

const ROUTES = [
  {
    componentName: AboutUs,
    exact: true,
    pathToMatch: "/about-us"
  },
  {
    componentName: AppShell,
    exact: true,
    pathToMatch: "/app-shell"
  },
  {
    componentName: ContactUs,
    exact: true,
    pathToMatch: "/contact-us"
  },
  {
    componentName: Home,
    exact: true,
    pathToMatch: "/"
  }
];

const routes = [];

ROUTES.forEach(route => {
  const routeConfig = {
    component: route.componentName,
    exact: route.exact,
    path: route.pathToMatch
  };

  routes.push(routeConfig);
});

export default routes;
