<template>
    <div class="edit" :class="{modalBack:isOpen, 'no-height':!(displayedPosts && displayedPosts.length > 0)}">
    <div class="books-container-table">
        <template v-if="displayedPosts && displayedPosts.length > 0">
            <tableItem v-for="(card,i) in displayedPosts" v-bind:key="i" v-bind:card="card"
                       @delete-card="deleteCard" @open-more="openMore(card.id)"></tableItem>
            <nav class="pagination">
                <ul>
                    <li class="page-item">
                        <button type="button" class="page-link page-arrow prev" v-if="page !== 1" @click="page--"> ←
                        </button>
                    </li>
                    <li class="page-item">
                        <button type="button" class="page-link" v-for="pageNumber in pages.slice(page-1, page+5)"
                                v-bind:class="{activePage:page===pageNumber}" v-bind:key="pageNumber"
                                @click="page = pageNumber "> {{pageNumber}}
                        </button>
                    </li>
                    <li class="page-item">
                        <button type="button" @click="page++" v-if="page < pages.length"
                                class="page-link page-arrow next"> →
                        </button>
                    </li>
                </ul>
            </nav>
        </template>
        <template v-else>
            <p class="no-articles">У вас пока нет статей</p>
        </template>
        </div>
        <modal-window ref="addBookModal">
            <template v-slot:title>
                <h3 class="modal-title">Pедактирование</h3>
            </template>
            <template v-slot:body>
                <form @submit.prevent="onSubmit">
                    <div class="modal-body">
                        <input class="modal_input" placeholder="Название" v-model.trim="card.title"/>

                        <form @submit.prevent="onAddQuote">
                            <div class="textarea-container">
                                <ckeditor v-model="card.text" class="textarea-container__editor"></ckeditor>
                            </div>
                        </form>
                    </div>

                    <button class="modal-button" type="submit">Сохранить</button>
                </form>
            </template>
        </modal-window>
    </div>
</template>
<script>
import TableItem from "@/components/table-item"
import ModalWindow from "@/components/modal"
import { mapState } from 'vuex';
import ResourceAPI, { APIServiceResource } from "@/services/APIServiceResource.js";

export default  ({

    components: {
        TableItem,
        ModalWindow
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
      ...mapState('client', ['user']),  
      ...mapState('articles', [
        'articles' 
      ]),
      cards() {
        return this.articles.filter(card => card.author.id === this.user.id);
      },
        displayedPosts() {
          return this.paginate(this.cards);
        }
    },

    methods: {
        setPages() {
            let numberOfPages = Math.ceil(this.cards.length / this.perPage);
            this.pages = [];
            for (let index = 1; index <= numberOfPages; index++) {
                this.pages.push(index);
            }
         },
         async onSubmit() {
                try {
                    const res = await ResourceAPI.updateResource(APIServiceResource.ResourceType.articles, this.card)
                    await this.cards.splice(this.card.id, 1, res.json())

                } catch (e) {
                    console.error("Error while fetching: " + e.toString());
                }
            },
         async deleteCard(id) {
            
                    try {
                        await ResourceAPI.deleteResource(APIServiceResource.ResourceType.articles, id);
                        this.$emit('fetch-cards');
                    } catch (e) {
                        console.error("Error while fetching: " + e.toString());
                    }
            },
          paginate(cards) {
                let page = this.page;
                let perPage = this.perPage;
                let fromq = (page * perPage) - perPage;
                let to = (page * perPage);
                return cards.slice(fromq, to);
            },
            openMore(id) {
                this.card = this.cards.find(item => item.id === id)
                console.log(this.cards, id ,this.card);
                this.$refs.addBookModal.show = true
                this.isOpen = !this.isOpen
                window.document.body.classList.add("modal-active")
            },
    },
    mounted() {
        this.setPages();
    },
    watch: {
        cards() {
            this.setPages();
        }
    },
})
</script>
<style lang="less">
.edit{
    width:100%;
    height:64rem;
    position: relative;
    .pagination{
        margin-top:3rem;
    }
    &.no-height {
        height:auto;

    }
}
.no-articles {
    font-size: 1.7rem;
    color: #a2a2a2;
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