<template>
    <div>
        <!-- <template  v-if="isLoading">
           <Preloader/>
        </template> -->
        <template >
        <!-- <div class="mapping-buttons">
            <button v-on:click="isCardMapping=true" v-bind:class="{activeButton:isCardMapping}">Cards</button>
            <button v-on:click="isCardMapping=false" v-bind:class="{activeButton:!isCardMapping}">Table</button>
        </div> -->
        <div class="menu">
          <div class="title">
            <a href="/"><h1>quickDoc</h1></a>
          </div>
          <ul class="menu__nav">
                <li><a href="/user?tab=profile">Мой профиль</a></li>
                <!-- <li><a href="/user?tab=friends">Друзья</a></li> -->
                <li><a href="/user?tab=myArticles">Редактирование статей</a></li>
            </ul>
          <div class="actions">
            <div class="user">
                <div class="img">
                    <router-link to="/user" v-on:click="exit"><img src="../assets/img/user.png"/></router-link>
                </div>
                <p class="des un">имя</p>
            </div>
              <router-link class="route exit" to="/login" v-on:click="exit"><img src="../assets/img/exit.png" class="exit-ico"/>
              </router-link>
            </div>
        </div>
        <div class="container">
            <div class="filtration">
              <div class="filtration__left">
                <select v-model="sortList" class="main-select">
                    <option value="popular" selected>Популярные статьи</option>
                    <!-- <option value="friends">Статьи друзей</option> -->
                    <option value="my">Мои статьи</option>
                    <option value="new">Новые статьи</option>
                </select>
                <div class="select-arrow"><img src="../assets/img/arrow_custom.svg"/></div>
              </div>
              <div class="filtration__right">
                <input type="text" v-model.trim="search" class="search-input">
                <div class="h-line"></div>
                <select v-model="sortParam">
                    <option value="" hidden disabled selected>Сортировать..</option>
                    <option value="title">по названию</option>
                    <option value="author">по автору</option>
                    <option value="mark">по рейтингу</option>
                    <option value="titleLowFirst">по названию ↑</option>
                    <option value="authorLowFirst">по автору ↑</option>
                    <option value="markLowFirst">по рейтингу ↑</option>
                </select>
                <div class="select-arrow"><img src="../assets/img/arrow_custom.svg"/></div>
              </div>
            </div>
            <hr class="m-hr" v-show="isCardMapping"/>
            <CardList v-bind:cards="sortedList" v-bind:isCardMapping="isCardMapping"></CardList>
        </div>
        </template>
    </div>
</template>
<script>
    import CardList from "@/components/card-list"
    import ResourceAPI, {APIServiceResource} from "@/services/APIServiceResource.js"
    // import AuthAPI from "@/services/APIServiceAuth.js"
