const registerForm = document.querySelector("#register-form");
const loginForm = document.querySelector("#login-form");
const toggles = document.querySelectorAll(".forms-toggle");
const users = JSON.parse(localStorage.getItem("users")) || [];

toggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    registerForm.classList.toggle("hidden");
    loginForm.classList.toggle("hidden");
  });
});

const isValidLength = (str, min, max = Infinity) =>
  str.length >= min && str.length <= max;

const isAlreadyRegister = (email, registeredUsers) =>
  registeredUsers.some((registeredUser) => email === registeredUser.email);

const isNameValid = (name) =>
  isValidLength(name, 2, 24) &&
  name
    .split("")
    .every(
      (symbol) =>
        (symbol >= "a" && symbol <= "z") || (symbol >= "A" && symbol <= "Z")
    );

const isEmailValid = (email) => isValidLength(email, 7) && email.includes("@");

const isPhoneValid = (phone) =>
  phone.startsWith("+") &&
  isValidLength(phone.slice(1), 8, 12) &&
  phone
    .slice(1)
    .split("")
    .every((symbol) => symbol >= "0" && symbol <= "9");

const isPasswordValid = (password) => {
  const specialSymbols = ["!", ".", "&"];
  return (
    isValidLength(password, 5, 26) &&
    specialSymbols.some((specialSymbol) => password.includes(specialSymbol))
  );
};

const isLoginValid = (email, password, registeredUsers) =>
  registeredUsers.some(
    (registeredUser) =>
      email === registeredUser.email && password === registeredUser.password
  );

const validateInput = (input, validator, errorMsg) => {
  const errorEl = document.createElement("span");
  errorEl.className = "text-sm text-secondary mx-4";
  input.parentNode.appendChild(errorEl);
  input.addEventListener("input", () => {
    const value = input.value.trim();
    const isValid = validator(value);
    errorEl.textContent = isValid ? "" : errorMsg;
    // checkRegisterValidity();
  });
};

// Инициализация динамической валидации инпутов формы регистрации
const nameInput = registerForm.querySelector("#name");
validateInput(nameInput, isNameValid, "Имя: 2-24 латинские буквы");

const emailInput = registerForm.querySelector("#email");
validateInput(emailInput, isEmailValid, "Email: ≥7 символов с @");

const passwordInput = registerForm.querySelector("#password");
validateInput(passwordInput, isPasswordValid, "Пароль: 5-26 символов с !.&");

const phoneInput = registerForm.querySelector("#tel");
validateInput(phoneInput, isPhoneValid, "Телефон: + и 8-12 цифр");

// const checkRegisterValidity = () => {
//   const submitBtn = registerForm.querySelector('input[type="submit"]');

//   const name = nameInput.value.trim();
//   const email = emailInput.value.trim();
//   const password = passwordInput.value.trim();

//   const isValid =
//     isNameValid(name) && isEmailValid(email) && isPasswordValid(password);

//   submitBtn.disabled = !isValid;
// };

// checkRegisterValidity();

// Валидация всей формы регистрации при нажатии submit
registerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = event.target.elements["name"].value.trim();
  const email = event.target.elements["email"].value.trim();
  const phone = event.target.elements["tel"].value.trim();
  const password = event.target.elements["password"].value.trim();

  if (
    isNameValid(name) &&
    isEmailValid(email) &&
    isPasswordValid(password) &&
    !isAlreadyRegister(email, users)
  ) {
    const token = crypto.randomUUID();
    const newUser = { name, email, phone, password, token };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    registerForm.reset();

    registerForm.classList.toggle("hidden");
    loginForm.classList.toggle("hidden");

    console.log(
      `// Поздравляем, ${newUser.name}! Вы успешно зарегистрировались`
    );
    console.log("// Новый пользователь:", newUser);
  } else {
    console.log("// Ошибка регистрации, проверьте введенные данные");
  }
});

// Валидация всей формы входа при нажатии submit
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = event.target.elements["email"].value.trim();
  const password = event.target.elements["password"].value.trim();

  if (isEmailValid(email) && isLoginValid(email, password, users)) {
    loginForm.reset();

    localStorage.setItem(
      "authToken",
      users.filter((user) => user.email === email)[0].token
    );

    window.location.pathname = "/profile.html";

    console.log(
      `// Привет, ${
        users.filter((user) => user.email === email)[0].name
      }! Вы успешно авторизовались`
    );
  } else {
    console.log("// Ошибка входа, проверьте вводимые данные");
  }
});
