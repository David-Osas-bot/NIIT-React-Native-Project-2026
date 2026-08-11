const handleSignup = async () => {
  if (!isValidEmail(email)) {
    setError("Enter a valid email address");
    return;
  }

  if (!isValidPassword(password)) {
    setError(
      "Password must be at least 8 characters, with a letter and a number"
    );
    return;
  }

  if (confirmPassword !== password) {
    setError("Passwords don't match");
    return;
  }

  setError("");
  setSubmitting(true);

  try {
    await register(name, email, password, role);

    switch (role) {
      case "customer":
        navigation.replace("CustomerLogin");
        break;

      case "driver":
        navigation.replace("DriverLogin");
        break;

      case "chef":
        navigation.replace("ChefLogin");
        break;

      default:
        setError("Please select a valid role.");
    }
  } catch (err) {
    setError(err.message);
  } finally {
    setSubmitting(false);
  }
};