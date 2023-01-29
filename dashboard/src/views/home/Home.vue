<template>
  <custom-header @create-account="handleAccountCreate" @login="handleLogin" />
  <contact />
  <div class="flex justify-center py-10 bg-brand-gray">
    <p class="font-medium text-center text-gray-800">feedback @ 2023</p>
  </div>
</template>

<script>
import CustomHeader from './CustomHeader.vue'
import Contact from './Contact.vue'
import { useRouter } from 'vue-router'
import { onMounted } from '@vue/runtime-core'
import useModal from '../../hooks/useModal'

const modal = useModal()

export default {
  components: { CustomHeader, Contact },
  setup () {
    const router = useRouter()

    onMounted(() => {
      const token = window.localStorage.getItem('token')
      if (token) {
        router.push({ name: 'Feedbacks' })
      }
    })

    function handleLogin () {
      modal.open({ component: 'ModalLogin' })
    }

    function handleAccountCreate () {}

    return {
      handleLogin,
      handleAccountCreate
    }
  }
}
</script>
