<template>
    <div class="friend" @click="openFriendPage(user)">
        <div class="friend__photo">
                <img v-if="user && user.img" :src="user.img"/>
                <img v-else class="default" src="../assets/img/userBig.png"/>
        </div>
        <div class="friend__name title">
            {{user.name}} {{user.lastname}}
        </div>
        <div class="friend__count">
            Количество статей: {{countOfArticles}}
        </div>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                friend: {
                    name: 'fdfdf',
                    lastName:'fdfdfdf',
                }
            }
        },
        props: ["user", 'countOfArticles'],
        methods: {
            deleteFriend() {
                this.$emit('delete-card', this.user.id);
            },
            openFriendPage(id) {
                this.$emit('open-friend-page', id)
            }
        },

    }
</script>
<style lang="less">
    .friend {
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
        padding: 3.5rem 4rem 2.6rem;

        &__photo {
            width:100%;
            height: auto;
            margin-bottom: 20px;

            img {
                width: 100%;
                min-height: 165px;
                border-radius: 6px;
                object-fit: cover;
                &.default {
                    min-height: none;
                    height: auto;
                    object-fit: contain;
                    width: 60%;
                }
            }
        }

        &__count {
            font-size: 14px;
            color: #6b6b6b;
            margin-top: 2px;
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
            font-size: 2rem;
            font-weight: 600;
            color: #27382b;
            margin-bottom: 0.3rem;

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


</style>