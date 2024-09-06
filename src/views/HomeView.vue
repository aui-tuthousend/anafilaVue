<script setup>
import Home from "@/components/Home.vue";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import {onMounted, ref} from "vue";
document.title = "Yayasan Annafilah"

const arti = ref([])
const posts = ref([])
const prog = ref([])
onMounted(async () => {
  try{
    const response = await axios.get(`https://api.annafilah.id/api/getLatestArticle`);
    arti.value = response.data.map(art => {
      return {
        ...art,
        image_url: `https://api.annafilah.id${art.image_path}`
      };
    });
    // console.log(arti.value)
  } catch (error){
    console.error('Error fetching article:', error);
  }

  try{
    const response = await axios.get(`https://api.annafilah.id/api/getProgram`);
    prog.value = response.data.map(art => {
      return {
        ...art,
        image_url: `https://api.annafilah.id${art.image_path}`
      };
    });
    // console.log(prog.value)
  } catch (error){
    console.error('Error fetching article:', error);
  }

  try {
    const response = await axios.get(`https://api.annafilah.id/api/getLatestPost`);

    response.data.forEach(post => {
      let imagePaths = post.image_paths;
      imagePaths = JSON.parse(imagePaths);

      if (Array.isArray(imagePaths)) {
        post.image_urls = imagePaths.map(path => `https://api.annafilah.id${path}`);
      } else {
        post.image_urls = [`https://api.annafilah.id${imagePaths}`];
      }
    });

    posts.value = response.data;
    // console.log(posts.value);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }

});

</script>

<template>
  <main>
    <Header/>
    <Home :arti="arti" :prog="prog" :posts="posts"/>
    <Footer/>
  </main>
</template>
