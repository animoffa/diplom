<template>
    <div class="login-container">
        <form class="login" @submit.prevent="onSubmit">
            <div class="title">Регистрация</div>
            <input placeholder="Введите имя" v-model="name"/>
            <input placeholder="Введите логин" v-model="login"/>
            <input placeholder="Введите пароль" v-model="password" type="password"/>
            <div v-if="errors.length" class="error-window">
                <b>Ошибка!</b>
                <ul>
                    <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                </ul>
            </div>

            <button type="submit" class="access-button">Зарегистироваться</button>
            <router-link class="route auth-text-route" to="/login">Уже зарегистрированы?</router-link>
        </form>

    </div>
</template>
<script>
    import API from "@/services/APIServiceAuth"

    export default {
        data() {
            return {
                isDeleteClicked: false,
                login: '',
                name: '',
                password: '',
                errors: []
            }
        },
        mounted() {
            localStorage.removeItem("token");
        },

        methods: {
            async onSubmit() {
                if (this.login && this.password && this.name) {
                    try {

                        await API.register({username: this.login, password: this.password, fullName: this.name});
                        await this.$router.push('/login')
                    } catch (e) {
                        console.error("Error while auth: " + e.toString());
                    }

                    this.login = ''
                    this.password = ''
                    this.name = ''
                }
                this.errors = [];

                if (!this.login) {
                    this.errors.push('Требуется указать логин.');
                }
                if (!this.name) {
                    this.errors.push('Требуется указать имя.');
                }
                if (!this.password) {
                    this.errors.push('Требуется указать пароль.');
                } else if (this.password.length < 3) {
                    this.errors.push('Требуется указать пароль больше 3 символов.');
                }


            }
        },

    }
</script>