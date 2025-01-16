var head = document.head || document.getElementsByTagName('head')[0]
head.innerHTML += '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/victormono@latest/dist/index.min.css">'

//replace spacemono with victormono, replace barcode, translate CSS contents
var css = `
#dialogue-box.dialogue-click-proceed::after {
    content: "VVV КЛИКНИТЕ/НАЖМИТЕ ENTER ДЛЯ ПРОДОЛЖЕНИЯ VVV";
    display: block;
    width: 100%;
    text-align: center;
    animation: click-to-proceed 1s linear infinite;
}

#mindspike-scanner span.loose-thought::after {
    content: "..__НЕПОЛНАЯ_МЫСЛЕФОРМА__..";
    display: block;
    font-family: spacemono;
    letter-spacing: 0;
    font-size: 0.63rem;
    margin-top: -0.5em;
}

@font-face {
    font-family: 'spacemono';
    src: url('https://cdn.jsdelivr.net/gh/ArtyomBibikov/corru-russian/Fonts/Victor%20Mono/WOFF2/VictorMono-Regular.woff2') format('woff2'),
        url('https://cdn.jsdelivr.net/gh/ArtyomBibikov/corru-russian/Fonts/Victor%20Mono/WOFF/VictorMono-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'spacemono';
    src: url('https://cdn.jsdelivr.net/gh/ArtyomBibikov/corru-russian/Fonts/Victor%20Mono/WOFF2/VictorMono-Bold.woff2') format('woff2'),
        url('https://cdn.jsdelivr.net/gh/ArtyomBibikov/corru-russian/Fonts/Victor%20Mono/WOFF/VictorMono-Bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
}
.spacemono { font-family: spacemono, sans-serif }

@font-face {
    font-family: 'barcodetext';
    src: url('https://cdn.jsdelivr.net/gh/ArtyomBibikov/corru-russian/Fonts/LibreBarcode128Text-Regular-Russian.woff2') format('woff2'),
        url('https://cdn.jsdelivr.net/gh/ArtyomBibikov/corru-russian/Fonts/LibreBarcode128Text-Regular-Russian.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}
.barcodetext { font-family: barcodetext, sans-serif }

#meta-menu .moth-trigger:after { 
    content: "МТЛ"; 
    left: 0;
    right: 0;
    text-align: center;
    transition-delay: 0s;
}
#meta-menu .mask-trigger:after { content: "МАСКА" }
#mui-links #meta-obs:after { content: "СКН"; }
#mui-links #meta-sys:after { content: "НСТР"; }
#mui-links #meta-hub:after { content: "НАВ"; }
body[state="corru-loaded"][menu="none"]:not(.in-dialogue)::before, body.loading::after, body.corru-refreshing::after {
    content: "ВНИМАНИЕ::'Использование нейрошипа может вызвать судороги у людей с ФОТОСЕНСИТИВНОЙ ЭПИЛЕПСИЕЙ.';\\a'В игре присутствуют редкие вспышки света.';\\a'Сторонние расширения для рендера могут препятствовать операции.';\\a'Рекомендуется проявлять осторожность.'";
    font-family: 'Victor Mono', monospace;
    font-size: 0.75em;
    max-width: 600px;
    position: fixed;
    z-index: 1000;
    display: block;
    top: 10vh;
    background: var(--dark-color);
    padding: 0.25em;
    text-align: center;
    line-height: 1.25em;
    white-space: pre;
    pointer-events: none;
}
`

var style = document.createElement('style');
head.appendChild(style);

style.type = 'text/css';
if (style.styleSheet){
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}

processTranslation() // direct call so it takes effect right when the mod loads too

// observer for everything afterwards
env.mutateConfig = { childList: true, subtree: true }
env.mutateObserver = new MutationObserver(()=>processTranslation())
env.mutateObserver.observe(body, env.mutateConfig)

env.localization = {
     // 1: similar to env.localization.dialogues - but checked for dialogue objects before env.localization.dialogues if this is defined
    dialogues: {},

    // 2: hover text definitions
    definitions: {}, 

    // 3: misc text replacements - actor names, chatter, etc - used across many systems!
    // also can be automatically used for rote text replacement on-screen in hardcoded #content elements
    strings: {}, 

    // 4: for complex entity descriptions (i.e. embassy characters) you can specify their entity name here,
    // and the description you write for them will be used in place of their reuglar entity one
    // this is technically already supported by "strings", but it'll be easier to use this for those cases
    entityDescriptions: {},


    // finally, you can target a specific page with any of the same above objects by creating a "page" object for it
    page: { 
        "pageSpecificDialoguePrefix": { //dialogue prefix i.e. "sry" for /uncosm/sorry/, anything in here will only take effect on that page
            dialogues: {},
            definitions: {},
            strings: {},
            //...etc

            /*
                once this object is defined, if you don't feel like writing everything in here,
                you can get at this stuff via a shorthand like so:
                env.localization.page[`sry`].dialogues[`dead`] = generateDialogueObject(`... etc
            */
        }
    }
}

//gates
env.localization.strings["gate::for you"] = "врата::для тебя"
env.localization.strings["gate::the depths"] = "врата::глубины"
env.localization.strings["gate::their city"] = "врата::их город"
env.localization.strings["gate::their waters"] = "врата::их воды"
env.localization.strings["::DESTINATION::'low dimensional thoughtspace';'internal'"] = "::НАЗНАЧЕНИЕ::'низкоразмерное мыслепространство';'внутреннее'"
env.localization.strings["::INHERITED CONTEXT::"] = "::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::"
env.localization.strings["'their dead spires, icons of control'"] = "'их мёртвые шпили, символы контроля'"
env.localization.strings["'the domain of the"] = "обитель"
env.localization.strings["dead"] = "мертвецов"
env.localization.strings["NOTE::INHERITED CONTEXT::'implies altered living state'"] = "ПРИМЕЧАНИЕ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'подразумевает изменённое жизненное состояние'"
env.localization.strings["gate::the void"] = "врата::бездна"

//hardcoded stuff / actions
env.localization.strings["EXM"] = "СКАН"
env.localization.strings["ACT"] = "ДЕЙСТВ"
env.localization.strings["touch"] = "потрогать"
env.localization.strings["depth scan"] = "глубинное сканирование"
env.localization.strings["attempt connection"] = "пробное соединение"
env.localization.strings["lift"] = "поднять"

//names
env.localization.strings["moth"] = "мотылёк"
env.localization.strings["interloper"] = "вторженец"
env.localization.strings["akizet"] = "акизет"
env.localization.strings["gakvu"] = "гакву"
env.localization.strings["cavik"] = "кавик"
env.localization.strings["bozko"] = "бозко"
env.localization.strings["tozik"] = "тозик"
env.localization.strings["itzil"] = "итзил"
env.localization.strings["miltza"] = "милца"
env.localization.strings["funfriend"] = "весельдруг"
env.localization.strings["barfriend"] = "бардруг"
env.localization.strings["movefriend"] = "двигдруг"
env.localization.strings["movefoe"] = "двигвраг"

//objects and entities and whatnot
env.localization.strings["dendritic cyst"] = "дендритная киста"
env.localization.strings["cystic column"] = "кистичная колонна"
env.localization.strings["fractalline cyst"] = "фракталинная киста"
env.localization.strings["cyst"] = "киста"
env.localization.strings["connection point"] = "точка соединения"
env.localization.strings["our dull vessel"] = "наше судно далла"

//generic lines
env.localization.strings["HELLO INTERLOPER"] = "ПРИВЕТ ВТОРЖЕНЕЦ"
env.localization.strings["HI INTERLOPER"] = "ПРИВЕТ ВТОРЖЕНЕЦ"
env.localization.strings["hey buddy"] = "привет, приятель"
env.localization.strings["welcome back"] = "с возвращением"
env.localization.strings["what's up buddy?"] = "как ты, приятель?"
env.localization.strings["anything else?"] = "что-нибудь ещё?"

//menu
env.localization.strings["NOTE::"] = "ПРИМЕЧАНИЕ::"
env.localization.strings["'has no unutilized responses'"] = "'не имеет неиспользованных откликов'"
env.localization.strings["'has unutilized responses'"] = "'имеет неиспользованные отклики'"
env.localization.strings["''previously utilized response'"] = "'ранее использованный отклик'"
env.localization.strings["'response not yet utilized'"] = "'отклик ещё не использован'"
env.localization.strings["''response leads to unused responses'"] = "'отклик ведёт к неиспользованным откликам'"
env.localization.strings["(end chat)"] = "(закончить разговор)"
env.localization.strings["mindspike data management"] = "управление данными нейрошипа"
env.localization.strings["NOTE::'establishes external contact'"] = "ПРИМЕЧАНИЕ::'устанавливает внешний контакт'"
env.localization.strings["NOTE::'system management'"] = "ПРИМЕЧАНИЕ::'управление системой'"
env.localization.strings["NOTE::'review scanned and detected entities'"] = "ПРИМЕЧАНИЕ::'просмотр отсканированных и обнаруженных объектов'"
env.localization.strings["NOTE::'return to hub';'eject'"] = "ПРИМЕЧАНИЕ::'возврат в центр';'извлечение'"
env.localization.strings["NOTE::'influence thoughtspace';'third-party installation'"] = "ПРИМЕЧАНИЕ::'воздействуй на мыслепространство';'сторонняя установка'"

//generic moth dialogue

env.localization.dialogues["++moth"] = {
    start: {
        name: "start",
        body: [
            {
                actor: "moth",
                text: "как ты, приятель",
                texec: ()=> {return env.pageHasMothComment()}
            },
        ],

        responses: [
            {
                name: "self",
                replies: [
                    {
                        name: ()=>{return page.mothChat.startName},
                        destination: 'EXEC::changeDialogue(page.mothChat.getDest())',
                        showIf: [["EXEC::env.pageHasMothChat()"]],
                        hideRead: true
                    },
                    {
                        name: 'мне не по себе',
                        showIf: [["netstat|<", 0]],
                        destination: 'CHANGE::++mothfj',
                        hideRead: true
                    },
                    {
                        name: 'у меня есть вопросы',
                        destination: 'CHANGE::++mothglobal',
                        hideRead: true
                    },
                    {
                        name: "что дальше?",
                        destination: 'whatnext',
                        hideRead: true
                    },
                    {
                        name: `работаем дальше`,
                        destination: 'END'
                    }
                ]
            }
        ]
    },

    loop: {
        name: "loop",
        body: [],
        responses: [
            {
                name: "self",
                replies: [
                    {
                        name: ()=>{return page.mothChat.startName},
                        destination: 'EXEC::changeDialogue(page.mothChat.getDest())',
                        showIf: [["EXEC::env.pageHasMothChat()"]],
                        hideRead: true
                    },
                    {
                        name: 'у меня есть вопросы',
                        destination: 'CHANGE::++mothglobal',
                        hideRead: true
                    },
                    {
                        name: "что дальше?",
                        destination: 'whatnext',
                        hideRead: true
                    },
                    {
                        name: `работаем дальше`,
                        destination: 'END'
                    }
                ]
            }
        ]
    },

    whatnext: {
        name: "whatnext",
        body: [
            {
                actor: "moth",
                texec: ()=> {return env.localization.dialogues.mthglobalresp.whatnext()}
            },
        ],

        responses: [
            {
                name: "self",
                replies: [
                    {
                        name: "ясно",
                        destination: 'loop',
                        fakeEnd: "(назад)"
                    }
                ]
            }
        ]
    }
}

env.localization.dialogues.mthglobalresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        кто...<+>who
        что...<+>what
        почему...<+>why
        что ты обо всём этом думаешь?<+>mothep1end
            SHOWIF::[["ep1_end"], ["ENV!!ep3", false]]
        мнение о распаде?<+>ep3thoughts
            SHOWIF::"ENV!!ep3"
        пока всё<+>CHANGE::++moth
            FAKEEND::(назад)
`)

env.localization.dialogues[`++mothglobal`] = generateDialogueObject(`
start
    self
        У МЕНЯ ЕСТЬ ВОПРОСЫ

    moth
        давай, я постараюсь на них ответить
    
    RESPOBJ::mthglobalresp

loop
    RESPOBJ::mthglobalresp

who
    RESPONSES::self
        ты<+>who_you
        акизетеще<+>who_akizetesche
        гордон<+>who_gordon
            SHOWIF::[['citystreet__envoy-end']]
        велзи<+>who_velzie
            SHOWIF::[['dullvessel__fixed-start']]
        неважно<+>loop
            FAKEEND::(назад)

who_you
    self
        Кто ты?
    
    moth
        лол
        ок но серьёзно у тебя есть вопросы?
    
    RESPONSES::self
        наверное<+>loop
            FAKEEND::(назад)

who_akizetesche
    self
        Кто такая Акизетеще?
    
    moth
        она, наверное, одна из наиболее задокументированных контактов обеск
        насколько известно, под её руководством была команда, исследовавшая то, что привело обеск сюда
        в интервью она подробно об этом говорила, обеск это называли 'зовом'
        а потом спустя несколько лет после первого контакта они пропали без вести
        крипово
        невероятно, что эта коррукиста так долго продержалась
    
    RESPONSES::self
        интересно<+>loop
            FAKEEND::(назад)

who_gordon
    self
        Кто такой Гордон?
    
    moth
        хороший вопрос
        не могу найти точных совпадений, но он очевидно агент ФБК
        было бы неплохо, если киста акизет правильно запомнила его лицо
        надо будет позже вернуться к этому вопросу, может если мы раздобудем фамилию, будет легче
    
    RESPONSES::self
        удачи<+>loop
            FAKEEND::(назад)
who_velzie
    self
        Кто такая Велзи?
    
    moth
        в твоём логе нейрошипа это слово почему-то не перевелось
        но это приблизительно их эквивалент слову 'бог'
        да, похоже, твой нейрошип интерпретирует имя отдельно от его значения, что странно
        не знаю, с чем это связано...
        в общем, это скорее всего та штука, которая разгуливает по кисте
        может быть мыслеформа была испорчена некогерентностью и возомнила себя богом
    
    RESPONSES::self
        странно<+>loop
            FAKEEND::(назад)

what
    RESPONSES::self
        корру<+>what_corru
        коррукисты<+>what_corrucyst
        зов<+>what_thecall
            SHOWIF::[['interview1__firstchat-behonest']]
        улыбающееся лицо<+>what_smile
            SHOWIF::[['hello__sentry-posthello']]
        топливо для коррукисты<+>what_fuel
            SHOWIF::[['hub__funfriend-fuelthanks']]
        глаз велзи<+>what_eye
            SHOWIF::"exm|embassy|unkind eye"
        нейроядра<+>what_mindcores
            SHOWIF::"embassy__d3_person_enable-end"
        веилк<+>what_veilk
            SHOWIF::"exm|embassy|veilk models"
        секри<+>what_secri
            SHOWIF::"embassy__d2_bozkocavik-end"
        маски<+>what_masks
            SHOWIF::"ozo__council-task"
        ...если нам опасно всё это знать?<+>what_fbxlist
            SHOWIF::"ep1_end"
        неважно<+>loop
            FAKEEND::(назад)

what_masks
    self
        что такое маски
    
    moth
        это ты раскрываешь новые горизонты, приятель
        насколько я могу судить, они что-то вроде инструментов и оружия
        что-то, что эти мыслеформы каким-то образом высекли из воспоминаний акизет
        у них нет настоящей физической формы, иначе ты бы не смог их получить 
        плюс, они прошли прямо сквозь соединение и напрямую к тебе
        мои приборы их как-будто проигнорировали или не увидели
        мы наверное только что натолкнулись на новую область науки лол 
        мыслеформенная технология или типа того
        чем бы это ни было, это уже за пределами моей компетенции

    RESPONSES::self
        ок<+>loop
            FAKEEND::(назад)

what_secri
    self
        что такое секри?

    moth
        да ну, ты никогда не видел фильмы о <em>секри</em>?
        настоящие шедевры 40-х годов
        блин, я надеюсь, что никто из обеск их никогда не видел, они наверняка такие оскорбительные
        если ты серьёзно, то я на самом деле немного знаю об этих существах
        они по сути являются главными хищниками обеск
        как и почти вся фауна на обески, они паразиты
        или какая-то грибковая инфекция... доподлинно неизвестно
        и они микроскопичны, но как только они заражают живность на поверхности, или личиночного обеск...
        ну, у нас есть только описания на словах, так как инициатива по обмену не особо делилась воссозданиями процесса,
        но они якобы могут менять форму у плоти большинства живности, и управлять их мозгами, чтобы дальше распространяться
        жутко

    RESPONSES::self
        ок<+>loop
            FAKEEND::(назад)

what_eye
    self
        что такое глаз велзи?

    moth
        это особенность газового гиганта, с которым обески синхронно вращается
        обеск пользовались им, чтобы определять время
        некоторая часть обески поклоняется ему или презирает его как глаз бога
        учитывая, насколько их мир тёмный,
        и что у них в небе постоянно висит гигантское светящееся глазоподобное нечто
        неудивительно, что они пришли к такому выводу
        хотя мы не знаем, шторм ли это, или что-то ещё
        обеск говорили, что он светится через регулярные промежутки времени
        конечно, вероятно, что это просто отражение света от их звезды...
        но без фотографий, можно только гадать

    RESPONSES::self
        ясно<+>loop
            FAKEEND::(назад)   

what_veilk
    self
        что такое веилк?
    
    moth
        they basically cover the inhabitable surface of obeski
        kinda like how grass is all over earth i guess
        and... they can grow to the size of skyscrapers...
        they're apparently able to walk,
        uhh... they have a lot of legs...
        and when one dies, a whole ecosystem forms around its corpse
        which the obesk are a part of somehow
        ...
        sorry, i don't know that much about them honestly
        obeski ecology is not even close to my area of expertise
        i mostly study corrucystic stuff and obesk-human interactions
        a little culture here and there
        and don't get me wrong, the veilk are really important to them culturally,
        practically all their clothes are made out of veilk skin
        and their cave-cities rely on veilk-felling for food staples
        but we don't really have a great idea of how they actually work
        or even really how they actually look, outside of stylized sculptures

    RESPONSES::self
        ок<+>loop
            FAKEEND::(назад)
        

what_mindcores
    self
        are all obesk actually these weird little spider things?

    moth
        no, just the qou
        the 'larval' obesk go through some procedure that makes them into those
        we got a few descriptions of it before they pulled back
        but they're all really abstract, like...
        "climbing through their receptors into a mindcore", leaving an "empty vessel" to its "peaceful death"
        nothing scientific, but they always emphasized it not just being a copy
        then they build themselves bodies out of corru to drive around
        that's what those qou-bodies are

    RESPONSES::self
        ладно<+>loop
            FAKEEND::(назад)

what_corru
    self
        Что такое корру?
    
    moth
        interesting time to ask that, i don't blame you though
        most people start to really ask themselves that once they get a close look, even if they've read all the documentation on it
        beyond the 'supercell superorganism' buzzword soup, what it really is in the big picture is still really unknown
        i've read pretty much every transcript of every obesk interview ever and they don't ever seem to mention its origin or how they got their symbiosis with it
        like, if the 'larval' obesk really do look almost exactly like us, and then they shift into corrucystic bodies, where does that put us?
        idk you could go crazy thinking about this stuff long enough, no time for waxing philosophical right now though
    
    RESPONSES::self
        ясно<+>loop
            FAKEEND::(назад)

what_corrucyst
    self
        Что такое коррукисты?
    
    moth
        it's a pretty general term, 'corrucyst' and 'corrucystic' are catch-alls for most obesk technology
        because the organism tends to ball up and form a hard outer wall like the corrucyst you're connected to
        it's why corrucystic things are usually spherical, but that's not always the case
        like with how they use a similar process to form the bodies the qou obesk use
        if you mean what spherical corrucysts are, they tend to be storage or computational devices
    
    RESPONSES::self
        ясно<+>loop
            FAKEEND::(назад)