// import Preloader from "@/components/preloader"
    export default {
        data() {
            return {
                cards: [],
                search: '',
                sortParam: '',
                isCardMapping: true,
                sortList:'popular',
                user: '',
                isLoading: false,
                resourceFetchStatus: {},
                accountInfoFetchStatus: {}
            }
        },
        components: {
            CardList,
            // Preloader
        },

        async mounted() {
            // if (!localStorage.getItem("token")) {
            //     this.redirectToLogin();
            //     return;
            // }
            this.fetchResource();
            // this.fetchAccountInfo();
            //загрузка контента в зависимости от sortList

        },
        methods: {
            exit() {
                localStorage.removeItem("token");
            },
            async fetchResource() {
                this.isLoading = true;
                const response = await ResourceAPI.getResources(APIServiceResource.ResourceType.articles);
                this.cards = await response.json();
                console.log(this.cards);
                this.isLoading = false;
            },
            // async fetchAccountInfo() {
            //     this.isLoading = true;
            //     const responseAuth = await AuthAPI.getAuth();
            //     this.user = await responseAuth.json();
            //     this.isLoading = false;
            // },
            async redirectToLogin() {
                try {
                    await this.$router.push('/login');
                } catch (e) {
                    console.error("Error while fetching: " + e.toString());
                }
            }
        },
        computed: {
            articles() {
                return [
  {
    "id": 1,
    "title": "Асинхрнонный JS",
    "author": "Булгаков М.А.",
    "date": "12.12.2020",
    "mark": 5,
    "userMark":3,
    "countOfMark":10,
    "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "comments": [
      {text:"Тот, кто любит, должен разделять участь того, кого он любит.", likes:23, dislikes:1, author:{name:"Анастасия", lastName: "Фомина"}},
      "Да, человек смертен, но это было бы еще полбеды. Плохо то, что он иногда внезапно смертен, вот в чем фокус!",
      "зачем же гнаться по следам того, что уже окончено?"
    ]
  },
  {
    "id": 1,
    "title": "Асинхрнонный JS",
    "author": "Булгаков М.А.",
    "date": "12.12.2020",
    "genre": "Роман",
    "mark": 5,
    "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "comments": [
      {text:"Тот, кто любит, должен разделять участь того, кого он любит.", likes:23, dislakes:1},
      "Да, человек смертен, но это было бы еще полбеды. Плохо то, что он иногда внезапно смертен, вот в чем фокус!",
      "зачем же гнаться по следам того, что уже окончено?"
    ]
  },
  {
    "id": 3,
    "title": "Чертоги разума",
    "author": "А.Курпатов",
    "date": "2018",
    "publishedBy": "КопиБук",
    "genre": "Научпоп",
    "mark": 4,
    "quotes": [
      "Вы до сих пор думаете, что вы взаимодействуете с реальными другими людьми? Нет, конечно. Вы взаимодействуете с их образами в своих головах.",
      "Если мозг не тренировать в мелочах, то и со сложной задачей он не справится",
      "Что бы идеи рождались и комбинировались в вашей голове, они должны там быть, не в интернете, а проработаны в мозгу",
      "Преславутое богатство выбора делает нас все менее заинтересованными в конкретных людях",
      "Все знания, мысли и мечты, даже чувства, почерпнуты нами из культуры, мы сами - пустые сосуды.",
      "мы видим в человеке только то, что готовы увидеть, то, что соответствует созданным нами стереотипам, а потом удивлякемся, что он ведет себя не так",
      "Понимать людей - это знать, что им нужно",
      "то, что мы считаем картой своей жизни, на самом деле лишь программа, созданная обществом",
      "Изучая поведение других людей мы повышаем свой интеллект",
      "мы думаем, что взаимодействуем с другими людьми, но на самом деле мы лишь наблюдаем за тем, как это делает наш мозг",
      "мозг думает по одним и тем же шаблонам",
      "Информация, которая хранится в корковом отделе мозга постоянно изменятся",
      "Мы можем сколько угодно себя описывать, но действовать будем по ситуации, а не позову внутренних качеств",
      "люди постоянно меняются, что бы узнать какой человек сейчас - посмотрите на его отношения с людьми и как он в них оказался",
      "Ложное понимание опаснее непонимания"
    ]
  },
  {

    "title": "Красная таблетка",
    "author": "А.Курпатов",
    "mark": 4,
    "quotes": [
      "Чем человек счастливее, тем больше он склонен не считать свое мнение абсолютом",
      "Все вокруг уверены в том, что они заветный приз",
      "Сам по себе успех не приносит человеку счастья",
      "Искать признания - тупиковый путь",
      "Цель успешного человека - понять что нужно другим людям, просчитать это.",
      "Неврозы - следствие противоречий, которые мы создаем сами",
      "Если мы понимаем, что вся наша культура надумана и существует виртуально, то решаем много противоречий касаемо счастья",
      "Единственное, что на самом деле имеет значение в жизни - отношения с другими людьми, именно о них мы будем вспоминать перед смертью"
    ]
  },
  {
    "id": 5,
    "title": "Гении и аутсайдеры",
    "author": "М.Гладуэлл",
    "date": "2008",
    "publishedBy": "МИФ",
    "genre": "Психология",
    "mark": 4,
    "quotes": [
      "ключевым фактором талантливости является способность работать часами – до того момента, когда уже трудно разобрать, где заканчиваются природные способности и начинается готовность вкалывать",
      "Мы раньше срока скидываем со счетов людей, которых считаем бесперспективными. Мы слишком преклоняемся перед теми, кто добился успеха, и слишком легко отвергаем тех, кто потерпел неудачу.",
      "Именно эти три элемента – независимость, сложность и взаимосвязь усилий и награды – отличают работу, которая приносит удовлетворение.",
      "То, что мы называем талантом, является результатом сложного переплетения способностей, благоприятных возможностей и случайно полученного преимущества."
    ]
  },
  {
    "id": 6,
    "title": "Большие надежды",
    "author": "Ч.Диккенс",
    "date": "1860",
    "publishedBy": "",
    "genre": "Роман",
    "mark": 4,
    "quotes": [
      "Нет на свете обмана хуже, чем самообман.",
      "Не отступай перед трудностями. Смотри им прямо в лицо. Смотри, пока не одолеешь их."
    ]
  },
  {
    "id": 7,
    "title": "Униженные и оскорбленные",
    "author": "Ф.М.Достоевский",
    "date": "1861",
    "publishedBy": "АП",
    "genre": "Роман",
    "mark": 4,
    "quotes": [
      "Коли ты хочешь, чтоб тебя уважали, во-первых и главное, уважай сам себя; только этим, только самоуважением ты заставишь и других уважать себя.",
      "дурак, сознавшийся, что он дурак, есть уже не дурак!",
      "Сколько зла можно устранить откровенностью!",
      "Я заметил, что в тесной квартире даже и мыслям тесно."
    ]
  },
  {
    "id": 8,
    "title": "Гордость и предубеждение",
    "author": "Д.Остин",
    "date": "1813",
    "publishedBy": "АП",
    "genre": "Роман",
    "mark": 4,
    "quotes": [
      "и я с легкостью могла бы простить его гордость, если бы он не задел при этом мою.",
      "Нужно вспоминать только то, что доставляет радость.",
      "но каждый порыв чувств должно контролировать разумом."
    ]
  },
  {
    "id": 9,
    "title": "НИ СЫ",
    "author": "Д.Синсеро",
    "date": "2013",
    "publishedBy": "МИФ",
    "genre": "Саморазвитие",
    "mark": 4,
    "quotes": [
      "Если хочешь заполучить жизнь, которой никогда не жил, придется делать то, чего никогда не делал.",
      "Большинство людей живет в иллюзии, основанной на чужих убеждениях",
      "То, что думают о тебе другие, никак не связано с тобой – лишь с ними."
    ]
  },
  {
    "id": 10,
    "title": "Как завоёвывать друзей и оказывать влияние на людей",
    "author": "Д.Карнеги",
    "date": "1936",
    "publishedBy": "АП",
    "genre": "Саморазвитие",
    "mark": "4",
    "quotes": [
      "Поэтому оказывать влияние на других людей можно лишь одним способом — говорить о том, чего хотят они, и показывать им, как получить желаемое.",
      "Помните: на любом языке имя человека — самый сладостный и важный для него звук",
      "Единственный способ получить преимущество в споре — это уклониться от него"
    ]
  },
  {
    "id": 11,
    "title": "Подсознание может все",
    "author": "Д.Кехо",
    "date": "1987",
    "publishedBy": "АП",
    "genre": "Саморазвитие",
    "mark": 4,
    "quotes": [
      "СЕКРЕТЫ УСПЕШНОЙ ВИЗУАЛИЗАЦИИ Решите, чего вы хотите добиться. Расслабьтесь. На несколько минут отвлекитесь от дел и переведите дух, отдыхая телом и душой. В течение пяти-десяти минут мысленно представляйте желаемую реальность.",
      "Думайте так, будто каждая ваша мысль огромными огненными буквами написана на небе и видна каждому — так оно и есть",
      "Сознание творит действительность, а вы творите свое сознание",
      "Первый шаг к началу новой жизни на удивление прост: нужно всего лишь следить за течением своих мыслей и направлять их соответствующим образом."
    ]
  },
  {
    "id": 12,
    "title": "Думай и богатей",
    "author": "Н.Хилл",
    "date": "1937",
    "publishedBy": "АП",
    "genre": "Саморазвитие",
    "mark": 4,
    "quotes": [
      "Очень важно в качестве доминирующих сил разума стимулировать позитивные эмоции, избегая негативных.",
      "Наш разум не имеет пределов, за исключением тех, которые мы сами ему ставим",
      "Мечты сбываются тогда, когда сильное желание превращает их в конкретные действия. Попросите у жизни ее великолепные дары, и она их вам преподнесет",
      "все эмоционально окрашенные мысли в совокупности с верой немедленно начинают преобразовываться в физическую форму или нечто подобное ей"
    ]
  },
  {
    "id": 13,
    "title": "Красная таблетка-2",
    "author": "А.Курпатов",
    "date": "2020",
    "publishedBy": "АП",
    "genre": "Научпоп",
    "mark": 4,
    "quotes": [
      "только сложный путь дает шанс получить что-то по-настоящему ценное.",
      "Сказки об удаче, головокружительном успехе и вечном счастье, превращают детей в несчастных взрослых",
      "Наши желания нам предписаны, но наши знания - потенциально тот инструмент, который поможет с ними совладать.",
      "Знания отрезвляют.",
      "На самом деле мы не знаем подлинных значений слов, каждый из нас понимает под ними что-то свое, а все что мы можем знать о близких - гипотезы, которые плохо работают, впрочем, о себе мы знаем не больше.",
      "Уровень страдания и уровень счастья для кажого из нас +- константы, обусловденные биохимией нашего мозга.",
      "рай не наступит, когда твоя финальная цель будет достигнута, твои желания воскреснут с новой силой и это нормально."
    ]
  },
  {
    "id": 14,
    "title": "Психологическое айкидо",
    "author": "М.Литвак",
    "date": "1992",
    "publishedBy": "МИФ",
    "genre": "Психология",
    "mark": 4,
    "quotes": [
      "психологический конфликт идет до уничтожения. Или кто-то покидает поле боя, или развивается болезнь.",
      "во время шторма нельзя обучаться навигации",
      "хочешь чего-то добиться от человека - запрети ему это"
    ]
  },
  {
    "id": 15,
    "title": "Жизнь",
    "author": "Ги Де Мопассан",
    "date": "1883",
    "publishedBy": "АП",
    "genre": "Роман",
    "mark": 4,
    "quotes": [
      "Жизнь, что ни говорите, не так хороша, но и не так плоха, как о ней думают",
      "Разбитые иллюзии иногда оплакиваешь, как покойника",
      "два человека никогда не могут проникнуть друг другу в душу, в самую глубь мыслей, что они могут идти всю жизнь рядом, иногда тесно сплетаясь в объятиях, но никогда не сливаясь окончательно, и что нравственное существо каждого из нас остается вечно одиноким."
    ]
  },
  {
    "id": 16,
    "title": "Как выступать публично",
    "author": "Н.Непряхин",
    "date": "2012",
    "publishedBy": "МИФ",
    "genre": "Саморазвитие",
    "mark": 4,
    "quotes": [
      "Улыбайтесь, и этим все сказано",
      "Жесты и мимика дают куда больше впечатлений слушателям, чем то, что вы говорите"
    ]
  },
  {
    "id": 17,
    "title": "Тонкое искусство пофигизма",
    "author": "М.Мэнсон",
    "date": "2016",
    "publishedBy": "МИФ",
    "genre": "Саморазвитие",
    "mark": 4,
    "quotes": [
      "стремление к более позитивному опыту — само по себе негативный опыт. И, как ни парадоксально, принятие негативного опыта — позитивный опыт.",
      "Не надейся на жизнь без проблем, ее не существует. Надейся лучше на жизнь, полную хороших проблем"
    ]
  },
  {
    "id": 18,
    "title": "Эгоистичный ген",
    "author": "Р.Докинз",
    "date": "1967",
    "publishedBy": "МИФ",
    "genre": "Научпоп",
    "mark": 4,
    "quotes": [
      "Давайте попробуем учить щедрости и альтруизму, ибо мы рождаемся эгоистами.",
      "Сколько бы знаний и мудрости вы ни накопили в течение жизни, ни одна их капля не перейдет к вашим детям генетическим путем. Каждое новое поколение начинает на пустом месте. ",
      "Я утверждаю, что преобладающим качеством преуспевающего гена должен быть безжалостный эгоизм"
    ]
  }
]
            },

            filtredCards() {
                const searchByTitle = (item) => item.title.toUpperCase().indexOf(this.search.toUpperCase()) !== -1;
                const searchByAuthor = (item) => item.author.toUpperCase().indexOf(this.search.toUpperCase()) !== -1;
                return this.cards.filter(item => searchByTitle(item) || searchByAuthor(item));//заменить articles на то, что на самом деле приходит
            },
            sortedList() {
                const sortByTitle = (d1, d2) => {
                    return (d1.title.toLowerCase() > d2.title.toLowerCase()) ? 1 : -1;
                };
                const sortByAuthor = (d1, d2) => {
                    return (d1.author.toLowerCase() > d2.author.toLowerCase()) ? 1 : -1;
                };
                const sortByMark = (d1, d2) => {
                    return (d1.mark < d2.mark) ? 1 : -1;
                };
                switch (this.sortParam) {
                    case 'title':
                        return [...this.filtredCards].sort(sortByTitle);
                    case 'author':
                        return [...this.filtredCards].sort(sortByAuthor);
                    case 'mark':
                        return [...this.filtredCards].sort(sortByMark);
                    case 'titleLowFirst':
                        return [...this.filtredCards].sort(sortByTitle).reverse();
                    case 'authorLowFirst':
                        return [...this.filtredCards].sort(sortByAuthor).reverse();
                    case 'markLowFirst':
                        return [...this.filtredCards].sort(sortByMark).reverse();
                    default:
                        return this.filtredCards;
                }
            }
        },
        watch: {
          sortList() {
            this.$router.push({query: {list: this.sortList}})
            // запрос на новый список
          
          }
        }
    }
</script>

<style lang="less">
    .user {
        font-size: 1.8rem;
        margin-right: 1rem;
        width: 8rem;
        height:100%;
        margin-top: 1.3rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
     .menu__nav{
        display: flex;

        a{
            font-size: 1.7rem;
            margin: 0 2rem;
            color:#27382b;
        }
        a:hover{
            color:#47664e;
        }
    }

    .img {
        width: 3rem;
        height: 2.3rem;
        @media (max-width: 768px) {
            width: 4.5rem;
            height: 4.5rem;
        }
    }

    .un {
        font-size: 1.3rem;
        overflow: hidden;
        line-clamp: 1;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        @media (max-width: 768px) {
            font-size: 1.8rem;
        }

    }
</style>