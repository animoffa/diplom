<template>
    <div class="user-template">
        <!-- <template  v-if="isLoading">
           <Preloader/>
        </template> -->
        <template>
            <div class="menu">
                <div class="title">
                    <a href="/"><h1>quickDoc</h1></a>
                </div>
            <ul class="menu__nav">
                <li><a href="/">Популярные статьи</a></li>
                <li><a href="/">Новые</a></li>
                <li><a href="/">Статьи друзей</a></li>
            </ul>
            <div class="actions">
                <div class="user">
                <div class="img">
                    <router-link to="/user" v-on:click="exit"><img src="../assets/img/user.png"/></router-link>
                </div>
                <p class="des un">{{user}}</p>
            </div>
                <router-link class="route exit" to="/login" v-on:click="exit"><img src="../assets/img/exit.png" class="exit-ico"/>
                </router-link>
            </div>
            </div>
            <div class="container">
            <div class="user-content">
                <div class="sidebar">
                    <ul>
                        <li v-for="item of sidebarList" :class="{'active': item.query===activeTab}" :key="item.name" @click="changeTab(item.query)">
                            {{item.name}}
                        </li>
                    </ul>

                </div>
                <div class="content">
                    
                </div>
            </div>
            </div>
        </template>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                sidebarList:[{name:'Профиль', query:'profile'}, {name:'Мои статьи', query:'myArticles'},{name:'Друзья', query:'friends'}],
                isLoading: false,
                activeTab: 'Профиль',
            }
        },
        

        async mounted() {
            if (this.$route.query.tab) {
                this.activeTab = this.$route.query.tab;
            }
            // if (!localStorage.getItem("token")) {
            //     this.redirectToLogin();
            //     return;
            // }
            // this.fetchResource();
            // this.fetchAccountInfo();

        },
        methods: {
            exit() {
                localStorage.removeItem("token");
            },
            changeTab(item) {
                this.activeTab = item;
                this.$router.push({ query: { tab: item }})
            }
            
        },
      
    }
</script>

<style lang="less" scoped>
    .user-template{
        width:94%;
        margin: 0 auto;
    }
    .menu__nav{
        display: flex;

        a{
            font-size: 1.7rem;
            margin: 0 2rem;
            color:#27382b;
        }
        a:hover{
            color:#47664e;
        }
    }
    .user-content{
        padding-top:5rem;
        display: flex;
        justify-content: space-between;
    }
    .content{
        width:76%;
        background: #f9f9f9e6;
        box-shadow: 10px 9px 18px 10px rgba(207, 207, 207, 27%);
        -webkit-box-shadow: 10px 9px 18px 10px rgba(207, 207, 207, 27%);
        -moz-box-shadow: 10px 9px 18px 10px rgba(207, 207, 207, 27%);
        display: flex;
        flex-direction: column;
        border-radius: 1rem;
        align-items: flex-start;
        padding: 4.5rem 3rem 4rem;
    }
    .sidebar{
        width:22%;
        background: #f9f9f9e6;
        box-shadow: 10px 9px 18px 10px rgba(207, 207, 207, 27%);
        -webkit-box-shadow: 10px 9px 18px 10px rgba(207, 207, 207, 27%);
        -moz-box-shadow: 10px 9px 18px 10px rgba(207, 207, 207, 27%);
        display: flex;
        flex-direction: column;
        border-radius: 1rem;
        align-items: flex-start;
        padding: 4.5rem 2.5rem 4rem;
        ul{
            width: 100%;
        }
        li{
            font-size: 2.2rem;
            margin: 0.5rem 0;
            padding: 1rem 1.5rem;
            cursor: pointer;
            text-align: left;
            width: 100%;
            border-radius: 1rem;
        }
        .active {
            background-color:#4772513b;
        }
    }
    .user {
        font-size: 1.8rem;
        margin-right: 1rem;
        width: 8rem;
        height:100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .img {
        width: 3rem;
        height: 2.3rem;
        @media (max-width: 768px) {
            width: 4.5rem;
            height: 4.5rem;
        }
    }

    .un {
        font-size: 1.3rem;
        overflow: hidden;
        line-clamp: 1;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        @media (max-width: 768px) {
            font-size: 1.8rem;
        }

    }
</style>