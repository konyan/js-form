let firstNameInput = document.getElementById("firstname");
let lastNameInput = document.getElementById("lastname");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let confirmInput = document.getElementById("confirmpassword");
let form = document.getElementById("signup");
let btn = document.getElementById("signupButton");

const firstName = firstNameInput.value;
const lastName = lastNameInput.value;
const email = emailInput.value;
const password = passwordInput.value;
const confirm = confirmInput.value;

let emailError = document.getElementById("emailError");

emailInput.addEventListener("input", function (event) {
  console.log("CHANGE", event.target.value);
  const val = event.target.value;
  if (emailChecker(val)) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
});
console.log("HEII", email);

form.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log(" WOKRING", event);

  const firstInput = event.target[0];
  const emailInput = event.target[2];
  const passInput = event.target[3];
  const confirmInput = event.target[4];

  const emailValue = emailInput.value;
  const passValue = passInput.value;
  const confirmValue = confirmInput.value;

  const emailValidate = emailChecker(emailValue);
  const passValidate = passwordChecker(passValue);
  const confirmValidate = confirmPasswordChecker(confirmValue, passValue);

  let validateArray = [
    {
      isValidate: emailValidate,
      node: emailInput,
      value: emailValue,
      msg: " Email is Wrong",
    },
    {
      isValidate: passValidate,
      node: passInput,
      value: passValue,
      msg: " pass is Wrong",
    },
    {
      isValidate: confirmValidate,
      node: confirmInput,
      value: confirmValue,
      msg: " confirm password is Wrong",
    },
  ]; //object array

  if (validateArray.every((item) => item.isValidate === true)) {
    // continue valdaton
    console.log("FIRST");
  } else {
    for (let val of validateArray) {
      if (!val.isValidate) {
        const parentNode = val.node.parentNode;
        console.log("PARENT", parentNode);
        console.log("LAST CHILD", parentNode.lastChild);

        parentNode.removeChild(parentNode.lastChild);
        parentNode.innerHTML += errorTmp(val.msg);
      }
    }
  }
});

// function submit(event) {
//   console.log("HIII", form);
// }

function emailChecker(sample) {
  return new RegExp(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ).test(sample);
}

function passwordChecker(pass) {
  return pass.length > 6;
}

function errorTmp(msg) {
  return `<span class="text-red-700 text-sm text-thin error">${msg}</span>`;
}

function confirmPasswordChecker(password, confirmPass) {
  return password === confirmPass;
}
