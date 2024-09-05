<script setup>
import '../assets/css/home.css';
import '../assets/css/style.css';
import '../assets/css/template.css';
import {onMounted, ref} from "vue";

const scrollContainer = ref(null)

const scrollLeft = () => {
  scrollContainer.value.scrollLeft -= scrollContainer.value.clientWidth
}

const scrollRight = () => {
  scrollContainer.value.scrollLeft += scrollContainer.value.clientWidth
}
const user = localStorage.getItem('token');
const arti = ref([])
const posts = ref([])
const prog = ref([])
console.log(user)

onMounted(async () => {
  try{
    const response = await axios.get(`http://127.0.0.1:8000/api/getLatestArticle`);
    arti.value = response.data.map(art => {
      return {
        ...art,
        image_url: `http://127.0.0.1:8000${art.image_path}`
      };
    });
    console.log(arti.value)
  } catch (error){
    console.error('Error fetching article:', error);
  }

  try{
    const response = await axios.get(`http://127.0.0.1:8000/api/getProgram`);
    prog.value = response.data.map(art => {
      return {
        ...art,
        image_url: `http://127.0.0.1:8000${art.image_path}`
      };
    });
    console.log(prog.value)
  } catch (error){
    console.error('Error fetching article:', error);
  }

  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/getLatestPost`);

    response.data.forEach(post => {
      let imagePaths = post.image_paths;
      imagePaths = JSON.parse(imagePaths);

      if (Array.isArray(imagePaths)) {
        post.image_urls = imagePaths.map(path => `http://127.0.0.1:8000${path}`);
      } else {
        post.image_urls = [`http://127.0.0.1:8000${imagePaths}`];
      }
    });

    posts.value = response.data;
    console.log(posts.value);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }

});

</script>

