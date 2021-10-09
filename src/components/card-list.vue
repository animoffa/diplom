<template>
    <div v-bind:class="{modalBack:isOpen}">
        <div class="books-container">
            <Card v-for="(card,i) in cards" v-bind:key="i" v-bind:card="card"
                  v-scroll="onPageDown" v-on:scroll="onPageDown"
                  @open-more="openMore" class="card-container"/>
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
                        <form @submit.prevent="addComment">
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
                                    <div class="mark-comment" @click="setLikeOnComment(item)">👍<div>{{item.likes}}</div></div>
                                    <div class="mark-comment dislike" @click="setDislikeOnComment(item)">👎<div>{{item.dislikes}}</div></div>
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
    import Stars from "@/components/stars"
    //import API, {APIServiceResource} from "@/services/APIServiceResource"


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

            }
        },
        components: {
            Card,
            ModalWindow,
            Stars,
        },

        props: ["cards"],
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
            setLikeOnComment(i) {
                this.card.comments.forEach((comment) => {
                   if (comment.text===i.text) {
                       comment.likes++;
                   }
                })
            },
            setDislikeOnComment(i) {
                this.card.comments.forEach((comment) => {
                   if (comment.text===i.text) {
                       comment.dislikes++;
                   }
                })
            },

            async changeMark(newMark) {
                this.card.userMark = newMark;
                // const index = this.cards.indexOf(this.card)
                // try {
                //     const res = await API.updateResource(APIServiceResource.ResourceType.books, this.card._id, this.card)
                //     await this.cards.splice(index, 1, res.json())

                // } catch (e) {
                //     console.error("Error while fetching: " + e.toString());
                // }
            },
            async addComment() {
                this.card.comments.push({text:this.quote})
                this.quote = ''
                // try {
                //     const res = await API.updateResource(APIServiceResource.ResourceType.books, this.card._id, this.card)
                //     await this.cards.splice(index, 1, res.json())

                // } catch (e) {
                //     console.error("Error while fetching: " + e.toString());
                // }
            },

            showModal() {
                this.$refs.addBookModal.show = true
                this.isOpen = !this.isOpen
                window.document.body.classList.add("modal-active")
            },
            openMore(id) {
                console.log(id);
                this.card = this.cards.find(item => item.id === id)
                this.$refs.openBookModal.show = true
                this.isOpen = !this.isOpen
                window.document.body.classList.add("modal-active")
            },
            async onSubmit() {
                if (this.title.trim()) {
                    const newCard = {
                        title: this.title,
                        text: this.quote
                    }
                    this.cards.push(newCard)

                    // try {
                    //     const res = await API.createResource(APIServiceResource.ResourceType.books, newCard)
                    //     await this.cards.push(await res.json())
                    // } catch (e) {
                    //     console.error("Error while fetching: " + e.toString());
                    // }

                    this.title = ""
                    this.quote = ''

                }
            },

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