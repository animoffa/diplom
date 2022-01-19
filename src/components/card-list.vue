<template>
    <div :class="{modalBack:isOpen}">
        <div class="books-container">
            <Card v-for="(card,i) in displayedPosts" :key="i" :card="card"
                  v-scroll="onPageDown" v-on:scroll="onPageDown"
                  @open-more="openMore" class="card-container" :user="user"/>
        </div>
        <div class="more-cards" id="more" @click="showMore" v-if="page < pages.length">Показать ещё</div>
        <div class="add-card" id="show-modal" @click="showModal">+</div>

        <modal-window ref="addBookModal">
            <template v-slot:title>
                <h3 class="modal-title">Новая статья</h3>
            </template>
            <template v-slot:body>
                <form @submit.prevent="onSubmit">
                    <div class="modal-body">
                        <input class="modal_input" placeholder="Название" v-model.trim="title"/>
                        

                        <ul v-for="(item,i) of quotes" :key="i" :quote="item">
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
                        <div class="subtitle"><a  :href="user.id ===item.author.id ? '/user?tab=profile':'/user?tab=user'+item.author.id"> {{card.author.name}} {{card.author.lastname}}</a></div>
                        <p class="article__body" v-html="card.text"></p>
                        <strong v-if="card.link" class="article__body">Полный текст статьи доступен <a :href="card.link" target="_blank">по ссылке</a></strong>
                        <div class="mark-container">
                            <div class="mark__my">
                                <span>Оцените статью: </span>
                                <div class="star" :class="{'liked':userMark}" @click="changeMark">★</div>
                            </div>
                            <div class="mark__our">
                                <span>Оценили {{card.likeList.length}} человек</span>
                            </div>
                        </div>
                        <form @submit.prevent="addComment">
                            <div class="textarea-container">
                    <textarea placeholder="Добавить комментарий" v-model="quote">
                    </textarea>
                                <button class="modal-button plus" type="submit">+</button>
                            </div>
                        </form>
                        <ul>
                            <li class="open-book__li" v-for="(item,i) of card.commentList" :key="i"
                            >
                                <div class="open-book__img">
                                    <img v-if="item && item.img" :src="item.img"/>
                                    <img v-else src="../assets/img/user.png"/>
                                </div>
                                <div class="open-book__content">
                                <p class="open-book__author"><a :href="user.id ===item.author.id ? '/user?tab=profile':'/user?tab=user'+item.author.id">{{item.author && item.author.name}} {{item.author && item.author.lastname}}</a></p>
                                <span>{{item.text.substr(1).slice(0, -1) }}</span>
                                <div class="open-book__buttons">
                                    
                                    <div class="open-book__date">
                                        <div class="more-img-container">
                                            <img src="../assets/img/gray-time.svg"/>
                                        </div>
                                        <p>{{formatDate(card.date)}}</p>
                                    </div>
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
    import ModalWindow from "@/components/modal"
    import API, {APIServiceResource} from "@/services/APIServiceResource"


    const isScrolledIntoView = (el) => {
        if (el) {
        const rect = el.getBoundingClientRect();
        const elemTop = rect.top;
        const elemBottom = rect.bottom;
        return (elemTop >= 0) && (elemBottom <= window.innerHeight);
        }
    }

    export default {
        data() {
            return {
                isOpen: false,
                title: '',
                author: '',
                mark: false,
                quotes: [],
                quote: '',
                card: {},
                search: '',
                page: 1,
                perPage: 20,
                pages: [],
                userMark: false,

            }
        },
        components: {
            Card,
            ModalWindow,
        },

        props: {
            cards: {
                type: Array,
                required: false,
            },
            user: {
                type: Object,
                default:()=> {}
            }
        },
        computed: {
            displayedPosts() {
                return this.paginate(this.cards);
            }
        },
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

        mounted() {
            this.onPageDown();
            this.setPages();
        },
        methods: {
            formatDate(date) {
                const newDate = new Date(date * 1000);
                return `${newDate.getDate()}.${newDate.getMonth() + 1 > 9 ? newDate.getMonth() + 1 : '0' + (newDate.getMonth() + 1)}.${newDate.getFullYear()}`;
            },
            isUserLikedArticle() {
                let exist = {};
                exist = this.card.likeList.find((i)=>{return i.id === this.user.id});
                this.userMark = exist === undefined ? false : Object.keys(exist).length === 0 ? false : true;
            },
            showMore() {
                this.page += 1;

            },
            onPageDown(e, element) {
                if (isScrolledIntoView(element)) {
                    element.setAttribute(
                        'style',
                        'opacity: 1'
                    )
                }
                return isScrolledIntoView(element)
            },

            async changeMark() {
                    const res = await API.updateResourceID(APIServiceResource.ResourceType.articles, this.card.id, {} );
                    this.card = await res.json();
                    this.userMark = !this.userMark;
                    this.$emit('fetch-cards');
            },

            async addComment() {
                const res = await API.updateResourceID(APIServiceResource.ResourceType.comment, this.card.id, this.quote  );
                    this.card = await res.json();
                    this.quote = ''
                    this.$emit('fetch-cards');
            },

            showModal() {
                this.$refs.addBookModal.show = true
                this.isOpen = !this.isOpen
                window.document.body.classList.add("modal-active")
            },
            openMore(id) {
                this.card = this.cards.find(item => item.id === id)
                this.$refs.openBookModal.show = true
                this.isOpen = !this.isOpen
                this.isUserLikedArticle();
                window.document.body.classList.add("modal-active")
            },
            async onSubmit() {
                if (this.title.trim()) {
                    const now = new Date();
                    
                 
                    const newCard = {
                        title: this.title,  
                        text: this.quote,
                        author: this.user,
                        date: now.toISOString(),
                    }

                    try {
                        await API.createResource(APIServiceResource.ResourceType.articles, newCard)
                        this.$emit('fetch-cards');
                    } catch (e) {
                        console.error("Error while fetching: " + e.toString());
                    }

                    this.title = ""
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
                //let fromq = (page * perPage) - perPage;
                let to = (page * perPage);
                return cards.slice(0, to);
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
    .more-cards{
        padding: 1.5rem 3rem;
        border: 1px solid #27382b;
        color: #27382b;
        border-radius: 3rem;
        font-size: 1.8rem;
        margin: 1rem auto;
        cursor: pointer;
        width: fit-content;
        &:hover {
            border: 1px solid #5a8664;
            color: #4c7255;
        }
    }
    .star {
            color: #dcdcdc;
            cursor: pointer;
            margin-left: 10px;
            font-size: 3.5rem;
            transition: .2s;
        }

    .star:hover, .star:hover ~ .star {
        color: #989898;
    }
    .more-img-container {
        margin-bottom: 3px;
        margin-right: 5px;
    }
    .liked.star {
        color: #272727;
    }
    .mark__my{
        display: flex;
        margin: 20px 0;
        align-items: center;
    }
    .article__body {
        text-align: left;
        font-size: 1.7rem;
        margin-bottom: 5rem;
        margin-top: 5rem;

        &:first-letter {
            text-transform: uppercase;
        }

        a {
            line-height: 145%;
            font-size: 1.9rem;
            margin-left: 1rem;
            bottom: 0rem;
            color:#27382b;
            transition:0.3s;
            cursor: pointer;
            position: relative;
            white-space: nowrap;

            &:hover{
                color:#54c552;
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
                background-color: #56d853;
                transition: 0.3s ease;
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
        transition: 0.7s;
        box-shadow: 0 0 0.3rem 2.5rem #4772519e, 0 0 0.3rem 4.1rem #4772513b, 0 0 0.3rem 1.2rem #477251cc;
    }

    .add-card:hover {
        box-shadow: 0 0 0.3rem 2.5rem #477251cc, 0 0 0.3rem 4.1rem #4772519e, 0 0 0.3rem 5.3rem #47725131, 0 0 0.3rem 1.2rem #477251f1;
    }


</style>