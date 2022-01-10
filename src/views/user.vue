<template>
    <div class="user-template">
        <template  v-if="!(user && user.name)">
           <Preloader/>
        </template>
        <template v-else>
            <div class="menu">
                <div class="title">
                    <a href="/"><h1>quickDoc</h1></a>
                </div>
            <ul class="menu__nav">
                <li><a href="/">Статьи</a></li>
                <li><a href="/">Статьи компании</a></li>
            </ul>
            <div class="actions">
                <div class="user">
                <div class="img">
                    <router-link to="/user" v-on:click="exit">
                    <img class="main__img-user" v-if="user && user.img" :src="user.img"/>
                    <img v-else class="main__img-user" src="../assets/img/user.png"/>
                    </router-link>
                </div>
                <p class="des un">{{user ? user.name : 'войдите'}}</p>
            </div>
                <router-link class="route exit" to="/login" v-on:click="exit"><img src="../assets/img/exit.png" class="exit-ico"/>
                </router-link>
            </div>
            </div>
            <div class="container">
            <div class="user-content">
                <div class="sidebar">
                    <ul>
                        <li v-for="(item,i) of sidebarList" :key="'sidebar'+i" :class="{'active': item.query===activeTab}"  @click="changeTab(item.query)" class="sidebar__item">
                            {{item.name}}
                            <div v-if="item.isDeletable" class="sidebar__delete-btn" @click="deleteSidebarItem(i)">╳</div>
                        </li>
                    </ul>

                </div>
                <div class="content">
                    <component
                        :is="bigTabItemsFactory(this.activeTab)"
                        :key="`${this.activeTab}-block`"
                        @open-friend-page="openColleguePage"
                        @fetch-cards="fetchCards"
                        />
                </div>
            </div>
            </div>
        </template>
    </div>
</template>
<script>
    import ProfileComponent from '@/components/ProfileComponent';
    import EditArticles from '@/components/EditArticles';
    import FriendsComponent from '@/components/FriendsComponent';
    import Preloader from '@/components/preloader';
    import { mapState } from 'vuex';

    export default {
        data() {
            return {
                sidebarList:[{name:'Профиль', query:'profile'}, {name:'Редактирование статей', query:'myArticles'}, {name: 'Коллеги', query: 'colleagues'}],
                isLoading: false,
                activeTab: 'profile',

            }
        },
        components: {
            Preloader
        },

        async mounted() {
            if (this.$route.query.tab) {
                this.activeTab = this.$route.query.tab;
            }
            if (!localStorage.getItem("token")) {
                this.redirectToLogin();
                return;
            }
        },
        created() {
            this.$store.dispatch('client/getAllUsers');
            this.$store.dispatch('client/getUser');
            this.$store.dispatch('articles/getArticles');
        },
        computed: {
            ...mapState('client', ['user']),  
        },

        methods: {
            openColleguePage(user) {
                this.sidebarList.push({name:`${user.name} ${user.lastname}`, query:`user${user.id}`, isDeletable: true})
                this.changeTab(`user${user.id}`);
            },
            fetchCards() {
              this.$store.dispatch('articles/getArticles');
            },
            deleteSidebarItem(id) {
                this.changeTab('profile');
                this.sidebarList.splice(id,1);
            },
            exit() {
                localStorage.removeItem("token");
            },
            changeTab(item) {
                this.activeTab = item;
                this.$router.push({ query: { tab: item }})
            },
            bigTabItemsFactory(item) {
                switch(item) {
                    case 'profile':
                        return ProfileComponent;
                    case 'myArticles':
                        return EditArticles;
                    case 'colleagues':
                            return FriendsComponent;
                    default:
                        return ProfileComponent;
                }
            }
            
        },
      
    }
</script>

<style lang="less" scoped>
    .user-template{
        width:94%;
        min-height: 100vh;
        margin: 0 auto;
    }
    .sidebar__item {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .sidebar__delete-btn {
        font-size: 1rem;
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
        @media (max-width: 768px) {
            display: none;
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
        padding: 6rem 5rem 6rem;
    }
    .sidebar{
        width:22%;
        background: #f9f9f9e6;
        box-shadow: 10px 9px 18px 10px rgba(207, 207, 207, 27%);
        -webkit-box-shadow: 10px 9px 18px 10px rgba(207, 207, 207, 27%);
        -moz-box-shadow: 10px 9px 18px 10px rgba(207, 207, 207, 27%);
        display: flex;
        height: fit-content;
        flex-direction: column;
        border-radius: 1rem;
        align-items: flex-start;
        padding: 4.5rem 2rem 4rem;
        ul{
            width: 100%;
        }
        li{
            font-size: 2.2rem;
            margin: 0.5rem 0;
            transition:0.5s;
            padding: 1rem 2rem;
            cursor: pointer;
            text-align: left;
            width: 100%;
            border-radius: 1rem;

            &:hover {
                background-color:#47725118;
            }
        }
        .active {
            background-color:#4772513b;
        }
    }
    .user {
        font-size: 1.8rem;
        margin-right: 1rem;
        width: 8rem;
        margin-top: 1.3rem;
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