import { types, flow, getParent } from "mobx-state-tree";


export const Auth = types
  .model({
    emailValid: types.boolean,
    userName: "",
    loggedIn: types.boolean,
    tempToken: types.string,
    realToken: types.string,
  })
  .actions((self) => ({
    logout() {
      self.realToken = "";
      self.loggedIn = false;
      self.emailValid = false;
      self.userName = "";
      window.localStorage.clear();
    },
    getTemporaryToken: flow(function* fetchTemporaryToken(email) {
      try {
        const response = yield fetch("https://api.joonik.com/login/email", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        });
        const { result } = yield response.json();
        if (result) {
          self.emailValid = true;
          self.tempToken = result;
        } else {
          self.emailValid = false;
          self.tempToken = "";
          alert("Ingrese un correo valido");
        }
      } catch (e) {
        console.error("Failed to fetch", e);
        self.emailValid = false;
        alert("Ingrese un correo valido");
      }
    }),
    getRealToken: flow(function* fetchRealToken(password) {
      try {
        const response = yield fetch("https://api.joonik.com/login/password", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${self.tempToken}`,
          },
          body: JSON.stringify({ password: password }),
        });
        const { token, name, error } = yield response.json();
        if (token) {
          self.loggedIn = true;
          self.realToken = token;
          self.userName = name;
        } else if (response.status === 401) {
          self.realToken = "";
          self.loggedIn = false;
          self.userName = "";
          alert(error);
        }
      } catch (e) {
        console.error("Failed to fetch", e);
        self.realToken = "";
        self.loggedIn = false;
        self.userName = "";
      }
    }),
  }));
