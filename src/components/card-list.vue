<template>
    <div v-bind:class="{modalBack:isOpen}">
        <div class="table-item head" v-show="!isCardMapping">
            <div class="table-title">
              Название
            </div>
            <div class="author">
              Автор
            </div>
            <div class="stars">
                Оценка
            </div>
            <div class="delete-button">
                <div> </div>
            </div>
            <div class="edit-button">

            </div>
        </div>
        <div class="books-container" v-if="isCardMapping">
            <Card v-for="(card,i) in cards" v-bind:key="i" v-bind:card="card" @delete-card="deleteCard"
                  v-scroll="onPageDown" v-on:scroll="onPageDown"
                  @open-more="openMore" class="card-container"/>
        </div>
        <div class="books-container-table" v-else>
            <tableItem v-for="(card,i) in displayedPosts" v-bind:key="i" v-bind:card="card"
                       @delete-card="deleteCard" @open-more="openMore"></tableItem>
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
        </div>
        <div class="add-card" id="show-modal" @click="showModal">+</div>

        <modal-window ref="addBookModal">
            <template v-slot:title>
                <h3 class="modal-title">Новая статья</h3>
            </template>
            <template v-slot:body>
                <form @submit.prevent="onSubmit">
                    <div class="modal-body">
                        <input class="modal_input" placeholder="Название" v-model.trim="title"/>
                        

                        <ul v-for="(item,i) of quotes" v-bind:key="i" v-bind:quote="item">
                            <li>{{item}}</li>
                        </ul>

                        <form @submit.prevent="onAddQuote">
                            <div class="textarea-container">
                                <ckeditor v-model="quote" class="textarea-container__editor"></ckeditor>
                            </div>
                        </form>
                    </div>

                    <button class="modal-button" type="submit">Опубликовать</button>
                </form>
            </template>
        </modal-window>

        <modal-window ref="openBookModal">
            <template v-slot:title>
                <div></div>
            </template>
            <template v-slot:body>
                <form>
                    <div class="modal-body">
                        <div class="title"> {{card.title}}</div>
                        <div class="subtitle"> {{card.author}}</div>
                        <p class="article__body">{{card.text}}</p>
                        <div class="mark-container">
                            <div class="mark__my">
                                <span>Оцените статью: </span>
                                <Stars v-bind:mark="card.userMark" @change-mark="changeMark"/>
                            </div>
                            <div class="mark__our">
                                <span>Общая оценка: <strong>{{card.mark}}</strong></span><span>Оценили {{card.countOfMark}} человек</span>
                            </div>
                        </div>
                        <form @submit.prevent="onAddQuoteInExistingBook">
                            <div class="textarea-container">
                    <textarea placeholder="Добавить комментарий" v-model="quote">
                    </textarea>
                                <button class="modal-button plus" type="submit">+</button>
                            </div>
                        </form>
                        <ul>
                            <li class="open-book__li" v-for="(item,i) of card.comments" v-bind:key="i"
                                v-bind:quote="item">
                                <div class="open-book__img"> 
                                    <img src="../assets/img/user.png"/>
                                </div>
                                <div class="open-book__content">
                                <span>{{item.text}}</span>
                                <div class="open-book__buttons">
                                    <button v-on:click="setQuoteMain(item)">👍<div>51</div></button>
                                    <button class="dislike" v-on:click="setQuoteMain(item)">👎<div>5</div></button>
                                </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </form>
            </template>
        </modal-window>

    </div>
</template>

