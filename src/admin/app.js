//import logo from "./extensions/mataa_app_logo.png"

const config = {
  locales: ["ar","en"],
  /*
  auth:{
    logo,
  },
  head:{
    favicon: logo,
  },
  menu:{
    logo,
  },
*/
  transition:{
    en:{
      "app.components.LeftMenu.navbrand.title": "لوحة إدارة المنتجات",
      "app.components.LeftMenu.navbrand.workspace": "متاع",
      "Aut.form.welcome.title": "مرحبا في لوحة إدارة المنتجات",
      "Auth.form.welcome.subtitle": "قم بتسجيل الدخول",
    },
    ar:{
      "app.components.LeftMenu.navbrand.title": "لوحة إدارة المنتجات",
      "app.components.LeftMenu.navbrand.workspace": "متاع",
      "Aut.form.welcome.title": "مرحبا في تطبيق إدارة المنتجات",
      "Auth.form.welcome.subtitle": "قم بتسجيل الدخول الى حسابك",
    },
  },
  tutorials: false,
};

const bootstrap = (app) => {
  console.log(app);
}
;

export default {
  config,
  bootstrap,
};
