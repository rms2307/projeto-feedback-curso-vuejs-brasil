<template>
  <div class="flex justify-between">
    <h1 class="text-4xl font-black text-gray-800">Cria uma conta</h1>
    <button class="text-4xl text-gray-600 focus:outline-none" @click="close">
      &times;
    </button>
  </div>
  <div class="mt-16">
    <form @submit.prevent="handleSubmit">
      <label class="block">
        <span class="text-lg font-medium text-gray-800">Nome</span>
        <input
          id="name-field"
          v-model="state.name.value"
          type="text"
          :class="{
            'border-brand-danger': !!state.name.errorMessage,
          }"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          placeholder="João da Silva"
        />
        <span
          id="name-error"
          v-if="!!state.name.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.name.errorMessage }}
        </span>
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">E-mail</span>
        <input
          id="email-field"
          v-model="state.email.value"
          type="email"
          :class="{
            'border-brand-danger': !!state.email.errorMessage,
          }"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          placeholder="jane.dae@gmail.com"
        />
        <span
          id="email-error"
          v-if="!!state.email.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.email.errorMessage }}
        </span>
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">Senha</span>
        <input
          id="password-field"
          v-model="state.password.value"
          type="password"
          :class="{
            'border-brand-danger': !!state.password.errorMessage,
          }"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          placeholder="********"
        />
        <span
          v-if="!!state.password.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.password.errorMessage }}
        </span>
      </label>

      <button
        id="submit-button"
        :disabled="state.isLoading"
        type="submit"
        :class="{
          'opacity-50': state.isLoading,
        }"
        class="px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150"
      >
        <icon v-if="state.isLoading" name="loading" class="animate-spin" />
        <span v-else>Criar</span>
      </button>
    </form>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import useModal from '../hooks/useModal'
import { useField } from 'vee-validate'
import { useToast } from 'vue-toastification'
import Icon from './Icon.vue'
import {
  validateEmptyAndLength3,
  validateEmptyAndEmail
} from '../utils/validators'
import services from '../services'
import { useRouter } from 'vue-router'

export default {
  components: { Icon },
  setup () {
    const router = useRouter()
    const modal = useModal()
    const toast = useToast()

    const { value: nameValue, errorMessage: nameErrorMessage } = useField(
      'name',
      validateEmptyAndLength3
    )

    const { value: emailValue, errorMessage: emailErrorMessage } = useField(
      'email',
      validateEmptyAndEmail
    )

    const { value: passwordValue, errorMessage: passwordErrorMessage } =
      useField('password', validateEmptyAndLength3)

    const state = reactive({
      hasErrors: false,
      isLoading: false,
      name: {
        value: 'Maria',
        errorMessage: nameErrorMessage
      },
      email: {
        value: 'maria@email.com',
        errorMessage: emailErrorMessage
      },
      password: {
        value: '@maria',
        errorMessage: passwordErrorMessage
      }
    })

    async function login ({ email, password }) {
      const { data, errors } = await services.authService.login({
        email,
        password
      })

      if (!errors) {
        window.localStorage.setItem('token', data.token)
        router.push({ name: 'Feedback' })
        modal.close()
      }

      state.isLoading = false
    }

    async function handleSubmit () {
      try {
        toast.clear()
        state.isLoading = true

        const { data, errors } = await services.authService.register({
          name: state.name.value,
          email: state.email.value,
          password: state.password.value
        })

        if (!errors) {
          await login({
            email: state.email.value,
            password: state.password.value
          })
          return
        }

        if (errors.status === 400) {
          toast.error('Ocorreu um erro ao criar a conta.')
        }

        state.isLoading = false
      } catch (error) {
        state.isLoading = false
        state.hasErrors = !!error
        toast.error('Sistema indisponível, tente novamente mais tarde.')
      }
    }

    return {
      state,
      close: modal.close,
      handleSubmit
    }
  }
}
</script>
