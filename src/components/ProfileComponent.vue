<template>
    <div class="profile">
        <div class="profile__main">
            <div class="profile__photo">
                <img src="../assets/img/user.png"/>
            </div>
            <div class="profile__main-info">
                <div class="field"><strong v-show="showEdit">{{content.name}}</strong><input v-show="!showEdit" v-model="content.name"/></div>
                <div class="field"><strong v-show="showEdit">{{content.lastName}}</strong><input v-show="!showEdit" v-model="content.lastName"/></div>
                <p>Дата рождения: <span v-show="showEdit">{{content.birthDate}}</span><input v-show="!showEdit" v-model="content.birthDate"/></p>
                <p>Статус: <span v-show="showEdit">{{content.status}}</span><input v-show="!showEdit" v-model="content.status"/></p>
            </div>
            </div>
            <div class="profile__full-info">
                <p>E-mail: <span v-show="showEdit">{{content.mail}}</span><input v-show="!showEdit" v-model="content.mail"/></p>
                <p>Телефон: <span v-show="showEdit">{{content.phone}}</span><input v-show="!showEdit" v-model="content.phone"/></p>
                <p>Адрес: <span v-show="showEdit">{{content.address}}</span><input v-show="!showEdit" v-model="content.address"/></p>
                <p>Количество статей: <span v-show="showEdit">{{content.countOfArticle}}</span><input v-show="!showEdit" v-model="content.countOfArticle"/></p>
                <p>О себе: <span v-show="showEdit">{{content.about}}</span><textarea v-show="!showEdit" v-model="content.about"/></p>
            
        </div>
        <button class="profile-button modal-button" @click="saveChanges" v-show="!showEdit">Сохранить</button>
        <div class="edit-button" @click="showEdit=!showEdit"/>
    </div>
</template>
<script>
    
    export default {
        name: 'profile-component',
        props: {
            // content: {
            //     type: Object,
            //     default:()=>{
            //         name: 'rfr'}
            // }
        },
        data() {
            return {
                showEdit: "false",
                content: {
                    name: 'fvvfv',
                    lastName: 'dff',
                    phone: 'ffffff',
                    mail:'dsdsdsd',
                    address:'dfefeferf',
                    birthDate: 'rf',
                    countOfArticle: '5',
                    status: 'dcsdcww erverver erverververv evrevrerv ervervev sdcf',
                    about: 'loader vfre ererf vgfd eveververv vvdsdfvdv ererverv evervev evevervev eveveveverv evevevevev evervev evevevr ervevescs efwefwfwef wefwefwef rveverv erververv eververvever ververververv'
                }
            }
        },

        async mounted() {
            // if (!localStorage.getItem("token")) {
            //     this.redirectToLogin();
            //     return;
            // }
            // this.fetchResource();
            // this.fetchAccountInfo();

        },
        methods: {
            saveChanges() {

            }
        }
       
    }
</script>
<style lang="less" scoped>
    .profile{
        position: relative;
        width:100%;
        &-button{
            margin-top: 5rem;
        }
        
        .field{
            display: flex;
            justify-content: flex-start;
            margin-bottom: 1rem;
            
        }
        input{
                margin:0rem;
                margin-bottom: 1rem;
                background: transparent;
                width: 35rem;
                height: 3rem;
            }
        textarea{
            margin:0rem;
            margin-bottom: 1rem;
            background: transparent;
            width: 55rem;
            height: 10rem;
              
        }
        span{
            width:70%;
            font-size: 1.9rem;
            margin-left: 1rem;
        }
        .edit-button {
            cursor: pointer;
            width: 10%;
            position: absolute;
            top: 2rem;
            left: 95%;
            width: 3rem;
            height: 3rem;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAEEklEQVR4nO2bSYgUVxjHfzPtuBt1cEEdTfAwgnoybsxBZPAQF1AGB0UFVxAUFRcMYg4qogfRy6AiIREUUQzERBGX0UuMggtuuK+oiaJExcg40XZsD9+U71XbU1Wt/VVZnf5BQdP9r57//1VNvfe+9xoKFChQoECB/y2JqA140AooA94AyYi9hEYJsAS4BqQaj3fAGWAqUBSdNX06A6cxwTMdB4HWURnUJAH8iXd459gTkUdV5hIsvHOMjsamDu2BJ2TXAL9G4lSJtWQXPgXcj8SpAh2BV2TfAM9yZaA4V1/0ibQEmn/CeY9yZSDqBngETAAeZnneEQUvkdIWWAPU43/7J4HyaGzq0xPYhncDbIzMXY5oBxwALgMDm9BUAhf5OPxzZMQYa9ZjAm320DUD5gD/WPpF6u6UKQdeYwJVBTinFFiGhI/6of3Z7MeEP0aez+7SGYEJ3wB8G62dcCkBrmAaYIuPfghwA+nv2+haC4cFBH+SlyA9hKMfpe5OmU7I2N0JtNBHP9/Svmg8P9ZswgS6ilzhpijF3e0tVnenTF9k6OoEGumj32xpbwItVN2FwCFMoH0+2n64Gyv2VZ8qTJjXQB8f/WFLX6trTZ/mSDfmBFrnox9vaZPI3RBrlmECPUbqfk3RErhj6Teou1OmK9J9OYFm+eh/sLRPkZ4g1mzFBDqL9/JbD+ClpZ+t7k6ZAcg43wk0zEe/3dJeQqbAsaUI+AMTaKePfiiy7ufoh6u6C4HJmDCvgK89tEXASUu/W92dMq2Ae5hAK3z00yxtPfCNqrsQWIkJ9ADvKWxb4G9Lv0rdnTJlQB0m0EQfvb0U9hd5MN/fhQl0HO8yV2/ctf/J6u6UqcA8yRuAQT763zDhTxDzmmAxcAoT6EcffaWlbQAGq7oLgZmYQP8C3Ty0CdwLHT+ru1OmHbKg6QRa4qOfR/DGigV2t3cL78pNR9xlru/V3SlTinu2N9ZHX0PwxooFyzGBTuH9JE8vc41TdxcC1wl+9WstbezLXCDL2Xalx2v6Os7SJoH+6u5CYCnBNip8hXtyVKNvLRz2YUJVe+h+snRPyIMyl8NdTLCyJjSzLU2QyVFsSCBb11PAf2R++o+xNCngl9DchUB3TLA7GT6vxr374zwy988b+mHCnbHeTwCrcRdD7wG9wjaoTQUm4NHG98qRrS72//x18jA8yEYFJ+ReZAKUvs/3KNAlKoPaTMI9n7eDJ5EJ0pf8G6SMZLMQ0cF6bW9XuwTMQH7ukk45MlzO5fa2d8DvyOKrTTFykQB2IBcmp9gLnimku1uJ927v22nn5Oq4leFvTbE+D1xrzOYOuG29PgdMBy5kcf4XSTYNsBsZ/BQjA5y3Ac75DhkJ5rL0XYdUotNxbvsgy3IfeA+10KdH2qoQhAAAAABJRU5ErkJggg==) no-repeat center;
            background-size: 3rem;
        }
        &__main {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            &-info {
                margin-left: 5rem;
                margin-top:1rem;
                width:60%;
            }
        }
        &__photo{
            width:200px;
            height:200px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        &__full-info{
            margin-top: 5rem;
            margin-left: 5rem;
            
        }
    p {
        margin: 1rem 0;
        text-align: left;
        font-size: 1.7rem;
        align-items: flex-start;
        display: flex;
        input {
            margin-left: 1rem;
        }
    }
    strong {
        font-size: 3rem;
    }
    }
</style>