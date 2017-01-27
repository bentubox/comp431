function updateInfo(){
	checkName();
	checkEmail();
	checkPhone();
	checkZip();
	checkPassword();
}

function checkName(){
	var info = document.getElementById("infoName");
	var input = document.getElementById("newName");
	var name = document.getElementById("name");
	info.innerHTML = "";
	email.style.outline = "";
	if (input.value.length != 0){
		if(validateName(input)){
			info.innerHTML = info.innerHTML + "Updated Name from " + document.getElementById("oldName").innerHTML + " to " + input.value + "!\b";
			document.getElementById("oldName").innerHTML = input.value;
			input.value = "";
			info.style.color = "lime";
			name.style.outline = "2px solid lime"
		} else{
			info.innerHTML = info.innerHTML + "Invalid Name! May have included invalid characters!\b";
			info.style.color = "red";
			name.style.outline = "2px solid red"
		}
	}
}

function checkEmail(){
	var info = document.getElementById("infoEmail");
	var input = document.getElementById("newEmail");
	var email = document.getElementById("email");
	info.innerHTML = "";
	email.style.outline = "";
	if (input.value.length != 0){
		if (validateEmail(input)) {
			info.innerHTML = info.innerHTML + "Updated Email Address from " + document.getElementById("oldEmail").innerHTML + " to " + input.value + "!\b";
			document.getElementById("oldEmail").innerHTML = input.value;
			input.value = "";
			info.style.color = "lime";
			email.style.outline = "2px solid lime"
		} else{
			info.innerHTML = info.innerHTML + "Invalid Email Address! (Must match name@domain)\b";
			info.style.color = "red";
			email.style.outline = "2px solid red"
		}		
	}
}

function checkPhone(){
	var info = document.getElementById("infoPhone");
	var input = document.getElementById("newPhone");
	var phone = document.getElementById("phone");
	info.innerHTML = "";
	phone.style.outline = "";
	if (input.value.length != 0){
		if (validatePhone(input)) {
			if (input.value.match("^[0-9]{10}$")){
				// Insert hyphens for formatting purposes.
				var update = input.value.slice(0, 3) + "-" + input.value.slice(3, 6) + "-" + input.value.slice(6, 10);
			} else{
				var update = input.value;
			}
			info.innerHTML = info.innerHTML + "Updated Phone Number from " + document.getElementById("oldPhone").innerHTML + " to " + update + "!\b";
			document.getElementById("oldPhone").innerHTML = update;
			input.value = "";
			info.style.color = "lime";
			phone.style.outline = "2px solid lime"
		} else{
			info.innerHTML = info.innerHTML + "Invalid Phone Number! (Must match ###-###-#### or ##########)\b";
			info.style.color = "red";
			phone.style.outline = "2px solid red"
		}		
	}
}

function checkZip(){
	var info = document.getElementById("infoZip");
	var input = document.getElementById("newZip");
	var zip = document.getElementById("zip");
	info.innerHTML = "";
	zip.style.outline = "";
	if (input.value.length != 0){
		if (validateZip(input)) {
			info.innerHTML = info.innerHTML + "Updated Zipcode from " + document.getElementById("oldZip").innerHTML + " to " + input.value + "!\b";
			document.getElementById("oldZip").innerHTML = input.value;
			input.value = "";
			info.style.color = "lime";
			zip.style.outline = "2px solid lime"
		} else{
			info.innerHTML = info.innerHTML + "Invalid Zipcode! (Must match #####)\b";
			info.style.color = "red";
			zip.style.outline = "2px solid red"
		}		
	}
}

function checkPassword(){
	var info = document.getElementById("infoPassword");
	var input0 = document.getElementById("newPassword");
	var input1 = document.getElementById("newPasswordConfirm");
	var password = document.getElementById("password");
	info.innerHTML = "";
	password.style.outline = "";
	if (input0.value.length != 0 && input1.value.length != 0){
		if (validatePassword(input0, input1)) {
			info.innerHTML = info.innerHTML + "Updated Password from " + document.getElementById("oldPassword").innerHTML + " to " + input0.value + "!\b";
			document.getElementById("oldPassword").innerHTML = input0.value;
			document.getElementById("hidePassword").innerHTML = hidePassword(input0.value);
			input0.value = "";
			input1.value = "";
			info.style.color = "lime";
			password.style.outline = "2px solid lime"
		} else{
			info.innerHTML = info.innerHTML + "Passwords do not match!\b";
			info.style.color = "red";
			password.style.outline = "2px solid red"
		}		
	}
}

function validateName(input){
	var pattern = new RegExp("^[^<>]+$");
	return pattern.test(input.value);
}

function validateEmail(input){
	var pattern = new RegExp("^[a-zA-Z0-9_]+@[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+$|^[a-zA-Z0-9_]+@[a-zA-Z0-9_]$");
	return pattern.test(input.value);
}

function validatePhone(input){
	var pattern = new RegExp("^[0-9]{10}$|^[0-9]{3}-[0-9]{3}-[0-9]{4}$");
	return pattern.test(input.value);
}

function validateZip(input){
	var pattern = new RegExp("^[0-9_]{5}$");
	return pattern.test(input.value);
}

function validatePassword(input0, input1){
	return (input0.value == input1.value);
}

function hidePassword(password){
	return password.replace(/./g, "&#8226");
}