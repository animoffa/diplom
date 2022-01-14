<template>
    <div class="profile">
        <div class="profile__main">
            <div class="profile__photo">
                <!-- ../assets/img/userBig.png -->
                <img v-if="content.img" :src="content.img"/>
                <img v-else src="../assets/img/userBig.png"/>
                <button class="profile-button modal-button img-btn" @click="$refs.upload.click()" v-show="!showEdit">Изменить фото</button>
                <input v-if="!showEdit" id="file-input" type="file" style="display:none" name="name" accept="image/png, image/jpg, image/jpeg" ref="upload"  @change="uploadImage"/>
            </div>
            <div class="profile__main-info">
                <div class="field"><strong v-show="showEdit">{{content.name}}</strong><input v-show="!showEdit" v-model="content.name" autocomplete="off"/></div>
                <div class="field"><strong v-show="showEdit">{{content.lastname}}</strong><input v-show="!showEdit" v-model="content.lastname" autocomplete="off"/></div>
                <p>Дата рождения: <span v-show="showEdit">{{birthday ? birthday : (content.birthday && convertDate(content.birthday))}}</span><input v-show="!showEdit" :value="birthday" @input="birthday = $event.target.value; content.birthday = $event.target.value" autocomplete="off" v-mask="'##.##.####'"/></p>
                <p>Компания: <span v-show="showEdit">{{content.company}}</span><input v-show="!showEdit" v-model="content.company" autocomplete="off"/></p>
                <p>Должность: <span v-show="showEdit">{{content.status}}</span><input v-show="!showEdit" v-model="content.status" autocomplete="off"/></p>
            </div>
            </div>
            <div class="profile__full-info">
                <p>E-mail: <a v-show="showEdit" :href="'mailto:'+content.email">{{content.email}}</a><input v-show="!showEdit" v-model="content.email" autocomplete="off"/></p>
                <p>Телефон: <a v-show="showEdit" :href="'tel:'+content.phone">{{content.phone}}</a><input v-show="!showEdit" v-model="content.phone" autocomplete="off"/></p>
                <p>Адрес: <span v-show="showEdit">{{content.address}}</span><input v-show="!showEdit" v-model="content.address" autocomplete="off"/></p>
                <p>Количество статей: <span >{{countOfArticle}}</span></p>
                <p>О себе: <span v-show="showEdit">{{content.about}}</span><textarea v-show="!showEdit" v-model="content.about" autocomplete="off"/></p>


                <!-- <div class="profile-button modal-button" v-if="!isFriendPage" @click="scrapeArticles">scrapping</div> -->
                <div class="rinc" v-if="!isFriendPage">
                    <p class="rinc__title">Введите свой spin-код для того, что бы получить доступ к своим публикациям включенным в РИНЦ</p>
                    <div class="rinc__content">SPIN-код: 
                    <span v-show="showEdit && content.spin">{{content.spin}}</span>
                <div class="rinc__input"><input v-model="content.spin" autocomplete="off"/><div class="profile-button modal-button"  @click="scrapping">найти</div></div></div>
        </div>
        </div>
        <button class="profile-button modal-button" @click="saveChanges" v-show="!showEdit">Сохранить</button>
        <div class="edit-button" v-if="!isFriendPage" @click="showEdit=!showEdit"/>
        
    </div>