<script>
    import Card from "@/components/card"
    import tableItem from "@/components/table-item"
    import ModalWindow from "@/components/modal"
    import Stars from "@/components/stars"
    import API, {APIServiceResource} from "@/services/APIServiceResource"


    const isScrolledIntoView = (el) => {
        const rect = el.getBoundingClientRect();
        const elemTop = rect.top;
        const elemBottom = rect.bottom;
        return (elemTop >= 0) && (elemBottom <= window.innerHeight);
    }

    export default {
        data() {
            return {
                isOpen: false,
                title: '',
                author: '',
                mark: 0,
                quotes: [],
                quote: '',
                card: {},
                search: '',
                page: 1,
                perPage: 9,
                pages: [],

            }
        },
        components: {
            Card,
            ModalWindow,
            Stars,
            tableItem
        },
        computed: {
            displayedPosts() {
                return this.paginate(this.cards);
            }
        },
        props: ["cards", "isCardMapping"],
        directives: {
            scroll: {
                inserted(element, binding) {
                    const cb = (e) => {
                        if (binding.value(e, element)) {
                            window.removeEventListener('load', cb)
                            window.removeEventListener('keyup', cb)
                            window.removeEventListener('scroll', cb)
                            window.removeEventListener('mousemove', cb)
                        }
                    }
                    window.addEventListener('load', cb)
                    window.addEventListener('keyup', cb)
                    window.addEventListener('scroll', cb)
                    window.addEventListener('mousemove', cb)
                }
            }
        },
        methods: {
            onPageDown(e, element) {
                if (isScrolledIntoView(element)) {
                    element.setAttribute(
                        'style',
                        'opacity: 1'
                    )
                }
                return isScrolledIntoView(element)
            },

            async changeMark(newMark) {
                this.card.mark = newMark;
                const index = this.cards.indexOf(this.card)
                try {
                    const res = await API.updateResource(APIServiceResource.ResourceType.books, this.card._id, this.card)
                    await this.cards.splice(index, 1, res.json())

                } catch (e) {
                    console.error("Error while fetching: " + e.toString());
                }
            },
            async onAddQuoteInExistingBook() {
                this.card.quotes.push(this.quote)
                await this.changeQuotes()
                this.quote = ''
            },
            async deleteCard(id) {
                this.cards = this.cards.filter(book => book._id !== id);

                try {
                    await API.deleteResource(APIServiceResource.ResourceType.books, id);
                } catch (e) {
                    console.error("Error while fetching: " + e.toString());
                }
            },
            async deleteQuote(item) {
                this.card.quotes = this.card.quotes.filter(quote => quote !== item);
                await this.changeQuotes()
            },
            async changeQuotes() {
                let index = this.cards.indexOf(this.card)
                try {
                    const res = await API.updateResource(APIServiceResource.ResourceType.books, this.card._id, this.card)
                    await this.cards.splice(index, 1, res.json())

                } catch (e) {
                    console.error("Error while fetching: " + e.toString());
                }
            },
            setMark(newMark) {
                this.mark = newMark
            },
            async setQuoteMain(item) {
                this.card.quotes = this.card.quotes.filter(quote => quote !== item);
                this.card.quotes.unshift(item)
                await this.changeQuotes()
            },

            onAddQuote() {
                this.quotes.push(this.quote)
                this.quote = ''
            },

            showModal() {
                this.$refs.addBookModal.show = true
                this.isOpen = !this.isOpen
                window.document.body.classList.add("modal-active")
            },
            openMore(id) {
                this.card = this.cards.find(item => item._id === id)
                this.$refs.openBookModal.show = true
                this.isOpen = !this.isOpen
                window.document.body.classList.add("modal-active")
            },
            async onSubmit() {
                if (this.title.trim()) {
                    const newCard = {
                        title: this.title,
                        quote: this.quote
                    }

                    try {
                        const res = await API.createResource(APIServiceResource.ResourceType.books, newCard)
                        await this.cards.push(await res.json())
                    } catch (e) {
                        console.error("Error while fetching: " + e.toString());
                    }

                    this.title = ""
                    this.author = ""
                    this.quotes = []
                    this.mark = 0
                    this.quote = ''

                }
            },

            setPages() {
                let numberOfPages = Math.ceil(this.cards.length / this.perPage);
                this.pages = [];
                for (let index = 1; index <= numberOfPages; index++) {
                    this.pages.push(index);
                }
            },
            paginate(cards) {
                let page = this.page;
                let perPage = this.perPage;
                let fromq = (page * perPage) - perPage;
                let to = (page * perPage);
                return cards.slice(fromq, to);
            },

        },

        watch: {
            cards() {
                this.setPages();
            }
        },
    }


</script>

<style lang="less" scoped>
    .article__body {
        text-align: left;
        font-size: 1.7rem;
        margin-bottom: 5rem;
        margin-top: 5rem;
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
            top: 93rem;
            left: 50%;
            margin-bottom: 10rem;
            transform: translateX(-50%);
            position: absolute;
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
    .edit-button{
        background:none;
    }
.head{
    background: #b9d4c278;
}
    .books-container {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;

        .card-container {
            opacity: 0;
            transform: translateZ(0);
            backface-visibility: hidden;
            width: 24%;
            margin-right: 1.3%;
            margin-bottom: 3rem;
            transition: 1.3s all cubic-bezier(0.39, 0.575, 0.565, 1);

            @media (max-width: 768px) {
                margin-right: 2.3%;
                width: 47.5%;

            }
        }


        .card-container:nth-child(2n) {
            transition-delay: 0.1s;
        }

        .card-container:nth-child(3) {
            transition-delay: 0.3s;

        }

        .card-container:nth-child(n+3):nth-child(4n-1) {
            transition-delay: 0.3s;

        }

        .card-container:nth-child(4n) {
            margin-right: 0;
            transition-delay: 0.4s;
        }

    }

    .add-card {
        position: fixed;
        border-radius: 50%;
        bottom: 15rem;
        left: 6rem;
        padding: 1rem 1.8rem;
        color: white;
        font-size: 3rem;
        background: #477251;
        cursor: pointer;
        transition: 1.5s;
        box-shadow: 0 0 0.3rem 2.5rem #4772519e, 0 0 0.3rem 4.1rem #4772513b, 0 0 0.3rem 1.2rem #477251cc;
    }

    .add-card:hover {
        box-shadow: 0 0 0.3rem 2.5rem #477251cc, 0 0 0.3rem 4.1rem #4772519e, 0 0 0.3rem 5.3rem #47725131, 0 0 0.3rem 1.2rem #477251f1;
    }


</style>