<template>
  <p>{{user}}</p>
  <div class="c1 row-sb">
    <div class="col c1-1">
      <h1>Mari bersama membantu mereka meraih cita-cita!</h1>
      <p>“Sesungguhnya Allah mengangkat dengan kitab Al-Qur’an ini beberapa kaum dan juga dengan kitab Al-Qur’an ini Allah merendahkan yang lainnya.”
        <br>(HR. Muslim)
      </p>
      <router-link to="/profile">
        <button class="but">
          <h4>Tentang Kami</h4>
        </button>
      </router-link>
      <div class="c1-2 row">
        <div class="row-c">
          <img src="../images/png/brain.png" width="40" height="40">
          <h4>Cerdas</h4>
        </div>
        <div class="row-c">
          <img src="../images/png/donation.png" width="40" height="40">
          <h4>Mulia</h4>
        </div>
        <div class="row-c">
          <img src="../images/png/teamwork.png" width="40" height="40">
          <h4>Berdaya <br>Guna</h4>
        </div>
      </div>
    </div>
    <div>
      <img src="../images/binaan.png" alt="binaan annafilah" class="g1">
    </div>
  </div>

  <!--                   c2222222222222222                          -->

  <div class="c2 row-sb">
    <h1>Latar Belakang</h1>
    <h3>Salah satu upaya pendampingan yang dilakukan Yayasan Annafilah terhadap anak-anak binaan adalah dengan mengarahkan mereka untuk mempelajari dan menghafal Al Qur’an, mengingat banyak sekali keberkahan di dalamnya. Sebagian besar binaan mengenyam pendidikan di pondok pesantren tahfidz dan lainnya di sekolah swasta Islam. Khusus anak-anak yang tidak mengenyam pendidikan di pesantren, maka wajib bagi mereka untuk mengikuti kelas tahfidz di Rumah Tahfidz Annafilah, sehingga meskipun tidak di pesantren, anak-anak tetap bisa menghafal Al Qur’an dengan bimbingan asatidzah yang juga seorang hafidzah.</h3>
  </div>

  <!--                c3333333333333333333333333 -->
  <div class="c3 col" id="Program">
    <h1>Program</h1>
    <p>Untuk mencapai visi misi dakwah organisasi, kami membagi dalam beberapa program yang bersifat rutin dan insidentil. Fokus program merupakan peningkatan kemampuan baca Al Qur'an, pendidikan, kesehatan, dan pemberdayaan di bidang ekonomi.</p>
    <div class="row-sb-c">
      <button @click="scrollLeft" class="scroll-btn left-btn">&larr;</button>
      <div class="c3-1" ref="scrollContainer">

        <div class="block col" v-for="p in prog">
          <div class="coverr">
            <img :src="p.image_url" alt="" class="img program">
          </div>
          <h1 style="width: 230px;">{{p.title}}</h1>
          <p>{{p.description}}</p>
        </div>

      </div>
      <button @click="scrollRight" class="scroll-btn right-btn">&rarr;</button>
    </div>
  </div>


  <!--            c4444444444     -->

  <div class="ce4 col-c">
    <h3>JUMLAH BINAAN</h3>
    <br>
    <div class="c4-1 row-sb-c">
      <div class="prog col-c">
        <h4>TK</h4>
        <p>8 anak</p>
      </div>
      <div class="prog col-c">
        <h4>SD</h4>
        <p>16 anak</p>
      </div>
      <div class="prog col-c">
        <h4>SMP</h4>
        <p>7 Siswa</p>
      </div>
      <div class="prog col-c">
        <h4>SMA</h4>
        <p>15 Siswa</p>
      </div>
    </div>
  </div>

  <!--    c5555555555555555555555     -->
  <div class="c5">
    <div class="c5-1 col">
      <h1>Mitra Kebaikan</h1>
      <p>Alhamdulillah beberapa lembaga negeri maupun swasta telah menjadi mitra kami dalam mejalankan visi misi dakwah ini, selanjutnya dengan senang hati kami tunggu partisipasi lembaga Bapak/Ibu! </p>
      <div class="mitra">
        <img src="../images/mitra/amanda.png" alt="" class="pt">
        <img src="../images/mitra/images.jpeg" alt="" class="pt">
        <img src="../images/mitra/lmi.png" alt="" class="pt">
        <img src="../images/mitra/salimah.jpeg" alt="" class="pt">
        <img src="../images/mitra/nh.jpg" alt="" class="pt">
        <img src="../images/mitra/ym.png" alt="" class="pt">
        <img src="../images/mitra/ydsf.png" alt="" class="pt">
        <img src="../images/mitra/mig.png" alt="" class="pt">
      </div>
    </div>
  </div>

