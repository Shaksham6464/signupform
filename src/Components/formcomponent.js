import React from "react";

const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

class FormComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      emailAddress: "",
      phonenumber: "",
      country: "",
      countries: ["India", "USA", "Canada"],
      citiesByCountry: {
        India: ["Mumbai", "Delhi", "Bangalore"],
        USA: ["New York", "Los Angeles", "Chicago"],
        Canada: ["Toronto", "Vancouver", "Montreal"]
      },
      availableCities: [],
      city: "",
      PANnumber: "",
      Adharnumber: "",
      password: "",
      passwordConfirmation: "",
      showPassword: false,
      showConfirmPassword: false,
      firstNameError: "",
      lastNameError: "",
      emailAddressError: "",
      phonenumberError: "",
      countryError: "",
      cityError: "",
      PANnumberError: "",
      AdharnumberError: "",
      passwordError: "",
      passwordConfirmationError: "",
      isFormSubmitted: false
    };
  }

  handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    this.setState({
      country: selectedCountry,
      city: "",
      availableCities: this.state.citiesByCountry[selectedCountry] || []
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleBlur = (event) => {
    this.validateField(event.target.name);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const fields = [
      "firstName",
      "lastName",
      "emailAddress",
      "phonenumber",
      "country",
      "city",
      "PANnumber",
      "Adharnumber",
      "password",
      "passwordConfirmation"
    ];

    let isValid = true;
    fields.forEach(field => {
      isValid = this.validateField(field) && isValid;
    });

    this.setState({ isFormSubmitted: isValid });
  };

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword
    }));
  };

  toggleConfirmPasswordVisibility = () => {
    this.setState((prevState) => ({
      showConfirmPassword: !prevState.showConfirmPassword
    }));
  };

  validateField(name) {
    switch (name) {
      case "firstName":
        return this.validateFirstName();
      case "lastName":
        return this.validateLastName();
      case "emailAddress":
        return this.validateEmailAddress();
      case "phonenumber":
        return this.validatePhoneNumber();
      case "country":
        return this.validateCountry();
      case "city":
        return this.validateCity();
      case "PANnumber":
        return this.validatePANnumber();
      case "Adharnumber":
        return this.validateAdharnumber();
      case "password":
        return this.validatePassword();
      case "passwordConfirmation":
        return this.validatePasswordConfirmation();
      default:
        return false;
    }
  }

  validateFirstName() {
    const error = this.state.firstName.trim() === "" ? "First Name is required" : "";
    this.setState({ firstNameError: error });
    return error === "";
  }

  validateLastName() {
    const error = this.state.lastName.trim() === "" ? "Last Name is required" : "";
    this.setState({ lastNameError: error });
    return error === "";
  }

  validateEmailAddress() {
    const value = this.state.emailAddress.trim();
    let error = "";
    if (value === "") error = "Email Address is required";
    else if (!emailValidator.test(value)) error = "Email is not valid";
    this.setState({ emailAddressError: error });
    return error === "";
  }

  validatePhoneNumber() {
    const value = this.state.phonenumber.trim();
    let error = "";
    if (value === "") error = "Phone Number is required";
    else if (!/^\d{10}$/.test(value)) error = "Phone Number must be exactly 10 digits";
    this.setState({ phonenumberError: error });
    return error === "";
  }

  validateCountry() {
    const error = this.state.country.trim() === "" ? "Country is required" : "";
    this.setState({ countryError: error });
    return error === "";
  }

  validateCity() {
    const error = this.state.city.trim() === "" ? "City is required" : "";
    this.setState({ cityError: error });
    return error === "";
  }

  validatePANnumber() {
    const value = this.state.PANnumber.trim();
    let error = "";
    if (value === "") error = "PAN Number is required";
    else if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value.toUpperCase())) {
      error = "Invalid PAN format (e.g., ABCDE1234F)";
    }
    this.setState({ PANnumberError: error });
    return error === "";
  }

  validateAdharnumber() {
    const value = this.state.Adharnumber.trim();
    let error = "";
    if (value === "") error = "Aadhar Number is required";
    else if (!/^\d{12}$/.test(value)) error = "Aadhar must be exactly 12 digits";
    this.setState({ AdharnumberError: error });
    return error === "";
  }

  validatePassword() {
    const value = this.state.password.trim();
    let error = "";
    if (value === "") error = "Password is required";
    else if (!passwordValidator.test(value)) {
      error =
        "Password must contain at least 8 characters, including 1 number, 1 uppercase and 1 lowercase letter.";
    }
    this.setState({ passwordError: error });
    return error === "";
  }

  validatePasswordConfirmation() {
    let error = "";
    if (this.state.password !== this.state.passwordConfirmation) {
      error = "Password does not match Confirmation";
    }
    this.setState({ passwordConfirmationError: error });
    return error === "";
  }

  render() {
    return (
      <div className="main">
        <h3>SignUp Form</h3>
        {this.state.isFormSubmitted ? (
          <div className="details">
            <h3 className="head">Thanks for signing up, find your details below:</h3>
            <div>First Name: {this.state.firstName}</div>
            <div>Last Name: {this.state.lastName}</div>
            <div>Email Address: {this.state.emailAddress}</div>
            <div>Phone Number: {this.state.phonenumber}</div>
            <div>Country: {this.state.country}</div>
            <div>City: {this.state.city}</div>
            <div>PAN Number: {this.state.PANnumber}</div>
            <div>Aadhar Number: {this.state.Adharnumber}</div>
          </div>
        ) : (
          <form onSubmit={this.handleSubmit} style={{ textAlign: "left" }}>
            {[
              { label: "First Name", name: "firstName", type: "text" },
              { label: "Last Name", name: "lastName", type: "text" },
              { label: "Email Address", name: "emailAddress", type: "email" },
              { label: "Phone Number", name: "phonenumber", type: "text" },
              { label: "PAN Number", name: "PANnumber", type: "text" },
              { label: "Aadhar Number", name: "Adharnumber", type: "text" },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label>{label}</label><br />
                <input
                  type={type}
                  placeholder={label}
                  name={name}
                  value={this.state[name]}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                {this.state[`${name}Error`] && (
                  <div className="errorMsg" style={{ color: "red" }}>
                    {this.state[`${name}Error`]}
                  </div>
                )}
                <br />
              </div>
            ))}

            <label>Password</label><br />
            <input
              type={this.state.showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
            <button type="button" onClick={this.togglePasswordVisibility}>
              {this.state.showPassword ? "Hide" : "Show"}
            </button>
            {this.state.passwordError && (
              <div className="errorMsg" style={{ color: "red" }}>
                {this.state.passwordError}
              </div>
            )}
            <br />

            <label>Confirm Password</label><br />
            <input
              type={this.state.showConfirmPassword ? "text" : "password"}
              name="passwordConfirmation"
              placeholder="Confirm Password"
              value={this.state.passwordConfirmation}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
            <button type="button" onClick={this.toggleConfirmPasswordVisibility}>
              {this.state.showConfirmPassword ? "Hide" : "Show"}
            </button>
            {this.state.passwordConfirmationError && (
              <div className="errorMsg" style={{ color: "red" }}>
                {this.state.passwordConfirmationError}
              </div>
            )}
            <br />

            <label>Country</label><br />
            <select id="country"
              name="country"
              value={this.state.country}
              onChange={this.handleCountryChange}
              onBlur={this.handleBlur}
            >
              <option value="">Select Country</option>
              {this.state.countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {this.state.countryError && (
              <div className="errorMsg" style={{ color: "red" }}>
                {this.state.countryError}
              </div>
            )}
            <br />

            <label>City</label><br />
            <select id="city"
              name="city"
              value={this.state.city}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            >
              <option value="">Select City</option>
              {this.state.availableCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {this.state.cityError && (
              <div className="errorMsg" style={{ color: "red" }}>
                {this.state.cityError}
              </div>
            )}
            <br /><br />

            <button id="submit" type="submit">Sign Up</button>
          </form>
        )}
      </div>
    );
  }
}

export default FormComponent;
