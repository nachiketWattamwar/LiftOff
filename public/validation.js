function validateSignUp()								 
{ 
	var name = document.forms["SignUp"]["name"];			 
	var email = document.forms["SignUp"]["email"]; 
	var phone = document.forms["SignUp"]["phone"];
	var password = document.forms["SignUp"]["password"]; 
    var phoneRegex = /^\d{10}$/;
	if (name.value == "")								 
	{ 
		window.alert("The name field cannot be blank"); 
		name.focus(); 
		return false; 
	}
	
	if (email.value == "")								 
	{ 
		window.alert("The email field cannot be blank"); 
		email.focus(); 
		return false; 
	} 

	if (email.value.indexOf("@", 0) < 0)				 
	{ 
		window.alert("Please enter a valid e-mail address"); 
		email.focus(); 
		return false; 
	} 

	if (email.value.indexOf(".", 0) < 0)				 
	{ 
		window.alert("Please enter a valid e-mail address."); 
		email.focus(); 
		return false; 
	} 

	if (phone.value == "")						 
	{ 
		window.alert("The Phone field cannot be blank"); 
		phone.focus(); 
		return false; 
    }
    if(!phoneRegex.test(phone.value))
    {
        window.alert("Phone number is invalid"); 
		phone.focus(); 
		return false; 
    }

	if (password.value == "")					 
	{ 
		window.alert("The Password field cannot be blank"); 
		password.focus(); 
		return false; 
	} 

	return true; 
}

function validateLogin()								 
{ 		 
	var email = document.forms["LoginForm"]["email"];
	var password = document.forms["LoginForm"]["password"];
	
	if (email.value == "")								 
	{ 
		window.alert("The email field cannot be blank"); 
		email.focus(); 
		return false; 
	} 

	if (email.value.indexOf("@", 0) < 0)				 
	{ 
		window.alert("Please enter a valid e-mail address"); 
		email.focus(); 
		return false; 
	} 

	if (email.value.indexOf(".", 0) < 0)				 
	{ 
		window.alert("Please enter a valid e-mail address."); 
		email.focus(); 
		return false; 
	} 

	if (password.value == "")					 
	{ 
		window.alert("The Password field cannot be blank"); 
		password.focus(); 
		return false; 
	} 

	return true; 
}