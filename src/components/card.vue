<template>
    <div class="flipcard h" v-on:click="openMore">
        <div class="card front" :class="{card_link: card.link }">
            <a  v-if="card.link" :href="card.link" target="_blank">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="card_link__img">
                <path d="M16.6643 12.7782V17.4447C16.6643 17.8573 16.5005 18.2529 16.2088 18.5446C15.9172 18.8363 15.5216 19.0002 15.1091 19.0002H6.55525C6.14277 19.0002 5.74719 18.8363 5.45552 18.5446C5.16386 18.2529 5 17.8573 5 17.4447V8.88948C5 8.47694 5.16386 8.08129 5.45552 7.78958C5.74719 7.49787 6.14277 7.33398 6.55525 7.33398H11.221" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14.332 5H18.9978V9.66642" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10.4453 13.555L18.9991 5" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </a>

            <p class="title">{{card.title}}</p>
            <p class="subtitle">{{card.author.name}} {{card.author.lastname}}<span v-if="card.other_authors"> и др.</span></p>
            <p v-if="!card.link" class="preview" v-html="card.text"></p>
            <div class="actions">
                <div class="card__likes">
                <div class="star" :class="{'liked':isUserLikedArticle()}">★</div>
                <span class="card__like-count">{{card.likeList.length}}</span>
                </div>
                <div class="actions__date">
                    <div class="more-img-container">
                    <img src="../assets/img/gray-time.svg" alt="actions"/>
                </div>
                <p>{{convertDate(card.date)}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                isDeleteClicked: false,
                userMark: false,
            }
        },

        props: ["card", 'user'],

        methods: {
            deleteBook() {
                this.isDeleteClicked = !this.isDeleteClicked
                this.$emit('delete-card', this.card.id);
            },
            isUserLikedArticle() {
               let exist = {};
                exist = this.card.likeList.find((i)=>{return i.id === this.user.id});
                return exist === undefined ? false : Object.keys(exist).length === 0 ? false : true;
            },
            openMore() {
                this.$emit('open-more', this.card.id);
            },
            firstLetterToUppercase(str){
                return str[0].toUpperCase() + str.slice(1)
            },
            convertDate(date) {
                const formattedDate = new Date(date * 1000)
                const month = (formattedDate.getMonth()+1) < 10 ? '0'+(formattedDate.getMonth()+1) : formattedDate.getMonth();
                const day= formattedDate.getDate() < 10 ? '0'+formattedDate.getDate() : formattedDate.getDate();
                return `${day}.${month}.${formattedDate.getFullYear()}`;
            }
        },

    }
</script>

