<template>
    <div class="friends" :class="{modalBack:isOpen}">
        <template v-if="colleagues && colleagues.length > 0">
           <FriendItem 
              v-for="user of colleagues" 
              :key="'collegues'+user.id" 
              :user="user" 
              :countOfArticles="countOfArticles(user.id)"
              @open-friend-page="openFriendPage"
              />
        </template>
        <template v-else><p class="friends__no">Коллег не найдено</p></template>
    </div>
</template>
<script>
// import TableItem from "@/components/table-item"
// import ModalWindow from "@/components/modal"
import FriendItem from '@/components/FriendItem'
import { mapState } from 'vuex';

export default  ({

    components: {
        // TableItem,
        // ModalWindow
        FriendItem
    },
    data() {
        return {
            pages: [],
            isOpen: false,
            card: {},
            page: 1,
            perPage: 9,
        }
    },
    computed: {
      ...mapState('client', ['allUsers', 'user']),
      ...mapState('articles', ['articles']),  
      displayedPosts() {
        return this.paginate(this.cards);
      },
      colleagues() {
        return this.allUsers.filter(user => user.company === this.user.company).filter(user => user.id !== this.user.id)
      },
    },
   
    methods: {
      countOfArticles(id) {
        return this.articles.filter(article => article.author.id === id).length;
      },
      openFriendPage(id) {
        this.$emit('open-friend-page', id)
      }
    }
})
</script>
<style lang="less">
.friends {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .friend {
        width: 29%;
        margin-right: 20px;
        height: auto;
        margin-bottom: 20px;
    }

    &__no {
        margin: 0 auto;
        font-size: 17px;
        color: #a2a2a2;
    }
}
.edit{
    width:100%;
    height:64rem;
    position: relative;
    .pagination{
        margin-top:3rem;
    }
}
.books-container-table {
        display: flex;
        flex-direction: column;

        .page-link {
            font-size: 2rem;
            color: #22331d;
            padding: 0.5rem 1.5rem;
            font-weight: 500;
            background: #e9f1eca3;
            font-family: auto, serif;
            margin: 0.2rem;
            border: none;
        }
        .page-arrow {
            font-size: 1.9rem;
        }

        .activePage {
            font-weight: bold;
            background: #d5e4d9cc;
        }

        .prev {
            border-bottom-left-radius: 1.5rem;
            border-top-left-radius: 1.5rem;
        }

        .next {
            border-bottom-right-radius: 1.5rem;
            border-top-right-radius: 1.5rem;
        }

        .pagination {
            left: 50%;
            top: 99%;
            position: absolute;
            transform: translateX(-50%);
            margin-top: 2rem;

            ul {
                display: flex;
                justify-content: center;
            }

            @media (max-width: 768px) {
                top: 109rem;
            }
        }
    }
</style>