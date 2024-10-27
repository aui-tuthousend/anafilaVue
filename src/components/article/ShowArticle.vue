<script setup>
import '../../assets/css/viewartikel.css';
import '../../assets/css/style.css';
import '../../assets/css/template.css';
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

function handleRoute(slug) {
  router.push({ name: 'ShowArticle', params: { slug } });
}

const slug = ref(route.params.slug);
const artikel = ref(null);
const artikels = ref([]);
const loading = ref(false);

async function fetchArticle(slugValue) {
  loading.value = true;
  try {
    // Fetch individual article
    let response = await fetch(`https://api.annafilah.id/api/showArticle/${slugValue}`);
    const data = await response.json();
    data.image_url = `https://api.annafilah.id${data.image_path}`;
    artikel.value = data;

    // Fetch other articles
    const response2 = await fetch(`https://api.annafilah.id/api/getArticles`);
    const artikelsData = await response2.json();
    artikels.value = artikelsData.map(art => ({
      ...art,
      image_url: `https://api.annafilah.id${art.image_path}`
    }));
  } catch (error) {
    console.error('Error fetching article or articles:', error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchArticle(slug.value);
});

// Watch for changes in the slug parameter to refetch data
watch(() => route.params.slug, (newSlug) => {
  slug.value = newSlug;
  fetchArticle(newSlug);
});
</script>

<template>
<!--  <div v-if="loading">Loading...</div>-->
  <div class="A1" v-if="artikel">
    <div class="A1-1">
      <p>{{ artikel.category }}</p>
      <h1 class="tit">{{ artikel.title }}</h1>
      <br />
      <img class="img gmbar" :src="artikel.image_url" alt="Article Image">
      <p>{{ new Date(artikel.created_at).toLocaleString('en-CA', { hour12: false }) }}</p>
      <p v-html="artikel.description" class="txt2"></p>
    </div>
    <div class="A1-2">
      <h1>Artikel Lain Kami</h1>
      <div class="scroll-side">
        <div v-for="p in artikels.slice().reverse()" :key="p.slug" class="card">
          <img :src="p.image_url" alt="" class="img pic" @click="handleRoute(p.slug)" />
          <p>{{ p.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
