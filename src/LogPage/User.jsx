class User {
    constructor(username, password) {
      this.username = username;
      this.password = password;
    }
  
    async login() {
      try {
        const response = await axios.post(
          "https://csit-314-cinema-booking-system.vercel.app/login/",
          {
            username: this.username,
            password: this.password,
          }
        );
  
        if (response.status === 200) {
          // Login successful
          return true;
        } else {
          // Login failed
          return false;
        }
      } catch (error) {
        // Login failed
        return false;
      }
    }
  
    validate() {
      const errors = {};
  
      if (!this.username) {
        errors.username = "Username is required";
      }
  
      if (!this.password) {
        errors.password = "Password is required";
      }
  
      return errors;
    }
  }
  