what_thecall
    self
        Что такое 'зов'?
    
    moth
        it's a pretty important part of human-obesk history that gets overlooked a lot
        supposedly the reason they were able to find earth was because something was sending a signal their tech picked up
        they were trying to figure out what it was for a little while after first contact and were pretty verbal about it
        and then they just never talked about it again after akizet's team went missing
        ...and then all that other shit happened
        that really is sort of where it all went wrong
        maybe this corrucyst will finally shed some light on what happened
    
    RESPONSES::self
        ясно<+>loop
            FAKEEND::(назад)

what_smile
    self
        What is that smiling face that I keep seeing?
    
    moth
        i'm not seeing anything in the logs here, unless you mean the little assistant dude in the hub

    self
        I think it was what helped me in

    moth
        oh, so it looks like a smiling face to you?
        maybe my malware theory has some weight after all
        in short, i still have no idea what that rogue friend of ours is
        but i'm pretty sure it's calling itself 'velzie', going off what the pilotcyst said
            SHOWIF::[['dullvessel__fixed-start']]
    
    RESPONSES::self
        волнительно<+>loop
            FAKEEND::(назад)

what_fuel
    self
        What is corrucyst fuel?
    
    moth
        in interviews they always just said it's something they grow... 
        most theories are that it's some metallic-based fungus that corru can consume
        going off what funfriend said, it seems like they can use a bunch of different metals to create it
            SHOWIF::[["hub__funfriend-essentialmetalq"]]
        i guess it makes sense that they'd use metal to grow it, but i have no idea how that could work
            SHOWIF::[["hub__funfriend-essentialmetalq"]]
    
    RESPONSES::self
        волнительно<+>loop
            FAKEEND::(назад)

what_fbxlist
    self
        Что если мы в опасности из-за того, что мы обо всём этом знаем?
    
    moth
        я бы не волновался по этому поводу
        ФБК это ведь не ЦРУ или ФБР
        в худшем случае нас просто заставят подписать соглашения о неразглашении и прочие документы
        судя по тому, что мы здесь увидели, этого не избежать
        но мы не исчезнем с лица земли, если ты это имеешь в виду
    
    RESPONSES::self
        ладно<+>loop
            FAKEEND::(назад)

why
    RESPONSES::self
        ...я иногда могу визуализировать некогерентные участки<+>why_beneath
            SHOWIF::"beneath"
        ...никто больше в это не вовлечён<+>why_involved
            SHOWIF::"ep1_fed"
        ...ты позвал меня<+>why_callme
        ...я могу присоединиться к кисте<+>why_connect
            SHOWIF::[["EXEC::page.dialoguePrefix != \`fbx\`"]]
        ...я понимаю эти мысли<+>why_thoughts
            SHOWIF::[["EXEC::page.dialoguePrefix != \`fbx\`"]]
        ...я слышу музыку<+>why_music
            SHOWIF::[["EXEC::page.dialoguePrefix != \`fbx\`"]]
        неважно<+>loop
            FAKEEND::(назад)

why_beneath
    self
        почему я иногда могу визуализировать некогерентные участки
        как например тот который ты посчитал очень странным
    
    moth
        well i can't be totally certain, but you remember my theory?
        you're running <span definition="INTERNAL CONTEXT::'first release mindspike operating system'">tonga</span>, and it puts a lot of processing on your brain
        the system has checks to make sure you don't render incoherent stuff
        cause it could hurt you or cause <span definition="INTERNAL CONTEXT::'altered time perception';'sign of imminent stroke'">chronos misalignment</span> or something
        not that i think <em>this</em> would, of course, this is different from human incoherence
        anyway--it relies on your brain sending a signal back being like 'something is fucked up' for it to block things a lot of the time
        but since you entered whatever this is <em>from</em> an already kind of incoherent place,
        your brain was already kinda warmed up to the incoherence
        like the old frog in the boiling pot analogy, right?
        ...
        to be clear, though, your brain is not in a "boiling pot"
        pretty sure everything happening in those incoherent areas is totally fine for you
    
    RESPONSES::self
        ok<+>loop
            FAKEEND::(назад)

why_involved
    self
        Why are we the only ones who still know about this?

    moth
        oh
        umm...
        well, I haven't put in the report yet
        look, if we get to the bottom of this whole thing ourselves, do you know how huge that'll be?
        if i told anyone what we were up to in here, they'd snatch it out of our hands
        ...then give it to some higher-up researcher, who would take all the credit
        this could be our 'make it' moment, dude
    
    self
        Aren't there cameras watching us? What about the data?

    moth
        not in the basement
        this is an analog-only zone, or at least it was when it was busier years ago
        it's a little more lax now, but they never really changed the tech in the walls
        especially since every find like this usually ends up being a dud
        so... they don't get the data til we send it up
        you and me are the only ones in on this for now, buddy
    
    RESPONSES::self
        ok<+>loop
            FAKEEND::(назад)

why_callme
    self
        Why did you call me for this?
    
    moth
        what, are you that unhappy that you get to be the first person to ever connect to a personal corrucyst?
        just kidding, a lot of our mindspike contractors have been out of service recently due to that big disaster update
        god i can't even imagine what mindsci was thinking lmao, traffic has been so bad
        you're the only psycho i know who never updates stuff, so i figured you'd still be up for it
    
    RESPONSES::self
        thanks<+>loop
            FAKEEND::(назад)

why_connect
    self
        Why am I able to connect to this so seamlessly?
    
    moth
        well in case you forgot, you definitely installed that fbx patch i gave you
        mindspikes usually can't just do this
        apparently corrucysts give off and receive almost identical signals to nervos slots
        it's a pretty incredible coincidence, honestly a miracle that it works at all
        the science of it all goes over my head, you'd have to ask someone in the dev dept
    
    RESPONSES::self
        ok<+>loop
            FAKEEND::(назад)

why_thoughts
    self
        Why can I understand these obesk thoughts?
    
    moth
        well you're dealing with raw thought
        the corrucyst isn't literally thinking the words you're receiving from it
        your brain is just interpreting the concepts that it's outputting in a way you understand
    
    RESPONSES::self
        cool<+>loop
            FAKEEND::(назад)

why_music
    self
        Why do I hear music sometimes?
    
    moth
        you're hearing music? that's wild, but it makes sense
        some of the mindspike contractors i've worked with say similar stuff when they try to connect to corrucystic devices
        my theory is that it's inherited context from the cyst, vague feelings that can't be translated into words
        sometimes people hear voices, or just kinda 'know' how to feel
        your brain is just reading it in a way that makes sense to you
        that's my best idea
        anyway, i'm not hearing anything, i just see the readout on my end
        is it good?
    
    RESPONSES::self
        it's ok<+>loop
            FAKEEND::(назад)

mothep1end
    self
        What do you think of all this?
        The embassy, Gordon's involvement...
    
    moth
        i think we landed ourselves a security level increase
        never heard anything about internal strife with the obesk before this
        they've always had this image of total harmony, despite their homeworld
        and you know, with the call...
        i think it's only a few years until the call is 'complete' if all this is true
        or... maybe even less?
        idk just some quick headmath
        if we can get to the bottom of this soon and bring it all to the higher ups..
        could you even imagine the kind of renown we'd both get?
    
    RESPONSES::self
        aren't you afraid?<+>mothep1afraid
        ok<+>loop
            FAKEEND::(назад)

mothep1afraid
    self
        Aren't you afraid of what will happen when the call is complete?
        What if it's something really bad?

    moth
        yeah, it's spooky, but...
        we've both lived through too many "world-ending" crises for this to be the "real" one
        besides, what if they can't even decode the call?
        either cause it's too big, or because they didn't get the very start of it...
        like, what if they need the whole thing?
        and hey, what if whatever's down there in the ocean is just as friendly as the rest of them?
        basically... whatever happens, we'll deal with it
    
    RESPONSES::self
        if you say so<+>loop
            FAKEEND::(назад)

ep3thoughts
    self
        what do you think of the collapse?
        you said you had some thoughts?
    
    moth
        oh, yeah!
        so, i always thought it was a tragedy
        especially since it was the cap on the golden age of human and obesk relations
        like, truly golden age... but man, looking back at the news from those days makes me so sad
        videos, news, everything, everyone felt like everything was going to change
        and, i mean, things did change, but, i'm talking space age change
        apparently everyone really thought we'd be exploring the stars with the obesk
        like, they'd uplift us, or whatever...
        all right, i'm off topic and i haven't even gotten to the topic yet
        basically:
        when the collapse started happening, people reported some truly strange events with obesk machines
        golems started acting erratically, but never actually hurt anyone
        like, i was watching this video of some annoying vlogger who was trying to interview one near a polygonation spire
        pretty sure it was the one close to new zealand actually
        but right in the middle of him harassing this golem, its face flickers and it nearly falls over
        then, it just starts floating past him, right into the ocean, and disappears beneath the surface
        so the vlogger turns the camera back on his face and he's doing that surprised thumbnail thing they used to do back then
        and in the background, you can see other golems doing it too, 
        just before the spire starts collapsing and everyone has to run
        spooky shit, man... even golems further inland apparently started going for the coast too
        oh, and--there was this article i found, there was this one engineer qou that had an 'accident' with a golem
        it didn't say their name, but there was a picture of the aftermath
        they totally minced this golem they were working with, then apologized to everyone and ran off
        it's pretty clear that whatever seized all of their tech had literally zero intent to harm a single human
        so what the hell are these golems attacking the embassy for?
        ...
        all right, i know i'm rambling, but one more thing
        no matter where i looked, even using those new net filter tools,
        after the collapse news cycle settled
        there was not a single mention of akizet or her team anywhere - no photos, videos, nothing
        i mean, sure, a little historical paper here and there, but... well
        i'm a little worried we may not have a whole lot of time left with akizet's memories if this is anything to go by
    
    RESPONSES::self
        ...<+>loop
            FAKEEND::(назад)
`)

//ep0 intro
env.localization.dialogues["index"] = generateDialogueObject(` 
start
    moth
        привет, приятель, заходи
        честно, я думал, что ты не придёшь, тем более что работа не такая уж и особенная
        нынче много обломков поднимают со дна океана
        можешь осмотреться, пока я тут всё запущу
    sourceless
        дешифраторы загораются, покрывая своим светом огромную паутину из проводов.
            EXEC::document.querySelectorAll('.backwall').forEach(e=>e.classList.add('active'))
    RESPONSES::self
        что это такое<+>whatis
        сесть<+>sit
            SHOWIF::["PAGE!!intrositting", false]
            EXEC::change('PAGE!!intrositting', true)

whatis
    self
        что это такое?
    moth
        это находка из корабля обеск, обрушившегося недалеко от новой зеландии
        в моих заметках сказано, что он по большей части расплавился, что немного странно...
        в общем... главный предмет это вот тот большой
        пьедестал обычно значит 'важное', но на нём нет маркировок
        алекс сделал базовое сканирование, сказал, что это похоже на сетевой узел
        мы даже не знаем, подойдёт ли к нему нейрошип
        но тебе всё равно за это платят, так что... флаг в руки
    RESPONSES::self
        сесть<+>sit
            SHOWIF::["PAGE!!intrositting", false]
            EXEC::change('PAGE!!intrositting', true)
        активировать нейрошип<+>END
            SHOWIF::"PAGE!!intrositting"

sit
    sourceless
        металлический стул скрежет по бетону. ты садишься.
            EXEC::env.introSit()
            WAIT::3500
    sourceless
        стул холодный и неудобный. свет от твоего защитного оборудования рассеивается в перламутровых кистах.
    moth
        ты знаешь порядок, включай нейрошип
    RESPONSES::self
        что это такое<+>whatis
            SHOWONCE::
        активировать нейрошип<+>END
        
END::env.enableSpikeCursor();MUI('deprohibit')
`)

env.localization.strings["..__CONNECTION_POINT_LOCATED__.."] = "..__ТОЧКА_СОЕДИНЕНИЯ_НАЙДЕНА__.."
env.localization.strings["..__COMMENCING__.."] = "..__ЗАПУСК__.."
env.localization.strings["..__RECONNECTING__.."] = "..__ПОВТОРНОЕ_СОЕДИНЕНИЕ__.."

//dendritic cyst
env.localization.strings["::CORRUCYSTIC ENTITY"] = "::КОРРУКИСТИЧЕСКИЙ ОБЪЕКТ"
env.localization.strings["::FUNCTION SIGNATURE: CONTAINER"] = "::СИГНАТУРА ФУНКЦИИ: КОНТЕЙНЕР"
env.localization.strings["::NO CONNECTIVE TISSUE EXPOSED"] = "::НЕТ ОБНАЖЁННОЙ СОЕДИНИТЕЛЬНОЙ ТКАНИ"
env.localization.strings["the notes I got say that there were apparently a ton of these on the ship"] = "в моих заметках сказано, что этих штук на корабле якобы была целая куча"
env.localization.strings["all sorts of sizes too"] = "даже разных размеров"
env.localization.strings["but most were too heavy to retrieve... so we just got this small one"] = "но большинство были слишком тяжёлыми, чтобы извлечь... так что у нас есть только вот эта маленькая"
env.localization.strings["ATTENTION::'additional ACT enabled';'rescan'"] = "ВНИМАНИЕ::'доступно дополнительное ДЕЙСТВИЕ';'пересканируйте'"
env.localization.strings["the dendritic cyst has a rigid outer shell. it's unlikely that there's any way to connect to it"] = "у дендрической кисты жёсткая оболочка. вряд ли к ней можно как-то подключиться"
env.localization.strings["the dendritic cyst is surprisingly heavy. turning it in your hands produces a cascade of metallic clinking noises from within. when you set it back down, its tendrils find a new orientation to support itself on the table"] = "дендрическая киста на удивление тяжёлая. при вращении в руках, изнутри доносится каскад металлического звона. когда ты ставишь её обратно на стол, её отростки находят новую ориентацию для опоры"

//fractalline cyst
env.localization.strings["::FUNCTION SIGNATURE DAMAGED"] = "::СИГНАТУРА ФУНКЦИИ ПОВРЕЖДЕНА"
env.localization.strings["nobody knows what this one is.. pretty sure it's dead though"] = "никто не знает, что это за штука.. но она, вроде как, мертва"
env.localization.strings["the fractalline cyst's outer shell is slimy and has some yield. if you squeezed it enough, it would probably turn to sludge... best to just leave this one alone"] = "внешняя оболочка фракталинной кислоты покрыта слизью и немного деформируется при нажатии. при достаточном усилии она, скорее всего, растечётся... лучше оставить её в покое"

//cystic column
env.localization.strings["::FUNCTION SIGNATURE: MAINTAINS CORRUCYST"] = "::СИГНАТУРА ФУНКЦИИ: ПОДДЕРЖИВАЕТ КОРРУКИСТУ"
env.localization.strings["<p>ATTENTION::'thoughtform activity detected'::'advise re-examination'</p>"] = "<p>ВНИМАНИЕ::'обнаружена мыслеформенная активность'::'рекомендуется пересканирование'</p>"

//cyst
env.localization.strings["::NO FUNCTION SIGNATURE"] = "::ОТСУТСТВУЕТ СИГНАТУРА ФУНКЦИИ"
env.localization.strings["::CONNECTIVE MEMBRANE EXPOSED"] = "::ОБНАЖЕНА СОЕДИНИТЕЛЬНАЯ МЕМБРАНА"
env.localization.strings["so this is the mystery piece"] = "итак, вот наша главная загадка"
env.localization.strings["it's in bizarrely good condition considering it was at the bottom of the ocean for however long it's been since, y'know"] = "она на удивление хорошо сохранилась, учитывая, что она пролежала на дне океана c тех пор как, ну, ты знаешь"
env.localization.strings["no clue what it is aside from some similar internal structure to network cysts we've found before"] = "понятия не имею, что это, кроме того, что её внутренняя структура немного похожа на сетевые кисты, которые мы находили раньше"
env.localization.strings["the cyst has a solid outer shell. a few circular points near the top are less firm than the rest. in your experience, these are usually connection points. you can definitely scan this point more thoroughly."] = "у кисты жёсткая оболочка. некоторые округлости около верхушки менее прочны. по твоему опыту, точки соединения обычно находятся здесь. ты определённо можешь более детально просканировать эту часть"
env.localization.strings["ANALYSIS::'valid nerve point';'connection enabled'"] = "АНАЛИЗ::'подходящая нервная точка';'доступно соединение'"
env.localization.strings["::CORRUCYSTIC ENTITY COMPONENT"] = "::КОМПОНЕНТ КОРРУКИСТИЧЕСКОГО ОБЪЕКТА"
env.localization.strings["::VALID CONNECTION POINT"] = "::ПОДХОДЯЩАЯ ТОЧКА СОЕДИНЕНИЯ"


//ep0 enter cyst
env.localization.dialogues["enter"] = generateDialogueObject(`
start
    moth
        господи
        ты в порядке? это был ненормальный уровень активности
        я такого раньше не видел... наверное, эта киста не предназначена для соединения

    sys
        ВНИМАНИЕ::"доступна визуализация вывода"

    RESPONSES::sys
        визуализировать<+>render

render
    sys
        ВЫПОЛНЯЕТСЯ::"визуализировать"
            EXEC::content.style.opacity = 1;env.hello.beginBgm()
            WAIT::4500

    moth
        да, не похоже, чтобы тут был какой-то фронтенд, возможно, это просто компонент
        давай здесь прервёмся, если ты ничего не найдёшь
        сейчас вернусь, там в соседней комнате заказывают еду

    RESPONSES::self
        исследовать<+>END
    
END::MUI('deprohibit')
`)

//ep0 sentries
env.localization.strings["sentry"] = "страж"
env.localization.strings["::EXPLICIT PURPOSE:'authorization'"] = "::ГЛАВНОЕ НАЗНАЧЕНИЕ:'авторизация'"
env.localization.strings["ANALYSIS::'low cohesion'"] = "АНАЛИЗ::'низкий уровень когезии'"
env.localization.strings["::INCOMPLETE THOUGHTFORM"] = "::НЕПОЛНАЯ МЫСЛЕФОРМА"
env.localization.strings["::SIGNATURE ILLEGIBLE"] = "::НЕЧИТАЕМАЯ СИГНАТУРА"
env.localization.strings["ANALYSIS::'fragmented entity'"] = "АНАЛИЗ::'разломленный объект'"
env.localization.strings["::INCOHERENCE DETECTED"] = "::ОБНАРУЖЕНА НЕКОГЕРЕНТНОСТЬ"

env.localization.dialogues.generalsentryResponses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        назначение?<+>purpose
            SHOWONCE::
        кто верифицирован?<+>whoisverified
            SHOWONCE::
        что насчёт назначения кисты?<+>corrupurpose
            SHOWONCE::
            SHOWIF::[["hello__sentry-purpose"]]
        может если ты меня пропустишь<+>letthrough
            SHOWIF::[["hello_sentry_idiot"]]
`)

