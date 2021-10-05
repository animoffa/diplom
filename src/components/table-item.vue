<template>
    <div class="table-item">
        <div class="table-title">
            {{card.title}}
        </div>
        <div class="author">
            {{card.author}}
        </div>
        <div class="stars">
            <Stars v-bind:mark="card.mark" @change-mark="changeMark"></Stars>
        </div>
        <div class="delete-button" v-on:click="deleteBook" >
            <div> ╳</div>
        </div>
        <div class="edit-button" v-on:click="openMore">

        </div>
    </div>
</template>
<script>
    import Stars from "@/components/stars"

    export default {
        data() {
            return {

            }
        },
        components: {
            Stars
        },
        props: ["card"],
        methods: {
            changeMark(newMark) {
                this.$emit('change-mark', newMark, this.card._id);
            },
            deleteBook() {
                this.isDeleteClicked = !this.isDeleteClicked
                this.$emit('delete-card', this.card._id);
            },
            openMore() {
                this.$emit('open-more', this.card._id);
            }
        },

    }
</script>
<style lang="less">
    .table-item {
        display: flex;
        justify-content: space-between;
        font-size: 2rem;
        padding: 2rem 0 1rem;
        background: #ffffff61;
        align-items: center;
        border-bottom: 1px solid lightgray;

        * {
            width: 30%;
            word-wrap: break-word;
        }

        .stars {
            width: 20%;
        }

        .delete-button {
            width: 10%;
            cursor: pointer;
            display:flex;
            justify-content:center;
        }
        .delete-button:hover {
            div {
                transition: 1.2s;
                transform: rotate(180deg);
            }
        }

        .edit-button {
            cursor: pointer;
            width: 10%;
            min-width: 3rem;
            min-height: 3rem;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAEEklEQVR4nO2bSYgUVxjHfzPtuBt1cEEdTfAwgnoybsxBZPAQF1AGB0UFVxAUFRcMYg4qogfRy6AiIREUUQzERBGX0UuMggtuuK+oiaJExcg40XZsD9+U71XbU1Wt/VVZnf5BQdP9r57//1VNvfe+9xoKFChQoECB/y2JqA140AooA94AyYi9hEYJsAS4BqQaj3fAGWAqUBSdNX06A6cxwTMdB4HWURnUJAH8iXd459gTkUdV5hIsvHOMjsamDu2BJ2TXAL9G4lSJtWQXPgXcj8SpAh2BV2TfAM9yZaA4V1/0ibQEmn/CeY9yZSDqBngETAAeZnneEQUvkdIWWAPU43/7J4HyaGzq0xPYhncDbIzMXY5oBxwALgMDm9BUAhf5OPxzZMQYa9ZjAm320DUD5gD/WPpF6u6UKQdeYwJVBTinFFiGhI/6of3Z7MeEP0aez+7SGYEJ3wB8G62dcCkBrmAaYIuPfghwA+nv2+haC4cFBH+SlyA9hKMfpe5OmU7I2N0JtNBHP9/Svmg8P9ZswgS6ilzhpijF3e0tVnenTF9k6OoEGumj32xpbwItVN2FwCFMoH0+2n64Gyv2VZ8qTJjXQB8f/WFLX6trTZ/mSDfmBFrnox9vaZPI3RBrlmECPUbqfk3RErhj6Teou1OmK9J9OYFm+eh/sLRPkZ4g1mzFBDqL9/JbD+ClpZ+t7k6ZAcg43wk0zEe/3dJeQqbAsaUI+AMTaKePfiiy7ufoh6u6C4HJmDCvgK89tEXASUu/W92dMq2Ae5hAK3z00yxtPfCNqrsQWIkJ9ADvKWxb4G9Lv0rdnTJlQB0m0EQfvb0U9hd5MN/fhQl0HO8yV2/ctf/J6u6UqcA8yRuAQT763zDhTxDzmmAxcAoT6EcffaWlbQAGq7oLgZmYQP8C3Ty0CdwLHT+ru1OmHbKg6QRa4qOfR/DGigV2t3cL78pNR9xlru/V3SlTinu2N9ZHX0PwxooFyzGBTuH9JE8vc41TdxcC1wl+9WstbezLXCDL2Xalx2v6Os7SJoH+6u5CYCnBNip8hXtyVKNvLRz2YUJVe+h+snRPyIMyl8NdTLCyJjSzLU2QyVFsSCBb11PAf2R++o+xNCngl9DchUB3TLA7GT6vxr374zwy988b+mHCnbHeTwCrcRdD7wG9wjaoTQUm4NHG98qRrS72//x18jA8yEYFJ+ReZAKUvs/3KNAlKoPaTMI9n7eDJ5EJ0pf8G6SMZLMQ0cF6bW9XuwTMQH7ukk45MlzO5fa2d8DvyOKrTTFykQB2IBcmp9gLnimku1uJ927v22nn5Oq4leFvTbE+D1xrzOYOuG29PgdMBy5kcf4XSTYNsBsZ/BQjA5y3Ac75DhkJ5rL0XYdUotNxbvsgy3IfeA+10KdH2qoQhAAAAABJRU5ErkJggg==) no-repeat center;
            background-size: 3rem;
            height: 100%;
        }
        .score {
            position: relative;
            z-index:-1;
        }
    }

    .table-item:hover {
        background: #eaf3edab;
    }

</style>