<template>
    <div class="login-container">
        <form class="login" @submit.prevent="onSubmit">
            <div class="title">Вход</div>

            <input placeholder="Введите логин" v-model="login"/>
            <input placeholder="Введите пароль" v-model="password" type="password"/>
            <div v-if="errors.length" class="error-window">
                <b>Ошибка!</b>
                <ul>
                    <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                </ul>
            </div>
            <button type="submit" class="access-button">Войти</button>
            <router-link class="route auth-text-route" to="/registration">Еще не зарегистрированы?</router-link>
        </form>

    </div>
</template>
<script>

    import API from "@/services/APIServiceAuth";

    export default {
        data() {
            return {
                isDeleteClicked: false,
                login: '',
                password: '',
                errors: [],
            }
        },
        mounted() {
            localStorage.removeItem("token");
        },
        methods: {
            async onSubmit() {
                if (this.login && this.password && this.password.length > 3) {
                    try {
                        console.log("sefs");
                        const res = await API.login({username: this.login, password: this.password});
                        const token = this.login + ":" + this.password;
                        await localStorage.setItem("token", btoa(token));
                        if (res.status !== 401 && res.status !== 500) {
                            await this.$router.push('/');
                        }
                    } catch (e) {
                        console.error("Error while auth: " + e.toString());
                    }
                    this.login = '';
                    this.password = '';
                    this.name = '';
                }

                this.errors = [];

                if (!this.login) {
                    this.errors.push('Требуется указать логин.');
                }
                if (!this.password) {
                    this.errors.push('Требуется указать пароль.');
                }
                if (this.password.length < 3) {
                    this.errors.push('Требуется указать пароль больше 3 символов.');
                }

            }
        },

    }
</script>
<style lang="less">
    .login-container {
        width: 100%;
        padding-top: 20rem;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .error-window {
        background: #fadcd7;
        border: 1px solid #ff9494;
        border-radius: 2rem;
        width: 95%;
        padding: 1rem 2rem;

        li{
            font-size:1.6rem;
            word-break: break-word;
        }
        b {
            color: #a00000;
            font-size: 1.8rem;
        }
    }

    .login {
        display: flex;
        background: white;
        flex-direction: column;
        padding: 4rem 7rem 3rem;
        border-radius: 3rem;
        box-shadow: 10px 9px 18px 10px rgba(207, 207, 207, 27%);
        -webkit-box-shadow: 10px 9px 18px 10px rgba(207, 207, 207, 27%);
        -moz-box-shadow: 10px 9px 18px 10px rgba(207, 207, 207, 27%);
    }

    .access-button {
        background-color: #477251;
        color: #fff;
        margin-top: 3rem;
        border: none;
        text-align: center;
        padding: 0.8rem 2rem;
        font-size: 1.7rem;
        font-weight: 500;
        border-radius: 8px;
    }

    .auth-text-route {
        margin: 2rem 0 0 0;
        color: rgba(71, 114, 81, 0.82);
        font-size: 1.5rem;
    }

    .title {
        font-size: 2.4rem;
        font-weight: bold;
        color: #477251;
    }

</style>