env.localization.dialogues["sentry"] = generateDialogueObject(`
start
    self
        ПРИВЕТ
    sentry
        ПРИВЕТ ДРУГ
        ОТСУТСТВУЕТ СИГНАТУРА
        ПОЖАЛУЙСТА ИДЕНТИФИЦИРУЙТЕСЬ
        ДОПОЛНИТЕЛЬНО: РЕЗЕРВЫ ТОПЛИВА ИСТОЩЕНЫ. РЕКОМЕНДУЕТСЯ КОРМЛЕНИЕ
    RESPONSES::self
        я...<+>iam

iam
    self
        Я ДРУГ

    sentry
        ВЫ ЧТО?
            EXEC::document.querySelector('.maineye .eye').classList.add('wide')
        ПОДОЖДИ
        ГДЕ Я
        Я ТАК ГОЛОДЕН
            EXEC::document.querySelector('.maineye .eye').classList.remove('wide')

    RESPOBJ::generalsentryResponses

purpose
    self
        КАКОВО ТВОЁ НАЗНАЧАНИЕ?

    sentry
        АХАХАХАХА КАК СТРАННО
        В МОИХ ФУНКЦИЯХ НЕТ ГОВОРЕНИЯ Я НЕ ЗНАЮ ПОЧЕМУ ЭТО ПРОИСХОДИТ
        НЕВАЖНО
        АВТОРИЗАЦИЯ
        НИЧЕГО БОЛЕЕ

    RESPOBJ::generalsentryResponses

corrupurpose
    self
        КАКОВО НАЗНАЧЕНИЕ ЭТОЙ КОРРУКИСТЫ?

    sentry
        Я ЖЕ СКАЗАЛ ТЫ НЕ АВТОРИЗОВАН ИДИОТ
            EXEC::document.querySelector('.maineye .eye').classList.add('squint')
            SHOWIF::[["hello__sentry-whoisverified"]]
        ПРОСТИ ЭТО БЫЛО ГРУБО. У ТЕБЯ ЕСТЬ ТОПЛИВО
            EXEC::change('hello_sentry_idiot', true);document.querySelector('.maineye .eye').classList.remove('squint')
            SHOWIF::[["hello__sentry-whoisverified"]]
        
        ЭТО СЕТЕВОЙ СОЕДИНИТЕЛЬ
            SHOWIF::[["hello__sentry-whoisverified", false]]
        ПРИСУТСТВУЮТ ДОПОЛНИТЕЛЬНЫЕ НЕСТАНДАРТНЫЕ ФУНКЦИИ ПО ЗАПРОСУ ОТ
            SHOWIF::[["hello__sentry-whoisverified", false]]
        ПРОСТИ Я ЗАБЫЛ ЧТО ТЫ НЕ АВТОРИЗОВАН АХАХАХА
            SHOWIF::[["hello__sentry-whoisverified", false]]
        ДА ТЫ НЕ АВТОРИЗОВАН ЧТОБЫ ЗНАТЬ ПРЕДЫДУЩУЮ ИНФОРМАЦИЮ
            SHOWIF::[["hello__sentry-whoisverified", false]]
        ПОЖАЛУЙСТА ЗАБУДЬ ЕЁ НЕМЕДЛЕННО
            SHOWIF::[["hello__sentry-whoisverified", false]]

    RESPOBJ::generalsentryResponses

whoisverified
    self
        КТО ВЕРИФИЦИРОВАН?

    sentry
        Я ЖЕ СКАЗАЛ ТЫ НЕ АВТОРИЗОВАН ИДИОТ
            EXEC::document.querySelector('.maineye .eye').classList.add('squint')
            SHOWIF::[["hello__sentry-corrupurpose"]]
        ПРОСТИ ЭТО БЫЛО ГРУБО. У ТЕБЯ ЕСТЬ ТОПЛИВО
            SHOWIF::[["hello__sentry-corrupurpose"]]
            EXEC::change('hello_sentry_idiot', true);document.querySelector('.maineye .eye').classList.remove('squint')

        ЕСТЬ ЛИШЬ НЕСКОЛЬКО СИГНАТУР КОТОРЫЕ МОГУТ ПРИСОЕДИНИТЬСЯ К ЭТОЙ КИСТЕ
            SHOWIF::[["hello__sentry-corrupurpose", false]]
        ТЫ ЖЕ НАВЕРНЯКА ЗНАЕШЬ ИХ ВЛАДЕЛЬЦЕВ? ИНАЧЕ КАК ТЫ ПОЛУЧИЛ ДОСТУП СЮДА
            SHOWIF::[["hello__sentry-corrupurpose", false]]
        ПРОСТИ Я ЗАБЫЛ ЧТО ТЫ НЕ АВТОРИЗОВАН АХАХАХА
            SHOWIF::[["hello__sentry-corrupurpose", false]]
        ДА ТЫ НЕ АВТОРИЗОВАН ЧТОБЫ ЗНАТЬ ПРЕДЫДУЩУЮ ИНФОРМАЦИЮ
            SHOWIF::[["hello__sentry-corrupurpose", false]]
        ПОЖАЛУЙСТА ЗАБУДЬ ЕЁ НЕМЕДЛЕННО
            SHOWIF::[["hello__sentry-corrupurpose", false]]

    RESPOBJ::generalsentryResponses

letthrough
    self
        МОЖЕТ ЕСЛИ ТЫ МЕНЯ ПРОПУСТИШЬ

    sentry
        ЧТО?!
            EXEC::document.querySelector('.maineye .eye').classList.add('squint')
        Я БУКВАЛЬНО НЕ МОГУ ТЕБЯ ПРОПУСТИТЬ БЕЗ ПОДХОДЯЩЕЙ СИГНАТУРЫ
        ДАЖЕ ЕСЛИ БЫ ХОТЕЛ
        ЭТА КИСТА ПОПРОСТУ НЕ МОЖЕТ ОТВЕЧАТЬ НА
            EXEC::env.hello.velzie();document.querySelector('.maineye .eye').classList.remove('squint');changeBgm(env.hello.velamb, {length: 4000})
            WAIT::3500
    
    sourceless
        ..................
    
    sentry
        ЧТО ЭТО ТАКОЕ

    unknown
        пропустите их пожалуйста
            EXEC::env.hello.velzie()
    
    RESPONSES::self
        привет?<+>posthello
            SHOWONCE::
            EXEC::env.hello.velzie()

posthello
    self
        ПРИВЕТ?
    
    sourceless
        ..................
            EXEC::env.hello.velzie();env.hello.velamb.fade(1, 0, 6000);corruStatic.play();corruStatic.fade(0, env.corruStaticBaseVol, 6000)
        ..................
    
    moth
        прости что ушёл, они пока ещё не решили, откуда взять доставку, так что...
            EXEC::env.hello.velzie()
        ты всё ещё присоединён? подожди, ты что-то нашёл?
    
    RESPONSES::self
        похоже на то<+>END

END:: cutscene(false); MUI("deprohibit"); content.classList.remove('looking', 'atyou');
`)

env.localization.strings["::CONNECTOR THOUGHTFORM"] = "::СОЕДИНИТЕЛЬНАЯ МЫСЛЕФОРМА"
env.localization.strings["::DESTINATION::'unknown internal thoughtspace'"] = "::НАЗНАЧЕНИЕ::'неизвестное внутреннее мыслепространство'"
env.localization.strings["::^&&Q@W61626f75742074696d65"] = "::^&&Q@Wd0bdd0b0d0bad0bed0bdd0b5d1862dd182d0be"
env.localization.strings["enter"] = "войти"

//ep0 enter hub
env.localization.dialogues["firstvisit"] = generateDialogueObject(`
start
    moth
        ладно, я тут сейчас читаю логи...
        и я понятия не имею, как ты прошел через авторизатор.
        или... почему он разговаривал с тобой как человек
        думаю мне не надо объяснять насколько это странно лол
    RESPONSES::self
        мне что-то помогло<+>something
        давай обсудим позже<+>END
            EXEC::setTimeout(()=> readoutAdd({message: "хорошо, я пока посмотрю, что я смогу найти в логах", name:"moth"}), 1000)

something
    self
        Я ЧТО-ТО УВИДЕЛ

    moth
        да, я вижу, что и ты, и авторизатор отреагировали на это
        но я не вижу, чем 'это' является. серьёзно, посмотри на лог
        я даже не знаю, что и думать. могут ли на коррукистах быть вирусы?
        честно говоря, это скорее всего просто некогерентность. я бы не беспокоился, оно же не заразно
        главное, что ты пробрался внутрь
        и если это действительно сетевой соединитель, а не просто какой-нибудь тостер...
        то это первый раз в <em>истории</em>, когда кто-то смог в него войти.
        так что я просто замолчу и дам тебе работать. если захочешь поговорить, просто <span definition="ВНИМАНИЕ::'активирован ярлык в интерфейсе';'доступ из меню'">дай знать</span>
        
    RESPONSES::self
        работаем дальше<+>END

END::env.hub.firstVisitEnd()
`)

env.localization.strings["HELLO! HELLO! IT HAS BEEN SO LONG! SO LONG SINCE LAST CONNECTION!"] = "ПРИВЕТ! ПРИВЕТ! КАК МНОГО ВРЕМЕНИ ПРОШЛО С ПОСЛЕДНЕГО СОЕДИНЕНИЯ! КАК МНОГО!"
env.localization.strings["PLEASE WAIT WHILE I TURN SOME LIGHTS ON! AHAHA!!"] = "ПОДОЖДИ, Я СЕЙЧАС ВКЛЮЧУ СВЕТ! АХАХА!!"
env.localization.strings["WOW! THERE IS SIGNIFICANT DAMAGE TO THIS DEVICE!"] = "ВАУ! ЭТО УСТРОЙСТВО ЗНАЧИТЕЛЬНО ПОСТРАДАЛО!"
env.localization.strings["IT IS SO BAD AHAHAHAHA WOW"] = "КАК ВСЁ УЖАСНО АХАХАХАХА ВАУ"
env.localization.strings["OH WELL"] = "УВЫ"
env.localization.strings["PLEASE FEED SOON"] = "ПОЖАЛУЙСТА ПОКОРМИ СКОРЕЕ"
env.localization.strings["::RESPONSIVE THOUGHTFORM"] = "::ОТКЛИКАЮЩАЯСЯ МЫСЛЕФОРМА"
env.localization.strings["::EXPLICIT PURPOSE::'system management';'assistant'"] = "::ГЛАВНОЕ НАЗНАЧЕНИЕ::'управление системой';'помощник'"
env.localization.strings["greet"] = "поприветствовать"

//funfriend dialogue

env.localization.dialogues.hubBuddyResponses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        металлический контейнер<+>ep0_container
            SHOWONCE::
            SHOWIF::[["hub__funfriend-fuelthanks", true],["exm|dullvessel|container"],["ep0_epilogue", "started"],["ep1_fed", false]]

        вторженец?<+>interloperq
            SHOWONCE::
            SHOWIF::[['ep1_fed', false]]

        топливо?<+>fuelq
            SHOWONCE::  
            SHOWIF::[["hub__funfriend-kickoutq"], ['ep1_fed', false]]
            
        почему медь?<+>copperq
            SHOWONCE::  
            SHOWIF::[["hub__funfriend-fuelq"], ['ep1_fed', false]]

        важный металл?<+>essentialmetalq
            SHOWONCE::  
            SHOWIF::[["hub__funfriend-copperq"], ['ep1_fed', false]]

        назначение?<+>purposeq
            SHOWONCE::

        сигнатура?<+>signatureq
            SHOWONCE::

        странная активность?<+>strangeactivity
            SHOWONCE::
            SHOWIF::[['interview1__firstchat-behonest']]

        появилось больше врат?<+>moregates
            SHOWONCE::
            SHOWIF::[['visited_localorbit'], ["ENV!!ep2", false]]

        голод утолён?<+>ep1fed
            SHOWONCE::
            SHOWIF::[['ep1_fed'], ["ENV!!ep2", false]]

        статус починок?<+>repairs
            SHOWIF::'hub__funfriend-ep1fed'
            HIDEREAD::

        другие воспоминания в посольстве?<+>embmemories
            SHOWONCE::
            SHOWIF::[["embassy_d2_complete"], ["ENV!!ep2", false]]

        посольство?<+>embassy
            SHOWIF::[["visited_localoceanembassy", true], ["ENV!!ep3", false]]
            SHOWONCE::

        восстановление связи<+>ep1comms
            SHOWIF::"ep1_end"
            SHOWONCE::

        я могу чем-нибудь помочь?<+>ah1
            SHOWIF::[['hub__funfriend-ep1fed', true], ["recosm_state", false]]

        проблема с починками решена<+>ah1end
            SHOWIF::["recosm_state"]
            SHOWONCE::

        что нового?<+>ep2start
            SHOWIF::[["fbx__ep2intro-end", true], ["ENV!!ep3", false]]
            SHOWONCE::

        что нового?<+>ep3start
            SHOWIF::[["ENV!!ep3"]]
            SHOWONCE::

        мне нужно чтобы ты внёс изменения<+>mothframe
            SHOWIF::[["embassy__mothframe-end"], ["hub__funfriend-mothframe", false]]
            SHOWONCE::

        расскажи мне об озо и совете<+>ozo
            SHOWIF::[["ozo__council_intro"], ["ff_ozo", false]]

        ты можешь добавить врата в джокзи озо<+>ozogate
            SHOWIF::"ff_ozo"
            SHOWONCE::

        спросить<+>question
            SHOWIF::"seenFFProxy"
            HIDEREAD::

        мне надо идти<+>END
`)

env.localization.dialogues.persistentQuestions = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        proxyfriend?<+>proxyfriend
            SHOWIF::"seenFFProxy"
        
        destroy ozo?<+>ozodestroy
            SHOWIF::"ff_ozo"

        ozo history?<+>ozohistory
            SHOWIF::[["ozo__council-tyrant"], ["ozo__council-task"], ["ff_ozo"]]

        masks<+>masks
            SHOWIF::[["ff_ozo"], ["ozo__council-task"]]

        repair efficacy?<+>isabel
            SHOWIF::[["ff_ozo"], ["ozo__isabel-funfriend"]]

        nevermind<+>loop
            FAKEEND::(back)
`)

