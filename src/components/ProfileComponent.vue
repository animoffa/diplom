<template>
    <div class="profile">
        <div class="profile__main">
            <div class="profile__photo">
                <!-- ../assets/img/userBig.png -->
                <img v-if="content.img" :src="content.img"/>
                <img v-else src="../assets/img/userBig.png"/>
                <button class="profile-button modal-button img-btn" @click="$refs.upload.click()" v-show="!showEdit">Изменить фото</button>
                <input v-if="!showEdit" id="file-input" type="file" style="display:none" name="name" accept="image/png, image/jpg, image/jpeg" ref="upload"  @change="uploadImage"/>
            </div>
            <div class="profile__main-info">
                <div class="field"><strong v-show="showEdit">{{content.name}}</strong><input v-show="!showEdit" v-model="content.name" autocomplete="off"/></div>
                <div class="field"><strong v-show="showEdit">{{content.lastname}}</strong><input v-show="!showEdit" v-model="content.lastname" autocomplete="off"/></div>
                <p>Дата рождения: <span v-show="showEdit">{{birthday ? birthday : (content.birthday && convertDate(content.birthday))}}</span><input v-show="!showEdit" :value="birthday" @input="birthday = $event.target.value; content.birthday = $event.target.value" autocomplete="off" v-mask="'##.##.####'"/></p>
                <p>Компания: <span v-show="showEdit">{{content.company}}</span><input v-show="!showEdit" v-model="content.company" autocomplete="off"/></p>
                <p>Должность: <span v-show="showEdit">{{content.status}}</span><input v-show="!showEdit" v-model="content.status" autocomplete="off"/></p>
            </div>
            </div>
            <div class="profile__full-info">
                <p>E-mail: <a v-show="showEdit" :href="'mailto:'+content.email">{{content.email}}</a><input v-show="!showEdit" v-model="content.email" autocomplete="off"/></p>
                <p>Телефон: <a v-show="showEdit" :href="'tel:'+content.phone">{{content.phone}}</a><input v-show="!showEdit" v-model="content.phone" autocomplete="off"/></p>
                <p>Адрес: <span v-show="showEdit">{{content.address}}</span><input v-show="!showEdit" v-model="content.address" autocomplete="off"/></p>
                <p>Количество статей: <span >{{countOfArticle}}</span></p>
                <p>О себе: <span v-show="showEdit">{{content.about}}</span><textarea v-show="!showEdit" v-model="content.about" autocomplete="off"/></p>
                <div class="profile-button modal-button" v-if="!isFriendPage" @click="scrapping">scrapping</div>
        </div>
        <button class="profile-button modal-button" @click="saveChanges" v-show="!showEdit">Сохранить</button>
        <div class="edit-button" v-if="!isFriendPage" @click="showEdit=!showEdit"/>
    </div>
</template>
<script>
    import AuthAPI from "@/services/APIServiceAuth.js"
    import API, {APIServiceResource} from "@/services/APIServiceResource.js"
    import {mapState} from 'vuex'
    import Vue from "vue"
    import VueMask from 'v-mask'

    Vue.use(VueMask);

    export default {
        name: 'profile-component',
        data() {
            return {
                showEdit: "false",
                image_file: null,
                isFriendPage: false,
                friendId: 0, 
                birthday: ''
            }
        },
        mounted() {

            if (this.$route.query.tab) {
            if (this.$route.query.tab.includes('user')) {
                this.isFriendPage = true;
                this.friendId = this.$route.query.tab.slice(4);
            } else {
                this.isFriendPage = false;
            }
            }
        },
        computed: {
            ...mapState('client', ['user', 'allUsers']),
            ...mapState('articles', [
            'articles' 
            ]),
            content() {
                console.log(this.isFriendPage, 'this.isFriendPage')
                if (this.isFriendPage) {
                    console.log(this.allUsers.find(user => console.log(user.id,+this.friendId )), 'this.allUsers.find(user => user.id === this.friendId)')
                    return this.allUsers.find(user => user.id === +this.friendId)
                }
                return this.user;
            },
            countOfArticle() {
                return this.articles.filter(article => article.author.id === this.content.id).length
            }
        },
        methods: {
            async scrapping() {
                this.isLoading = true;
                let data = '';
                var form_data = new FormData();
                const requestBody = {
                authors_all: '',
                pagenum: null,
                authorbox_name: null,
                selid: null,
                orgid: null,
                orgadminid: null,
                surname: null,
                codetype: 'SPIN',
                codevalue: '9042-5877',
                town: null,
                countryid: null,
                orgname: null,
                rubriccode: null,
                metrics: 1,
                sortorder: 0,
                order: 0
                }

                for ( var key in requestBody ) {
                form_data.append(key, requestBody[key]);
                }
                data = await API.createResource(APIServiceResource.ResourceType.scrapping, requestBody);
                console.log(await data);
                this.isLoading = false;
            },
            async saveChanges() {
                this.isLoading = true;

                if (this.content.birthday && this.content.birthday.toString().includes('.')){
                    const date = this.content.birthday.split('.');
                    const dateForServ = new Date(date[2], date[1]==='12' ? '11' : date[1], date[0]);
                    this.content.birthday = dateForServ.toISOString();
                }

                await AuthAPI.editUser(this.content);
                this.isLoading = false;
            },
            uploadImage(event) {
                this.image_file = event.target.files[0];
                var reader = new FileReader();
                let src = '';
                reader.onloadend = function() {
                    src = reader.result;
                }
                reader.readAsDataURL(this.image_file);
                setTimeout(()=>{
                    this.$set(this.content, 'img', src);
                },200)
               
            },
            convertDate(date) {
                const formattedDate = new Date(date * 1000)
                const month = (formattedDate.getMonth()+1) < 10 ? '0'+(formattedDate.getMonth()+1) : formattedDate.getMonth();
                const day= formattedDate.getDate() < 10 ? '0'+formattedDate.getDate() : formattedDate.getDate();
                return `${day}.${month}.${formattedDate.getFullYear()}`;
            }
        }
       
    }
</script>
<style lang="less" scoped>
    .profile{
        position: relative;
        width:100%;

        &__main-info {
            input {
                width: 22rem !important;
            }
        }

        &-button{
            margin-top: 5rem;
        }
        a {
            line-height: 145%;
            font-size: 1.9rem;
            margin-left: 1rem;
            bottom: 0.5rem;
            color:#27382b;
            transition:0.3s;
            cursor: pointer;
            position: relative;
            white-space: nowrap;
            &:hover{
                color:#3CB3E7;
                &::before{
                    width: 100%;
                }
            }

            &:after {
            background: transparent url('../assets/img/link-arrow-text_blue.svg') 0 0 no-repeat;
            background-size: 16px;
            content: " ";
            display: inline-block;
            height: 15px;
            margin-left: 0.5rem;
            width: 20px;
            box-sizing: border-box;
            }
            &:before {
                content: '';
                bottom: 0;
                display: block;
                position: absolute;
                width: 0;
                right: 0;
                height: 1px;
                background-color: #3CB3E7;
                transition: 0.3s ease;
            }

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
        .img-btn {
            position:absolute;
            bottom:0%;
            width: 100%;
            left: 50%;
            transform:translate(-50%, 0%);
            opacity: 0.5;
            margin-top: 0;
            transition: 0.3s;
            border-radius: 0;

            &:hover {
                opacity: 0.8;
            }
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
            position: relative;
            overflow: hidden;
            border-radius: 20px;
            img {
                width: 100%;
                height: 100%;
                border-radius: 20px;
                object-fit: cover;
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