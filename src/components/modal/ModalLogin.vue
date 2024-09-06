<script setup>
import {ref, watch} from "vue";
import {onClickOutside, useMagicKeys} from "@vueuse/core";
import router from "@/router/index.js";
const {escape} = useMagicKeys()


const isModal = ref(false);
const modal = ref(null);

const selectedFiles = ref([]);

const email = ref('');
const password = ref('');

const handleFileChange = (event) => {
  selectedFiles.value = event.target.files;
};

watch(escape, (v) =>{
  if (v){
    isModal.value = false;
  }
})

onClickOutside(modal, () => (isModal.value=false));

const login = async () => {
  const formData = new FormData();

  formData.append('email', email.value)
  formData.append('password', password.value)

  try {
    const response = await axios.post("https://api.annafilah.id/api/login", formData);
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('user', response.data.user)
    console.log(response.data);
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    isModal.value = false;
    await router.push('/')
  } catch (error) {
    console.error("Login gagal", error.response.data);
  }
}
</script>

<template>
  <h4 @click="isModal = true">Login</h4>

  <Teleport to="#modal">
    <Transition name="modal">
      <div class="modal-bg" v-if="isModal">
        <div class="modal" ref="modal">
          <button @click="isModal = false" class="close-btn">x</button>

          <div class="col">
            <label for="">Email</label>
            <input type="email" v-model="email" class="txt" placeholder="Email anda">
          </div>

          <div class="col">
            <label for="">Password</label>
            <input type="password" v-model="password" class="txt" placeholder="Password">
          </div>
          <br>

          <button class="but" @click="login">
            <h4>Submit</h4>
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-bg{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal{
  position: relative;
//margin-bottom: 10rem;
  background: #FFF;
  padding: 32px;
  border-radius: 1rem;
  box-shadow: 0 10px 5px 2px rgba(0,0,0,0.1);

  .close-btn{
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
  }
}

.modal-enter-active,
.modal-leave-active{
  transition: all 0.25s ease;
}

.modal-enter-from,
.modal-leave-to{
  opacity: 0;
  transform: scale(1.1);
}

</style>