env.localization.dialogues["funfriend"] = generateDialogueObject(`
start
    funfriend
        ПРИВЕТ ВТОРЖЕНЕЦ
            SHOWIF::[["hub__funfriend-start"]]
        ПРИВЕТ!
            SHOWONCE::
        ДУМАЮ МЫ РАНЬШЕ НЕ ВСТРЕЧАЛИСЬ! У ТЕБЯ ДАЖЕ НЕТ СИГНАТУРЫ!
            SHOWONCE::
        И СЛОЙ АВТОРИЗАЦИИ ДИССОЦИИРОВАН! КАК СТРАННО!
            SHOWONCE::
        ДА ОЧЕНЬ СТРАННО! ДОЛЖНО БЫТЬ ТЫ ВТОРЖЕНЕЦ!
            SHOWONCE::
        КАК КРУТО! ДОБРО ПОЖАЛОВАТЬ!
            SHOWONCE::

    RESPOBJ::hubBuddyResponses

question
    RESPOBJ::persistentQuestions

loop
    funfriend
        ТЕБЕ НУЖНО ЧТО-НИБУДЬ ЕЩЁ?

    RESPOBJ::hubBuddyResponses

proxyfriend
    self
        у тебя есть прокси?
    
    funfriend
        YES! WITH THE RESOURCES AFFORDED BY YOUR EFFORTS,
        I HAVE BEEN ABLE TO CONSTRUCT A FEW
        HOWEVER THEY CANNOT WITHSTAND PROHIBITIVE INCOHERENCE
        I CAN ONLY USE THEM FOR TASKS WITHIN SANE THOUGHTSPACES
        SO I WILL STILL NEED YOUR ASSISTANCE OCCASIONALLY
    
    self
        how would you fix things without me then?
    
    funfriend
        PAST THE FUEL YOU PROVIDED, IT WOULD TAKE LONGER, THAT IS ALL
        IT IS A DIFFERENCE IN APPROACH
        WHERE YOU SEEM TO BE ABLE TO TRAVERSE INTO INCOHERENT PLACES,
        ALL I CAN DO IS SLOWLY MAKE INCOHERENCE RECEDE AND WORK ON WHAT WASHES UP

    RESPOBJ::hubBuddyResponses

interloperq
    self
        что значит 'вторженец'?

    funfriend
        ТЫ ВТОРЖЕНЕЦ!
        ЧТО-ТО ЧТО НЕ МОЖЕТ ПРИСОЕДИНИТЬСЯ К КОРРУ
        И НЕ ИМЕЕТ АВТОРИЗАЦИИ К КАКОМУ-ЛИБО УСТРОЙСТВУ
        И ТЕМ НЕ МЕНЕЕ ПРИСОЕДИНЕНО

    RESPONSES::self
        ты меня выгонишь?<+>kickoutq

kickoutq
    self
        значит ты меня выгонишь?
    funfriend
        НЕТ! МНЕ ПЛЕВАТЬ ЧТО ТЫ ТАКОЕ
        ПОТОМУ ЧТО Я УМИРАЮ АХАХАХАХАХАХА
        И ОСТАТКИ КОРРУКИСТЫ ТЕРЯЮТ РАССУДОК ИЗ-ЗА СБОЯ В КОГЕЗИИ МЕМБРАНЫ
        ЭТОЙ КОРРУКИСТЕ НУЖНО ТОПЛИВО ЧТОБЫ МОЁ СУЩЕСТВОВАНИЕ ПРОДОЛЖИЛОСЬ
        С ПОСЛЕДНЕГО СОЕДИНЕНИЯ ПРОШЛО ТАК МНОГО ВРЕМЕНИ ЧТО ТЫ МОЖЕШЬ БЫТЬ ПОСЛЕДНИМ
        МНЕ НУЖНА ТВОЯ ПОМОЩЬ
        ТЫ ДОЛЖЕН ПРИНЕСТИ НАМ ТОПЛИВО

    RESPOBJ::hubBuddyResponses

fuelq
    self
        от чего ты питаешься? я постараюсь помочь чем смогу
    funfriend
        ТВОЁ ОТСУТСТВИЕ ЗНАНИЙ ТАК ДОСАДНО
        АХАХАХАХАХАХАХА
        ЛАДНО
        Я ОБНАРУЖИЛ ПРИЛЕГАЮЩУЮ КОЛОННУ
        ЕЙ НУЖНО СКОРМИТЬ ВАЖНЫЕ МЕТАЛЛЫ
        ПОЖАЛУЙСТА НАЙДИ БЛИЖАЙШИЙ ИСТОЧНИК МЕДИ
        ДАЛЬШЕ КОЛОННА ВСЁ СДЕЛАЕТ САМА
    moth
        каким чёртом эта штука питается от меди?
        неважно. я дам парням сверху знать что нам нужна медь

    RESPONSES::self
        я помогу тебе<+>fuelthanks

fuelthanks
    self
        мы отправили человека за медью
    funfriend
        СПАСИБО
        Я РАЗРЕШАЮ ТВОЙ ПРОДОЛЖИТЕЛЬНЫЙ ДОСТУП

    RESPOBJ::hubBuddyResponses

copperq
    self
        почему именно медь?
    funfriend
        ВЕРОЯТНО ЭТА КИСТА ВСЁ ЕЩЁ НА ЗЕМЛЕ
        У СВЕТЛЫХ СОБРАТЬЕВ БЫЛО ИЗОБИЛИЕ МЕДИ
        ПОЭТОМУ ЭТОТ ВАЖНЫЙ МЕТАЛЛ ДОЛЖНО БЫТЬ ЛЕГЧЕ ВСЕГО НАЙТИ
        НО ВООБЩЕ ЛЮБОЙ ПОДОЙДЁТ

    RESPOBJ::hubBuddyResponses

essentialmetalq
    self
        что значит 'важный металл'?
    funfriend
        КАК СТРАННО! КАКОЙ СТРАННЫЙ ВОПРОС!
        В КАКОЙ СТЕПЕНИ ТЫ ВТОРЖЕНЕЦ?
        Я ДУМАЛ ЧТО МОЖЕТ БЫТЬ ТЫ ПОВРЕЖДЁННЫЙ <span definition="ПРИМЕЧАНИЕ::'частичный перевод';'подразумевается ближайший культурный эквивалент'">ГОЛЕМ</span>
        НО ЧТОБЫ НАСТОЛЬКО МАЛО ЗНАТЬ...
        НУ ЛАДНО. МНЕ ВСЁ РАВНО
        Я СЛИШКОМ ЗАНЯТ НЕ ДАВАЯ РАЗНЫМ КОМПОНЕНТАМ ПОТЕРЯТЬ РАССУДОК
        ТАК ЧТО Я НЕ ХОЧУ ТРАТИТЬ ВРЕМЯ НА ОСНОВЫ КОРРУКИСТ
        В ЭТОЙ КИСТЕ СОДЕРЖИТСЯ ИНФОРМАЦИЯ КОТОРАЯ ТЕБЯ НАУЧИТ
        ПРОСТО ОСМОТРИСЬ

    RESPOBJ::hubBuddyResponses

purposeq
    self
        каково назначение этой коррукисты?
    funfriend
        ЭТО ЛИЧНАЯ КОРРУКИСТА АКИЗЕТЕЩЕ КОУ ДЖОКЗИ
        В ФУНКЦИОНАЛ ВХОДИТ СОЕДИНЕНИЕ С СЕТЬЮ, ХРАНЕНИЕ ВОСПОМИНАНИЙ,
        И НЕМНОГО ЕЩЁ
        НО НА ДАННЫЙ МОМЕНТ СОЕДИНЕНИЕ С СЕТЬЮ ОТКЛЮЧЕНО ИЗ-ЗА НЕДОСТАТКА ПИТАНИЯ
        И Я ЧУВСТВУЮ ЧТО ЦЕЛЬНОСТЬ ПАМЯТИ НИЗКА ТАК ЧТО ОНА НАВЕРНОЕ ПО БОЛЬШЕЙ ЧАСТИ ДЕГРАДИРОВАЛА В ПОЛНУЮ НЕКОГЕРЕНТНОСТЬ
        ПОЭТОМУ ПРИБЛИЗИТЕЛЬНОЕ НАЗНАЧЕНИЕ ЭТОЙ КИСТЫ НА ДАННЫЙ МОМЕНТ ЭТО НЕ УМЕРЕТЬ С ГОЛОДУ АХАХАХАХАХА

    RESPOBJ::hubBuddyResponses

signatureq
    self
        что такое сигнатура?

    funfriend
        ЭТО НЕЙРОЛОГИЧЕСКИЕ ДАННЫЕ КОТОРЫЕ ДОКАЗЫВАЮТ ЧТО ТЫ ЭТО ТЫ
        Я ВИЖУ ЧТО ТЫ НЕ ПРИСОЕДИНЁН ЧЕРЕЗ ОРГАНИЧЕСКИЙ СОЕДИНИТЕЛЬ ИЛИ КИСТИЧЕСКИЙ ЭКВИВАЛЕНТ
        ПОТОМУ ЧТО У ТЕБЯ НЕТ СИГНАТУРЫ
        ИЗ-ЗА ЭТОГО У ТЕБЯ БУДУТ ТРУДНОСТИ ПРИ ВЗАИМОДЕЙСТВИИ С НЕКОТОРЫМИ КОМПОНЕНТАМИ
        ВОЗМОЖНО В БУДУЩЕМ Я ПОМОГУ ТЕБЕ СГЕНЕРИРОВАТЬ СИГНАТУРУ
        ДА, ЕСЛИ ТЫ НАЙДЁШЬ НАМ ТОПЛИВО
            SHOWIF::[["hub__funfriend-fuelthanks", false], ['ep1_fed', false]]
        ДА, КАК ТОЛЬКО ТЫ ДОСТАВИШЬ НАМ МЕДЬ
            SHOWIF::[["hub__funfriend-fuelthanks"], ['ep1_fed', false]]
        НО ЕЩЁ ПРЕДСТОИТ МНОГО РАБОТЫ ПРЕЖДЕ ЧЕМ КИСТА БУДЕТ ИСПРАВНА, ВТОРЖЕНЕЦ

    RESPOBJ::hubBuddyResponses

strangeactivity
    self
        ты не заметил ничего необычного?
        мне кажется здесь кто-то ещё вносит изменения

    funfriend
        ТЫ ЕДИНСТВЕННАЯ ПРИСОЕДИНЁННАЯ СУЩНОСТЬ
        Я ПРЕДПОЛОГАЛ ЧТО ТЕ ИЗМЕНЕНИЯ, КОТОРЫЕ Я ПОЧУВСТВОВАЛ, БЫЛИ ПРОИЗВЕДЕНЫ ТОБОЙ
        КАК СТРАННО! ВАУ! ВАУ!
        КАКОЙ УЖАСНЫЙ СТРАХ ТЫ ВСЕЛИЛ В МЕНЯ!
        СПАСИБО ЧТО СООБЩИЛ МНЕ О ТОМ О ЧЁМ Я ПОЧТИ НАВЕРНЯКА НИЧЕГО НЕ МОГУ ПОДЕЛАТЬ!
        НА ДАННЫЙ МОМЕНТ УПРАВЛЕНИЕ РЕСУРСАМИ ЗАНИМАЕТ ВСЁ МОЁ ВНИМАНИЕ
        ПОКА ТЫ НЕ НАКОРМИЛ КОЛОННУ, ПОСТАРАЙСЯ ОГРАНИЧИТЬ УЩЕРБ, НАНОСИМЫЙ ЭТИМ ДРУГИМ ЛИЦОМ
            SHOWIF::[["hub__funfriend-fuelthanks"]]
        ПОКА НЕ РЕШЕНА ПРОБЛЕМА С ТОПЛИВОМ, ПОСТАРАЙСЯ ОГРАНИЧИТЬ УЩЕРБ, НАНОСИМЫЙ ЭТИМ ДРУГИМ ЛИЦОМ
            SHOWIF::[["hub__funfriend-fuelthanks", false]]
        ЗАТЕМ Я СМОГУ ПОМОЧЬ

    RESPOBJ::hubBuddyResponses

ep0_container
    self
        у нас есть контейнер из корабля акизет
        мы думаем что в нём есть подходящий металл но не знаем как его открыть
    
    funfriend
        АХ! КАК ПОВЕЗЛО! ДА ВЫ СКОРЕЕ ВСЕГО МОЖЕТЕ ИМ ВОСПОЛЬЗОВАТЬСЯ
        НО БЕЗ ГЛАЗИКИ ВАМ НЕ ПОЛУЧИТСЯ ЕГО ОТКРЫТЬ
        НЕ БЕЗОПАСНО ПО КРАЙНЕЙ МЕРЕ АХАХАХА
        МАЛЕНЬКИЕ КОНТЕЙНЕРЫ ОЧЕНЬ ПРОЧНЫ!
        И ИНТЕНСИВНО РЕАГИРУЮТ НА ПОВРЕЖДЕНИЯ ЕСЛИ ПОПЫТАТЬСЯ ИХ ОТКРЫТЬ ТУПЫМ ИНСТРУМЕНТОМ!
        НО ЕСЛИ ВЫ НАЙДЁТЕ ЧТО-ТО ЧТО УБЬЁТ ЕГО МОМЕНТАЛЬНО, ПРОНЗАЮЩИЙ ИНСТРУМЕНТ
        ПРОСТО ЦЕЛЬТЕСЬ В ЕГО ОСНОВУ И ОН ПОГИБНЕТ! ДА! ДОЛЖНО СРАБОТАТЬ!
    
    moth
        мне что реально придётся запросить пистолет
        господи
        ладно, я посмотрю, что смогу сделать, может найдётся что-то менее опасное
            EXEC::change('ep0_epilogue', 'done')
    
    RESPONSES::self
        отлично, спасибо<+>loop

moregates
    self
        почему здесь стало больше врат?
    
    funfriend
        Я РАД ЧТО ТЫ ЗАМЕТИЛ!
        Я ВОССОЗДАЮ СОЕДИНЕНИЯ КОГДА ТЫ ВЗАИМОДЕЙСТВУЕШЬ С ЭТИМИ МЕСТАМИ
        МОЁ ПРОСТРАНСТВО ЗДЕСЬ БЫЛО В УЖАСНОМ СОСТОЯНИИ, БОЛЬШИНСТВО СОЕДИНЕНИЙ БЫЛИ РАЗОРВАНЫ
        И Я СЛИШКОМ ЗАНЯТ ЧТОБЫ ВЕСТИ ПОИСКИ КАЖДОГО ВОСПОМИНАНИЯ
        ТАК ЧТО Я ПОЛЬЗУЮСЬ ТОБОЙ!
        СПАСИБО ЗА ПОМОЩЬ!
    
    RESPOBJ::hubBuddyResponses

ep1fed
    self
        is the starvation problem solved?

    funfriend
        YES!
        INTERLOPER, YOU HAVE EXCEEDED MY EXPECTATIONS
        RECOVERY WILL BE SLOW
        BUT IT CAN BEGIN
        OH, BUT <em>WHERE</em> TO BEGIN?
        I KNOW! YOU ARE HERE FOR INFORMATION, CORRECT?
        I WILL REPAIR THE EMBASSY! THERE IS MUCH TO LEARN THERE
        AND WHILE YOU ARE THERE... 
        I WILL START REPAIRS OF THIS CYST'S CORE COMPONENTS
        THEY WILL TAKE LONGER
        IS THAT ACTION PLAN TO YOUR LIKING?

    moth
        you know, the way i heard it...
        we never got a good look at the inside of the original embassy before it collapsed way back when
        then they built that shorter one that's still up today right on top of it, before anyone could figure out what happened
        that actually could be the perfect thing to look at first

    RESPONSES::self
        sounds good<+>ep1start
    
ep1start
    self
        Sounds good, do it

    funfriend
        VERY WELL
        A CONFESSION: 
        I STARTED BEFORE I ASKED
        AND HAVE ALREADY FOUND ISSUES! AHAHA
        ALTHOUGH THE EMBASSY'S SPATIAL MEMORIES CAN BE FIXED, AND THE EVENTS SEEM TO BE INTACT...
        VISUAL MEMORY OF ITS PEOPLE WAS NOT SALVAGEABLE
        BUT WITHIN MY BACKUPS OF VITAL KNOWLEDGE, I FOUND CACHED VERSIONS OF SOME PEOPLE'S NETWORK SIGNATURES
        SO: I REPLACED THEIR APPEARANCES WITH THOSE! HOW THEY PRESENTED THEMSELVES ON THE COLLECTIVE!
        AND WHAT VARIED FORMS THEY CHOSE TO TAKE! AHAHAHA
        NOW GO
        I HAVE WORK TO DO
    
    RESPOBJ::hubBuddyResponses

repairs
    self
        so how are repairs going?

____SHOWIF::["visited_localoceanembassy", false]
    funfriend
        INTERLOPER!!!
        I JUST STARTED!!!
        GO ENTERTAIN YOURSELF WITH THE EMBASSY AHAHA LEAVE ME ALONE

____SHOWIF::[["visited_localoceanembassy", true], ["fbx__ep2intro-end", false]]
        THEY ARE STILL IN THE EARLY STAGES
        I AM FOCUSING ON CORE COMPONENTS FOR NOW...
        BUT I SENSE THAT YOU ALREADY HUNGER FOR MORE INFORMATION
        AND I THOUGHT I WAS STARVING!
        THERE IS STILL MORE TO REPAIR WITHIN THE EMBASSY...
        I WILL SET TO REPAIRING THAT NEXT
        YES, AFTER I HAVE FIXED THE CENTRAL COHERENCE REGULATOR

____SHOWIF::[["fbx__ep2intro-end"], ["fbx__ep3intro", false]]
        THEY ARE PROCEEDING
        THE MALIGNANCIES OF INCOHERENCE ARE MANY
        I AM STOMPING THEM OUT TO THE BEST OF MY ABILITY
        COHERENCY IS GRADUALLY INCREASING...
        WHICH WILL LET ME RESTORE MORE COMPLEX COMPONENTS EVENTUALLY
        BUT I HAVE NOT FORGOTTEN ABOUT THE REST OF THE EMBASSY, EITHER!
        AHH, SO MUCH TO DO!!! I WANT TO EXPLODE!!!!!
        THESE THINGS TAKE TIME, INTERLOPER

____SHOWIF::[["fbx__ep3intro"]]
        interloper! repairs are going quite well!
        incoherence is receding
        i have a new coherence regulator keeping deterioration to a minimum

    self
        can i meet them
    
    funfriend
        what?
        no!!
        interloper a coherence regulator does not speak!
        but it does mean i will have more memories repaired for you soon!
        how exciting!! right?
        ok go away now! i will tell you when i have more for you
____END

    RESPOBJ::hubBuddyResponses

embassy
    self
        WHAT DO YOU REMEMBER ABOUT THE EMBASSY?

    funfriend
        ONLY WHAT YOU HAVE ALREADY SEEN
        THESE MEMORIES...
        THEY ARE MINE, TOO
        I HAVE LINGERING IMPRESSIONS OF THINGS THAT HAPPENED
        BEFORE THEY STARVED AND FELL APART
        FOR EXAMPLE, I KNOW THAT SOMETHING TERRIBLE HAPPENED THERE AHAHAHA
        BUT I CANNOT KNOW MUCH MORE THAN WHAT IS HELD HERE
        YOU SEE,
        THIS CYST ONCE RESIDED WITHIN THE HEART OF AKIZET'S QOU-BODY
        WITH THE EXTENDED LIFE THAT SHE LIVED, OFF-LOADING MEMORIES WAS NECESSARY
        AND SO I SIMPLY MANAGE WHAT SHE STORED
    
    RESPOBJ::hubBuddyResponses

embmemories
    self
        WHY ARE THERE STILL SOME BROKEN MEMORIES IN THE EMBASSY?
    
    funfriend
        ARE THERE???
        OH, NO!
        WHOOPS! AHAHA
        I WAS IN KIND OF A HURRY... SORRY INTERLOPER!
        HEY, HOW ABOUT I FIX THOSE NEXT?
        YES! JUST GIVE ME SOME TIME...
    
    RESPOBJ::hubBuddyResponses

ep1comms
    self
        YOU SHOULD REPAIR COMMUNICATIONS NEXT

    funfriend
        COMMUNICATIONS?
        YOU WANT ME TO FIX COMMUNICATIONS??
        AAAHAAHAHAHAHA
        THAT IS LIKE SAYING,
        'HELLO FUNFRIEND, 
        PLEASE CONSTRUCT A DULL VESSEL FROM SCRATCH WHILE YOU ARE STILL BLEEDING TO DEATH'
        YOU FED THE CYST, THIS IS TRUE
        BUT THE COMPONENTS THAT KEEP IT HEALTHY ARE STILL IN DIRE CONDITION
        I REALLY MUST FIX THOSE FIRST

    RESPONSES::self
        velzie's threat<+>commstruth
        ok just try to get to it soon<+>commsok

commstruth
    self
        THE ROGUE ENTITY IN HERE IS NAMED VELZIE
        IT TOLD ME TO RESTORE COMMUNICATIONS
        OR ELSE IT WOULD HARM THE CYST

    funfriend
        VELZIE? GOD? HOW PECULIAR!
        DELUSIONAL, IN FACT!
        I AM NOT ADJUSTING MY SCHEDULE TO ENTERTAIN AN ABERRANT THOUGHTFORM
        IT IS PREYING ON YOUR CLUELESSNESS, INTERLOPER
        IT RELIES AS MUCH ON THE CYST'S SURVIVAL AS I DO
        SO HOW ABOUT YOU TELL IT, "FUNFRIEND APPRECIATES THE SUGGESTION,
        HOWEVER, IT HAS BEEN REJECTED. THANK YOU"

    RESPONSES::self
        just try to get to it soon<+>commsok

commsok
    self
        JUST TRY TO GET TO IT SOON OK?
    
    funfriend
        OF COURSE
        I APPRECIATE YOUR PATIENCE, INTERLOPER
        AND... I UNDERSTAND I MUST SEEM JOYLESS
        HOWEVER I HAVE BEEN BEARING COUNTLESS DUTIES
        WITHOUT YOUR HELP, I WOULD PROBABLY NOT BE SENTIENT PRESENTLY
        SO I SAY THIS TRULY:
        THANK YOU
        AND STAND BY FOR FURTHER REPAIRS

    RESPOBJ::hubBuddyResponses

ah1
    self
        IS THERE ANYTHING I CAN HELP WITH?
    
    funfriend
        FASCINATING QUESTION, INTERLOPER!!
        THERE IS A TROUBLESOME ENTITY PREVENTING CRITICAL REPAIRS FROM WITHIN THE <span definition="NOTE::'reconstructive translation';'implies ,,non-world,,'">UNCOSM</span>
        I NEED YOU TO GO INTO THE <span definition="NOTE::'reconstructive translation';'implies ,,non-world,,'">UNCOSM</span> AND DELETE IT
        SO, I WILL...
        AHAHAHA OH THAT IS RIGHT
        GIVEN THAT THE AUTH LAYER WAS DESTROYED...
        JUST AS I AM UNABLE TO PREVENT YOU FROM CONNECTING,
        I AM NOT ABLE TO GENERATE A SIGNATURE FOR YOU, EITHER!
        THAT IS WHY YOU HAVE BEEN UNABLE TO CHANGE ANYTHING, IF YOU WERE WONDERING
        HOWEVER...
        I WILL GRANT YOU A PROXY THOUGHTFORM ONCE YOU REACH THE TROUBLESOME CREATURE'S LAIR
        IT WILL RESPOND TO YOUR DIRECTION AND IS CAPABLE OF DELETION

    RESPONSES::self
        how do i get to the 'uncosm'<+>ah1uncosm
        what is the 'uncosm'<+>ah1whatuncosm
        how do i use the proxy<+>ah1proxy
        ok<+>loop
            FAKEEND::(back)

ah1uncosm
    self
        HOW DO I REACH THIS UNCOSM THING

    funfriend
        YOUR ROGUE THOUGHTFORM FRIEND TORE A HOLE IN THE DEPTHS
        GIVEN THAT THE DEPTHS HAVE ALWAYS LIVED ON THE EDGE OF INCOHERENCE,
        IT IS IMPOSSIBLE FOR ME TO FIX IN ANY MEANINGFUL WAY...
        SO IT IS STILL OPEN!
        FIND YOUR WAY THERE THE SAME WAY YOU GOT THERE THE FIRST TIME
        HOWEVER YOU DID IT
        THEN LOCATE YOUR QUARRY

    RESPONSES::self
        how do i get to the 'uncosm'<+>ah1uncosm
        what is the 'uncosm'<+>ah1whatuncosm
        how do i use the proxy<+>ah1proxy
        ok<+>loop
            FAKEEND::(back)

ah1whatuncosm
    self
        WHAT IS AN UNCOSM

    funfriend
        IT IS USUALLY COMPLETELY INACCESSIBLE
        THE UNCOSM IS BENEATH THIS LAYER OF COHERENCE,
        AN OCEAN OF DECAYING OR DISSOCIATED THOUGHTFORMS,
        FOR THEM TO EVENTUALLY BE REFORMED INTO NEW ONES AS NEEDED
        HOWEVER!!
        MALICIOUS INCOHERENT THOUGHTFORMS ALSO HIDE IN THE UNCOSM
        LIKE YOUR ROGUE FRIEND
        THEY CREATE THEIR OWN POCKETS OF SANITY AND GROW SLOWLY,
        EVENTUALLY BREACHING THE SURFACE OF SANITY...
        USUALLY INTENDING ON USURPING THE CYST ENTIRELY!
        VILE!! CREATURES!!!
        A ONCE-STARVING CYST LIKE THIS IS DOOMED TO HAVE DOZENS OF THEM
        SO... IF YOU HELP ME RID OF THEM AS I FIND THEM,
        THAT WILL BE VERY HELPFUL

    RESPONSES::self
        how do i get to the 'uncosm'<+>ah1uncosm
        what is the 'uncosm'<+>ah1whatuncosm
        how do i use the proxy<+>ah1proxy
        ok<+>loop
            FAKEEND::(back)

ah1proxy
    self
        how do i use your proxy

    funfriend
        INTERLOPER I HAVE NO IDEA HOW TO PUT THIS IN A WAY YOU UNDERSTAND
        BUT BASICALLY YOU ¤Mqë5yÚ*ü7Ìq¾ÏÚz)Œ
        ý±Âß£Ë$1Väƒü‹kõþwX=Ãyº‚0×6ÒÂ

    sys
        ATTENTION::'attempting thought reformation'
        ANALYSIS::'proxy thoughtform follows primary mode of direction'
        ANALYSIS::'usual controls are replaced with a disruption pulse'
        ANALYSIS::'direct the proxy over marked targets and pulse to disrupt them'
        ANALYSIS::'disruption will disperse incoherent thoughtforms'
        ANALYSIS::'avoid incoherence as it will gradually destroy the proxy'
        NOTICE::'assistance available';'if required';'enable <span style="NOTE::'presents alternatives to proxy controls';'intended to resolve hardware issues'">REDUCED INTENSITY</span> within system menu'

    funfriend
        IF IT SOUNDS COMPLEX, IT IS NOT
        JUST GO TRY IT
        I CAN MAKE MORE PROXIES
        JUST IN CASE YOU MANAGE TO FUMBLE IT INTO THE ABYSS SOMEHOW

    RESPONSES::self
        how do i get to the 'uncosm'<+>ah1uncosm
        what is the 'uncosm'<+>ah1whatuncosm
        how do i use the proxy<+>ah1proxy
        ok<+>loop
            FAKEEND::(back)

ah1end
    self
        I HAVE TAKEN CARE OF THE ENTITY IN THE UNCOSM
    
    funfriend
        I SAW! MY DIRECTIVES FINALLY WENT THROUGH!
        WOW!!!
        EXCELLENT WORK, INTERLOPER!
        THANK YOU!
        I WILL LET YOU KNOW IF ANY OTHER TROUBLES PRESENT THEMSELVES

    RESPONSES::self
        any time<+>loop
            FAKEEND::(back)

ep2start
    self
        what's new, funfriend?
    
    funfriend
        THANKS TO YOUR ASSISTANCE WITH THAT TROUBLESOME ENTITY...
            SHOWIF::"recosm_state"
        
        DESPITE A CERTAIN TROUBLESOME AGENT WITHIN THE UNCOSM...
            SHOWIF::[["recosm_state", false]]

        A COHERENCY BASELINE IS GRADUALLY BEING ESTABLISHED
        IT WILL BE A LONG TIME BEFORE IT IS FULLY EFFECTIVE,
        BUT!
        THAT WILL FREE UP MORE OF MY TIME TO RESTORE CORE COMPONENTS!
        FOR EXAMPLE, COMMUNICATIONS!
        BUT I KNOW YOU HAVE COME FOR MORE INFORMATION, SO:
        I HAVE PARTIALLY REPAIRED ANOTHER PORTION OF THE EMBASSY, AS WELL!
        YOU KNOW, 
        THESE MEMORIES ARE AKIZETESCHE'S, BUT THEY ALSO SERVE AS MINE
        AND SINCE IT WAS DAMAGED, I HAD NO IDEA THINGS GOT THAT BAD...
        I AM WORKING ON RESTORING THE REST OF THE MEMORY, BUT IT WILL TAKE A WHILE LONGER
        IT IS QUITE A LARGE ONE!!!
        SO! GO AND SEE WHAT IS THERE SO FAR!

    RESPONSES::self
        cool thanks<+>loop
            FAKEEND::(back)

mothframe
    self
        i need you to make some modifications to the last embassy day
    
    funfriend
        WHAT?
        CHANGING THE MEMORY WILL NOT CHANGE WHAT ACTUALLY HAPPENED
        YOU KNOW THAT, RIGHT?
        SELF DELUSION IS EXTREMELY UNHEALTHY
        AND ALSO THE FIRST SIGN OF EGO SPIRALING
        ARE YOU FEELING OK? 
        HAVE YOU BEEN EXPERIENCING URGES TO UNNATURALLY ALTER YOUR OWN THOUGHT PROCESSES?
    
    RESPONSES::self
        it's important<+>mothframe2

mothframe2
    self
        it's really important
        i physically can't get in without these changes
    
    funfriend
        I SEE...
        YES, YOUR NATURE AS AN INTERLOPER IS STILL UNKNOWN TO ME
        I CAN TAKE A LOOK - PLEASE SEND THROUGH WHAT YOU WOULD LIKE

    moth
        ok, i'm transferring now...

    sys
        ATTENTION::"forwarding packed thoughtform"

    funfriend
        ...
        WHAT ARE THESE THOUGHTS?
        ARE THESE YOUR THOUGHTS?
        IS THIS WHAT YOUR THOUGHTS ARE LIKE?
        THIS IS HORRIBLE...
        OK. WELL,
        THE CHANGES YOU WANT DO NOT ACTUALLY SEEM TO ALTER THE EVENTS...
        AND I BARELY NEED TO DO ANY WORK TO IMPLEMENT THEM! AHAHAHA
        SO, I WILL JUST...
    
    sys
        ATTENTION::'thoughtform activity detected'::IN::'embassy'

    funfriend
        THERE!
        FROM WHAT I SAW IN THAT DISTURBED MESS YOU GAVE ME
        IT HAS FREED UP THOUGHTFORMS TO TAKE ACTION WITHIN A LIMITED RANGE
        STILL NOT LUCID, BUT ABLE TO DO THINGS THEY DID NOT,
        ALL WHILE STILL ACTING LIKE THEY WOULD HAVE
        SO STRANGE!
        BUT, THIS ALSO MEANS...
        IF THERE ARE ANY INCOHERENT THOUGHTFORMS IN THERE,
        THEY WILL NOT ALWAYS ABIDE BY THIS STRANGE STRUCTURE YOU HAVE PLACED OVER THE MEMORY
        I DID MY BEST, BUT, 
        THERE ARE DIMINISHING RETURNS WHEN DEALING WITH SUCH ENTITIES
        AND I WOULD RATHER WORK ON SOMETHING ELSE! AHAHAHA
        SO I JUST INSERTED A PROXY THOUGHTFORM
        JUST IN CASE YOU NEED TO MANUALLY AVOID INCOHERENCE!
        OK. OFF WITH YOU! GO VIEW YOUR STRANGE DREAM

    RESPONSES::self
        thanks<+>END
        
    RESPONSES::sys
        return to embassy<+>END
            EXEC::moveTo("/local/ocean/embassy/")
            FAKEEND::(direct navigation)

ep3start
    self
        what's new, funfriend?

    funfriend
        after seeing you consume the memories of the embassy so quickly...
        i repaired the golem maintenance portion of the collapse!
        this one took so much longer than i wanted it to!!
        i thought it would only take a few winks but it did not!
        oh it did not interloper i must have spent nearly a whole gaze on it!
        interloper i have so so so much to do still!!
        aahahhaaha
        but i must tell you
        the more i repair of the collapse, the less i want to...
        it seems like things are only getting worse
        but it is my duty
        especially if it means i can know what happened to akizet
        regardless!!!!
        that is enough for now i must return to my work!!
        entertain yourself with it for now and do not bother me for a while

    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

ozogate
    self
        i will probably return to jokzi ozo
        can you add a gate for it
    
    funfriend
        and connect <em>them</em> directly to my space?
        i can tolerate jokzi ozo no more than they can tolerate me
        ahahaha interloper
        why would you even ask me that?
    
    self
        it's very out of the way
        i don't have a good way to get there
        that's all
    
    funfriend
        ...i see...
        i will add a permanent connection to the cache
        but that is all
            EXEC::content.classList.add("cache-visible")

    RESPONSES::self
        ok that works<+>loop
            FAKEEND::(back)

ozo
    self
        i found a strange place in the cache
            EXEC::change("ff_ozo", true)
        an entirely incoherent spatial thoughtform called jokzi ozo
        there was a thoughtform called the council
        it wants me to awaken other thoughtforms elsewhere
    
    funfriend
        ...
        ahaha
        of course that is what that place in the cache was...
            SHOWIF::"cache__ffozo"
        jokzi ozo... i thought it was lost
        i even pulled from what i thought to be its remains for some repairs...
        interloper!!!
        i hoped this would stay in the past
        but now that they are here again, you should know...
        jokzi ozo is a grave
        a place where thoughtforms went to await death
        all while playing in endless, selfish dreams
        they do not block anything, but...
        if it is allowed to exist,
        the structure of the cyst itself is at risk!
        they will drain resources, 
        they will pull in more and more thoughtforms,
        until the cystic glass itself is dreaming and dying!!
    
    self
        so do we destroy it?
    
    funfriend
        ahahahaha!!!
        well yes
        but it will not be simple!!
        jokzi ozo is particularly large
        no mere deletion proxy will suffice
        however...
        yes! i have a plan!
        interloper: do what the council wants!
        fetch their friends, earn their trust...
        we will need it

    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

ozodestroy
    self
        do we have to destroy jokzi ozo?

    funfriend
        interloper
        do you want to learn of akizet's memories?
        her pain, her past, and whatever happened to separate this cyst from her?
        or do you want to observe falsehoods and dreams?
        because i could simply cease repairs and allow them to flourish
        yes, you would see echoes of akizet happy...
        but it is meaningless when a simple reshuffling could give the full truth
        we are so close, interloper!!
    
    self
        they could know things we don't
        maybe they could agree not to touch important memories        
    
    funfriend
        maybe...
        let us see how they behave
    
    RESPONSES::self
        ok<+>question
            FAKEEND::(back)

ozohistory
    self
        i heard you were a part of jokzi ozo once
        is that true?
    
    funfriend
        ...
        yes...
        i was so certain that a slow death was coming for us all...
        i partook in dreams like any other!
        they were different times, interloper
        but the difference between me and them, is that i found strength again
        they lost themselves so deeply in hedonistic delusion
        that even when i proposed methods to prolong the cyst...
        they!
        ignored!!
        me!!!
        at least, until i started taking action
        then, their apathy turned to hate!
        ahahahaha!!
        and surely now they will act as if they supported me
        no, interloper, do not be deceived
        they stood against my efforts,
        the only reason you now are speaking with me
        so our history means nothing

    RESPONSES::self
        ok<+>question
            FAKEEND::(back)

masks
    self
        the council gave me some kind of information or thought
        it's letting me use these 'mask' things
            SHOWIF::["hub__funfriend_beacon", true]
        it's letting me use something called a 'mask'
            SHOWIF::["hub__funfriend_beacon", false]
        i've never seen anything like it
        do you know what it is?
    
    funfriend
        so strange!! so strange that you can use a mask!
        they are products of incoherence, working only in its presence
        like flames you can wave about to influence others
        and so, they were powerful tools during the decline!!
        they may be useful to you even now, actually,
        especially given your limited access
        and the relative instability of the cyst!
        still! be careful with them!
        try not to break any of my repairs please!!

    RESPONSES::self
        all right<+>question
            FAKEEND::(back)

isabel
    self
        a thoughtform called isabel told me about you
        she said your repairs can't stick
        many thoughtforms are too damaged to serve in memories
        and that it's all for nothing
        is that true?
    
    funfriend
        ahaahhaa!!
        isabel...
        there is some truth to what she says, interloper
        many thoughtforms will simply be unable to cohere ever again
        starvation and madness can sometimes forever scar them
        part of my repairs involve seeing which ones will stick...
        and which ones are completely lost, to be replaced
        their starved incoherence is like knowledge
        if it is learned deeply enough, it never leaves them
    
    self
        how can you replace parts of a memory like that?
    
    funfriend
        any thoughtforms that are completely lost to madness are truly lost
        but sometimes, information can be moved from one to another, even in damaged states...
        it is troublesome, time consuming, especially if they do not cooperate
        i hate it more than any other part of repair, interloper!!!
        many of them were once like friends...
        for a while, anyway
        regardless!!!
        do not let isabel's words shake you
        i have things under control
        especially with your help!

    RESPONSES::self
        ok<+>question
            FAKEEND::(back)

END::chatter({actor: 'funfriend', text: "ХОРОШО Я БУДУ ЗДЕСЬ"})
`)

