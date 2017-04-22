<?php
	// Only process POST reqeusts.
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		// Get the form fields and remove whitespace.
		$name = strip_tags(trim($_POST["name"]));
		$name = str_replace(array("\r","\n"),array(" "," "),$name);
		$email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
		$subject = trim($_POST["subject"]);
		$message = trim($_POST["message"]);

		// Check that data was sent to the mailer.
		if ( empty($name) || empty($message)) {
			// Set a 400 (bad request) response code and exit.
			header("HTTP/1.1 400 Bad Request");
			echo "Oops! There was a problem with your submission. Please complete the form and try again.";
			exit;
		}

		// Set the recipient email address.
		$recipient = "alving.nyc@gmail.com";
		
		// Build the email content.
		$email_content = "Name: $name\n";
		$email_content .= "Email: $email\n\n";
		$email_content .= "Message:\n$message\n";
		
		// Build the email headers.
		$email_headers = "From: $name <$email>";

		// Send the email.
		if (mail($recipient, $subject, $email_content, $email_headers)) {
			// Set a 200 (okay) response code.
			header("HTTP/1.1 200 OK");
			echo "Thank You! Your message has been sent.";
		} else {
			// Set a 500 (internal server error) response code.
			header("HTTP/1.1 500 Internal Server Error");
			echo "Oops! Something went wrong and we couldn't send your message.";
		}

	} else {
		// Not a POST request, set a 403 (forbidden) response code.
		header("HTTP/1.1 403 Forbidden");
		echo "There was a problem with your submission, please try again.";
	}

?>