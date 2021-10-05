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
        margin-bottom: 5rem;
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



        textarea {
            height: auto;
            min-height: 8rem;
        }

        .score {
            margin: 4rem 2rem;
            justify-content: flex-end;
        }

        .mark-container {
            display: flex;
            justify-content: start;
            border-bottom: 1px solid #d4d4d4;
            border-top: 1px solid #d4d4d4;
            align-items: center;
            margin-bottom: 3rem;

            span {
                font-size: 1.9rem;
            }
        }

        ul {
            margin: 1rem 0 3rem 0;
        }

        li {
            text-align: initial;
            list-style: inside circle;
            font-size: 1.9rem;
            width: 100%;
            margin: 0.5rem 0;
            display: block;

            &:first-letter {
                text-transform: uppercase;
            }
        }
        .open-book__li::before {
            content: '°';
            padding-top: 0.7rem;
            font-size: 2.5rem;
        }
        .open-book__li {
            width: 100%;
            display: flex;
            margin-bottom:3rem;

            span {
                width: 80%;
                padding: 0.2rem 1rem;
                min-height: 4.5rem;
                display: block;

                &:first-letter {
                    text-transform: uppercase;
                }
            }

            button {
                opacity: 0;
                width: 10%;
                border: none;
                background: #f7ebcf;
                color: tan;
                font-size: 2.7rem;
                transition: 1s;
            }

            .delete-quote__button {
                color: #ffefef;
                font-size: 1.6rem;
                background: #ff7575;
            }
        }

        .open-book__li:hover {

            button {
                opacity: 1;
            }

            button:hover {
                color: #ffd94f;
            }

            .delete-quote__button:hover {
                color: white;
            }
        }
        .open-book__li:first-child{
            button {
                color: #ffd94f;
            }

            .delete-quote__button {
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