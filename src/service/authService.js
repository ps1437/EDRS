const hasToken = (token) => {
  if (token) {
    return true;
  }
};

const login = (username, pwd) => {
    localStorage.setItem("username",username);
    localStorage.setItem("token",username)
};


export { login, hasToken };
