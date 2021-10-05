<template>
    <div id="app">
        <div class="img-container-bg">
            <img src="../src/assets/img/bg.png" alt="background, just background"/>
        </div>
        <router-view/>
    </div>
</template>


<style lang="less">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #1d2833;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 4.5rem;

    }
    .exit-ico{

        width: 3rem;
        height: 2.5rem;
        top: -0.7rem;
        position: absolute;

        @media (max-width:768px) {
            transform: scale(1.5);
            top: -0.3rem;
        }
    }

    .exit, .menu{
        position: absolute;
        left: 81%;
        top: 1.5rem;
        padding: 0.3rem 1.2rem;
        font-size: 1.5rem;
        color: #092114;
        border-radius: 2rem;
    }

    .mapping-buttons {
        position: absolute;
        display: flex;
        top: -3.2rem;
        transition: 1s;
        left: 50%;
        transform: translateX(-34%);

        button {
            border: none;
            background: transparent;
            font-size: 1.9rem;
            position: relative;
            height: 4rem;
            transition: 1s;
            border-bottom: 0.3rem solid #335129;
        }

        .activeButton {
            background: rgba(41, 62, 35, 0.18);
            height: 4.5rem;
            box-shadow: 10px 9px 15px 4px rgba(207, 207, 207, 0.22);
            -webkit-box-shadow: 10px 9px 15px 4px rgba(207, 207, 207, 0.22);
            -moz-box-shadow: 10px 9px 15px 4px rgba(207, 207, 207, 0.22);
        }
    }

    .mapping-buttons:hover {
        top: 0;
    }

    .h-line {
        width: 0.1rem;
        height: 2rem;
        background: #22331d;
    }

    .line {
        width: 8%;
    }

    .filtration {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        select {
            width: 20rem;
            border: none;
            background: #00000008;
            font-size: 1.6rem;
            margin-left: 3rem;
            padding: 0 2rem;
            position: relative;
            z-index: 11;
            appearance: none;
            height: 4rem;
            cursor: pointer;
            border-radius: 2rem;

            option {
                font-size: 1.7rem;
            }
        }

        .select-arrow {
            position: relative;
            left: -3rem;
            top: -0.2rem;
            z-index: 1;
            width: 1.5rem;

        }

        select:focus {
            border: none;
            outline: none;
        }

    }

    .search-input {
        border: none;
        background: url("../src/assets/img/search.svg") no-repeat center right;
        width: 20rem;
        height: 4rem;
        margin-right: 4rem;
        font-size: 1.8rem;
        position: relative;
        background-size: 2.5rem;
    }

    .search-input:focus {
        background: none;
        border-bottom: 1px solid #22331d;
        transition: width 1s;
    }

    html, body {
        scrollbar-color: #458245 #714826;
        scrollbar-width: thin;
    }

    ::-webkit-scrollbar {
        width: 7px;
        height: 7px; /* высота для горизонтального скролла */
        background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background-color: rgba(71, 114, 81, 0.77);
        border-radius: 9em;
        box-shadow: inset 1px 1px 10px rgba(55, 55, 55, 10%);
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: rgba(210, 210, 210, 0.96);
    }

    html {
        font-family: "Gilroy", sans-serif;
        font-size: 62.5%;
        font-style: normal;
        font-weight: 500;
        -webkit-animation: bugfix infinite 1s;
        line-height: 1.2;
        margin: 0;
        color: #272727;
        padding: 0;
        height: 100%;
    }

    * {
        font-size: 2.2rem;
        box-sizing: border-box;
        line-height: 3rem;
    }

    :root {
        --swiper-theme-color: black;
    }

    body {
        background: #f9f9f9;
    }

    body,
    input,
    textarea {
        font-family: "Gilroy", sans-serif;
        font-size: 62.5%;
        font-style: normal;
        font-weight: normal;
        -webkit-animation: bugfix infinite 1s;
        line-height: 1.2;
        position: relative;
        margin: 0;
        padding: 0;
    }

    select {
        font-family: "Gilroy", sans-serif;
    }

    a,
    a:hover {
        text-decoration: none;
    }

    .mobile {
        display: none;
    }

    button,
    input,
    a,
    textarea {
        outline: none;
        cursor: pointer;
    }

    button:focus,
    input:focus,
    a:focus,
    textarea:focus {
        outline: none;
    }

    button:active,
    input:active,
    a:active,
    textarea:active {
        outline: none;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        display: block;
        padding: 0;
    }

    h1 {
        font-family: serif;
        font-size: 4rem;
        margin-bottom: 0.5rem;

        @media (max-width: 768px) {
            font-size: 4.5rem;
            margin-top: 7rem;
        }

    }

    .h1,
    .h2,
    .h3,
    .h4,
    .h5,
    .h6 {
        display: block;
        padding: 0;
    }

    .des {
        font-size: 1.4rem;
        color: #68696d;
        line-height: 2rem;
        margin-bottom: 1rem;

        @media (max-width: 768px) {
            font-size:1.7rem;
        }
    }

    .m-hr {
        width: 100%;
        margin-bottom: 4rem;
        margin-top: 0.5rem;
    }

    .hr {
        width: 3%;
    }

    p {
        margin-top: 0;
        margin-bottom: 0;
    }

    img {
        max-width: 100%;
        vertical-align: middle;
    }

    ul {
        padding: 0;
        margin: 0;
    }

    ul li {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .img-container-bg {
        position: fixed;
        width: 25%;
        right: 0;
        bottom: 0;

        img {
            width: 100%;
        }
    }

    .container {
        width: 160rem;
        margin: 0 auto;
        position: relative;
        max-width: 100%;
        padding: 0 1% 0 4%;
    }

    .hidden {
        overflow: hidden;
    }

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance: textfield;
    }

    @media (max-width: 112em) {
        html {
            font-size: 9px;
        }
    }

    @media (max-width: 105em) {
        html {
            font-size: 8.75px;
        }
    }

    @media (max-width: 91.5em) {
        html {
            font-size: 7.9px;
        }
    }

    @media (max-width: 91em) {
        html {
            font-size: 8.4px;
        }
    }

    @media (max-width: 90em) {
        html {
            font-size: 7.9px;
        }
    }

    @media (max-width: 80em) {
        html {
            font-size: 7.2px;
        }
    }

    @media (max-width: 72em) {
        html {
            font-size: 6.5px;
        }
    }

    @media (max-width: 64em) {
        html {
            font-size: 5.5px;
        }
    }

    @media (max-width: 48em) {
        html {
            font-size: 10px;
            -webkit-text-size-adjust: none;
        }

        .mobile {
            display: block;
        }

        .container {
            margin: 0 auto;
            width: auto;
        }

        .button img {
            width: 10.2rem;
            padding-right: 3rem;
        }

    }

    @media (max-width: 44em) {
        html {
            font-size: 9px;
        }
    }

    @media (max-width: 38em) {
        html {
            font-size: 8px;
        }
    }

    @media (max-width: 34em) {
        html {
            font-size: 7px;
        }
    }

    @media (max-width: 30em) {
        html {
            font-size: 6px;
        }
    }

    @media (max-width: 26em) {
        html {
            font-size: 5.1px;
        }
    }

    @media (max-width: 22.5em) {
        html {
            font-size: 4.5px;
        }
    }

    @media (max-width: 21em) {
        html {
            font-size: 4.4px;
        }
    }
</style>