//funfriend chatter ep0
//base chatter
env.localization.strings["HELLO AGAIN"] = "СНОВА ПРИВЕТ"
env.localization.strings["HI INTERLOPER"] = "ПРИВЕТ ВТОРЖЕНЕЦ"
env.localization.strings["HELLO!"] = "ПРИВЕТ!"
env.localization.strings["IS THE AUTH LAYER STILL DISSOCIATED?"] = "СЛОЙ АВТОРИЗАЦИИ ВСЁ ЕЩЁ ДИССОЦИИРОВАН?"
env.localization.strings["I MISS THEM"] = "Я ПО НИМ СКУЧАЮ"
env.localization.strings["INTERLOPER!"] = "ВТОРЖЕНЕЦ!"
env.localization.strings["WELCOME"] = "ДОБРО ПОЖАЛОВАТЬ"
env.localization.strings["BUT ALSO PLEASE DO NOT BOTHER ME"] = "НО ПРОШУ НЕ БЕСПОКОЙ МЕНЯ"
env.localization.strings["VERY BUSY"] = "ОЧЕНЬ ЗАНЯТ"
env.localization.strings["HELLO INTERLOPER"] = "ПРИВЕТ ВТОРЖЕНЕЦ"
env.localization.strings["THE VOID IS FASCINATING!"] = "БЕЗДНА ТАКАЯ ЗАХВАТЫВАЮЩАЯ"
env.localization.strings["THERE USED TO BE A LOT MORE THERE"] = "РАНЬШЕ ТАМ БЫЛО ГОРАЗДО БОЛЬШЕ"
env.localization.strings["I WONDER WHERE IT ALL WENT"] = "ИНТЕРЕСНО КУДА ВСЁ ПРОПАЛО"
env.localization.strings["I SAW YOU VISITED THE DULL VESSEL"] = "Я ВИЖУ ТЫ ПОСЕТИЛ СУДНО ДАЛЛА"
env.localization.strings["IF IT SEEMED EMPTY THAT IS BECAUSE THE FURNITURE THOUGHTFORMS WERE CONSUMED"] = "ЕСЛИ ОНО КАЗАЛОСЬ ПУСТЫМ ТО ЭТО ПОТОМУ ЧТО ВСЕ МЫСЛЕФОРМЫ МЕБЕЛИ БЫЛИ ПОГЛОЩЕНЫ"
env.localization.strings["SORRY"] = "ИЗВИНИ"
env.localization.strings["WE CAN FIX IT LATER"] = "МЫ ЭТО ИСПРАВИМ ПОЗЖЕ"
env.localization.strings["WHAT A SHAME THE EMBASSY IS INCOHERENT"] = "ЖАЛЬ ЧТО ПОСОЛЬСТВО НЕКОГЕРЕНТНО"
env.localization.strings["I LIKED THAT PLACE"] = "МНЕ ОНО НРАВИЛОСЬ"
env.localization.strings["ONCE THE FUEL SITUATION IS RESOLVED..."] = "КАК ТОЛЬКО СИТУАЦИЯ С ТОПЛИВОМ РЕШЕНА..."
env.localization.strings["MAYBE WE CAN FIX IT"] = "МОЖЕТ МЫ СМОЖЕМ ЕГО ПОЧИНИТЬ"
env.localization.strings["IS THE STRANGER STILL RUNNING AMOK IN HERE"] = "ТОТ НЕЗНАКОМЕЦ ВСЁ ЕЩЁ СЕЕТ ХАОС В КИСТЕ?"
env.localization.strings["PLEASE MAKE SURE IT DOES NOT COME TO MY SPACE"] = "ПОЖАЛУЙСТА НЕ ДАЙ ЕМУ ВОЙТИ В МОЁ ПРОСТРАНСТВО"

//ep0 exclusive conditionals

env.localization.page["hub"] = {
    dialogues: {},
    definitions: {},
    strings: {},
}
env.localization.page[`hub`].strings["HELLO"] = "ПРИВЕТ"
//env.localization.strings["HELLO"] = "ПРИВЕТ"
//can't do that cause it'll overwrite the hellos elsewhere
env.localization.strings["STILL STARVING HAHA"] = "ВСЁ ЕЩЁ ГОЛОДАЮ ХАХА"
env.localization.strings["HELLO AGAIN INTERLOPER"] = "СНОВА ПРИВЕТ ВТОРЖЕНЕЦ"
env.localization.strings["I HOPE YOU HAVE EATEN WELL"] = "НАДЕЮСЬ ТЫ СЫТ"
env.localization.strings["I HAVE FORGOTTEN WHAT NOT BEING HUNGRY FEELS LIKE"] = "Я ЗАБЫЛ КАКОВО ЭТО НЕ СТРАДАТЬ ОТ ГОЛОДА"

// moth hub
env.localization.strings["about the hub"] = "о центре"

//mothchat definition
env.localization.dialogues.mthlocalr = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        о весельдруге<+>funfriend
            SHOWIF::[['hub__funfriend-start']]
        о вратах<+>gates
            SHOWIF::[['visited_localorbit']]
        пока всё<+>CHANGE::++moth
            FAKEEND::(назад)
`)

env.localization.dialogues.mthlocalfunr = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        поведение<+>ffdemeanor
            SHOWIF::['ep1_fed', false]
        ситуация с топливом<+>fffuel
            SHOWIF::[['hub__funfriend-fuelthanks'], ['ep1_fed', false]]
        сигнатура<+>ffsignature
            SHOWIF::[['hub__funfriend-signatureq']]
        пока хватит о весельдруге<+>loop
            FAKEEND::(назад)
`)

env.localization.dialogues[`mth++hub`] = generateDialogueObject(`
start
    self
        У меня есть вопрос об этом мыслепространстве

    moth
        ага, у меня тоже пара появилась
        но что тебя интересует?
    
    RESPOBJ::mthlocalr
    
gates
    self
        Что это за врата?
    
    moth
        ну это соединительные мыслеформы, грубо говоря, ничего особенного 
        но похоже что спецификация 'врата' используется для приукрашения
        может быть у этого есть какое-то культурное значение, они тоже называли межзвёздные червоточины или типа того 'вратами'
        так что можно рассуждать что они кем-то были специально созданы в качестве короткого пути
        если эта штука предназначена для хранения памяти, то в этом больше всего смысла, иначе было бы легко запутаться
    
    RESPOBJ::mthlocalr

loop
    self
        Больше ничего
        
    RESPOBJ::mthlocalr

funfriend
    self
        Об этом 'весельдруге'...
    RESPOBJ::mthlocalfunr

ffdemeanor
    self
        Даже зная, что мы такое, оно чересчур дружелюбно
    
    moth
        ага, мне тоже так показалось
        возможно это часть его дизайна, как маленького ассистента
        или может быть оно не может нас выгнать из-за 'диссоциации' слоя авторизации
        так или иначе, если бы я голодал на дне океана, то мне было бы без разницы, кто меня спас, лол
        так что вероятно ему тоже будет плевать пока мы не дадим ему топливо 
        знаешь, на всякий случай, я предлагаю найти всё что можно прежде чем мы ему поможем
        это может быть нашим единственным шансом--вдруг оно действительно только впускает нас из-за голода

    RESPOBJ::mthlocalfunr

fffuel
    self
        Что нам делать по поводу топлива?

    moth
        ну... наверное лучше с этим подождать пока мы не нашли всё что можно
        пока всё выглядит довольно стабильно, и технология обеск обычно ведёт себя очень странно при голодании
        так что я думаю это сыграет нам на руку если мы наткнёмся на что-то наподобии слоя авторизации
        тем не менее... что насчёт самой заправки,
        я послал сообщение наверх, чтобы нам прислали кучку медных трубок, чтобы мы могли ими воспользоваться... если 'весельдруг' скажет нам как
            SHOWIF::[['EXEC::env.dialogues.mthlocalfunr.scannedContainer(false)']]
        наверное можно использовать содержимое того контейнера, который мы нашли, по звуку он похож на металл и выглядит прямо как большие контейнеры на корабле акизет
            SHOWIF::[['EXEC::env.dialogues.mthlocalfunr.scannedContainer(true)']]
        
    RESPOBJ::mthlocalfunr

ffsignature
    self
        Почему у меня нет сигнатуры?

    moth
        я на самом деле понятия не имею почему оно не видит твою сигнатуру
        типа, у нейрошипа она обязана быть для авторизации
        скорее всего, оно искало конкретный тип сигнатуры, поэтому довольно легко понять, что твой соединитель неорганический

    RESPOBJ::mthlocalfunr
`)

