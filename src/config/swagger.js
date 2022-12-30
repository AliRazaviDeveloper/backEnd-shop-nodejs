const options = {
  definition: {
    info: {
      title: "Shopy BackEnd Api Reference",
      version: "0.1.0",
      description: "shopy backend api payment online ",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "AliRazavi",
        url: "http://razavi.ali.ir",
        email: "razavi.ali.1998@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5555",
      },
    ],
  },
  apis: ["./src/router/**/*.js"],
};
module.exports = options;
