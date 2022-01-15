<template>
    <div class="login-container">
        <form class="login" @submit.prevent="onSubmit">
            <div class="title">Регистрация</div>
            <input placeholder="Имя" v-model="name" autocomplete="off" type="text" name="name"/>
            <input placeholder="Фамилия" v-model="lastName" autocomplete="off"/>
            <input placeholder="email" v-model="login" autocomplete="off"/>
            <input placeholder="Место работы" v-model="company" type="text" autocomplete="off"/>
            <input placeholder="Пароль" v-model="password" type="password" name="pass" autocomplete="new-password"/>
             <input placeholder="Пароль" v-model="passwordConfirm" type="password" name="passC" autocomplete="new-password"/>
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
                lastName: '',
                passwordConfirm: '',
                name: '',
                company: '',
                password: '',
                errors: []
            }
        },
        mounted() {
            localStorage.removeItem("token");
        },

        methods: {
            async onSubmit() {
                this.errors = [];
                 if (!this.login) {
                    this.errors.push('Укажите логин');
                    return;
                }
                if (!this.name) {
                    this.errors.push('укажите имя');
                    return;
                }
                if (!this.password) {
                    this.errors.push('укажите пароль');
                    return;
                } else if (this.password.length < 3) {
                    this.errors.push('укажите пароль больше 3 символов');
                    return;
                } else if (this.password !== this.passwordConfirm) {
                    this.errors.push('пароли не совпадают');
                    return;
                }

                        try {

                            await API.register({email: this.login, password: this.password, name: this.name, lastname: this.lastName, company: this.company});
                            await this.$router.push('/login')
                        } catch (e) {
                            console.error("Error while auth: " + e.toString());
                        }

                        this.login = ''
                        this.password = ''
                        this.name = ''
                        this.passwordConfirm=''

               
                this.errors = [];
            }
        },

    }
</script>