</template>
<script>
    import AuthAPI from "@/services/APIServiceAuth.js"
    import API, {APIServiceResource} from "@/services/APIServiceResource.js"
    import {mapState} from 'vuex'
    import Vue from "vue"
    import VueMask from 'v-mask'
    import * as cheerio from 'cheerio'

    Vue.use(VueMask);

    export default {
        name: 'profile-component',
        data() {
            return {
                showEdit: "false",
                image_file: null,
                isFriendPage: false,
                friendId: 0, 
                birthday: '',
                eLibResponse: `<table width=580 cellspacing=0 cellpadding=3 id="restab" style="border-spacing: 0px 4px;">
<tr align=center valign=middle height=15>
<td width=34 class="midtext"><font color=#000000>&nbsp;<b>№</b></font></td>
<td width=24>&nbsp;</td>
<td width=364 class="midtext"><font color=#000000><b>Автор</b></font></td>
<td width=54 align=left class="midtext"><span title="Число публикаций автора в РИНЦ"><font color=#000000><b>Публ.</b></font></span></td>
<td width=24 class="midtext"><span title="Число цитирований публикаций автора из РИНЦ"><font color=#000000><b>Цит.</b></font></span></td>
<td width=44 class="midtext"><span title="Индекс Хирша автора в РИНЦ"><font color=#000000><b>Хирш</b></font></span></td></tr>
<tr><td colspan=6>
<div style="width: 574px;" class="table-line"></div>
</td></tr>
<tr><td colspan=6 height=0></td></tr>

<tr valign=top id="a33961" bgcolor=#f5f5f5>
<td align=center class="midtext select-tr-left"><font color=#00008f><div style="margin-top:8px;"><b>1.</b></div></font><br></td>
<td align=center><div style="margin-top:7px;"><input type=checkbox name="tid33961" id="tid33961"  onClick='if (document.getElementById("tid33961").checked) {RowSelect("a33961",1)} else {RowSelect("a33961",0)}'></div></td>
<td align=left class="midtext"><font color=#00008f><b>Панин&nbsp; Владимир&nbsp; Алексеевич</b></font><span class="aster" title="Автор зарегистрирован в SCIENCE INDEX">*</span>
<br>
Тульский государственный педагогический университет им. Л.Н. Толстого (Тула)
</td>


<td nowrap align=right class="midtext"><div style="margin-top:8px;"><a href="author_items.asp?authorid=33961&pubrole=100&show_refs=1&show_option=0" title="Список публикаций данного автора в РИНЦ">126</a><a href="author_profile.asp?id=33961" title="Анализ публикационной активности автора"><img src="/pic/stat.gif" width=12 height=13 hspace=10 border=0></a></div></td>
<td nowrap align=center class="midtext"><div style="margin-top:8px;"><a href="javascript:show_author_refs(33961)" title="Список цитирований работ данного автора из публикаций, входящих в РИНЦ">256</a></div></td><td nowrap align=center class="midtext select-tr-right"><div style="margin-top:8px;">7</div></td></tr>



<input type="hidden" id="hid33961" name="hid33961" value="Панин В А">

</table>`,
        eLibArticles: `<table width="580" cellspacing="0" cellpadding="3" id="restab" style="border-spacing: 0px 4px;">
<tbody><tr align="center" valign="middle" height="15">
<td width="24"><font color="#555555">&nbsp;<b>№</b></font></td>
<td width="514"><font color="#555555"><b>Публикация</b></font></td>
<td width="24"><span title="Число цитирований публикации в РИНЦ"><font color="#555555"><b>Цит.</b></font></span></td></tr>
<tr><td colspan="3">
<div style="width: 574px;" class="table-line"></div>
</td></tr>

<tr><td colspan="3" height="0"></td></tr>


<tr valign="middle" id="arw46539589">
<td align="center" valign="top" class="select-tr-left"><a name="x46539589"></a>
<font color="#00008f"><b>1.</b></font><br><input type="checkbox" name="tid46539589" id="tid46539589" onclick="if (this.checked) {RowSelect(&quot;arw46539589&quot;,1)} else {RowSelect(&quot;arw46539589&quot;,0)}"><div id="pdf_46539589" name="pdf_46539589"><a href="javascript:load_article(46539589)"><img src="/images/download_green.png" width="16" vspace="3" border="0" title="Доступ к полному тексту открыт"></a>

</div></td>
<td align="left" valign="top">

<a href="/item.asp?id=46539589"><b><span style="line-height:1.0;">МОДЕЛИРОВАНИЕ ПРОЦЕССА ВОЗБУЖДЕНИЯ ЭЛЕКТРОМАГНИТНЫХ КОЛЕБАНИЙ В ОТКРЫТОМ ВАКУУМНОМ РЕЗОНАТОРЕ</span></b></a><br><font color="#00008f"><i>Бобылев Ю.В., Панин В.А.</i></font><br>
<font color="#00008f">
 В сборнике: Алгебра, теория чисел, дискретная геометрия и многомасштабное моделирование: современные проблемы, приложения и проблемы истории.&nbsp;Материалы XIX Международной конференции, посвящённой 200-летию со дня рождения академика П.Л. Чебышёва. Тула, 2021.  С. 357-361.
</font></td><td align="center" valign="middle" class="select-tr-right">
0</td></tr>



<tr valign="middle" id="arw46539590">
<td align="center" valign="top" class="select-tr-left"><a name="x46539590"></a>
<font color="#00008f"><b>2.</b></font><br><input type="checkbox" name="tid46539590" id="tid46539590" onclick="if (this.checked) {RowSelect(&quot;arw46539590&quot;,1)} else {RowSelect(&quot;arw46539590&quot;,0)}"><div id="pdf_46539590" name="pdf_46539590"><a href="javascript:load_article(46539590)"><img src="/images/download_green.png" width="16" vspace="3" border="0" title="Доступ к полному тексту открыт"></a>

</div></td>
<td align="left" valign="top">

<a href="/item.asp?id=46539590"><b><span style="line-height:1.0;">ЧИСЛЕННОЕ МОДЕЛИРОВАНИЕ ВОЗБУЖДЕНИЯ ЭЛЕКТРОМАГНИТНЫХ КОЛЕБАНИЙ ОТКРЫТОГО ПЛАЗМЕННОГО РЕЗОНАТОРА</span></b></a><br><font color="#00008f"><i>Бобылев Ю.В., Мещерякова Т.Г., Панин В.А.</i></font><br>
<font color="#00008f">
 В сборнике: Алгебра, теория чисел, дискретная геометрия и многомасштабное моделирование: современные проблемы, приложения и проблемы истории.&nbsp;Материалы XIX Международной конференции, посвящённой 200-летию со дня рождения академика П.Л. Чебышёва. Тула, 2021.  С. 361-365.
</font></td><td align="center" valign="middle" class="select-tr-right">
0</td></tr>



<tr valign="middle" id="arw46115079">
<td align="center" valign="top" class="select-tr-left"><a name="x46115079"></a>
<font color="#00008f"><b>3.</b></font><br><input type="checkbox" name="tid46115079" id="tid46115079" onclick="if (this.checked) {RowSelect(&quot;arw46115079&quot;,1)} else {RowSelect(&quot;arw46115079&quot;,0)}"><div id="pdf_46115079" name="pdf_46115079"><a href="javascript:load_article(46115079)"><img src="/images/download_green.png" width="16" vspace="3" border="0" title="Доступ к полному тексту открыт"></a>

</div></td>
<td align="left" valign="top">

<a href="/item.asp?id=46115079"><b><span style="line-height:1.0;">ЮРИЙ ФИЛИППОВИЧ ГОЛОВНЁВ (К 80-ЛЕТИЮ)</span></b></a><br><font color="#00008f"><i>Бобылев Ю.В., Добровольский Н.М., Панин В.А., Плотников А.П., Реброва И.Ю., Нургулеев Д.А., Добровольский Н.Н.</i></font><br>
<font color="#00008f">
<a href="/contents.asp?id=46115058">Чебышевский сборник</a>. 
2021. 
Т. 22. <a href="/contents.asp?id=46115058&amp;selid=46115079">№&nbsp;2&nbsp;(78)</a>.  С. 366-372.
</font></td><td align="center" valign="middle" class="select-tr-right">
0</td></tr>



<tr valign="middle" id="arw46115082">
<td align="center" valign="top" class="select-tr-left"><a name="x46115082"></a>
<font color="#00008f"><b>4.</b></font><br><input type="checkbox" name="tid46115082" id="tid46115082" onclick="if (this.checked) {RowSelect(&quot;arw46115082&quot;,1)} else {RowSelect(&quot;arw46115082&quot;,0)}"><div id="pdf_46115082" name="pdf_46115082"><a href="javascript:load_article(46115082)"><img src="/images/download_green.png" width="16" vspace="3" border="0" title="Доступ к полному тексту открыт"></a>

</div></td>
<td align="left" valign="top">

<a href="/item.asp?id=46115082"><b><span style="line-height:1.0;">КОМПЬЮТЕРНОЕ МОДЕЛИРОВАНИЕ ВОЗБУЖДЕНИЯ ЭЛЕКТРОМАГНИТНЫХ КОЛЕБАНИЙ ОТКРЫТОГО ПЛАЗМЕННОГО РЕЗОНАТОРА</span></b></a><br><font color="#00008f"><i>Бобылев Ю.В., Мещерякова Т.Г., Панин В.А.</i></font><br>
<font color="#00008f">
<a href="/contents.asp?id=46115058">Чебышевский сборник</a>. 
2021. 
Т. 22. <a href="/contents.asp?id=46115058&amp;selid=46115082">№&nbsp;2&nbsp;(78)</a>.  С. 402-416.
</font></td><td align="center" valign="middle" class="select-tr-right">
0</td></tr>



<tr valign="middle" id="arw44390920">
<td align="center" valign="top" class="select-tr-left"><a name="x44390920"></a>
<font color="#00008f"><b>5.</b></font><br><input type="checkbox" name="tid44390920" id="tid44390920" onclick="if (this.checked) {RowSelect(&quot;arw44390920&quot;,1)} else {RowSelect(&quot;arw44390920&quot;,0)}"><div id="pdf_44390920" name="pdf_44390920"><a href="javascript:load_article(44390920)"><img src="/images/download_green.png" width="16" vspace="3" border="0" title="Доступ к полному тексту открыт"></a>

</div></td>
<td align="left" valign="top">

<a href="/item.asp?id=44390920"><b><span style="line-height:1.0;">ИСПОЛЬЗОВАНИЕ РАЗЛИЧНЫХ МАТЕМАТИЧЕСКИХ МЕТОДОВ ПРИ ОПИСАНИИ ЭЛЕКТРОДИНАМИЧЕСКИХ ПРОЦЕССОВ В ПУЧКОВО-ПЛАЗМЕННЫХ СИСТЕМАХ</span></b></a><br><font color="#00008f"><i>Панин В.А., Бобылев Ю.В., Мещерякова Т.Г.</i></font><br>
<font color="#00008f">
 В сборнике: Решение проблем учебно-методического обеспечения при реализации ФГОС ВО 3++.&nbsp;Материалы XLVII научно-методической конференции профессорско-преподавательского состава, аспирантов, магистрантов, соискателей ТГПУ им. Л.Н. Толстого. Под общей редакцией В.А. Панина. 2020.  С. 234-236.
</font></td><td align="center" valign="middle" class="select-tr-right">
0</td></tr>



<tr valign="middle" id="arw44367990">
<td align="center" valign="top" class="select-tr-left"><a name="x44367990"></a>
<font color="#00008f"><b>6.</b></font><br><input type="checkbox" name="tid44367990" id="tid44367990" onclick="if (this.checked) {RowSelect(&quot;arw44367990&quot;,1)} else {RowSelect(&quot;arw44367990&quot;,0)}"><div id="pdf_44367990" name="pdf_44367990"><a href="javascript:load_article(44367990)"><img src="/images/download_green.png" width="16" vspace="3" border="0" title="Доступ к полному тексту открыт"></a>

</div></td>
<td align="left" valign="top">

<a href="/item.asp?id=44367990"><b><span style="line-height:1.0;">НЕКОТОРЫЕ ВОПРОСЫ ЧИСЛЕННОГО МОДЕЛИРОВАНИЯ ПУЧКОВО-ПЛАЗМЕННОЙ НЕУСТОЙЧИВОСТИ</span></b></a><br><font color="#00008f"><i>Бобылев Ю.В., Панин В.А.</i></font><br>
<font color="#00008f">
 В сборнике: АЛГЕБРА, ТЕОРИЯ ЧИСЕЛ И ДИСКРЕТНАЯ ГЕОМЕТРИЯ: СОВРЕМЕННЫЕ ПРОБЛЕМЫ, ПРИЛОЖЕНИЯ И ПРОБЛЕМЫ ИСТОРИИ.&nbsp;Материалы XVIII Международной конференции, посвященной 100-летию со дня рождения профессоров Б. М. Бредихина, В. И. Нечаева и С. Б. Стечкина. Тула, 2020.  С. 431-435.
</font></td><td align="center" valign="middle" class="select-tr-right">
0</td></tr>



<tr valign="middle" id="arw44367993">
<td align="center" valign="top" class="select-tr-left"><a name="x44367993"></a>
<font color="#00008f"><b>7.</b></font><br><input type="checkbox" name="tid44367993" id="tid44367993" onclick="if (this.checked) {RowSelect(&quot;arw44367993&quot;,1)} else {RowSelect(&quot;arw44367993&quot;,0)}"><div id="pdf_44367993" name="pdf_44367993"><a href="javascript:load_article(44367993)"><img src="/images/download_green.png" width="16" vspace="3" border="0" title="Доступ к полному тексту открыт"></a>

</div></td>
<td align="left" valign="top">

<a href="/item.asp?id=44367993"><b><span style="line-height:1.0;">ЧИСЛЕННОЕ МОДЕЛИРОВАНИЕ ВОЗБУЖДЕНИЯ ЭЛЕКТРОМАГНИТНЫХ КОЛЕБАНИЙ ОТКРЫТОГО ВАКУУМНОГО РЕЗОНАТОРА</span></b></a><br><font color="#00008f"><i>Панин В.А., Бобылев Ю.В.</i></font><br>
<font color="#00008f">
 В сборнике: АЛГЕБРА, ТЕОРИЯ ЧИСЕЛ И ДИСКРЕТНАЯ ГЕОМЕТРИЯ: СОВРЕМЕННЫЕ ПРОБЛЕМЫ, ПРИЛОЖЕНИЯ И ПРОБЛЕМЫ ИСТОРИИ.&nbsp;Материалы XVIII Международной конференции, посвященной 100-летию со дня рождения профессоров Б. М. Бредихина, В. И. Нечаева и С. Б. Стечкина. Тула, 2020.  С. 441-445.
</font></td><td align="center" valign="middle" class="select-tr-right">
0</td></tr>



<tr valign="middle" id="arw44205062">
<td align="center" valign="top" class="select-tr-left"><a name="x44205062"></a>
<font color="#00008f"><b>8.</b></font><br><input type="checkbox" name="tid44205062" id="tid44205062" onclick="if (this.checked) {RowSelect(&quot;arw44205062&quot;,1)} else {RowSelect(&quot;arw44205062&quot;,0)}"><div id="pdf_44205062" name="pdf_44205062"><a href="javascript:load_article(44205062)"><img src="/images/download_green.png" width="16" vspace="3" border="0" title="Доступ к полному тексту открыт"></a>

</div></td>
<td align="left" valign="top">

<a href="/item.asp?id=44205062"><b><span style="line-height:1.0;">ОБ ИЗУЧЕНИИ ДИФРАКЦИИ ЭЛЕКТРОМАГНИТНЫХ ВОЛН В КУРСАХ ОБЩЕЙ И ТЕОРЕТИЧЕСКОЙ ФИЗИКИ В ПЕДАГОГИЧЕСКОМ ВУЗЕ</span></b></a><br><font color="#00008f"><i>Панин В.А., Бобылев Ю.В., Паршкова Т.Г.</i></font><br>
<font color="#00008f">
 В сборнике: НОВАЦИИ И ТРАДИЦИИ В ПРЕПОДАВАНИИ ФИЗИКИ: ОТ ШКОЛЫ ДО ВУЗА.&nbsp;Сборник материалов VI международной научно-практической конференции. Под общей редакцией В. А. Панина. 2020.  С. 86-89.
</font></td><td align="center" valign="middle" class="select-tr-right">
0</td></tr>



<tr valign="middle" id="arw44261660">
<td align="center" valign="top" class="select-tr-left"><a name="x44261660"></a>
<font color="#00008f"><b>9.</b></font><br><input type="checkbox" name="tid44261660" id="tid44261660" onclick="if (this.checked) {RowSelect(&quot;arw44261660&quot;,1)} else {RowSelect(&quot;arw44261660&quot;,0)}"><div id="pdf_44261660" name="pdf_44261660"></div></td>
<td align="left" valign="top">

<a href="/item.asp?id=44261660"><b><span style="line-height:1.0;">ЦИФРОВАЯ ПЛАТФОРМА ЭКОЛОГИЧЕСКОГО МОНИТОРИНГА ТУЛЬСКОЙ ОБЛАСТИ</span></b></a><br><font color="#00008f"><i>Панин В.А., Привалов А.Н., Варнавская С.Е.</i></font><br>
<font color="#00008f">
 В книге: Тезисы докладов 2-ой научно-практической конференции учёных России и Хорватии в Дубровнике.&nbsp;Сборник. Составители: Н.А. Коротченко, А.П. Кутовская
. Москва, 2020.  С. 94-95.
</font></td><td align="center" valign="middle" class="select-tr-right">
1</td></tr>



<tr valign="middle" id="arw44261661">
<td align="center" valign="top" class="select-tr-left"><a name="x44261661"></a>
<font color="#00008f"><b>10.</b></font><br><input type="checkbox" name="tid44261661" id="tid44261661" onclick="if (this.checked) {RowSelect(&quot;arw44261661&quot;,1)} else {RowSelect(&quot;arw44261661&quot;,0)}"><div id="pdf_44261661" name="pdf_44261661"></div></td>
<td align="left" valign="top">

<a href="/item.asp?id=44261661"><b><span style="line-height:1.0;">DIGITAL PLATFORM FOR ENVIRONMENTAL MONITORING OF THE TULA REGION</span></b></a><br><font color="#00008f"><i>Panin V., Privalov A., Varnavskaya S.</i></font><br>
<font color="#00008f">
 В книге: .&nbsp;Сборник. Составители: Н.А. Коротченко, А.П. Кутовская
. Москва, 2020.  С. 95-96.
</font></td><td align="center" valign="middle" class="select-tr-right">
0</td></tr>



<tr valign="middle" id="arw38534573">
<td align="center" valign="top" class="select-tr-left"><a name="x38534573"></a>
<font color="#00008f"><b>11.</b></font><br><input type="checkbox" name="tid38534573" id="tid38534573" onclick="if (this.checked) {RowSelect(&quot;arw38534573&quot;,1)} else {RowSelect(&quot;arw38534573&quot;,0)}"><div id="pdf_38534573" name="pdf_38534573"><a href="javascript:load_article(38534573)"><img src="/images/download_green.png" width="16" vspace="3" border="0" title="Доступ к полному тексту открыт"></a>

</div></td>
<td align="left" valign="top">

<a href="/item.asp?id=38534573"><b><span style="line-height:1.0;">APPLICATION OF GAME THEORY TO OPTIMIZE PARALLEL COMPUTING WHEN MODELING THE STRENGTH CHARACTERISTICS OF PRODUCTS OF ADDITIVE TECHNOLOGIES</span></b></a><br><font color="#00008f"><i>Panin V.A., Privalov A.N., Bogatyreva Yu.I.</i></font><br>
<font color="#00008f">
<a href="/contents.asp?id=38534559">Information Innovative Technologies</a>. 
2019. 
Т. 1. <a href="/contents.asp?id=38534559&amp;selid=38534573">№&nbsp;1</a>.  С. 76-83.
</font></td><td align="center" valign="middle" class="select-tr-right">
0</td></tr>



<tr valign="middle" id="arw35173830">
<td align="center" valign="top" class="select-tr-left"><a name="x35173830"></a>
<font color="#00008f"><b>12.</b></font><br><input type="checkbox" name="tid35173830" id="tid35173830" onclick="if (this.checked) {RowSelect(&quot;arw35173830&quot;,1)} else {RowSelect(&quot;arw35173830&quot;,0)}"><div id="pdf_35173830" name="pdf_35173830">
<a href="javascript:url_article(35173830, 1)" rel="nofollow"><img src="/images/download_blue.png" width="16" vspace="3" border="0" title="Полный текст доступен на внешнем сайте"></a>
</div></td>
<td align="left" valign="top">

<a href="/item.asp?id=35173830"><b><span style="line-height:1.0;">ФИЗИКИ - ТВОРЦЫ ЭЛЕКТРОМАГНЕТИЗМА</span></b></a><br><font color="#00008f"><i>Бобылев Ю.В., Грибков А.И., Панин В.А., Романов Р.В., Сидоров Г.В.</i></font><br>
<font color="#00008f">
иллюстрированный биографический справочник.Электронный ресурс / Тула, 2018. 
</font></td><td align="center" valign="middle" class="select-tr-right">
1</td></tr>



<tr valign="middle" id="arw35528760">
<td align="center" valign="top" class="select-tr-left"><a name="x35528760"></a>
<font color="#00008f"><b>13.</b></font><br><input type="checkbox" name="tid35528760" id="tid35528760" onclick="if (this.checked) {RowSelect(&quot;arw35528760&quot;,1)} else {RowSelect(&quot;arw35528760&quot;,0)}"><div id="pdf_35528760" name="pdf_35528760"><a href="javascript:load_article(35528760)"><img src="/images/download_green.png" width="16" vspace="3" border="0" title="Доступ к полному тексту открыт"></a>

</div></td>
<td align="left" valign="top">

<a href="/item.asp?id=35528760"><b><span style="line-height:1.0;">ФИЗИКО-МАТЕМАТИЧЕСКИЕ ИССЛЕДОВАНИЯ В ТГПУ ИМ. Л. Н. ТОЛСТОГО ЗА 80 ЛЕТ</span></b></a><br><font color="#00008f"><i>Панин В.А., Подрезов К.А., Реброва И.Ю.</i></font><br>
<font color="#00008f">
 В сборнике: Алгебра, теория чисел и дискретная геометрия: современные проблемы и приложения.&nbsp;Материалы XV Международной конференции, посвященной столетию со дня рождения профессора Николая Михайловича Коробова. 2018.  С. 51-53.
</font></td><td align="center" valign="middle" class="select-tr-right">
0</td></tr>



<tr valign="middle" id="arw35392660">
<td align="center" valign="top" class="select-tr-left"><a name="x35392660"></a>
<font color="#00008f"><b>14.</b></font><br><input type="checkbox" name="tid35392660" id="tid35392660" onclick="if (this.checked) {RowSelect(&quot;arw35392660&quot;,1)} else {RowSelect(&quot;arw35392660&quot;,0)}"><div id="pdf_35392660" name="pdf_35392660"><a href="javascript:load_article(35392660)"><img src="/images/download_green.png" width="16" vspace="3" border="0" title="Доступ к полному тексту открыт"></a>

</div></td>
<td align="left" valign="top">

<a href="/item.asp?id=35392660"><b><span style="line-height:1.0;">OPTIMIZATION OF THE SOFTWARE OF THE EXPERIMENTAL STAND FOR THE EVALUATION OF THE STRESS-STRAIN STATE OF THE PRODUCT OBTAINED USING ADDITIVE TECHNOLOGIES</span></b></a><br><font color="#00008f"><i>Panin V.A., An P., Bogatyreva Yu.I.</i></font><br>
<font color="#00008f">
<a href="/contents.asp?id=35392637">Information Innovative Technologies</a>. 
2018. 
<a href="/contents.asp?id=35392637&amp;selid=35392660">№&nbsp;1</a>.  С. 87-92.
</font></td><td align="center" valign="middle" class="select-tr-right">
0</td></tr>



<tr valign="middle" id="arw28858655">
<td align="center" valign="top" class="select-tr-left"><a name="x28858655"></a>
<font color="#00008f"><b>15.</b></font><br><input type="checkbox" name="tid28858655" id="tid28858655" onclick="if (this.checked) {RowSelect(&quot;arw28858655&quot;,1)} else {RowSelect(&quot;arw28858655&quot;,0)}"><div id="pdf_28858655" name="pdf_28858655"></div></td>
<td align="left" valign="top">

<a href="/item.asp?id=28858655"><b><span style="line-height:1.0;">ТЕРМОДИНАМИКА И МОЛЕКУЛЯРНАЯ ФИЗИКА В ЗАДАЧАХ</span></b></a><br><font color="#00008f"><i>Бобылев Ю.В., Грибков А.И., Панин В.А., Романов Р.В.</i></font><br>
<font color="#00008f">
учебное пособие / Тула, 2017. 
</font></td><td align="center" valign="middle" class="select-tr-right">
2</td></tr>



<tr valign="middle" id="arw29848138">
<td align="center" valign="top" class="select-tr-left"><a name="x29848138"></a>
<font color="#00008f"><b>16.</b></font><br><input type="checkbox" name="tid29848138" id="tid29848138" onclick="if (this.checked) {RowSelect(&quot;arw29848138&quot;,1)} else {RowSelect(&quot;arw29848138&quot;,0)}"><div id="pdf_29848138" name="pdf_29848138"></div></td>
<td align="left" valign="top">

<a href="/item.asp?id=29848138"><b><span style="line-height:1.0;">КРАТКИЙ КУРС МЕХАНИКИ</span></b></a><br><font color="#00008f"><i>Бобылев Ю.В., Грибков А.И., Панин В.А., Романов Р.В.</i></font><br>
<font color="#00008f">
учебное пособие / Тула, 2017. 
</font></td><td align="center" valign="middle" class="select-tr-right">
2</td></tr>



<tr valign="middle" id="arw32499566">
<td align="center" valign="top" class="select-tr-left"><a name="x32499566"></a>
<font color="#00008f"><b>17.</b></font><br><input type="checkbox" name="tid32499566" id="tid32499566" onclick="if (this.checked) {RowSelect(&quot;arw32499566&quot;,1)} else {RowSelect(&quot;arw32499566&quot;,0)}"><div id="pdf_32499566" name="pdf_32499566"></div></td>
<td align="left" valign="top">

<a href="/item.asp?id=32499566"><b><span style="line-height:1.0;">ЭЛЕКТРОДИНАМИКА КВАНТОВОЙ ПЛАЗМЫ</span></b></a><br><font color="#00008f"><i>Бобылев Ю.В., Кузелев М.В., Панин В.А.</i></font><br>
<font color="#00008f">
Тула, 2017. 
</font></td><td align="center" valign="middle" class="select-tr-right">
0</td></tr>



<tr valign="middle" id="arw30658502">
<td align="center" valign="top" class="select-tr-left"><a name="x30658502"></a>
<font color="#00008f"><b>18.</b></font><br><input type="checkbox" name="tid30658502" id="tid30658502" onclick="if (this.checked) {RowSelect(&quot;arw30658502&quot;,1)} else {RowSelect(&quot;arw30658502&quot;,0)}"><div id="pdf_30658502" name="pdf_30658502"><a href="javascript:load_article(30658502)"><img src="/images/download_green.png" width="16" vspace="3" border="0" title="Доступ к полному тексту открыт"></a>

</div></td>
<td align="left" valign="top">

<a href="/item.asp?id=30658502"><b><span style="line-height:1.0;">К ЛИНЕЙНОЙ ТЕОРИИ ВЫНУЖДЕННОГО ЧЕРЕНКОВСКОГО ИЗЛУЧЕНИЯ РЕЛЯТИВИСТСКИМ ЭЛЕКТРОННЫМ ПУЧКОМ ПРОДОЛЬНЫХ ВОЛНВ КВАНТОВОЙ ПЛАЗМЕ</span></b></a><br><font color="#00008f"><i>Бобылев Ю.В., Кузелев М.В., Панин В.А.</i></font><br>
<font color="#00008f">
 В сборнике: МНОГОМАСШТАБНОЕ МОДЕЛИРОВАНИЕ СТРУКТУР, СТРОЕНИЕ ВЕЩЕСТВА, НАНОМАТЕРИАЛЫ И НАНОТЕХНОЛОГИИ.&nbsp;сборник материалов IV международной конференции. Тульский государственный педагогический университет им. Л. Н. Толстого. 2017.  С. 116-120.
</font></td><td align="center" valign="middle" class="select-tr-right">
0</td></tr>



<tr valign="middle" id="arw44665274">
<td align="center" valign="top" class="select-tr-left"><a name="x44665274"></a>
<font color="#00008f"><b>19.</b></font><br><input type="checkbox" name="tid44665274" id="tid44665274" onclick="if (this.checked) {RowSelect(&quot;arw44665274&quot;,1)} else {RowSelect(&quot;arw44665274&quot;,0)}"><div id="pdf_44665274" name="pdf_44665274"></div></td>
<td align="left" valign="top">

<a href="/item.asp?id=44665274"><b><span style="line-height:1.0;">ПРОФИЛАКТИКА КОРРУПЦИОННЫХ ПРАВОНАРУШЕНИЙ В СТУДЕНЧЕСКОЙ СРЕДЕ (ИЗ ОПЫТА РАБОТЫ ТГПУ ИМ. Л.Н. ТОЛСТОГО)</span></b></a><br><font color="#00008f"><i>Панин В.А., Краюшкина С.В., Бутовский А.Ю.</i></font><br>
<font color="#00008f">
 В сборнике: Межведомственное взаимодействие при реализации мероприятий по противодействию коррупции в образовании.&nbsp;Материалы  Всероссийской научно-практической конференции. 2017.  С. 143-145.
</font></td><td align="center" valign="middle" class="select-tr-right">
0</td></tr>



<tr valign="middle" id="arw44665287">
<td align="center" valign="top" class="select-tr-left"><a name="x44665287"></a>
<font color="#00008f"><b>20.</b></font><br><input type="checkbox" name="tid44665287" id="tid44665287" onclick="if (this.checked) {RowSelect(&quot;arw44665287&quot;,1)} else {RowSelect(&quot;arw44665287&quot;,0)}"><div id="pdf_44665287" name="pdf_44665287"></div></td>
<td align="left" valign="top">

<a href="/item.asp?id=44665287"><b><span style="line-height:1.0;">ПРОФИЛАКТИЧЕСКАЯ РАБОТА ПО ПРОТИВОДЕЙСТВИЮ ИДЕОЛОГИИ ТЕРРОРИЗМА И ЭКСТРЕМИЗМА В МОЛОДЕЖНОЙ СРЕДЕ КАК СОСТАВНАЯ ЧАСТЬ КОМПЛЕКСНОЙ БЕЗОПАСНОСТИ ОБРАЗОВАТЕЛЬНОЙ ОРГАНИЗАЦИИ (ИЗ ОПЫТА РАБОТЫ ТГПУ ИМ. Л.Н. ТОЛСТОГО)</span></b></a><br><font color="#00008f"><i>Панин В., Краюшкина С., Бутовский А.</i></font><br>
<font color="#00008f">
 В сборнике: Комплексная безопасность образовательных организаций: теория и практика.&nbsp;Материалы Всероссийская научно-практической конференции. под общ. ред. М. В. Дулясовой ; Пущинский государственный естественно-научный институт. 2017.  С. 153-156.
</font></td><td align="center" valign="middle" class="select-tr-right">
0</td></tr>



</tbody></table>`
            }
        },
        mounted() {

            if (this.$route.query.tab) {
            if (this.$route.query.tab.includes('user')) {
                this.isFriendPage = true;
                this.friendId = this.$route.query.tab.slice(4);
            } else {
                this.isFriendPage = false;
            }
            }
        },
        computed: {
            ...mapState('client', ['user', 'allUsers']),
            ...mapState('articles', [
            'articles' 
            ]),
            content() {
                console.log(this.isFriendPage, 'this.isFriendPage')
                if (this.isFriendPage) {
                    console.log(this.allUsers.find(user => console.log(user.id,+this.friendId )), 'this.allUsers.find(user => user.id === this.friendId)')
                    return this.allUsers.find(user => user.id === +this.friendId)
                }
                return this.user;
            },
            countOfArticle() {
                return this.articles.filter(article => article.author.id === this.content.id).length
            }
        },
        methods: {
            // async getScrappingHtml() {
            //     this.isLoading = true;
            //     let data = '';
            //     var form_data = new FormData();
            //     const requestBody = {
            //     authors_all: '',
            //     pagenum: null,
            //     authorbox_name: null,
            //     selid: null,
            //     orgid: null,
            //     orgadminid: null,
            //     surname: null,
            //     codetype: 'SPIN',
            //     codevalue: '9042-5877',
            //     town: null,
            //     countryid: null,
            //     orgname: null,
            //     rubriccode: null,
            //     metrics: 1,
            //     sortorder: 0,
            //     order: 0
            //     }

            //     for ( var key in requestBody ) {
            //     form_data.append(key, requestBody[key]);
            //     }
            //     data = await API.createResource(APIServiceResource.ResourceType.scrapping, requestBody);
            //     console.log(await data);
            //     this.isLoading = false;
            // },
            async saveChanges() {
                this.isLoading = true;

                if (this.content.birthday && this.content.birthday.toString().includes('.')){
                    const date = this.content.birthday.split('.');
                    const dateForServ = new Date(date[2], date[1]==='12' ? '11' : date[1], date[0]);
                    this.content.birthday = dateForServ.toISOString();
                }

                await AuthAPI.editUser(this.content);
                this.isLoading = false;
                this.saveChanges();
            },
            uploadImage(event) {
                this.image_file = event.target.files[0];
                var reader = new FileReader();
                let src = '';
                reader.onloadend = function() {
                    src = reader.result;
                }
                reader.readAsDataURL(this.image_file);
                setTimeout(()=>{
                    this.$set(this.content, 'img', src);
                },200)
               
            },
            convertDate(date) {
                const formattedDate = new Date(date * 1000)
                const month = (formattedDate.getMonth()+1) < 10 ? '0'+(formattedDate.getMonth()+1) : formattedDate.getMonth();
                const day= formattedDate.getDate() < 10 ? '0'+formattedDate.getDate() : formattedDate.getDate();
                return `${day}.${month}.${formattedDate.getFullYear()}`;
            },
            scrapping() {

                const $ = cheerio.load(this.eLibResponse);
                const fio = $('#restab td[align="left"] font[color="#00008f"] b').text();
                const count = $('#restab a[title="Список публикаций данного автора в РИНЦ"]').text();
                const linkToArticles = $('#restab a[title="Список публикаций данного автора в РИНЦ"]').attr('href');
                const link = 'https://www.elibrary.ru/'+ linkToArticles;
                const name = fio.split(' ')[1];
                const lastName = fio.split(' ')[0];
                if (this.content.name.toLowerCase() !== name.replace(/\s/g, '').toLowerCase()) {
                    alert('инициалы не совпадают');
                }
                if (this.content.lastname.toLowerCase() !== lastName.replace(/\s/g, '').toLowerCase()) {
                    alert('инициалы не совпадают');
                }
                console.log(count, link, lastName, name);
                
            },
            async scrapeArticles() {
                const $ = cheerio.load(this.eLibArticles);
                const articles = $('#restab tr[valign="middle"] td[align="left"]');
                let parsedArticles=[];
                const now = new Date();

               for(let article of articles) {
                   parsedArticles.push({ 
                       author: this.content,
                       date: now.toISOString(),
                       title: article.children[1].children[0].children[0].children[0].data, 
                       text: article.children[6].children[0].data, 
                       link: article.children[1].attribs.href.split('\n').join(''), 
                       other_authors: articles[1].children[3].children[0].children[0].data 
                    })
               }
               
                console.log(parsedArticles);
                parsedArticles.forEach(async (article)=> {
                    try {
                        await API.createResource(APIServiceResource.ResourceType.articles, article)
                        this.$emit('fetch-cards');
                    } catch (e) {
                        console.error("Error while fetching: " + e.toString());
                    }
                })
                
            }
        }
       
    }
