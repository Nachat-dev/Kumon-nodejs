<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="info"
      fixed="top"
      style="background-color: lightskyblue !important; position: sticky"
    >
      <b-navbar-brand href="#">
        <b-img
          src="~@/assets/logokumon.png"
          fluid
          alt="Fluid image"
          style="width: 120px; margin-left: 50px"
        ></b-img>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
     

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container class="bv-example-row" fluid="sm">
      <b-row style="width: 100%">
        <b-col sm="4">
          <div>
             <b-card style="background-color:white; border-radius:16px; margin-top:50px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 2px 20px 0 rgba(0, 0, 0, 0.1); border:none"> 
              
              <center>
                <h5 style="text-align: left;">ค้นหาข้อมูลนักเรียน / Search</h5>
                <hr style="background-color:lightskyblue; height:2px; border-radius:20px"/>
              </center>
              <label style="float: left">ชื่อ-นามสกุล / Name-Surname</label>
              <b-form-input
                name="searchnameEN"
                type="text"
                v-model="search"
                placeholder="Search by All" style="border-radius:20px; height:30px; background-color:#F7F7F7 ; border:none"
              ></b-form-input>
               
            </b-card>
          </div>
          <div>
              <b-card style="background-color:white; border-radius:16px; margin-top:15px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 2px 20px 0 rgba(0, 0, 0, 0.1); border:none"> 
              <b-row>
                <b-col sm="8">
                <p>จำนวนนักเรียนที่ได้รับรางวัล</p>
                </b-col>
                <b-col  sm="4">
                   <b-input style="pointer-events: none; color:white; font-weight:600; font-size:16px; text-align:center; background-color:#7DCDF4; border-radius:20px ; border:none" 
                   v-model = this.stdstatus0.length readonly>  </b-input>
                </b-col>
              </b-row>
             <b-row>
                <b-col  sm="8">
                 <p>จำนวนนักเรียนที่ยืนยันแล้ว</p>
                </b-col>
                <b-col  sm="4">
                   <b-input style="pointer-events: none; color:white; font-weight:600; font-size:16px; text-align:center; background-color:#04BE12; border-radius:20px ; border:none" 
                   v-model = this.stdstatus.length readonly>  </b-input>
                </b-col>
              </b-row>
               <b-row>
                <b-col  sm="8">
                 <p>จำนวนนักเรียนที่รอการยัน</p>
                </b-col>
                <b-col  sm="4">
                 <b-input style="pointer-events: none; color:white; font-weight:600; font-size:16px; text-align:center;background-color:#FF0000; border-radius:20px ; border:none" 
                 v-model = this.stdstatus2.length readonly>  </b-input>
                </b-col>
              </b-row>
                <b-row>
                <b-col  sm="8">
                 <p>แก้ไขโดย Admin</p>
                </b-col>
                <b-col  sm="4">
                 <b-input style="pointer-events: none; color:white; font-weight:600; font-size:16px; text-align:center; background-color:#FF5ADF; border-radius:20px ; border:none" 
                 v-model = this.stdstatus3.length readonly>  </b-input>
                </b-col>
              </b-row>
            </b-card>
          </div>
          <div>
            <b-card style="background-color:lightskyblue; border-radius:16px; margin-top:15px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 2px 20px 0 rgba(0, 0, 0, 0.1); border:none"> 
            <b-row style="padding-left:20px; padding-right:20px">
              <p style="color:white">สำหรับนักเรียนที่รอการยืนยันท่าน Instructor สามารถแนะนำผู้ปกครองให้ตรวจสอบ SMS จากบริษัทฯ</p>
            </b-row>
            </b-card>
          </div>
        </b-col>

        <b-col sm="8">
          <div>
               <b-card style="background-color:white; border-radius:16px; margin-top:50px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 2px 20px 0 rgba(0, 0, 0, 0.1); border:none"> 

              <h5 style="float: left">
                รายชื่อนักเรียนทั้งหมด / Students
              </h5><br>
              <hr style="background-color:lightskyblue; height:2px; border-radius:20px"/>
             
               <b-container id="carddata" class="bv-example-row" fluid="sm" v-for="item in lists " :key="item.id"  >

               <form @submit="senddata">
                 <b-row > 
                  <b-col sm="2" style=" display:flex; justify-content: center; align-items: center;"> 
                    <div>
                      <b-img v-if= "item.stdimage != null || item.stdimage !='' " v-bind:src="'_nuxt/assets/uploadimg/' + item.stdimage" onerror="this.style.display='none'"></b-img>
                      <b-img v-if= "item.stdimage == null || item.stdimage == ''" src="~@/assets/logo.png"  fluid alt="image2"></b-img>
                    </div>
                  </b-col >
                  <b-col sm="8" style="text-align:lefts ;" >
                   
                    <b-row> 
                     <b-form-input id="dataid" placeholder="dataid" v-model="item.id" hidden></b-form-input>
                      <b-col sm="5">
                        <p>เลขประจำตัวนักเรียน: </p> 
                      </b-col>
                      <b-col sm="7">
                        <p>{{item.stdID}}</p> 
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col sm="5"> 
                        <p>ชื่อ-นามสกุล: </p> 
                      </b-col>
                      <b-col sm="7"> 
                        <p>{{ item.stdNameTH}} {{ item.surnameTH}}</p>
                      </b-col>
                    </b-row>
                     <b-row>
                        <b-col sm="5"> 
                        <p>Name-Surname:</p>
                      </b-col>
                      <b-col sm="7">  
                        <p>{{ item.stdNameEN }} {{ item.surnameEN }}</p>
                      </b-col>
                    </b-row>
                     <b-row>
                        <b-col sm="5"> 
                        <p>สถานะ:</p>
                      </b-col>
                      <b-col sm="7"> 
                        <p><span v-if=  "item.policystatus	== 1" style="color:#00d93a;"> ยืนยันแล้ว</span>
                    <span v-if=  "item.policystatus	!= 1" style="color:#ff0026;"> รอการยืนยัน</span></p>
                      </b-col>
                    </b-row>
                  </b-col> 
                
                  <!-- v-bind:href="'/editdata/'+ item.id"-->
                  <b-col sm="2">
                  <b-button type="submit" v-bind:href="'http://localhost:3001/dash/dataid/'+ item.id" variant="outline-primary" style="color:#7DCDF4; border-color:#7DCDF4; border-radius:20px">ดูรายละเอียด</b-button> 
                  </b-col> 
                  </b-row>
                  </form>
                <hr />
               </b-container>
               <b-row>
                 <b-col> 
                   <p style="font-weight:400; font-size:12px; margin-left:20px">Show {{this.lists.length}} of {{this.filteredList.length}}</p>
                 </b-col>
                  <b-col>
                  <b-pagination style="font-size:12px"
               v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              align="right"
               aria-controls="carddata"
              ></b-pagination>
                  </b-col>
               </b-row>
              
            </b-card>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "getstddata",
  data() {
    return {
      perPage: 8,
      currentPage: 1,
      search: "",
      search2: "",
      stddata: [],
      stdstatus0: [],
      stdstatus: [],
      stdstatus2: [], 
      stdstatus3: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost:3001/dash/std")
      .then((res) => {
        console.log(res.data);
        this.stddata = res.data;
      })
      .catch((error) => {
        console.log(error);
      }); 
      
      axios
      .get("http://localhost:3001/dash/stdstatus")
      .then((res) => {
        console.log(res.data);
        this.stdstatus = res.data;
      })
      .catch((error) => {
        console.log(error);
      });

        axios
      .get("http://localhost:3001/dash/stdstatus2")
      .then((res) => {
        console.log(res.data);
        this.stdstatus2 = res.data;
      })
      .catch((error) => {
        console.log(error);
      });

        axios
      .get("http://localhost:3001/dash/stdstatus3")
      .then((res) => {
        console.log(res.data);
        this.stdstatus3 = res.data;
      })
      .catch((error) => {
        console.log(error);
      });

        axios
      .get("http://localhost:3001/dash/stdstatus0")
      .then((res) => {
        console.log(res.data);
        this.stdstatus0 = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

 
  computed: {

      lists () {
      const itempage = this.filteredList
      // Return just page of items needed
      return itempage.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      )
    },

   filteredList() {
     return this.stddata.filter((item) => {
       return (
        
         item.stdNameEN.toLowerCase().includes(this.search.toLowerCase()) ||
         item.stdNameTH.toLowerCase().includes(this.search.toLowerCase()) ||
         item.stdID.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },

     rows(){
     return this.stddata.length
  }
  },
  methods:{
    
    senddata: function (event) {
      event.preventDefault();
      const dataid =  document.getElementById("dataid").value;
      
      console.log(dataid.value);
      axios
        .post("http://localhost:3001/dash/dataid", {
          dataid: dataid.value,
         
        })
        .then((response) => {
          console.log(response.data);
        });
    },
    sendInfo(item) {
        this.selectedUser = item;
    },
  },
 
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');
html { 
  
  background: url("assets/bgwhite.png") no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-attachment: fixed;
}
body {
    background: transparent;
}

p,h1,h2,h3,h4,h5,h6,span,div,img {
  font-family: 'kanit'!important;
}

.container {
  margin: 0 auto;
  min-height: 100vh;
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
