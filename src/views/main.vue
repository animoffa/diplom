<template>
    <div>
        <!-- <template  v-if="isLoading">
           <Preloader/>
        </template> -->
        <template >
       
        <div class="menu">
          <div class="title">
            <a href="/"><h1>quickDoc</h1></a>
          </div>
          <ul class="menu__nav">
                <li><a href="/user?tab=profile">Мой профиль</a></li>
                <li><a href="/user?tab=colleagues">Коллеги</a></li>
                <li><a href="/user?tab=myArticles">Редактирование статей</a></li>
            </ul>
          <div class="actions">
            <div class="user">
                <div class="img">
                    <router-link to="/user" v-on:click="exit"><img src="../assets/img/user.png"/></router-link>
                </div>
                <p class="des un">{{user ? user.name : 'войдите'}}</p>
            </div>
              <router-link class="route exit" to="/login" v-on:click="exit"><img src="../assets/img/exit.png" class="exit-ico"/>
              </router-link>
            </div>
        </div>
        <div class="container">
            <div class="filtration">
              <div class="filtration__left">
                <select v-model="sortList" class="main-select">
                    <option value="all" selected>Все статьи</option>
                    <option value="company">Cтатьи компании</option>
                </select>
                <div class="select-arrow"><img src="../assets/img/arrow_custom.svg"/></div>
              </div>
              <div class="filtration__right">
                <input type="text" v-model.trim="search" class="search-input">
                <div class="h-line"></div>
                <select v-model="sortParam">
                    <option value="" hidden disabled selected>Сортировать..</option>
                    <option value="title">по названию</option>
                    <option value="author">по автору</option>
                    <option value="mark">по рейтингу</option>
                    <option value="titleLowFirst">по названию ↑</option>
                    <option value="authorLowFirst">по автору ↑</option>
                    <option value="markLowFirst">по рейтингу ↑</option>
                </select>
                <div class="select-arrow"><img src="../assets/img/arrow_custom.svg"/></div>
              </div>
            </div>
            <hr class="m-hr" v-show="isCardMapping"/>
            <CardList v-bind:cards="cardGroup" v-bind:isCardMapping="isCardMapping" :user="user" @fetch-cards="fetchResource"></CardList>
        </div>
        </template>
    </div>
</template>
<script>
    import CardList from "@/components/card-list"
    import { mapState } from 'vuex';
// import Preloader from "@/components/preloader"
    export default {
        data() {
            return {
                search: '',
                sortParam: '',
                isCardMapping: true,
                sortList:'all',
                isLoading: false,
                resourceFetchStatus: {},
                accountInfoFetchStatus: {}
            }
        },
        components: {
            CardList,
            // Preloader
        },

        async mounted() {
            if (!localStorage.getItem("token")) {
                this.redirectToLogin();
                return;
            }
        },
        created() {
          this.$store.dispatch('client/getUser');
          this.$store.dispatch('articles/getArticles');
        },
        methods: {
            exit() {
                localStorage.removeItem("token");
            },
            fetchResource() {
              this.$store.dispatch('articles/getArticles');
            },
            async redirectToLogin() {
                try {
                    await this.$router.push('/login');
                } catch (e) {
                    console.error("Error while fetching: " + e.toString());
                }
            }
        },

        computed: {
          ...mapState('client', ['user']),  
          ...mapState('articles', [
            'articles' 
          ]),
           
            filtredCards() {
                const searchByTitle = (item) => item.title.toUpperCase().indexOf(this.search.toUpperCase()) !== -1;
                const searchByAuthor = (item) => item.author.name.toUpperCase().indexOf(this.search.toUpperCase()) !== -1;
                return this.articles.filter(item => searchByTitle(item) || searchByAuthor(item));
            },
            cardGroup() {
              if (this.sortList === 'company') {
                const newCards = this.sortedList.filter(item => this.user.company === item.author.company);
                console.log(newCards);
                return newCards;
              }
              return this.sortedList;
            },
            sortedList() {
                const sortByTitle = (d1, d2) => {
                    return (d1.title.toLowerCase() > d2.title.toLowerCase()) ? 1 : -1;
                };
                const sortByAuthor = (d1, d2) => {
                    return (d1.author.toLowerCase() > d2.author.toLowerCase()) ? 1 : -1;
                };
                const sortByMark = (d1, d2) => {
                    return (d1.mark < d2.mark) ? 1 : -1;
                };
                switch (this.sortParam) {
                    case 'title':
                        return [...this.filtredCards].sort(sortByTitle);
                    case 'author':
                        return [...this.filtredCards].sort(sortByAuthor);
                    case 'mark':
                        return [...this.filtredCards].sort(sortByMark);
                    case 'titleLowFirst':
                        return [...this.filtredCards].sort(sortByTitle).reverse();
                    case 'authorLowFirst':
                        return [...this.filtredCards].sort(sortByAuthor).reverse();
                    case 'markLowFirst':
                        return [...this.filtredCards].sort(sortByMark).reverse();
                    default:
                        return this.filtredCards;
                }
            }
        },
    }
</script>

<style lang="less">
    .user {
        font-size: 1.8rem;
        margin-right: 1rem;
        width: 8rem;
        height:100%;
        margin-top: 1.3rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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