<style lang="less">

    .card {
        background: #f9f9f9e6;
        box-shadow: 10px 9px 18px 10px rgba(207, 207, 207, 27%);
        -webkit-box-shadow: 10px 9px 18px 10px rgba(207, 207, 207, 27%);
        -moz-box-shadow: 10px 9px 18px 10px rgba(207, 207, 207, 27%);
        width: 100%;
        height: 100%;
        position:relative;
        cursor: pointer;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        border-radius: 1rem;
        align-items: flex-start;
        padding: 4.5rem 3rem 4rem;

        &_link {
            background-color: #f4fef4;

            &__img {
                stroke: #79997f;
                position: absolute;
                top: 1.2rem;
                left: auto;
                right: 1.5rem;
                
            }
        }
        .star {
            color: #dcdcdc;
            cursor: pointer;
            margin-left: 10px;
            font-size: 3.5rem;
            transition: .2s;
        }

        .liked.star {
            color: #272727;
        }

        .actions__date {
            display: flex;
            align-items: center;

            p {
                color: #a6b2c8d8;
                font-size: 1.5rem;
            }
        }

        .preview {
            font-size: 1.4rem;
            color: #7d8075;
            text-align: left;
            max-height: 120px;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;  
            overflow: hidden;

            & p:first-letter {
                text-transform: uppercase;
            }
        }
        .card__likes{
            display: flex;
            align-items: center;
        }

        .card__like-count{
            font-size: 1.5rem;
            margin-top: 3px;
            margin-left: 10px;
        }

        .score {
            cursor: default;
            opacity: 0.8;

            .star {
                cursor: default;
            }
        }

        .actions {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 80%;
            position: absolute;
            bottom: 2.5rem;
        }

        .title {
            text-align: left;
            font-size: 2.2rem;
            font-weight: 600;
            color: #27382b;
            text-transform: lowercase;
            margin-bottom: 0.3rem;
            display: -webkit-box;
            line-height: 1.5;
            -webkit-line-clamp: 5;
            -webkit-box-orient: vertical;  
            overflow: hidden;

            &:first-letter {
                text-transform: uppercase;
            }

            @media (max-width: 768px) {
                font-size: 2.3rem;
            }
        }

        .subtitle {
            text-align: left;
            @media (max-width: 768px) {
                font-size: 1.8rem;
            }
        }

        .quotes li {
            font-size: 1.4rem;
            color: #7d8075;
            margin-bottom: 1rem;
            overflow: hidden;
            line-clamp: 2;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            line-height: 2.2rem;
            text-align: initial;

            @media (max-width: 768px) {
                font-size: 1.6rem;
            }
        }

        .delete-button {
            visibility: hidden;
            opacity: 0;
            align-self: flex-end;
            color: white;
            border-radius: 50%;
            background-color: #ff00008a;
            cursor: pointer;
            position: absolute;
            top: 1.3rem;
            left: 89%;
            font-size: 1rem;
            transition: 1s all cubic-bezier(0.39, 0.575, 0.565, 1);
            width: 2.5rem;
            height: 2.5rem;
            line-height: 2.4rem;
        }

        .delete-button:hover {
            background-color: rgba(211, 14, 14, 0.85);
        }

        .subtitle {
            color: #818479;
            font-size: 1.5rem;
            margin-bottom: 2.2rem;
            text-align: left;
        }

        .more-img-container {
            width: 1.5rem;
            margin-right: 0.5rem;

            img {
                cursor: pointer;
                width: 100%;
            }
        }


    }

    .button-container {
        display: flex;
        width: 100%;
        justify-content: space-between;
        padding: 1.5rem 3rem;
        height: 7rem;
    }

    .button {
        border-radius: 1rem;
        border: 1px solid #272727;
        height: 100%;
        box-shadow: 10px 9px 18px 10px rgba(207, 207, 207, 27%);
        -webkit-box-shadow: 10px 9px 18px 10px rgba(207, 207, 207, 27%);
        -moz-box-shadow: 10px 9px 18px 10px rgba(207, 207, 207, 27%);
        width: 40%;
        display: flex;
        cursor: pointer;
        justify-content: center;
        align-items: center;
    }

    .button:hover {
        background: rgba(62, 62, 62, 0.1);
    }

    .button-delete {
        background: #ff4141;
    }

    .button-delete:hover {
        background: #d73939;
    }

    .flipcard {
        position: relative;
        perspective: 500px;
        width: 100%;
        transition: 1.3s all cubic-bezier(0.39, 0.575, 0.565, 1);
        height: 32rem;
    }

    .deleteSide .front {
        transform: rotateY(180deg);
    }

    .flipcard.h .back {
        transform: rotateY(-180deg);
    }

    .deleteSide.h .back {
        transform: rotateY(0deg);
    }

    .flipcard .front, .flipcard .back {
        position: absolute;
        box-sizing: border-box;
        transition: all 0.5s ease-in;
        backface-visibility: hidden;
        padding: 3.7rem 3rem 4.7rem;
        z-index: 1;
    }

    .flipcard .back {
        height: 32rem;
        width: 100%;
        display: flex;
        box-shadow: 10px 9px 18px 10px rgba(207, 207, 207, 27%);
        -webkit-box-shadow: 10px 9px 18px 10px rgba(207, 207, 207, 27%);
        -moz-box-shadow: 10px 9px 18px 10px rgba(207, 207, 207, 27%);
        justify-content: center;
        flex-direction: column;
        background: #f9f9f9e6;
        border-radius: 2rem;
        align-items: center;
    }

    .card:hover .delete-button {
        visibility: visible;
        opacity: 1;
    }


</style>