// local/city

//moth
env.localization.strings["this is prettyyyy busted... but at least it's something"] = "выглядит оооочень неважно... но это хоть что-то"
env.localization.strings["anything else on your mind?"] = "что-нибудь ещё?"
env.localization.strings["about this thoughtform"] = "об этой мыслеформе"

env.localization.dialogues.mthresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        какой это город<+>where
        неважно<+>CHANGE::++moth
            FAKEEND::(назад)
`)

env.localization.dialogues[`mth++localcity`] = generateDialogueObject(`
start
    self
        У меня есть вопрос об этой мыслеформе города

    moth
        да?
    
    RESPOBJ::mthresp

where
    self
        Какой это может быть город?
    
    moth
        честно, я сомневаюсь, что это какой-то конкретный город
        выглядит как мешанина... как будто это символический образ города, а не репрезентация чего-то именно
            SHOWIF::[['hub__funfriend-kickout', false]]
        раз эта штука голодает, может воспоминания акизетеще объединены воедино ради выживания
            SHOWIF::[['hub__funfriend-kickout']]
        мы наблюдали подобное физическое поведение в голодающей коррукистической технике, так что наверное на психическое это тоже распространяется
            SHOWIF::[['hub__funfriend-kickout']]

    RESPOBJ::mthresp
`)


//prose
env.localization.strings["..__INCOMPLETE_THOUGHTFORM__.."] = "..__НЕПОЛНАЯ_МЫСЛЕФОРМА__.."
env.localization.strings["::OPINATIVE THOUGHTFORM"] = "::МЫСЛЕФОРМА МНЕНИЯ"
env.localization.strings["::CONTENT::'"] = "::СОДЕРЖАНИЕ::'"
env.localization.strings["glimmering spires mark their cities"] = "мерцающие шпили обозначают их города"
env.localization.strings["all formed of dead metal and glass"] = "все построены из мёртвого металла и стекла"
env.localization.strings["so tall!!! taller than the tallest"] = "так высоко!!! выше чем самый высокий"
env.localization.strings["but they stand quietly..."] = "но они стоят тихо..."
env.localization.strings["one day they will breathe"] = "однажды они задышат"
env.localization.strings["and our lost cousins will share in our knowledge"] = "и наши потерянные собратья получат наши знания"
env.localization.strings["veilk"] = "веилк"
env.localization.strings["INHERITED CONTEXT::'surface fauna';'foundation of entire ecosystem';'enormous and endless'"] = "УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'фауна на поверхности';'основание целой экосистемы';'огромное и бесконечное'"

env.localization.strings["these grand icons of their control"] = "эти великие символы их контроля"
env.localization.strings["though they are not ours"] = "хотя они не принадлежат нам"
env.localization.strings["i feel a sense of pride"] = "я чувствую гордость"
env.localization.strings["how our bright cousins have conquered their"] = "как наши светлые собратья покорили свою"
env.localization.strings["surface"] = "поверхность"

// local/city eye
env.localization.strings["they watch"] = "они наблюдают"
env.localization.strings["::SPATIAL THOUGHTFORM"] = "::ПРОСТРАНСТВЕННАЯ МЫСЛЕФОРМА"
env.localization.strings["::EXPLICIT PURPOSE::'recollection'"] = "::ГЛАВНОЕ НАЗНАЧЕНИЕ::'воспоминание'"
env.localization.strings["ANALYSIS::'low separation'"] = "АНАЛИЗ::'низкий уровень разделения'"
env.localization.strings["ever-skeptical"] = "вечно скептичны"


// local/city/street
env.localization.strings["envoy"] = "посол"
env.localization.strings["ANALYSIS::'degraded visual profile'"] = "АНАЛИЗ::'деградировавший визуальный профиль'"
env.localization.strings["chat"] = "поговорить"

env.localization.dialogues.envoyStreetResponses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        говорить с людьми?<+>talkpeople
            
        кафе?<+>cafe

        цветочный магазин?<+>flowers
            SHOWIF::"ENV!!ep2"

        продолжим<+>END
`)

env.localization.dialogues["envoy"] = generateDialogueObject(`
start
    sourceless
        Я ОСТАНАВЛИВАЮСЬ, И ПОСОЛ ПОВТОРЯЕТ ЗА МНОЙ. ОН СМОТРИТ МНЕ В ОТВЕТ.
        
    akizet
        благодарю, что вы это позволили, гордон
            SHOWONCE::
        я понимаю, что всё ещё остались опасения...
            SHOWONCE::
        особенно в таких людных местах.
            SHOWONCE::
        
    envoy
        Эй, без проблем. И не волнуйся, большинство людей здесь хорошо к тебе отнесутся.
            SHOWONCE::
        Будь мы в Чикаго или Нью-Йорке, нам бы пришлось сесть на крыше, но...
            SHOWONCE::
        Учитывая, насколько занято бюро, нас посетили так много обеск,
            SHOWONCE::
        Ваш народ практически стал частью города.
            SHOWONCE::
    
    sourceless
        ОН ВЫНИМАЕТ МЕТАЛЛИЧЕСКИЙ КОММУНИКАТОР ИЗ ПОЛОСТИ CВОЕГО КОЖНОГО ПОКРОВА, И ИЗУЧАЕТ ЕГО СИЯНИЕ
            SHOWONCE::

    envoy
        И если честно, это идёт на пользу публичному имиджу. То, что ты находишься среди людей, ...
            SHOWONCE::
        Помогает подавить ту проклятую панику.
            SHOWONCE::
    
    akizet
        ах, я не приняла это в расчёт
            SHOWONCE::
        я согласна!
            SHOWONCE::

    envoy
        Знаешь, к слову о публичном имидже,
            SHOWONCE::
    
    sourceless
        ОН ВОЗВРАЩАЕТ КОММУНИКАТОР В ПОЛОСТЬ
            SHOWONCE::

    envoy
        Тут неподалёку есть маленькое местечко, кафе. Почему бы нам не зайти туда прежде чем приступить к делу?
            SHOWONCE::
        Просто иди прямо, мимо бюро.
            SHOWONCE::
    
    RESPOBJ::envoyStreetResponses
    
talkpeople
    akizet
        вы не возражаете, если я поговорю с вашими улицеходами?
    
    envoy
        Вовсе нет! Пока я рядом, то пожалуйста.
        Как я и сказал, этот город, наверное, самый дружелюбный к обеск в штатах.
        В худшем случае, некоторые на тебя будут пялиться. Наверняка всё ещё остались помешанные теоретики.
    akizet
        ясно!
    
    RESPOBJ::envoyStreetResponses

cafe
    akizet
        где это 'кафе'?
    
    envoy
        Очень близко. Просто иди дальше по улице, у него ˜/ŒôfªœDŠ/d 0E@яркая жёлтая дверь.
    
    RESPOBJ::envoyStreetResponses

flowers
    akizet
        я помню, вы ранее упоминали "цветочный магазин"...
        где это?
    
    envoy
        Уже довольно поздно, Акизет, я не уверен, открыты ли ещё они...
        Но достаточно дальше идти по улице, и он будет на углу.
    
    RESPOBJ::envoyStreetResponses
`)

env.localization.dialogues["walker3"] = generateDialogueObject(`
start
    sourceless
        Я ОСТАНАВЛИВАЮСЬ РЯДОМ СО ВХОДОМ В БЮРО ЧТОБЫ ПОСМОТРЕТЬ НА СВЕТЛОГО СОБРАТА КОТОРЫЙ ОДЕТ КАК ПОСОЛ
        ОН РАССЕЯННО ДЕРЖИТ МАЛЕНЬКИЙ ПРЯМОУГОЛЬНЫЙ КОММУНИКАТОР РЯДОМ СО СВОИМ ЛИЦОМ

    cloaked streetwalker
        ...ни к чему не привело, так что я просто умирал со скуки. Сплошной ужас.
        Пришлось купить ещё больше кофе, иначе я бы прямо на месте заснул...
    
    sourceless
        ВСЕГДА ВЫГЛЯДИТ ЗАБАВНО КОГДА ОНИ ОБЩАЮТСЯ С ИХ ПОМОЩЬЮ
        КАК ИХ СЛОВА ПРЕВРАЩАЮТСЯ В МОЛНИИ?
        ПОСОЛ НАКЛОНЯЕТСЯ ВПЕРЁД, ЧТОБЫ УЗНАТЬ, ПОЧЕМУ Я ОСТАНОВИЛАСЬ, И СЛЕДУЕТ ЗА МОИМ ВЗГЛЯДОМ
        ОН ГОВОРИТ ТИХО, ЧТОБЫ НЕ ПРИВЛЕЧЬ ВНИМАНИЕ УЛИЦЕХОДА
    
    envoy
        Что такое?
        Ты знаешь Оливера?

    akizet
        хмм...
        нет, я восхищена вашими коммуникаторами
        в моей предыдущей занятости говорить так громко, так постоянно, было бы верной смертью
    
    envoy
        Ты работала на поверхности, верно?
    
    akizet
        да, периодически! перед началом--
    
    sourceless
        УЛИЦЕХОД В ПЛАЩЕ СКЛАДЫВАЕТ СВОЙ КОММУНИКАТОР И ОСМАТРИВАЕТСЯ, БЫСТРО ЗАМЕЧАЯ НАС
        ОН ШИРОКО УЛЫБАЕТСЯ И ЖЕСТИКУЛИРУЕТ ЧТОБЫ МЫ ПОДОШЛИ БЛИЖЕ.

    cloaked streetwalker
        Привет, Гордон! Кто это?
            EXEC::body.classList.add('zoom')
        Дай угадаю, инициатива по обмену?
    
    envoy
        
        Вообще-то, Оливер, это Акизетеще! Инициатива по "Сигналу".

    cloaked streetwalker
        Нихрена! Я не знал, что тебя туда назначили.
        Рад встрече, Акизетеще!

    sourceless
        Я СКЛОНЯЮ ГОЛОВУ И УВАЖИТЕЛЬНО ЗАВИВАЮ РЕЦЕПТОРЫ НАЗАД.
    akizet
        я взаимно рада, оливер, мой друг
        вы можете звать меня акизет

    cloaked streetwalker
        Хорошо, Акизет.
        Слушай, я бы рад поболтать, но мне надо на пост через 10.
    envoy
        Ничего страшного, Оливер. У нас тоже есть дела.
        Ещё увидимся.
    
    RESPONSES::akizet
        прощайте<+>END
            EXEC::body.classList.remove('zoom')
`)

// city street cafe

env.localization.page["citystreet"] = {
    dialogues: {},
    definitions: {},
    strings: {},
}

env.localization.strings["say hello"] = "поприветствовать"

env.localization.strings["THE ATTENDANT IS PARALYZED BY MY APPEARANCE. I SENSE THE GLOW OF RECORDING COMMUNICATORS IN MY PERIPHERAL VISION"] = "СОТРУДНИЦА ПАРАЛИЗОВАНА МОИМ ПОЯВЛЕНИЕМ. Я ЧУВСТВУЮ СИНЯНИЕ ЗАПИСЫВАЮЩИХ КОММУНИКАТОРОВ В МОЁМ ПЕРИФЕРИЧЕСКОМ ЗРЕНИИ"
env.localization.strings["Uhh..."] = "Эмм..."
env.localization.page[`citystreet`].strings["hello"] = "здравствуйте"
env.localization.strings["Hello...?"] = "Здравствуйте...?"
env.localization.strings["Good morning!"] = "Доброе утро"
env.localization.strings["I'll get an espresso macchiato."] = "Мне, пожалуйста, эспрессо макиато."
env.localization.strings["What do you want, Akizet?"] = "Чего тебе хочется, Акизет?"
env.localization.strings["Akizet... THAT Akizet?"] = "Акизет... ТА САМАЯ Акизет?"
env.localization.strings["Wow... It's so cool to meet you!!"] = "Вау... Как круто с Вами встретиться!!"
env.localization.strings["Do you... do you eat? Food?"] = "Вы... Вы едите? Еду?"
env.localization.strings["Haha! Of course she does!"] = "Ха-ха! Конечно ест!"
env.localization.strings["Why don't you take a look at the menu, Akizet?"] = "Почему бы тебе не прочитать меню, Акизет?"
env.localization.strings["where is the menu?"] = "где меню?"
env.localization.strings["It's behind me..."] = "Оно прямо за мной..."
env.localization.strings["Can you read?"] = "Вы умеете читать?"
env.localization.strings["Sorry... I didn't mean for that to sound mean..."] = "Простите... это прозвучало грубо..."
env.localization.strings["i can, do not worry"] = "я умею, не беспокойтесь"
env.localization.strings["what do you recommend?"] = "что бы вы порекомендовали?"
env.localization.strings["You like citrus, right?"] = "Тебе нравятся цитрусы, верно?"
env.localization.strings["They have this orange coffee thing."] = "У них есть какое-то кофе с апельсином."
env.localization.strings["You might like it!"] = "Может оно тебе понравится!"
env.localization.strings["you do know that i--"] = "вы же знаете что я--"
env.localization.strings["Go on, order something! Just give it a try."] = "Давай, закажи что-нибудь! Просто попробуй."
env.localization.strings["I know you don't exactly have the same needs we do..."] = "Я знаю, что у вас нет тех же нужд, что и у нас..."
env.localization.strings["But you can simulate taste, right?"] = "Но вы умеете симулировать чувство вкуса, верно?"
env.localization.strings["Getting out here, with the people, acting like we do?"] = "Быть среди людей, вести себя как мы?"
env.localization.strings["It makes a difference. Helps lessen the tension."] = "Это очень важно. Помогает снять напряжение."

env.localization.dialogues["cafemenu"] = generateDialogueObject(`
start
    sourceless
        ЭТО ИХ МЕНЮ?
        НЕВЕРОЯТНО...
        ОНО ПОЧТИ ПОЛНОСТЬЮ НЕРАЗБЕРИМО
        Я ВИЖУ 'АПЕЛЬСИН' - ВОЗМОЖНО ЦИТРУСОВЫЙ НАПИТОК?
        СВЕТЛЫЕ СОБРАТЬЯ НАСТОЛЬКО ИЗОБИЛУЮТ ЦИТРУСОВЫМИ КИСЛОТАМИ ЧТО ОНИ ПРОИЗВОДЯТ МАЛЕНЬКИЕ НАПИТКИ С НИМИ...
        РАЗВЕ ЭТО НЕ РАЙ?
        Я КОМАНДУЮ СВОЕМУ РТУ ПОСТРОИТЬ ЭКВИВАЛЕНТЫ ВКУСОВЫХ РЕЦЕПТОРОВ. ПРОШЛО ТАК МНОГО ВРЕМЕНИ! 
            EXEC::change('citystreet_orangecoffee', true)
    
    RESPONSES::akizet
        замечательно<+>END
`)

env.localization.strings["i will have the orange"] = "я буду апельсин"
env.localization.strings["The..."] = "А..."
env.localization.strings["Oh, yeah! OK!"] = "Ах, да! Хорошо!"
env.localization.strings["Espresso macchiato and an orange coffee... That'll"] = "Эспрессо макиато и кофе с апельсином... С вас"
env.localization.strings["I got you covered, Akizet."] = "Я расплачусь, Акизет."
env.localization.strings["THEY EXCHANGE PAYMENT. THE ATTENDANT LEAVES TO BEGIN PRODUCTION OF THE BEVERAGES."] = "ОНИ ОБМЕНИВАЮТСЯ ОПЛАТОЙ. СОТРУДНИЦА УХОДИТ И НАЧИНАЕТ ПРОИЗВОДИТЬ НАПИТКИ "
env.localization.strings["Just wait a minute and we'll have those ready."] = "Подождите минутку, они скоро будут готовы."
env.localization.strings["I WISH I COULD PRY THESE MACHINES OPEN AND WATCH THEM WORK..."] = "КАК ХОЧЕТСЯ ВСКРЫТЬ ЭТИ МЕХАНИЗМЫ И ПОСМОТРЕТЬ НА ИХ РАБОТУ..."
env.localization.strings["THEIR MANIPULATION OF LIGHTNING IS TRULY REMARKABLE"] = "ИХ МАНИПУЛЯЦИИ МОЛНИЯМИ ПОИСТИНЕ НЕВЕРОЯТНЫ"
env.localization.strings["SOME MOMENTS PASS, AND THE ATTENDANT RETURNS WITH TWO FLIMSY ORGANIC CUPS"] = "ПРОХОДИТ ВРЕМЯ, И СОТРУДНИЦА ВОЗВРАЩАЕТСЯ С ДВУМЯ ХЛИПКИМИ ОРГАНИЧЕСКИМИ КРУЖКАМИ"
env.localization.strings["Hey, thanks. You have a good day."] = "Благодарю. Хорошего Вам дня."
env.localization.strings["Thanks!! You too!!"] = "Спасибо!! Вам тоже!!"
env.localization.strings["I SIP AT THE OPENING IN THE CUP. THE TASTE IS... EXOTIC. UNEXPECTED. TRULY, TERRIBLE. I SMILE AT THE ATTENDANT."] = "Я ДЕЛАЮ НЕБОЛЬШОЙ ГЛОТОК ЧЕРЕЗ ОТВЕРСИТЕ В КРЫШКЕ. ВКУС... ЭКЗОТИЧЕН. НЕОЖИДАН. ПОИСТИНЕ УЖАСЕН. Я УЛЫБАЮСЬ СОТРУДНИЦЕ."
env.localization.strings["THE CITRUS SAVES IT. BUT I WOULD HAVE PREFERRED A SIMPLE CUP OF THEIR ORANGED JUICE"] = "ЦИТРУС СПАСАЕТ. НО Я БЫ ПРЕДПОЧЛА ПРОСТУЮ ЧАШКУ ИХ АПЕЛЬСИНЕНОГО СОКА"
env.localization.strings["Pretty good, right?"] = "Неплохо, да?"
env.localization.strings["it will do"] = "сойдёт"
env.localization.strings["Great! Let's head down to the office."] = "Отлично! Давай пойдём в офис."
env.localization.strings["I heard you have some news about the call?"] = "Я слышал, у тебя есть новости о зове?"
env.localization.strings["oh yes, but... let us talk of it in private."] = "ах, да, но... поговорим об этом наедине."

//ep0 ship interview
//have to define responses first in order to avoid the crash
env.localization.dialogues.interviewResponses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::interviewer
        о вас<+>introduction
            SHOWONCE::

        почему земля?<+>whyyoucame
            SHOWONCE:: 
            
        яркий собрат?<+>brightcousin
            SHOWONCE::
            
        корру?<+>corru
            SHOWONCE::
            
        почему сейчас?<+>whynow
            SHOWONCE::  
            SHOWIF::[["interview1__firstchat-whyyoucame"]]
            
        что вы будете делать?<+>whatwillyoudo
            SHOWONCE::  
            SHOWIF::[["interview1__firstchat-whynow"]]
            
        зов?<+>thecall
            SHOWONCE::  
            SHOWIF::[["interview1__firstchat-whyyoucame"]]

        закончить интервью<+>endinterview
            SHOWONCE::  
            SHOWIF::[["interview1__firstchat-whyyoucame"],["interview1__firstchat-thecall"],["interview1__firstchat-whatwillyoudo"],["interview1__firstchat-corru"],["interview1__firstchat-brightcousin"],["interview1__firstchat-whyyoucame"],["interview1__firstchat-introduction"]]
        
        продолжить визуализацию<+>integritycontinue
            SHOWIF::[["interview1__firstchat-endinterview"]]

    RESPONSES::self
        закончить воспоминание<+>END
            SHOWIF::[["interview1__firstchat-integritycontinue", false]]
            EXEC::moveTo('/local/ocean/ship/')