</script>
<style lang="less" scoped>
    .profile{
        position: relative;
        width:100%;

        &__main-info {
            input {
                width: 22rem !important;
            }
        }

        .rinc {
            background-color: rgba(223, 236, 223, 0.664);
            padding: 2rem 3rem;
            margin-top: 5rem;
            border-radius: 20px;
            width: 65%;
            border: 1px solid #47725157;

            &__title {
                font-size: 1.8rem;
                font-weight: bold;
                color: #283d2d;
                margin-bottom: 3rem;
            }

            &__content {
                display: flex;
                font-size: 1.5rem;
            }

            &__input {
                display: flex;

                .profile-button {
                    margin-top: 0;
                    padding: 0.5rem 1.2rem;
                    margin-left: 2rem;
                    font-size: 1.4rem;
                }

            }
        }

        &-button{
            margin-top: 5rem;
        }
        a {
            line-height: 145%;
            font-size: 1.9rem;
            margin-left: 1rem;
            bottom: 0.5rem;
            color:#27382b;
            transition:0.3s;
            cursor: pointer;
            position: relative;
            white-space: nowrap;
            &:hover{
                color:#3CB3E7;
                &::before{
                    width: 100%;
                }
            }

            &:after {
            background: transparent url('../assets/img/link-arrow-text_blue.svg') 0 0 no-repeat;
            background-size: 16px;
            content: " ";
            display: inline-block;
            height: 15px;
            margin-left: 0.5rem;
            width: 20px;
            box-sizing: border-box;
            }
            &:before {
                content: '';
                bottom: 0;
                display: block;
                position: absolute;
                width: 0;
                right: 0;
                height: 1px;
                background-color: #3CB3E7;
                transition: 0.3s ease;
            }

        }
        
        .field{
            display: flex;
            justify-content: flex-start;
            margin-bottom: 1rem;
            
        }
        input{
                margin:0rem;
                margin-bottom: 1rem;
                background: transparent;
                width: 35rem;
                height: 3rem;
            }
        textarea{
            margin:0rem;
            margin-bottom: 1rem;
            background: transparent;
            width: 55rem;
            height: 10rem;
              
        }
        .img-btn {
            position:absolute;
            bottom:0%;
            width: 100%;
            left: 50%;
            transform:translate(-50%, 0%);
            opacity: 0.5;
            margin-top: 0;
            transition: 0.3s;
            border-radius: 0;

            &:hover {
                opacity: 0.8;
            }
        }
        span{
            width:70%;
            font-size: 1.9rem;
            margin-left: 1rem;
        }
        .edit-button {
            cursor: pointer;
            width: 10%;
            position: absolute;
            top: 2rem;
            left: 95%;
            width: 3rem;
            height: 3rem;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAEEklEQVR4nO2bSYgUVxjHfzPtuBt1cEEdTfAwgnoybsxBZPAQF1AGB0UFVxAUFRcMYg4qogfRy6AiIREUUQzERBGX0UuMggtuuK+oiaJExcg40XZsD9+U71XbU1Wt/VVZnf5BQdP9r57//1VNvfe+9xoKFChQoECB/y2JqA140AooA94AyYi9hEYJsAS4BqQaj3fAGWAqUBSdNX06A6cxwTMdB4HWURnUJAH8iXd459gTkUdV5hIsvHOMjsamDu2BJ2TXAL9G4lSJtWQXPgXcj8SpAh2BV2TfAM9yZaA4V1/0ibQEmn/CeY9yZSDqBngETAAeZnneEQUvkdIWWAPU43/7J4HyaGzq0xPYhncDbIzMXY5oBxwALgMDm9BUAhf5OPxzZMQYa9ZjAm320DUD5gD/WPpF6u6UKQdeYwJVBTinFFiGhI/6of3Z7MeEP0aez+7SGYEJ3wB8G62dcCkBrmAaYIuPfghwA+nv2+haC4cFBH+SlyA9hKMfpe5OmU7I2N0JtNBHP9/Svmg8P9ZswgS6ilzhpijF3e0tVnenTF9k6OoEGumj32xpbwItVN2FwCFMoH0+2n64Gyv2VZ8qTJjXQB8f/WFLX6trTZ/mSDfmBFrnox9vaZPI3RBrlmECPUbqfk3RErhj6Teou1OmK9J9OYFm+eh/sLRPkZ4g1mzFBDqL9/JbD+ClpZ+t7k6ZAcg43wk0zEe/3dJeQqbAsaUI+AMTaKePfiiy7ufoh6u6C4HJmDCvgK89tEXASUu/W92dMq2Ae5hAK3z00yxtPfCNqrsQWIkJ9ADvKWxb4G9Lv0rdnTJlQB0m0EQfvb0U9hd5MN/fhQl0HO8yV2/ctf/J6u6UqcA8yRuAQT763zDhTxDzmmAxcAoT6EcffaWlbQAGq7oLgZmYQP8C3Ty0CdwLHT+ru1OmHbKg6QRa4qOfR/DGigV2t3cL78pNR9xlru/V3SlTinu2N9ZHX0PwxooFyzGBTuH9JE8vc41TdxcC1wl+9WstbezLXCDL2Xalx2v6Os7SJoH+6u5CYCnBNip8hXtyVKNvLRz2YUJVe+h+snRPyIMyl8NdTLCyJjSzLU2QyVFsSCBb11PAf2R++o+xNCngl9DchUB3TLA7GT6vxr374zwy988b+mHCnbHeTwCrcRdD7wG9wjaoTQUm4NHG98qRrS72//x18jA8yEYFJ+ReZAKUvs/3KNAlKoPaTMI9n7eDJ5EJ0pf8G6SMZLMQ0cF6bW9XuwTMQH7ukk45MlzO5fa2d8DvyOKrTTFykQB2IBcmp9gLnimku1uJ927v22nn5Oq4leFvTbE+D1xrzOYOuG29PgdMBy5kcf4XSTYNsBsZ/BQjA5y3Ac75DhkJ5rL0XYdUotNxbvsgy3IfeA+10KdH2qoQhAAAAABJRU5ErkJggg==) no-repeat center;
            background-size: 3rem;
        }
        &__main {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            &-info {
                margin-left: 5rem;
                margin-top:1rem;
                width:60%;
            }
        }
        &__photo{
            width:200px;
            height:200px;
            position: relative;
            overflow: hidden;
            border-radius: 20px;
            img {
                width: 100%;
                height: 100%;
                border-radius: 20px;
                object-fit: cover;
            }
        }
        &__full-info{
            margin-top: 5rem;
            margin-left: 5rem;
            
        }
    p {
        margin: 1rem 0;
        text-align: left;
        font-size: 1.7rem;
        align-items: flex-start;
        display: flex;
        input {
            margin-left: 1rem;
        }
    }
    strong {
        font-size: 3rem;
    }
    }
</style>