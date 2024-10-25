document.querySelector("#btn").addEventListener(
  "click",
  function () {
    // let form = document.querySelector("form");
    let firstNameInput = document.querySelector("#firstName").value;
    let lastNameInput = document.querySelector("#lastName").value;
    let emailInput = document.querySelector("#email").value;
    let mobileInput = document.querySelector("#mobile").value;
    let dobInput = document.querySelector("#dob").value;
    let countryInput = document.querySelector("#country").value;
    let addressInput = document.querySelector("#address").value;
    let cityInput = document.querySelector("#city").value;
    let stateInput = document.querySelector("#state").value;
    let zipInput = document.querySelector("#zip").value;
    let bloodGroupSelect = document.querySelector("#bloodGroup").value;
    let passwordInput = document.querySelector("#password").value;
    let confirmPasswordInput = document.querySelector("#confirmPassword").value;
    let obj = {
      firstNameInput: firstNameInput,
      lastNameInput: lastNameInput,
      emailInput: emailInput,
      mobileInput: mobileInput,
      dobInput: dobInput,
      countryInput: countryInput,
      addressInput: addressInput,
      cityInput: cityInput,
      stateInput: stateInput,
      zipInput: zipInput,
      bloodGroupSelect: bloodGroupSelect,
      passwordInput: passwordInput,
      confirmPasswordInput: confirmPasswordInput,
    };

    fetch("http://localhost:4000/reg", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    // let errorMessage = document.createElement("p");

    // errorMessage.style.color = "red";
    // errorMessage.style.fontSize = "0.9em";
    // errorMessage.style.display = "none";
    // confirmPasswordInput.parentNode.insertBefore(errorMessage, confirmPasswordInput.nextSibling);

    // form.addEventListener("submit", function(event) {
    //     event.preventDefault();
    //     errorMessage.style.display = "none";

    //     if (passwordInput.value !== confirmPasswordInput.value) {
    //         alert("Passwords do not match. Please try again.");
    //     } else {
    //         alert("Registration successful! Redirecting to login page...");

    // window.location.href = "login.html";

    // let anchor = [
    //     {
    //         show: "login",
    //         anchor: "login.html"
    //     }
    // ]

    // let s = document.querySelector('#btn');
    // s.innerHTML = anchor.map(a=> `
    //     <button><a href = "${a.anchor}">${a.show}</a></button>
    //     `)

    // If necessary, reset the form after redirection
    // form.reset(); // Uncomment if you need to reset after redirection
  }
  // window.open("login.html")
  // });
  // });
);