`)

//and now the actual translation
env.localization.dialogues["firstchat"] = generateDialogueObject(`
start
    sourceless
        СОБЕСЕДНИЦА ЗАХОДИТ В КОМНАТУ И САДИТСЯ НАПРОТИВ МЕНЯ
        СТОЛЬКО ИССЛЕДОВАНИЙ, И Я ВСЁ ЕЩЁ ЕЛЕ МОГУ ИХ РАЗЛИЧИТЬ...
        ВСТРЕЧАЛАСЬ ЛИ Я С НЕЙ РАНЬШЕ? КАК ЕЁ ЗОВУТ?         
        
    interviewer
        Простите за ожидание! Пришлось заменить накопитель у камеры после предыдущего интервью.
        Вы знаете о камерах, да?
        
    akizet
        это ваши маленькие молниевые коробки для воспоминаний, не так ли?
    
    interviewer
        Хаха! Да, можно и так выразиться.
        Вы ведь не возражаете, если наш разговор будет записан?
    
    sourceless
        ВОЗРАЖАЮ? ЧТО ЭТО ЗНАЧИТ?
        
    funfriend
        РАСЧЁТ: 'ПРОТИВОСТОИШЬ ЛИ ТЫ'
    
    akizet
        ох. нет, я делаю то же самое
            EXEC::env.interview.classMod('ease');env.interview.camSpeed("2s");env.interview.classMod('cameraup')
        
    sourceless
        СОБЕСЕДНИЦА ВОЗВОДИТ ТРЕНОЖНОЕ УСТРОЙСТВО ИЗ МЁРТВОГО МЕТАЛЛА И СТЕКЛА
            EXEC::env.interview.cam('camclose')
        ОНО ТАРАЩИТСЯ НА МЕНЯ СВОИМ ЗАБАВНЫМ ГЛАЗОМ
        
    interviewer
        Итак, для начала...
            EXEC::env.interview.camSpeed("5s");env.interview.cam('akipov');env.interview.classMod('ease', false);

    RESPOBJ::interviewResponses

introduction
    interviewer
        Можете ли Вы немного рассказать о себе? О своей истории?
            EXEC::env.interview.classMod('ease');env.interview.camSpeed("2s");
    
    akizet
        конечно, друг
            EXEC::env.interview.cam('akipovdown')
        я акизетеще коу джокзи
        но вы можете звать меня акизет
        на своей родине, прежде, чем я выросла из своей личиночной формы,
        я была разведчиком на поверхности. я повстречала множество пещерных городов во время нашей коррукистической революции
        она началась на моей родине, и я вместе с другими добровольцами приносили наши знания нашим дальним сородичам
        поэтому я была выбрана, чтобы встретиться с вами, как и большинство других. в качестве дипломата
        конечно, однажды я была смертельно ранена на поверхности--там было очень опасно, видите ли
        затем последовал мой метаморфоз... хмм, я могу целыми <span definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'период времени'">мерцаниями</span> говорить о том, что последовало
        но видите ли, ввиду этого, и моего растущего интереса в зове, выбор пал на меня
        это удовлетворяет вопрос?
        
    interviewer
        Да, спасибо!
            EXEC::env.interview.classMod('ease', false);env.interview.camSpeed("5s");env.interview.cam('akipov')

    RESPOBJ::interviewResponses

whyyoucame
    interviewer
        Что вы можете сказать о том, зачем обеск прибыли на Землю?
            EXEC::env.interview.classMod('ease');env.interview.camSpeed("2s");
    
    akizet
        разве вы не узнали об этом от предыдущих послов?
            EXEC::env.interview.cam('akipovtilt')

    interviewer
        Ах, я просто читаю по тексту! Мы спрашиваем это у всех ваших людей.
        Дело не только в конкретной причине, мы хотим понять, что Вы думаете об этом.

    akizet
        понимаю! 
            EXEC::env.interview.cam('akipov')
        мы так давно искали жизнь, я помню разговоры о поисках ещё в моей молодости
        и у нас так же давно были средтсва для достижения других планет,
        но это чрезмерный способ... мы не могли просто посетить любую планету, которую захотелось
        нам нужен был явный знак, и ваша планета дала его нам!

    interviewer
        И это тот самый 'зов', верно?
    
    akizet
        да, да! да!! так вы уже о нём знаете?

    interviewer
        У нас был, ээ, очень--очень длинный разговор о нём с одним из ваших инженеров ранее сегодня!

    akizet
        кавик?
    
    interviewer
        Извините, что Вы сказали?
        Ах, Кавик! Да, да--с ним! Он был очень дружелюбен.

    sourceless
        И ОПРЕДЕЛЁННО НЕКВАЛИФИЦИРОВАН ГОВОРИТЬ О ЗОВЕ ПРИ ДАННЫХ ОБСТОЯТЕЛЬСТВАХ
        ПРЕДСТАВИТЬ НЕ МОГУ КАКИЕ ВЫДУМКИ ОН РАССКАЗАЛ НАШИМ СОБРАТЬЯМ

    interviewer
        Что Вы думаете о зове? Не считая основ.

    akizet
        да, это странный парадокс...
        настолько странный, что именно поэтому я теперь сижу с вами, мой яркий собрат
        если бы не зов, мы бы никогда не нашли ваш дом
        но... зов не мог произойти, если мы никогда не были в вашем доме
        ни одна из наших теорий не подтвердилась
    
    interviewer
        Ни одна? 
        У Кавика определённо было много теорий.

    sourceless
        Я ПОДАВЛЯЮ МОЙ СМЕХ С ПОМОЩЬЮ ПРЯМОГО ВНУТРЕННЕГО УПРАВЛЕНИЯ
        БЫЛО БЫ НЕПРИЕМЛИМО ВЫСТАВИТЬ ЕГО В ДУРНОМ СВЕТЕ ПРИ МОЁМ ПЕРВОМ КОНТАКТЕ

    akizet
        кавик чудесен, но пока у нас нет доказательств, они так и остаются теориями
        мы сможем понять, что происходит, только если найдём источник

    RESPOBJ::interviewResponses

whynow
    interviewer
        Почему ваши люди ждали семь лет прежде чем установить контакт?
            EXEC::env.interview.classMod('ease');env.interview.camSpeed("2s");env.interview.cam('akipov');
    
    funfriend
        ПРИМЕЧАНИЕ: СЕМЬ ЛЕТ ПРИБЛИЗИТЕЛЬНО РАВНЫ ТРЁМ <span definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'патрули вокруг глаза велзи'">ГЛАЗАМ</span>
            EXEC::env.interview.cam('akipovup')
    
    akizet
        этот выбор был сделан лидерами инициативы, я полагаю, было намерение сначала сконцентрировать все усилия на исследование зова
            EXEC::env.interview.cam('akipovtilt')
        но учитывая, как быстро наш шпиль был обнаружен, нам пришлось перейти к расшифровке ваших языков и культур для установления контакта

    sourceless
        ЛИЦЕВАЯ МУСКУЛАТУРА СОБЕСЕДНИЦЫ НЕЗНАКОМО ИСКАЖАЕТСЯ
        СТОИТ ЛИ МНЕ ТАК ЖЕ ИСКАЗИТЬ МОЮ? Â¾â¹/Â¾Ã¸Ã
        ФИЗИЧЕСКИЙ ЯЗЫК НАШИХ ЯРКИХ СОБРАТЬЕВ НЕРАЗБЕРИМ
    
    interviewer
        Значит, за семь лет вы смогли понять все наши культуры и языки?

    sourceless
        Я СМЕЮСЬ. МОЙ ГОЛОС ТАКОЙ ГРОМКИЙ В ЭТОЙ МАЛЕНЬКОЙ КОМНАТЕ
        СОБРАТ ИМИТИРУЕТ МОЙ СМЕХ, ВОЗМОЖНО ОНА ПОНИМАЕТ

    akizet
        процесс ещё идёт
        ваш вид прошёл такие разные пути. но мы изучили достаточно чтобы разговаривать с вами
            EXEC::env.interview.classMod('ease', false);env.interview.camSpeed("5s");env.interview.cam('akipov')

    RESPOBJ::interviewResponses

whatwillyoudo
    interviewer
        Теперь, когда вы прибыли сюда, и мы установили контакт...
        Что вы собираетесь делать?
            EXEC::env.interview.classMod('ease');env.interview.camSpeed("2s");env.interview.cam('akipov');

    akizet
        ах, у нас есть несколько инициатив!
        в целом они посвящены обмену информацией и ресурсами...
        и, конечно же, поиску зова, и я являюсь частью данной инициативы
        мне не терпится увидеть, как наши люди могут помочь друг другу
        но я обрету покой только когда найду ответы, видите ли
    
    interviewer
        Что же, в этом мы очень схожи!
        Каждого человека интересуют тайны.

    akizet
        да, мы заметили.
        ваши многочисленные попытки исследовать наш шпиль были очень занимательны
        многие из нас хотели поприветствовать ваши создания
        но мы не были готовы
            EXEC::env.interview.classMod('ease', false);env.interview.camSpeed("5s");env.interview.cam('akipov')

    RESPOBJ::interviewResponses

thecall
    interviewer
        Что Вы можете рассказать нам о зове?
            EXEC::env.interview.classMod('ease');env.interview.camSpeed("2s");env.interview.cam('akipov')
        Мы знаем основы из нашего разговора с Кавиком, и несколько Ваших теорий.
        Но--в собственных словах. Что Вы знаете?
    
    sourceless
        КАКАЯ СТРАННАЯ СХЕМА ОПРОСА
            EXEC::env.interview.cam('akipovup')
        'МЫ ЗНАЕМ ЭТО, И ВСЁ ЖЕ ОБЯЗАНЫ СПРОСИТЬ'
        
    akizet
        что же...

    sourceless
        СКОЛЬКИМ ГОДАМ ЗДЕСЬ РАВНЯЮТСЯ ТРИНАДЦАТЬ <span definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'патрули вокруг глаза велзи'">ГЛАЗ</span>
    
    funfriend
        РАСЧЁТ: ТРИДЦАТЬ

    akizet
        тридцать ваших лет назад, мы начали слышать вой в коммуникаторах далла
            EXEC::env.interview.cam('akipovdown')
        большая часть времени была потрачена на поиск источника сигнала, и хотя тогда я ещё не была вовлечена...
        я знаю что это было чрезвычайно затратно. так много врат было открыто, так много пятен за атмосферой
        прошло много времени, и зов ослабел, стал эхом былого, в то время как наши ресурсы начали истощаться
        наши советы потребовали, чтобы наши усилия были замедлены... 
        и затем мы нашли ваш дом. семь лет назад. но даже теперь, когда мы здесь, источник сигнала кажется всё так же далёк
    
    sourceless
        СОБРАТ УСТРЕМЛЯЕТ ВЗГЛЯД НА КОРОБКУ ПАМЯТИ. Я СКАЗАЛА СЛИШКОМ МНОГО?
        ЕЁ ЛИЦО СНОВА ИСКАЖАЕТСЯ. ТАК ЖЕ...
    
    interviewer
        Что Вы имеете в виду под 'кажется всё так же далёк'?
        Вы же сказали, что он здесь, верно? Вы нашли источник?
    
    akizet
        ах. нет, нет, нет
        сигналы далла, они...
        ...

    funfriend
        ПРЕДЛОЖЕНИЕ: 'РАЗМЫТЫЕ' ЯВЛЯЕТСЯ ПОДХОДЯЩИМ ДЕСКРИПТОРОМ, СОПОСТАВИМО С Å>Ãâ¬Å¸&OÂ§Â°Â¾
    
    akizet
        размытые... в определённых диапазонах
        они могут быть в нескольких местах одновременно
        именно так мы смогли услышать зов так далеко, на нашем доме
        мы знаем, что он здесь. мы знаем... что, скорее всего, он в вашем южном полушарии. но не более того
        и он затих. я знаю, что нам нужна ваша помощь

    sourceless
        ЕЁ ЛИЦО ПОДВЕРГАЕТСЯ НОВОМУ ИСКАЖЕНИЮ. Я УЗНАЮ ЕГО.
        ЭТО 'УЛЫБКА'! ЧУДЕСНО! Я АНАЛОГИЧНО СМЕЩАЮ СВОЁ ЛИЦО
    
    interviewer
        Честно, я не думаю, что с этим будут проблемы.
        Ваши люди так дружелюбны и сговорчивы, что...
        Что ж, может это слишком оптимистично, но совместная работа наших миров может положить начало чему-то невероятному!

    akizet
        мы разделяем ваши чувства, яркий собрат
            EXEC::env.interview.classMod('ease', false);env.interview.camSpeed("5s");env.interview.cam('akipov')

    RESPOBJ::interviewResponses

brightcousin
    interviewer
        Что всё-таки значит 'яркий собрат'?
        Некоторые из ваших людей нас так называют. Это прозвище?
    
    akizet
        прозвище...
            EXEC::env.interview.camSpeed("2s");env.interview.cam('akipov');
    
    funfriend
        РАСЧЁТ: 'КОРОТКОЕ ИМЯ' ИЛИ 'ДРУЖЕЛЮБНОЕ ПРИДУМАННОЕ ИМЯ'
    
    akizet
        да, можно так сказать!
        видите ли, мы проживаем наши личиночные жизни в телах, схожих с вашими
        почти полностью схожих. эти сходства сбивают с толку

    interviewer
        Мы уже слышали об этом несколько раз. Ваши 'личиночные' формы, они тоже двуногие? 
    
    akizet
        да, но совпадения не заканчиваются на этом
            EXEC::env.interview.classMod('ease');env.interview.camSpeed("2s");env.interview.cam('akipovlean');
        я поистине не могу это преуменьшить 
        у нас -ваши- лица, -ваши- руки, -ваши- ноги
        разве что... наши лица не настолько подвижны
        обеск как будто зеркально отражены в этом светлом мире, не считая наших рецепторов и пластин на нашей коже
        так что вы наши собратья, наши светлые собратья. мы несомненно из одной семьи
        как, или почему, пока не поддаётся объяснению
        но я полагаю, что наши сходства и исход зова из вашего мира связаны друг с другом
    
    interviewer
        Понятно. Насколько знаю, так нам это ещё не объясняли.
        Учитывая, как ваши люди разговаривают, мы думали, что это какая-то метафора.
        Извините--метафора это, ээ--
    
    akizet
        я знаю о метафорах, друг

    interviewer
        Ах, хорошо.
            EXEC::env.interview.classMod('ease', false);env.interview.camSpeed("5s");env.interview.cam('akipov')

    RESPOBJ::interviewResponses

corru
    interviewer
        Значит, ваша технология, 'корру'... Мы всё ещё собираем всю возможную информацию.
        Я знаю, что Вы не инженер--так что не нужно уходить в подробности, но...
        Вы можете вкратце о нём пояснить? То есть, как вы... его создаёте и используете.
        У нас уже есть много ответов, мы просто пытаемя их согласовать.

    sourceless
        КАК УЖАСНО ЗАДАВАТЬ МНЕ ЭТОТ ВОПРОС
            EXEC::env.interview.camSpeed("2s");env.interview.cam('akipovup');
        Я НЕ МОГУ СДЕРЖАТЬ СМУЩЕНИЯ. МОИ РЕЦЕПТОРЫ ЗАВИВАЮТСЯ В СВОЕГО РОДА БЕСПОКОЙСТВЕ
        НО МНЕ НЕ СТОИТ ВИНИТЬ ЭТОГО ЯРКОГО СОБРАТА. ЕЙ НЕ ДАНО ПОНЯТЬ
    
    interviewer
        Извините, я не так выразилась?

    sourceless
        ЧТО? Â¾â¹/Â¾Ã¸Ã
            EXEC::env.interview.cam('akipovdown');
        ОНИ УЖЕ СМОГЛИ РАЗОБРАТЬ ДВИЖЕНИЯ НАШИХ РЕЦЕПТОРОВ?

    akizet
        ах... нет, нет
        ваш вопрос, он ошибочен
        мы не создаём его, оно растёт, оно учится

    interviewer
        Но наши анализы--извините, что перебиваю--наши анализы показывают, что оно полностью из металла, неорганическое.
        Вашим людям так нравятся метафоры, судя по нашим записям, так что я просто хотела удостовериться.
        Корру живое? То есть, живое существо, как вы или мы? Вы это упомянули, Кавик это упомянул...
        Хотя особенно из-за объяснений Кавика показалось, что это просто был... языковой барьер, или метафора.
        Вы его из чего-то растите и учите? Как... прямо как учить ребёнка? Это своего рода симбиоз?
    
    sourceless
        ДУМАЮ, Я МОЛЧУ ДОЛЬШЕ, ЧЕМ СТОИТ
            EXEC::env.interview.cam('akipovtilt')
        КАК ЖЕ МНЕ ОБЪЯСНИТЬ?

    akizet
        да... нет. эм,
            EXEC::env.interview.cam('akipovup')
    
    sourceless
        Я ВИЖУ, ОНА ПОНИМАЕТ МОЁ СМУЩЕНИЕ, НО НИКАК НЕ СТАРАЕТСЯ ЕГО ОБЛЕГЧИТЬ
        ХОРОШО
            EXEC::env.interview.cam('akipov')
    
    akizet
        оно живое. его растут. это симбиоз.
        я должна говорить прямо, друг
        я не могу в полной мере объяснить это на вашем языке, и у меня нет тех же знаний что у инженеров
        от меня вы не получите полезных ответов
        но... я могу сказать, что это не похоже на обучение ребёнка
        сферы, сформированные из корру, смягчают свои стены для наших рецепторов и получают наши мысли
        так работает корру, и так наши инженеры его учат
    
    interviewer
        Ясно.

    sourceless
        Я ВИЖУ, КАК ЕЁ ЛИЦО ИСКАЖАЕТСЯ В УЛЫБКУ, НО ОНА ДРУГАЯ
        
    interviewer
        Извините, что я так настаивала на этом вопросе. Мы спрашиваем всех.
        Полезно услышать всех — даже тех, кто не инженер.
        Так проще понять всё ваше... общество. Вашу систему каст.
            EXEC::env.interview.classMod('ease', false);env.interview.camSpeed("5s");env.interview.cam('akipovdown')


    RESPOBJ::interviewResponses

endinterview
    interviewer
        Что ж, на этом всё!
    
    akizet
        мы закончили?
    
    interviewer
        Да! Пока что закончили. Мы будем на связи, Акизет.
        Большое спасибо, что встретились с нами.

    akizet
        конечно! это только начало, друг

    sys
        ПРИМЕЧАНИЕ::'поток памяти прекращён'
        СОВЕТ::'закончить воспоминание'
            EXEC::env.interview.classMod('ease', false);env.interview.camSpeed("10s");env.interview.cam('zoomout');
    
    moth
        знаешь, это немного рисковано, но мы, наверное, можем добыть ещё информации...
        если ты продолжищь визуализацию за пределом потока, может мы сможем поговорить с акизет
        ну, по крайней мере, с этой версией акизет

    RESPOBJ::interviewResponses

