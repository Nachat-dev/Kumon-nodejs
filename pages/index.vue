<template>
  <div class="container">
    <div class="inside-container">
      <b-img src="..\assets\logo.png" fluid alt="Fluid image"></b-img>
      <hr/>
      <h4 class="">Login system for admin and insrtuctor</h4>

      <form @submit="onSubmit">
        <div>
          <label style="float: left; margin-top:30px;">Username</label>
          <b-form-input name="username" placeholder="username"></b-form-input>
          <div class="mt-2"></div>
        </div>
        <div>
          <label style="float: left">Password</label>
          <b-form-input type="password" name="password" placeholder="password"></b-form-input>
          <div class="mt-2"></div>
        </div>
        <div>
          <b-button
            type="submit"
            variant="outline-primary"
            style="width: 100%; border-radius: 20px; margin-top: 20px"
            >Login</b-button
          >
        </div>
      </form>


    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  methods: {
    onSubmit: function (event) {
      event.preventDefault();
      const username = document.getElementsByName("username")[0];
      const password = document.getElementsByName("password")[0];
      console.log(username.value, password.value);
      axios
        .post("http://localhost:3001/auth/login", {
          username: username.value,
          password: password.value,
        })
        .then((response) => {
          console.log(response.data);
        });
    },
  },
};
</script>

<style>
body {
  background-image: url("assets/bgblue.png");
}

@media only screen and (max-width: 1024px) {
  div#__layout {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
  .container {
    padding-left: 20px;
    padding-right: 20px;
  }
  .inside-container {
    width: 85% !important;
  }
}

.inside-container {
  width: 55%;
  margin-bottom: 50px;
  margin-top: 50px;
}
div#__layout {
  padding-left: 350px;
  padding-right: 350px;
}
.container {
  margin-top: 100px !important;
  border-radius: 16px;
  background-color: white;
  margin: 0 auto;
  height: max-content;
  /*min-height: 100vh;*/
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