<!--  kegiataaaaann -->

  <div class="c3 col" id="Program">
    <h1>Kegiatan Terbaru Kami</h1>
    <p>Alhamdulillah telah terlaksana berbagai kegiatan keagamaan maupun sosial sebagai wujud bukti amanah kami</p>
    <div class="row-sb-c">
      <button @click="scrollLeft" class="scroll-btn left-btn">&larr;</button>
      <div class="c3-1" ref="scrollContainer">

        <div class="block col" v-for="p in posts">
          <router-link :to="{name: 'ShowGaleri', params: { slug: p.slug }}" class="no-hover">
            <div class="coverr">
              <img v-for="(url, index) in p.image_urls.slice(0,1)" :key="index" class="img program" :src="url">
            </div>
            <h3 style="width: 230px; font-weight: bold;">{{p.title}}</h3>
            <p>{{p.description.substring(0,59)+"..."}}</p>
          </router-link>
        </div>

      </div>
      <button @click="scrollRight" class="scroll-btn right-btn">&rarr;</button>
    </div>
  </div>

  <!--c 666666666666666666-->
  <div class="c6 col">
    <h1>Testimoni Donatur</h1>
    <div class="testi row-sb">
      <div class="moni col">
        <p>"Saya telah menjadi donatur di yayasan ini selama beberapa tahun, dan saya selalu kagum dengan upaya mereka dalam membantu Masyarakat. Mereka selalu memberikan laporan yang jelas tentang penggunaan dana, dan itu membuat saya semakin yakin untuk terus mendukung mereka."</p>
        <div class="row-sb">
          <img src="../images/png/tes1.png" alt="" class="ptt">
          <h4>Hamba<br> Allah</h4>
        </div>
      </div>

      <div class="moni col">
        <p>"Yayasan ini benar-benar mengubah hidup banyak orang. Saya merasa bangga bisa menjadi bagian dari perubahan positif ini. Melihat langsung dampak bantuan yang saya berikan sangat mengharukan."</p>
        <div class="row-sb">
          <img src="../images/png/tes2.png" alt="" class="ptt">
          <h4>Bu Ita, <br>Ibunda dian</h4>
        </div>
      </div>

      <div class="moni col">
        <p>"Menyumbang ke yayasan ini adalah salah satu keputusan terbaik yang pernah saya buat. Melalui program-program mereka, saya bisa melihat bagaimana bantuan kecil saya bisa membawa senyuman dan harapan bagi mereka yang membutuhkan."</p>
        <div class="row-sb">
          <img src="../images/png/tes3.png" alt="" class="ptt">
          <h4>Bu Nanik, <br>Ibunda Hani</h4>
        </div>
      </div>

    </div>
  </div>

  <!--c7777777777777777777777-->
  <div class="c7 col-c">
    <h1>Alamat: <br> Pagesangan Town House, Pagesangan 2A Jambangan <br> Surabaya <br> <br>

      SK Kemenkumham : AHU-AH.01.06-0008862 <br>
      BSI 7057905209 <br>
      BCA 4299921414 <br>
      Mandiri 1420011461471 <br>
      an Yayasan Annafilah</h1>
    <!--        <img src="img/guru.png" alt="" class="img" width="540">-->
  </div>

  <!--    c 88888888888888888-->
  <div class="c8" id="regis">
    <div class="col-c">
      <h1>Pendaftaran Donatur</h1>
      <br>
      <p>"Sedekah itu dapat memadamkan kesalahan, sebagaimana sebongkah es yang meleleh di atas batu karang” <br>(HR. Ibnu Hibban No. 5567. Hadis sahih)</p>
    </div>
    <div class="form col">
      <div class="col">
        <label for="">Nama</label>
        <input type="text" class="txt" name="nama" placeholder="Nama anda">
      </div>

      <div class="col">
        <label for="">Nomor Telpon</label>
        <input type="number" class="txt" name="nomor" placeholder="Nomor anda">
      </div>

      <div class="col">
        <label for="">Email</label>
        <input type="email" class="txt" name="email" placeholder="Email anda">
      </div>

      <div class="row-sb sign">
        <div class="col" style="width: 100%;">
          <label for="form1">Pesan</label>
          <textarea id="form1" name="pesan" class="txt-f"></textarea>
        </div>
        <button type="submit" class="but">
          <h4>Daftar</h4>
        </button>
      </div>
    </div>
  </div>

  <div class="c3 col" id="Program">
    <h1 style="text-align:center; margin-bottom: 2rem;">Jangan Lewatkan Artikel Kami</h1>
    <div class="row-sb-c">
      <button @click="scrollLeft" class="scroll-btn left-btn">&larr;</button>
      <div class="c3-1" ref="scrollContainer">

        <div class="block col" v-for="a in arti">
          <router-link :to="{name: 'ShowArticle', params: { slug: a.slug }}" class="no-hover">
            <div class="coverr">
              <img :src="a.image_url" :alt="a.image_desc" class="img program">
            </div>
            <p >{{a.category}}</p>
            <h3 style="width: 230px; font-weight: bold;">{{a.title}}</h3>
            <p>{{a.description.substring(0,30)+"..."}}</p>
          </router-link>
        </div>

      </div>
      <button @click="scrollRight" class="scroll-btn right-btn">&rarr;</button>
    </div>
  </div>
</template>

<style scoped>

</style>