<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <div v-for="item in stddata " :key="item.id">
            <label>Name</label>
            <b-input type="text" v-model="item.stdID"></b-input>
            <label>SurName</label>
            <b-input type="text"></b-input>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      stddata: {},
    };
  },

  mounted() {
    axios
      .get("http://localhost:3001/dash/dataid/:id")
      .then((res) => {
        console.log(res.data);
        this.stddata = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style>
</style>