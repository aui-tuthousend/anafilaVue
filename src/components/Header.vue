<script setup>
import '../assets/css/header.css';
import '../assets/css/style.css';
import ModalLogin from "@/components/modal/ModalLogin.vue";
import router from "@/router/index.js";
function openNav() {
  document.getElementById("sidebar").style.width = "250px";
}

function closeNav() {
  document.getElementById("sidebar").style.width = "0";
}

const token = localStorage.getItem('token');

const logout = async () => {
  try {
    const response = await axios.post(
        "https://api.annafilah.id/api/logout",
        {},
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
    );
    console.log('respons: ',response);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");

  } catch (error) {
    console.error("Error during logout:", error);
  }
};
</script>

<template>
  <header class="header">
    <div class="row">
      <img src="../images/png/logo_yayasan.png" width="58" height="58"  alt="logo yayasan">
      <div class="col hc1">
        <h2>Yayasan Annafilah</h2>
        <p>Berdaya Bersama</p>
      </div>
    </div>
    <div class="link row">
      <router-link to="/"><h4>Beranda</h4></router-link>
      <router-link to="/profile"><h4>Tentang Kami</h4></router-link>
      <router-link :to="{path: '/', hash: '#Program'}">Program</router-link>
      <router-link to="/read"><h4>Artikel</h4></router-link>
      <router-link to="/galeri"><h4>Galeri</h4></router-link>
      <router-link :to="{path: '/', hash: '#regis'}">Jadi Donatur</router-link>
        <ModalLogin/>
<!--      <router-link to="" v-if="token===null">-->
<!--      </router-link>-->
<!--      <router-link to="" v-else @click="logout">logout</router-link>-->
    </div>
  </header>

  <div class="sidebar" id="sidebar">
    <a href="javascript:void(0)" class="closebtn" @click="closeNav()">&times;</a>
    <router-link to="/"><h4>Beranda</h4></router-link>
    <router-link to="/profile"><h4>Tentang Kami</h4></router-link>
    <router-link :to="{path: '/', hash: '#Program'}">Program</router-link>
    <router-link to="/read"><h4>Artikel</h4></router-link>
    <router-link to="/galeri"><h4>Galeri</h4></router-link>
    <router-link :to="{path: '/', hash: '#regis'}">Jadi Donatur</router-link>
    <router-link to="" v-if="token===null">
      <ModalLogin/>
    </router-link>
    <router-link to="" v-else @click="logout">logout</router-link>
  </div>
  <span class="openbtn" @click="openNav()">&#9776; Menu</span>

  <a href="whatsapp://send?text=Hello&phone=+6281234344229" class="wa">
    <img src="../images/png/whatsapp.png" alt="" width="50" height="50">
  </a>
</template>

<style scoped>

</style>