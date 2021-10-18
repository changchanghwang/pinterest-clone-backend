module.exports = {
  signupValidation(email, password) {
    const id = email.split('@')[0];
    //@앞 3글자 이상인지 체크
    if (id.length < 3) {
      return false;
    }
    //패스워드에 아이디가 포함되는지 체크
    if (password.search(id) !== -1) {
      return false;
    }
    return true;
  },
};