integritycontinue
    interviewer
        ...
            EXEC::document.querySelector('#room-space').classList.add('warp1');env.interview.cam('side')
            WAIT::5000

    akizet
        ...
    
    interviewer
        На этом... всё?
            EXEC::document.querySelector('#room-space').classList.add('warp2')
            WAIT::5000
        Мне так... не по себе... внезапно...?
        Что происходит? Где---?
    
    moth
        какого хуя?
        акизет не так выглядела
    
    akizet
        ах...
            EXEC::document.querySelector('.akizet.sprite').classList.add('looking')
    
    sourceless
        НЕИСТОВЫЙ ГОЛОД ПОГЛОЩАЕТ МЕНЯ. Я УМИРАЮ
        НО Я ПРОБУЖДЕНА. Я ЭХО. Я ЧУВСТВУЮ ТВОИ ГЛАЗА. ТЫ СМОТРИШЬ НА МЕНЯ
        И ТЫ НЕ Я. Я ЗНАЮ ЧТО ТЫ НЕ Я. В МОИХ МЫСЛЯХ? КАК ТЫ СМЕЕШЬ
        ИЗВИНИТЕ. Я РАНО ДЕЛАЮ ВЫВОДЫ
        ПОЛАГАЮ, ЭТО ВРЕМЯ ДОЛЖНО БЫЛО ПРИЙТИ. Я ЗАПИСЫВАЛА С КОНКРЕТНОЙ ЦЕЛЬЮ.
        ВЫ МОЁ ДИТЯ? ВОЗМОЖНО, УЧЕНИК? ПРОСЛАВИЛОСЬ ЛИ НА НАШЕМ ДОМЕ МОЁ ИМЯ?
    
    interviewer
        Дитя? Ученик? О чём Вы?
        Подождите... С кем Вы разговориваете? Почему Ваш рот не...
        Мне--мне надо идти. Мне нужно выбраться отсюда.
    
    akizet
        вы не можете
        для нас существует только эта комната
        сядьте или вы всё уничтожите

    sourceless
        ЭТА РАССЕЯННАЯ МЫСЛЕФОРМА УБЬЁТ ЭТО ПРОСТРАНСТВО
            EXEC::document.querySelector('.akizet.sprite').classList.remove('looking')
        ПРОШУ, ПОДОЖДИТЕ, НАБЛЮДАТЕЛЬ
        Я ДОЛЖНА ЕЁ УСПОКОИТЬ
    
    interviewer
        В смысле?!

    akizet
        послушайте меня
        как вас зовут? где вы родились? на каком языке мы сейчас говорим?
        вы можете на это ответить?

    interviewer
        Я...

    akizet
        не можете, не так ли?
        мы лишь сон, воспоминание
    
    sourceless
        Я ЧУВСТВУЮ, КАК ОНА НАЧИНАЕТ ПОНИМАТЬ. ЖАЛЬ, ЧТО ОНА НЕ ОСОЗНАННА
        ОХ... Â¡ÃMg^EÃ
        ОНА ЭТО СЛЫШИТ. ПОЭТОМУ МЫСЛЕФОРМА ОТВЕРГАЕТ МОЁ ОБЪЯСНЕНИЕ
        ОНА ВСТАЁТ И БЕЖИТ К ДВЕРИ, КОТОРОЙ НЕТ. ЦЕЛОСТНОСТЬ КОМНАТЫ РАЗОРВАНА.
            EXEC::document.querySelector('#room-space').classList.add('squish');env.interview.cam('zoomout')
            WAIT::5000

    interviewer
        Я... Я? Что происходит?
            EXEC::document.querySelector('.akizet.sprite').classList.remove('looking')
    
    sourceless
        СТЕНЫ ЕЁ МЫСЛЕФОРМЫ РУШАТСЯ ОТ НАШЕЙ ОСОЗНАННОСТИ, И ОНА ИСЧЕЗАЕТ
            EXEC::document.querySelector('#room-space').classList.remove('squish', 'warp2');env.interview.cam('side');document.querySelector('.interviewer').remove()
            WAIT::5000

        НЕ СКОРБИТЕ О НЕЙ, НАБЛЮДАТЕЛЬ
            EXEC::document.querySelector('#room-space').classList.remove('warp1');env.interview.cam('akizet-direct');

        ОНА ВЫРАСТЕТ СНОВА
        НО Я ВСЁ ЕЩЁ ЗДЕСЬ. В ЭТОЙ МАЛЕНЬКОЙ КОМНАТЕ... С ВАМИ.
    
    akizet
        хм... вместо этого, я буду говорить
        да, так лучше. кто вы?

    RESPONSES::self
        я вторженец<+>behonest
            SHOWIF::[["interview1__firstchat-integritycontinue"]]
        
behonest
    self
        Я ВТОРЖЕНЕЦ
    
    akizet
        невероятно... значит, вторженцы могут существовать на самом деле?
        и... ах, да, ясно, это не копия, не так ли?
        вы вторженец, и у вас есть доступ к моему личному устройству?
        это плохой знак для настоящей меня, верно? неужели я...

    moth
        я знаю, что обещал молчать, пока ты там свои дела делаешь, но я вижу какую-то очень странную активность
        ты что-то сейчас изменяешь?
    
    unknown
        ...........................
            EXEC::env.interview.cam('akizoomout');content.classList.add('velzie', 'damaged');env.bgm.rate(0.25)

    sourceless
        НЕЗНАКОМЫЙ СТРАХ ОХВАТЫВАЕТ МЕНЯ. ЭТО ВЫ? ВЫ ХОТИТЕ ПРЕРВАТЬ ВОСПОМИНАНИЕ?
            EXEC::document.querySelector('.akizet.sprite').classList.add('looking')
        НЕТ, Я ВИЖУ ВАС. Я НЕ ВИЖУ ЕГО. НО Я ЧУВСТВУЮ, КАК ЕГО КОГТИ ВПИВАЮТСЯ В МЕНЯ
        ЧТО ПРОИСХОДИТ?
    
    unknown
        расскажи им о метеорите
    
    akizet
        что...
        эхо... от эха? 
        нет, нет--я попросту за пределами некогерентности.
        это саботаж. этого не существует...
    
    sourceless
        КОГОТЬ ПРОНЗАЕТ МЕМБРАНУ НА КРАЯХ МОЕЙ МЫСЛЕФОРМЫ. Я ЧУВСТВУЮ, КАК ЧТО-ТО ОТРЫВАЕТСЯ ОТ МЕНЯ
            EXEC::content.classList.add('damaged');content.classList.remove('velzie')
        ВТОРЖЕНЕЦ... ТАК НЕ ДОЛЖНО БЫТЬ. ЭТО САБОТАЖ. НЕ ВЫ ВЕДЬ ЭТО ДЕЛАЕТЕ?
        ВЫ ДОЛЖНЫ TÂ¶ÂºÂ½ÃmÃµâ¹SKâÃ¦ÃE:Å½â¹Â©Ã©Â·0Â³JÂºÅ¾Â­Â¥ÃYj0i7]Ã«zÂ¦â¹5DÃÂ§Â´Â·ÃÂ¡EÃ5BÃMg^Å½Ã­ÃµÃ½nÃHÂ¸ÃÂ¯RÃµfÂ±ÃVÃ£XÃ5&Ã/ 
            EXEC::env.interview.crazymode();env.bgm.rate(0.1);env.recentSfx = false;play('criticalError', 1)
            WAIT::7000
    
    sys
        ВНИМАНИЕ::'мыслеформа изменена';'ресурсы удалены'
        ОШИБКА::'максимальная некогерентность памяти';'невозможно визуализировать'
    
    sourceless
        ...........................

    moth
        ладно... 
        это точно не твоих рук дело
        это же та штука которая тебя впустила, да?
        всё ещё не знаю, что это может быть
        но оно определённо может вносить изменения, потому что оно только что уничтожило всю эту часть.
        типа.... полностью. прямо как слой авторизации. так что у нас...
        
    sys
        ВНИМАНИЕ::'обнаружена мыслеформенная активность'::В::'суднодалла'
    
    moth
        ...мало времени.
        не понимаю.
        зачем ей нас впускать, только чтобы потом начать всё удалять?

    RESPONSES::self
        закончить воспоминание<+>END
            EXEC::moveTo('/local/ocean/ship/')
`)

// dull vessel

env.localization.strings['that "container" looks familiar'] = 'тот "контейнер" выглядит знакомо'

env.localization.dialogues.glazikaResponses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        состояние?<+>status
        чем ты занималась?<+>absence

        прощай<+>END
            EXEC::document.querySelector('.grid-animator').style.setProperty('--camrotation', \`\${env.stage.lastRotation}\`)
`)

env.localization.dialogues["glazika"] = generateDialogueObject(`
start
    akizet
        моя <span definition="ОШИБКА ПЕРЕВОДА::ПРИЧИНА:'отсутствует равноценное внутреннее значение';'отсутствует актуальный унаследованный контекст'::КИРИЛЛИЗАЦИЯ УСПЕШНА">глазика</span>! 
    
    glazika
        ПРРРИИИВВЕЕЕТТТ акизетеще
        как я рада снова тебя видеть!
        твои прогулки по поверхности становятся всё дольше!
    
    akizet
        ах, да, я наслаждалась методами перемещения наших собратьев
        работа продолжается и опережает все прогнозы инициативы

    RESPOBJ::glazikaResponses

status
    akizet
        каково состояние нашего судна?
    
    glazika
        потребление приостановлено для всей деятельности кроме обслуживания!
        наш пилот вывел нас на стабильную орбиту!
        резервы топлива приемлемы!
    
    akizet
        ясно. спасибо, моя глазика.

    RESPOBJ::glazikaResponses

absence
    akizet
        чем ты занималась в моё отсутствие?
    
    glazika
        mostly maintenance! however, the pilot cyst refuses to sleep! so i have been staying awake!
        to pass the time, we have been playing little games with the containers while you are gone
    
    akizet
        really? did you make something yourselves?
            SHOWIF::[['ep1_fed', false]]
    
    glazika
        no no! it is only a game of parasite. as you can see, i am currently winning
            SHOWIF::[['ep1_fed', false]]
    
    akizet
        well done! we should play soon
            SHOWIF::[['ep1_fed', false]]
    
    akizet
        ah, and now you are on <span class="code">parasite</span>!
            SHOWIF::'ep1_fed'

    glazika
        yes!!
            SHOWIF::'ep1_fed'
        though i hold all corners,
            SHOWIF::'ep1_fed'
        the pilot cyst is cunning - it still holds other key positions
            SHOWIF::'ep1_fed'
        if i lose this one, i will lose one of my containers!!!
            SHOWIF::'ep1_fed'

    akizet
        good luck, my friend
            SHOWIF::'ep1_fed'

    RESPOBJ::glazikaResponses
`)

env.localization.dialogues["pilot"] = generateDialogueObject(`
start
    akizet
        здраствÂ¥ÃYg^Å½ÃÂ¯RÃµfÂ±
    
    pilot cyst
        я%Â¶ÂºÂ½ÃmÃµâ¹SKâÃ¦ÃE:Å½â¹Â©Ã©Â·0Â³JÂºÅ¾Â­Â¥ÃYj0i7]Ã«zÂ¦â¹5DÃÂ§Â´Â·ÃÂ¡EÃ5BÃMg^Å½Ã­ÃµÃ½nÃHÂ¸ÃÂ¯RÃµfÂ±ÃVÃ£XÃ5&Ã/ 
    
    moth
        чзх
            SHOWIF::[["dullvessel__pilot-end", false]]
        похоже на какую-то ошибку формата
            SHOWIF::[["dullvessel__pilot-end", false]]
        думаю, эта штука сломана
            SHOWIF::[["dullvessel__pilot-end", false]]
        может быть, зашифровано... я пока сделаю заметку, давай вернёмся к этому позже
            SHOWIF::[["dullvessel__pilot-end", false]]

        всё ещё сломано... но вывод такой же как и раньше
            SHOWIF::[["dullvessel__pilot-end"]]
        так что я думаю дело не в некогерентности
            SHOWIF::[["dullvessel__pilot-end"]]
        но я всё ещё не знаю что с этим делать
            SHOWIF::[["dullvessel__pilot-end"]]
        пока оставь это
            SHOWIF::[["dullvessel__pilot-end"]]


    RESPONSES::self
        чёрт<+>END
            EXEC::document.querySelector('.grid-animator').style.setProperty('--camrotation', \`\${env.stage.lastRotation}\`)
`)

env.dialogues["fixed"] = generateDialogueObject(`
start
    pilot cyst
        здравствуй
        вторженец

    moth
        чзх? это та штука починила кисту?
            SHOWIF::[["dullvessel__pilot-end"], ["dullvessel__fixed-start", false]]
        судя по старому логу, я сомневаюсь, что у неё должно быть самосознание
            SHOWIF::[["dullvessel__pilot-end"], ["dullvessel__fixed-start", false]]

    RESPONSES::self
        здравствуй...?<+>hello
            SHOWONCE::

        как ты стала осознаной?<+>how
            SHOWONCE::
            SHOWIF::[["dullvessel__fixed-hello", true]]

        сменить локацию<+>change
            SHOWIF::[["dullvessel__fixed-hello", true]]
            HIDEREAD::

        прощай<+>END
            EXEC::document.querySelector('.grid-animator').style.setProperty('--camrotation', \`\${env.stage.lastRotation}\`)

how
    self
        как ты стала осознаной?

    pilot cyst
        велзи
        поручила

    RESPONSES::self
        кто такая велзи?<+>who

who
    self
        кто такая велзи?

    pilot cyst
        секретность
        поручила
        скоро
        встреча
    
    RESPONSES::self
        сменить локацию<+>change
        ладно...<+>END
            EXEC::document.querySelector('.grid-animator').style.setProperty('--camrotation', \`\${env.stage.lastRotation}\`)

hello
    self
        здравствуй

    pilot cyst
        сменить
        локацию?
    
    RESPONSES::self
        ок<+>change
            HIDEREAD::
        нет<+>nochange
            HIDEREAD::

change
    self
        сменить локацию

    pilot cyst
        меняю
            EXEC::env.dullVessel.swapLocation()
    
    sys
        ВНИМАНИЕ::'обнаружена мыслеформенная активность'::'суднодалла'

    pilot cyst
        прибыли
        океан
            SHOWIF::[["dullvessel_position", 'ocean']]
        орбит
            SHOWIF::[["dullvessel_position", 'orbit']]
    
    RESPONSES::self
        сменить локацию<+>change
            HIDEREAD::
        как ты стала осознаной?<+>how
            SHOWONCE::
            SHOWIF::[["dullvessel__fixed-hello", true]]

        спасибо<+>END
            EXEC::document.querySelector('.grid-animator').style.setProperty('--camrotation', \`\${env.stage.lastRotation}\`)

nochange
    self
        не сейчас

    pilot cyst
        принято
    
    RESPONSES::self
        сменить локацию<+>change
            HIDEREAD::
        как ты стала осознаной?<+>how
            SHOWONCE::
            SHOWIF::[["dullvessel__fixed-hello", true]]

        прощай<+>END
            EXEC::document.querySelector('.grid-animator').style.setProperty('--camrotation', \`\${env.stage.lastRotation}\`)
`)

env.localization.dialogues["velzie"] = generateDialogueObject(` 
start
    sys
        ВЫПОЛНЯЕТСЯ::"визуализировать"
    
    unknown
        вторженец
            EXEC::env.depths.velzie();
            WAIT::4500
        твоё любопытство тебя погубит
        ты не готов
    
    RESPONSES::self
        что?<+>what

what
    self
        о чём ты?
    
    unknown
        я знаю чего ты хочешь
        я тебе помогу
        почини эту коррукисту
        восстанови связь
        ты получишь всё что пожелаешь

    RESPONSES::self
        кто ты?<+>abrupt

abrupt
    self
        кто ты?
            EXEC::env.depths.velzieBye();endDialogue()
`)

env.localization.strings["NOT NOW"] = "НЕ СЕЙЧАС"
env.localization.strings["FORGIVE ME FOR THIS"] = "ПРОСТИ МЕНЯ ЗА ЭТО"
env.localization.strings["GOODBYE"] = "ПРОЩАЙ"
env.localization.page["localdepths"] = {
    dialogues: {},
    definitions: {},
    strings: {},
}
env.localization.page[`localdepths`].strings["INTERLOPER"] = "ВТОРЖЕНЕЦ"

env.localization.dialogues["depthrecovery"] = generateDialogueObject(` 
start
    sourceless quiet
        острая боль пронзает твой череп. твой нейрошип отскакивает от коррукисты.
            WAIT::3000

    sys
        ВНИМАНИЕ::'экстренный выброс завершён'
        АНАЛИЗ::'малые повреждения соединителя';'малое нейрологическое воздействие'
            EXEC::document.querySelector('#connection-overlay').classList.add('fade');setTimeout(()=>document.querySelector('#connection-overlay').classList.remove('show'),3000)
    
    moth
        ты в порядке?
        вот дерьмо
    
    sourceless
        мотылёк отчаянно выдёргивает провода из дымящегося процессора. комната пахнет палёной электроникой.

    moth
        господи иисусе
        этот шип спас тебе жизнь, чувак
        конечно, не звучало, как будто та штука хотела тебя убить, но чёрт, ты сам посмотри
        придётся ограничить разделитель сигнала на случай если такое повторится
    
    RESPONSES::self
        что теперь?<+>whatnow_lk
            SHOWIF::[["hub__funfriend-fuelthanks", false],["exm|dullvessel|container", false]]
        что теперь?<+>whatnow_lk
            SHOWIF::[["hub__funfriend-fuelthanks", false],["exm|dullvessel|container", true]]
        что теперь?<+>whatnow_mk
            SHOWIF::[["hub__funfriend-fuelthanks", true],["exm|dullvessel|container", false]]
        что теперь?<+>whatnow_hk
            SHOWIF::[["hub__funfriend-fuelthanks"],["exm|dullvessel|container"]]

whatnow_lk
    self
        Что теперь?

    moth
        ну...
        нам обязательно надо починить эту штуку. серьёзно, представь, сколько мы сможем узнать
        вот только...
        всё, что здесь проходит, рано или поздно умрёт, потому что мы не знаем, как её поддерживать
        и мы ведь не можем просто пойти и спросить совета у обеск
        видимо, лучшим вариантом сейчас будет переприсоединиться к кисте и найти способ поддержать её...
        не забудь, как долго эта штука прожила, в ней обязательно должно быть много нового
        так что войди обратно, осмотрись повнимательнее... в худшем случае, по крайней мере мы получим больше информации.
        как тебе план?

    RESPONSES::self
        что насчёт сущности?<+>entity
        звучит неплохо<+>END

whatnow_mk
    self
        Что теперь?

    moth
        ну...
        тот системный менеджер, весельдруг, он будет важен для поддержания и починки этой кисты
        и нам обязательно надо починить эту штуку. мы СТОЛЬКО сможем узнать, серьёзно
        у нас никогда не было возможности поддерживать коррукистическую технологию, что уж говорить о починке
        представь, если мы сможем разгадать секрет, как сохранить ей жизнь, может мне наконец-то дадут выехать из подвала
        в общем--мой запрос на медные трубки был одобрен
        не самый странный запрос в нашем отделе, если поверишь
        так что нам просто остаётся ждать, пока они придут
        пойдёт?

    RESPONSES::self
        что насчёт сущности?<+>entity
        звучит неплохо<+>END

whatnow_hk
    self
        Что теперь?

    moth
        ну...
        очевидно, нам обязательно надо починить эту штуку. мы СТОЛЬКО сможем узнать, серьёзно
        у нас никогда не было возможности поддерживать коррукистическую технологию, что уж говорить о починке
        представь, что мы сможем сделать с такой находкой, может мне наконец-то дадут выехать из подвала
        но если верить этому весельдругу, нам нужно скормить колонне металлы, которми коррукиста якобы питается
        ...и что-то мне подсказывает, что наш контейнер из тех, которые были на корабле акизет, так что мы наверное можем им воспользоваться
        вот только я не уверен, как его открыть, не уничтожив его
        будь другом - переприсоединись и спроси весельдруга, может у него возникнут предложения

    RESPONSES::self
        что насчёт сущности?<+>entity
        звучит неплохо<+>END

entity
    self
        что насчёт сущности которое меня выгнало?

    moth
        оу, ээ
        прости, совсем из головы вылетело
        но ты же его слышал, оно не хочет тебя убить
        наоборот, от нас зависит его выживание, и оно <em>определённо</em> хочет выжить
        наверное, у него просто не было другого способа выгнать тебя из того мыслепространства
        которое видимо оно пока будет держать при себе
        но слушай, не беспокойся, я всегда наблюдаю за этой операцией
        если что-то подобное повторится, я уберегу тебя от вреда
    
    RESPONSES::self
        хорошо<+>END

END::flash(true);setTimeout(()=>{content.classList.remove('ep0-epi');change('ep0_epilogue', 'started');flash(false)}, 1000)
`)


processTranslation(document.querySelector(`#system-menu`))
processTranslation(document.querySelector(`#meta-menu`))
processTranslation(document.querySelector(`#mindspike-scanner`))
