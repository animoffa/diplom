<template>
    <div class="score">
        <div class="star" :class="{'liked':mark}" v-on:click="setNewMark(mark)">★
        </div>
        <!-- <div class="star" data-item-value="4" v-on:click="setNewMark(4)">★
        </div>
        <div class="star" data-item-value="3" v-on:click="setNewMark(3)">★
        </div>
        <div class="star" data-item-value="2" v-on:click="setNewMark(2)">★
        </div>
        <div class="star" data-item-value="1" v-on:click="setNewMark(1)">★
        </div> -->
    </div>
</template>

<script>
    export default {

        props: ["mark"],
        methods: {
            setNewMark(newMark) {
                this.$emit('change-mark', newMark);
            }
        },

    }
</script>

<style lang="less">
    .score {
        display: inline-flex;
        justify-content: center;
        flex-direction: row-reverse;
        align-items: center;

        .star {
            color: #dcdcdc;
            cursor: pointer;
            font-size: 3.5rem;
            transition: .2s;
        }

        .star:hover, .star:hover ~ .star {
            color: #989898;
        }
    }

    .score.liked .star {
        color: #272727;
    }

</style>