<template>
    <div class="edit" :class="{modalBack:isOpen}">
    <div class="books-container-table">
            <tableItem v-for="(card,i) in displayedPosts" v-bind:key="i" v-bind:card="card"
                       @delete-card="deleteCard" @open-more="openMore"></tableItem>
            <nav class="pagination">
                <ul>
                    <li class="page-item">
                        <button type="button" class="page-link page-arrow prev" v-if="page !== 1" @click="page--"> ←
                        </button>
                    </li>
                    <li class="page-item">
                        <button type="button" class="page-link" v-for="pageNumber in pages.slice(page-1, page+5)"
                                v-bind:class="{activePage:page===pageNumber}" v-bind:key="pageNumber"
                                @click="page = pageNumber "> {{pageNumber}}
                        </button>
                    </li>
                    <li class="page-item">
                        <button type="button" @click="page++" v-if="page < pages.length"
                                class="page-link page-arrow next"> →
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
        <modal-window ref="addBookModal">
            <template v-slot:title>
                <h3 class="modal-title">Pедактирование</h3>
            </template>
            <template v-slot:body>
                <form @submit.prevent="onSubmit">
                    <div class="modal-body">
                        <input class="modal_input" placeholder="Название" v-model.trim="card.title"/>

                        <form @submit.prevent="onAddQuote">
                            <div class="textarea-container">
                                <ckeditor v-model="card.text" class="textarea-container__editor"></ckeditor>
                            </div>
                        </form>
                    </div>

                    <button class="modal-button" type="submit">Сохранить</button>
                </form>
            </template>
        </modal-window>
    </div>
</template>
<script>
import TableItem from "@/components/table-item"
import ModalWindow from "@/components/modal"

export default  ({

    components: {
        TableItem,
        ModalWindow
    },
    data() {
        return {
            pages: [],
            isOpen: false,
            card: {},
            cards: [
            {
                "id": 1,
                "title": "Асинхрнонный JS",
                "author": "Булгаков М.А.",
                "date": "12.12.2020",
                "genre": "Роман",
                "mark": 5,
                "userMark":3,
                "countOfMark":10,
                "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                "comments": [
                {text:"Тот, кто любит, должен разделять участь того, кого он любит.", likes:23, dislakes:1, author:""},
                "Да, человек смертен, но это было бы еще полбеды. Плохо то, что он иногда внезапно смертен, вот в чем фокус!",
                "зачем же гнаться по следам того, что уже окончено?"
                ]
            },
            {
                "id": 55,
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
            ],
            page: 1,
            perPage: 9,
        }
    },
    computed: {
        displayedPosts() {
                return this.paginate(this.cards);
        }
    },
    methods: {
        setPages() {
            let numberOfPages = Math.ceil(this.cards.length / this.perPage);
            this.pages = [];
            for (let index = 1; index <= numberOfPages; index++) {
                this.pages.push(index);
            }
         },
         async onSubmit() {
                // try {
                //     const res = await API.updateResource(APIServiceResource.ResourceType.books, this.card._id, this.card)
                //     await this.cards.splice(index, 1, res.json())

                // } catch (e) {
                //     console.error("Error while fetching: " + e.toString());
                // }
            },
         async deleteCard(id) {
                this.cards = this.cards.filter(book => {
                    console.log(id,book.id);
                   return book.id !== id});

                // try {
                //     await API.deleteResource(APIServiceResource.ResourceType.books, id);
                // } catch (e) {
                //     console.error("Error while fetching: " + e.toString());
                // }
            },
          paginate(cards) {
                let page = this.page;
                let perPage = this.perPage;
                let fromq = (page * perPage) - perPage;
                let to = (page * perPage);
                return cards.slice(fromq, to);
            },
            openMore(id) {
                this.card = this.cards.find(item => item._id === id)
                this.$refs.addBookModal.show = true
                this.isOpen = !this.isOpen
                window.document.body.classList.add("modal-active")
            },
    },
    mounted() {
        this.setPages()
    },
    watch: {
        cards() {
            this.setPages();
        }
    },
})
</script>
<style lang="less">
.edit{
    width:100%;
    height:64rem;
    position: relative;
    .pagination{
        margin-top:3rem;
    }
}
.books-container-table {
        display: flex;
        flex-direction: column;

        .page-link {
            font-size: 2rem;
            color: #22331d;
            padding: 0.5rem 1.5rem;
            font-weight: 500;
            background: #e9f1eca3;
            font-family: auto, serif;
            margin: 0.2rem;
            border: none;
        }
        .page-arrow {
            font-size: 1.9rem;
        }

        .activePage {
            font-weight: bold;
            background: #d5e4d9cc;
        }

        .prev {
            border-bottom-left-radius: 1.5rem;
            border-top-left-radius: 1.5rem;
        }

        .next {
            border-bottom-right-radius: 1.5rem;
            border-top-right-radius: 1.5rem;
        }

        .pagination {
            left: 50%;
            top: 99%;
            position: absolute;
            transform: translateX(-50%);
            margin-top: 2rem;

            ul {
                display: flex;
                justify-content: center;
            }

            @media (max-width: 768px) {
                top: 109rem;
            }
        }
    }
</style>