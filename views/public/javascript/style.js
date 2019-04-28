
$(".userLogin").on("click", function(){
  alert("Yaya");
});


function updateUser() {
    var x = document.getElementById("user_update");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  function signUpRace() {
    var x = document.getElementById("race_signup");
    if (x.style.display == "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
