<template>
    <transition name="modal">
        <div v-if="show" class="modal-shadow" @click.self="closeModal">
            <div class="modal">
                <div class="modal-close" @click="closeModal"> ╳</div>
                <slot name="title">
                    <h3 class="modal-title">Заголовок</h3>
                </slot>
                <slot name="body">
                    <div class="modal-content">
                        Дефолтный контент модального окна
                    </div>
                </slot>

            </div>
        </div>
    </transition>
</template>

<script>

    export default {
        name: "ModalWindow",
        data() {
            return {
                show: false
            }
        },
        methods: {
            closeModal: function () {
                this.show = false
                window.document.body.classList.remove("modal-active")
            }
        }
    }
</script>

<style lang="less">
    .modal-active {
        overflow: hidden;
    }

    .modal-title {
        font-size: 2.4rem;
        margin-bottom: 4rem;
    }

    .modal-shadow {
        position: fixed;
        top: 0;
        left: 0;
        min-height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.39);
    }

    .modal-enter-active, .modal-leave-active {
        transition: opacity 1.5s
    }

    .modal-enter, .modal-leave-to {
        opacity: 0
    }


    .modal {
        background: #fff;
        border-radius: 8px;
        padding: 2rem 8rem;
        width: 50%;
        position: fixed;
        left: 50%;
        transform: translate(-50%, -50%);
        top: 50%;
        max-height: 85%;
        overflow: auto;


        .textarea-container {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 3rem;

        }

        &-close {
            align-self: flex-end;
            color: white;
            border-radius: 50%;
            background-color: #ff00008a;
            cursor: pointer;
            position: absolute;
            top: 1.3rem;
            left: 95.5%;
            font-size: 1rem;
            transition: 1s all cubic-bezier(0.39, 0.575, 0.565, 1);
            width: 2.5rem;
            height: 2.5rem;
            line-height: 2.4rem;

        }

        &-close:hover {
            background-color: rgba(211, 14, 14, 0.85);
        }

        &-body {
            display: flex;
            flex-direction: column;
        }

        &-content {
            margin-bottom: 20px
        }


        &-button {
            background-color: #477251;
            color: #fff;
            border: none;
            text-align: center;
            padding: 0.8rem 2rem;
            font-size: 1.7rem;
            font-weight: 500;
            border-radius: 8px;
        }

        .plus {
            opacity: 0;
            font-size: 3rem;
            transition: 1.5s;
        }

        textarea:focus ~ .plus {
            opacity: 1;
        }
        .textarea-container__editor{
            padding-top:1rem;
            width: 100%;
        }


        textarea {
            height: auto;
            min-height: 15rem;
        }

        .score {
            margin: 4rem 2rem;
            justify-content: flex-end;
        }

        .mark-container {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #d4d4d4;
            border-top: 1px solid #d4d4d4;
            align-items: center;
            margin-bottom: 3rem;

            span {
                font-size: 1.9rem;
            }
            .mark__our{
                display: flex;
                justify-content: flex-start;
                flex-direction: column;
                span{
                    font-size: 1.7rem;
                    text-align: left;
                }
            }
        }

        ul {
            margin: 1rem 0 3rem 0;
        }

        li {
            text-align: initial;
            list-style: inside circle;
            font-size: 1.5rem;
            width: 100%;
            margin: 0.5rem 0;
            display: flex;
            padding-bottom: 15px;
            border-bottom: 1px solid #eeeeee;

            &:first-letter {
                text-transform: uppercase;
            }
        }
        .open-book__author {
            padding-left: 1rem;
            font-size: 15px;
            font-weight: 600;
            color: #477251;
        }
        .open-book__date {
            display: flex;
            align-items: center;

            p {
                color: #a6b2c8d8;
                font-size: 1.4rem;
            }
        }
        .open-book__content{
            width: 90%;
            margin-left: 3rem;
            display: flex;
            flex-direction: column;
        }
        .open-book__img {
            width: 5.5rem;
            height: 5.5rem;
        }
        .open-book__buttons{
            display: flex;
            justify-content: flex-end;
        }
        .open-book__li {
            width: 100%;
            display: flex;
            margin-bottom:3rem;

            span {
                width: 100%;
                font-size: 1.8rem;
                padding: 0.2rem 1rem 1.5rem;
                min-height: 4.5rem;
                display: block;

                &:first-letter {
                    text-transform: uppercase;
                }
            }
            

            .mark-comment {
                opacity: 0;
                width: 7%;
                background-color:transparent;
                border: none;
                display:flex;
                cursor: pointer;
                align-items: center;
                font-size: 1.7rem;
                transition: 1s;
                margin: 0 1.5rem;

                div {
                    margin-left: 1rem;
                    font-size: 1.4rem;
                    &:hover{
                        color: rgb(0, 128, 0);
                    }
                }
                &:last-child div:hover{
                    color: rgb(177, 0, 0);
                }
            }

            .delete-quote__button {
                color: #ffefef;
                font-size: 1.6rem;
                background: #ff7575;
            }
        }

        .open-book__li:hover {

            .mark-comment {
                opacity: 1;
            }


            .delete-quote__button:hover {
                color: white;
            }
        }
        .delete-quote__button:hover {
            div{
                transition:1.2s;
                transform: rotate(180deg);
            }


        }
        .title {
            text-align: initial;
            font-weight: 800;
            font-size: 2.5rem;
            margin: 6rem 0 2rem;
        }
        .subtitle{
            text-align: initial;
            font-size: 1.7rem;
        }
        .line {
            width: 40%;
            align-self: center;
            margin-bottom: 3rem;
        }

    }
    input, textarea {
        border: none;
        border-bottom: 1px solid #22331d;
        font-size: 1.7rem;
        font-weight: 400;
        background: white;
        padding: 0 2rem;
        height: 5rem;
        width: 95%;
        margin: 2.5rem 0;
    }
</style>