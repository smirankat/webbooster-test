const modal = document.getElementById("formModal");
const span = document.getElementsByClassName("close")[0];
const addButtons = document.querySelectorAll(".add");
const formProductName = document.getElementById("product_form");
const inputName = document.getElementById("name");
const inputPhone = document.getElementById("phone");
const nameError = document.querySelector("#name + span.error");
const phoneError = document.querySelector("#phone + span.error");

for (let addButton of addButtons) {
  addButton.addEventListener("click", handler);

  function handler(event) {
    modal.style.display = "block";
    // console.log(
    //   event.target.closest("div").querySelector(".product_card").innerHTML
    // );
    formProductName.innerHTML = event.target.previousElementSibling.innerHTML;
    inputName.value = "";
    inputPhone.value = "";
    nameError.textContent = "";
    nameError.className = "error";
    inputName.className = "";
    phoneError.textContent = "";
    phoneError.className = "error";
    inputPhone.className = "";
  }
}
span.onclick = function () {
  modal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

inputName.addEventListener("input", function () {
  if (inputName.value) {
    nameError.textContent = "";
    nameError.className = "error";
    inputName.className = "";
  } else {
    showNameErrow();
  }
});

function showNameErrow() {
  if (!inputName.value) {
    nameError.textContent = "You need to enter your name";
  }
  nameError.className = "error active";
  inputName.className = "invalid";
}

let validPhone;

inputPhone.addEventListener("input", function () {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  validPhone = re.test(inputPhone.value);
  // console.log(inputPhone.value, validPhone);
  if (inputPhone.value && validPhone) {
    phoneError.textContent = "";
    phoneError.className = "error";
    inputPhone.className = "";
  } else {
    showPhoneErrow();
  }
});

function showPhoneErrow() {
  if (!inputPhone.value) {
    phoneError.textContent = "You need to enter your phone number";
  } else if (!validPhone) {
    phoneError.textContent = "Incorrect value entered";
  }
  phoneError.className = "error active";
  inputPhone.className = "invalid";
}

document.forms.formName.onsubmit = async (e) => {
  e.preventDefault();

  ym(88814819, "reachGoal", "form");

  if (!inputName.value || !inputPhone.value || !validPhone) {
    if (!inputName.value) {
      showNameErrow();
    }
    if (!inputPhone.value || !validPhone) {
      showPhoneErrow();
    }
    return;
  }
  if (
    document.forms.formName.elements.user_name.value &&
    document.forms.formName.elements.user_phone.value
  ) {
    let userName = document.forms.formName.elements.user_name.value;
    let userPhone = document.forms.formName.elements.user_phone.value;
    let productName = document.forms.formName.elements.product_name.value;

    let user = JSON.stringify({
      userName: userName,
      userPhone: userPhone,
      productName: productName,
    });

    let response = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: user,
    });

    let result = await response.json();
    alert(
      `The product ${result.productName}  added to your cart successfully!`
    );
  }
  modal.style.display = "none";
};
