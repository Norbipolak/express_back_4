/*
    Megcsináljuk ezt az index.js-t, mert ez a kezdőállómányunk 

    npm init 

    Ilyenkor megkapjuk a package.json-t, ami egy json file és majd ott kell átírni, hogy "type":module"

    feltelepítjük az express-t npm i express

    npm i ejs!!! 

    npm i express-ejs-layouts (és minden ilyen amit feltelepítünk az majd meg fog jelenni a package.json-ban)

    npm i mysql2 

    npm i crypto (ezzel fogjuk majd titkosítani a jelszót!!!)

    Lesz majd egy assets és egy views mappánk, assets-ben lesz a CSS, a views-ban pedig az ejs kiterjesztésű fájlok!! 
    A views-ban simán vannak az index.ejs, login.ejs, profile.ejs, register.ejs, amilyen oldalaink lesznek majd, azoknak a szerkezete 
    lesz itt megcsinálva

    Views-ban lesz még egy almappa, itt lesz majd a public meg a private.layout.ejs 
    Ezenkivül még lesz egy olyan mappa a views-ben, hogy common és itt lesz majd a head.ejs, ahol megcsniáljuk a head-et és ide linkeljük be a CSS-t 

    Public_layout-ot csináltunk egy nav menüt, ahol van egy főoldal, regisztációs és egy bejelentkezés!!! 
    <nav>
        <ul>
            <li>
                <a href="/">Kezdőlap</a>
            </li>
            <li>
                <a href="/regisztracio">Regisztráció</a>
            </li>
            <li>
                <a href="/bejelentkezes">Bejelentkezés</a>
            </li>
        </ul>
    </nav>
*/
import { urlencoded } from "body-parser";
import express from "express";
import expressEjsLayouts from "express-ejs-layouts";

const app = express();
//hogy tudjuk használni majd az ejs-es fájlokat, hogy megtalálja a rendszer őket a views fájlban 
app.set("view engine", "ejs");

//hogy használni tudjuk a layouts-okat, tehát nem elég, hogy feltelepítjük meg, hogy importáljuk az app.use is kell!
app.use(expressEjsLayouts);

//kell egy urlencoded, hogy megkapujuk majd olyan formában az adatokat, amilyben mi szeretnénk 
app.use(urlencoded({extended: true}));

//Hogy a statikus .css fájlokat is lássa majd az assets mappában!! 
app.use(express.static("assets"));

app.get("/", (req, res)=> {
    res.render("index", {layout: "layouts/public_layout", title: "Kezdőlap", page:"index"});
});

/*
    Csináltunk az index.ejs-en egy kiírás, hogy tudjuk ellenőrozni, hogy müködik-e 
    nodemon index -> ez kell, hogy meg tudjuk nézni!!!! 

    Megjelent a nav menü
    Kell még, hogy majd át legyen adva az is ami az index-en, tehát egy <%body%> 
    és akkor látjuk, hogy mi van majd az index-en is!!! 

    Kell még, hogy csináljunk egy head tag-et a common/head.ejs-ben és majd oda be is kell linkelni a css-t!!! 
    és ezt majd át is adni!! 
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%=title%>></title>
    <link rel="stylesheet" href="../style.css">
</head>

Megcsináltuk a head-et és majd vár egy title-t, mert két public és private layout-os ejs-ünk van
Ezt a head-ed be kell INCLUDE-olni (public és a private-hoz is) és megadni ott title-t, hogy privát vagy publikus oldal
vagy majd itt a get-es kérésnél 
->
<%-include("../common/head", {title: title})%>
tehát itt a title, amit vár a head, azt megadjuk, hogy {title:title} 
és majd itt adjuk meg, hogy mi lesz pontosan a title -> title: "Kezdőlap"
-> 
app.get("/", (req, res)=> {
    res.render("index", {layout: "layouts/public_layout", title: "Kezdőlap"});
});
Itt nagyon fontos, hogy tudjuk átadni a title-t, amit vár a head vagy átadjuk egyből és a public vagy private_layout.ejs-nél az include-nál 
megadjuk az értékét vagy ott is {title: title} és itt adjuk meg a get-es kérésnél -> {title: "Kezdőlap"}

Megcsináljuk a css-t (elöször is a nav-menüre)!!!
Csináltunk egy .selected-menu-t a nav-nak, hogy mindig az legyen majd kijelölve, amelyik oldalon éppen vagyunk!! 
-> 
Ehhez majd a get-es kéréstől be kellene jönnie egy olyannak, hogy page és majd ennek az értéke true lesz, akkor fogja az LI megkapni a CLASS-t 
(page: "index")
app.get("/", (req, res)=> {
    res.render("index", {layout: "layouts/public_layout", title: "Kezdőlap", page:"index"});
});
layouts-ban pedig 
-> 
<li class="<%=page === 'index' ? 'selected-menu' : '' %>">
    <a href="/">Kezdőlap</a>
</li>
Tehát csak akkor fogja megkapni ez a selected-menu class-t, hogyha a page, amit majd megkap a get-es kéréstől az lesz, hogy index 
de majd ha regisztrációnak csináljuk a get-es kérését, akkor meg az lesz a page: "regisztacio" és akkor meg ott register-nek kell lennie a page-nek 
és csak akkor fogja megkapni a class-t!!! 
->
    <li class="<%=page === 'index' ? 'selected-menu' : '' %>">
        <a href="/">Kezdőlap</a>
    </li>
    <li class="<%=page === 'regisztracio' ? 'selected-menu' : '' %>">
        <a href="/regisztracio">Regisztráció</a>
    </li>
    <li class="<%=page === 'bejelentkezes' ? 'selected-menu' : '' %>">
        <a href="/bejelentkezes">Bejelentkezés</a>
    </li>

    Most nem látszik az index csak az ami a public_layout-ban van 
    <%-include("../common/head", {title: title})%>
<body>
    <nav>
        <ul>
            <li class="<%=page === 'index' ? 'selected-menu' : '' %>">
                <a href="/">Kezdőlap</a>
            </li>
            <li class="<%=page === 'regisztracio' ? 'selected-menu' : '' %>">
                <a href="/regisztracio">Regisztráció</a>
            </li>
            <li class="<%=page === 'bejelentkezes' ? 'selected-menu' : '' %>">
                <a href="/bejelentkezes">Bejelentkezés</a>
            </li>
        </ul>
    </nav>
</body>
majd ide meg kell adni a <%=body%> és majd csak akkor fog látszani ami az index.ejs-en van!!! 
azt is be kell tölteni majd a layout-ban!!! 
-> 
<%-include("../common/head", {title: title})%>
<body>
    <nav>
        <ul>
            <li class="<%=page === 'index' ? 'selected-menu' : '' %>">
                <a href="/">Kezdőlap</a>
            </li>
            <li class="<%=page === 'regisztracio' ? 'selected-menu' : '' %>">
                <a href="/regisztracio">Regisztráció</a>
            </li>
            <li class="<%=page === 'bejelentkezes' ? 'selected-menu' : '' %>">
                <a href="/bejelentkezes">Bejelentkezés</a>
            </li>
        </ul>
    </nav>

    <%-body%>

Tehát ami fontos, hogy van a views, ahol van egy common mappa, amiben van a style.css, és van egy layouts, ahol van a private meg a public_layout
és vannak ezen kivül még a sima ejs oldalaink, hogy index, register, login stb 
A head-ejs csinálunk egy head tag-et és oda belinkeljük a css-t és még csinálhatunk változókat pl: <%=title%> 
ezt majd be kell hívni a layout-ba az <%-include()%>-val megadni az elérési útvonalat a head-hez és utána {} megadni a változó értékét 
ezt kétféleképpen lehet megadni rögtön title: "valami" vagy {title: title} és majd a get-esnél title: "valami"

Még fontos, hogy a layout-ban, mint itt fent be legyen hívva a body <%-body%> és annak az ejs fájlnak a body-ja lesz behívva 
ami itt van 
-> 
res.render("index",
tehát ebben az esetben az index és fontos, hogy itt még meg legyen adva, hogy melyik layout-ot használjuk -> res.render("index", {layout: "layouts/public_layout", 
*/

/*
    Következő az, hogy lehessen regisztrálni egy weblapra
    Ehhez szükségünk van egy adatbázisra meg egy adatbázis kapcsolatra!!!!
    
    Van egy ilyen adatbázisunk, hogy webshop és ilyen tábla van benne, hogy users 
    ahol ilyen mezők vannak 
    -> 
    userID int auto_increment primary_key 
    isAdmin boolean (0 a kezdőérték)
    userName varchar(100)
    email varchar(100)
        ezt a kettő majd beregisztráláskor nem kell majd megadni
    firstName varchar(255) 
    LastName varchar(255)
    pass varchar(128)
        ezeket sem kell majd itt megadni 
    created datetime (now) default_generated 
    updated datetime

    Elöször ez a rosszabbik módzser, ahogy regisztrálni lehet
    ->
*/
app.get("/regisztracio", (req, res)=> {
    res.render("register", {
        layout: ".layout/public_layout",
        title: "Registráció",
        page: "regisztracio"
    })
});

/*
    Megcsináljuk a register.ejs egy form-ot!! 
    <div class="container">
    <form method="post" action="/register">
    Ez, ahova majd átírányít minket, ez majd nem a get-es register lesz, hanem egy post-os, mert a method itt post-ra van beállítva a form-nál
    tehát erre majd kell külön egy post endpointot -> app.post()...

    Az isAdmin azt alapból nullára határoztuk meg, tehát alapból nem admin-ra regisztrál valaki, tehát ezt nem is tesszük bele a form-ban 
    ->
    <div class="container">
    <form class="box" method="post" action="/register">
        <h3>Felhasználónév</h3>
        <input name="userName" type="text">

        <h3>Email</h3>
        <input name="email" type="text">

        <h3>Jelszó</h3>
        <input name="pass" type="password">

        <h3>Jelszó újra</h3>
        <input name="passAgain" type="password">

        <button>Registráció</button>
    </form>

csináltunk egy box-os class-t a form-nak, hogy jobban nézzen ki egy background-color-val meg egy border és padding-vel, text-center, maxw és margin-auto
Fontos, hogy a method POST az action "/register" és mindegyik input-nak van egy name attributuma 

És ha most rákattintunk a Beküldés-ra, akkor látjuk, hogy nincs is még olyan endpoint-unk, hogy /register
csinálunk egy olyan ejs-t, hogy register_post.ejs 
-> 
és akkor ide fogjuk majd a kiírni az üzenetünket, hogy sikerült-e a regisztráció, jól csináltuk-e stb 
<div class="container">
    <% messages.forEach((m))=> { %>
        <h4 class="error-color"><%=m%></h4>
    <% }) %>
</div>
*/

import mysql2 from "mysql2"
/*
    Be kell hívni a mysql2-t 
    Most még nem fogunk function-ökbe rendezni dolgokat, csak írunk ide mindent 
*/

app.post("/regisztracio", async (req, res)=> {
    console.log(req.body);

    const response = await conn.promise().query(`
        insert into users (userName, email, pass)
        values(?,?,?)    
    `, 
    [req.body.userName.trim(), req.body.email.trim(), req.body.pass]);

    res.render("register_post", {
        layout: "./layout/public_layout",
        messages: ["helló"],
        title: "Regisztráció",
        page: "regisztracio"
    })
});

/*
    itt a req.body-t fogjuk megkapni, ez ami számunkra érdekes, mert abban lesznek az adataink 
    console.log(req.body)
    -> 
    {
        userName: "asdf",
        email: "asdf",
        pass: "asdfasdf",
        passAgain: "asdfasdf"
    }
    és ha megtörtént, hogy beküldtük az adatainkat, akkor ugyanaz az url marad, de ilyenkor már mást mutatunk/render-elünk (register_post)
        res.render("register_post", {
        layout: "./layout/public_layout",
        messages: ["helló"],
        title: "Regisztráció",
        page: "regisztracio"
    })
    Tehát kell egy messages, amin a regist_post-ban végigmegyünk 
    meg az összes többit is meg kell (layout, title, page), mert ezeket is várja, majd a layout amiben megjelenítjük 

    Most ha beírunk ott adatokat, akkor itt megkapjuk őket a req.body-ban!!! 
    és még meg is kapjuk a message-t, amit itt megadtunk ott meg egy forEach()-vel végigmegyünk rajta, de eddig még csak ennyi a message
    messages: ["helló"], tehát ha beküldtük, csak kiírja, hogy helló! 
    és megcsináltuk az error-color-t css-ben, hogy pirosan írja ki, hogy helló! 

    csinálunk egy connection, mert ugye volt már az npm i mysql2 és be is importáltuk ide -> import mysql2 from "mysql2" !!! 
*/
const conn = mysql2.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "webshop"
});
/*
    Így már csatlakoztunk az adatbázishoz és ami itt nekünk szükséges az, hogy felvisszük az adatokat
    Ez az app.post-os kérésben fog megtörténni!!!!! 
    És azt is fontos ilyenkor megnézni, hogy aminek nem adunk értéket (firstName, lastName), mert ezek is vannak mezőként a users 
    táblánkba és itt mi csak majd ezeket fogjuk felvinni, hogy (email, pass stb.)
    Akkor ez a firstName meg a lastName rendelkezik-e alapértelmezett értékkel, mert ha nem, és kihagyjuk őket, akkor hibát 
    fogunk kapni!!!!!! 
    Vagy phpMyAdmin-on van egy olyan, hogy módosítás és ott be kell pipálni, hogy null, tehát az is lehet majd az értékük 
    vagy itt is meg lehet változtatni egy ALTER TABLE-vel 

    Most az a feladatunk, hogy a req.body-ból be kell helyetesítenünk az adatokat!!! 
    -> 
    const response = await conn.promise().query("")
    és ha itt await-elni akarunk akkor nagyon fontos, hogy az egész függvény az ASYNC legyen!!!
    -> app.post("/regisztracio", async (req, res)=> {
    És ez nem tesz neki rosszat, ettől még müködni fog az endpoint, hogy ez async, csak ilyenkor meg fogja várni a választ 
    és annyival késleltetve lesz a válasz ez a render, amennyi időbe tellik végrehajtani az sql parancsot!!!!! 

    Az sql parancs a jelen esetben pedig az, hogy INSERT INTO users és felsoroljuk, hogy minek adunk értéket (pass, email, userName stb.)
    -> 
    const response = await conn.promise().query("INSERT INTO users (userName, email, pass) values(?,?,?) és majd ide jönnek azok az adatok
    amiket be akarunk helyetesíteni egy tömbben")
    [req.body.userName.trim(), req.body.email.trim(), req.body.pass]
    ->
    */
    app.post("/regisztracio", async (req, res)=> {
    console.log(req.body);

    const passHash = createHash("sha512").update(req.body.pass).digest("hex");

    const response = await conn.promise().query(`
        insert into users (userName, email, pass)
        values(?,?,?)    
    `, 
    [req.body.userName.trim(), req.body.email.trim(), passHash]);

    console.log(response);

    res.render("register_post", {
        layout: "./layout/public_layout",
        messages: ["helló"],
        title: "Regisztráció",
        page: "regisztracio"
    })
});

/*
    A console.log(response)-ban meg kapunk egy választ, hogy jól ment-e minden vagy sem
    Most megjelentek az értékek az adatbázisban, hogy 
    userID   isAdmin   userName   email   firstName   lastName   pass   created   updated 
    1        0         asdf       asdf    NULL        Null       asdf   2024...   Null

    De van egy probléma, hogy jelszavakat nem így fogjuk tárolni, hogy az adatbázisban látható legyen hanem TITKOSÍTVA!!!! 
    ->
    A jelszónak a titkosítása az úgynevezett hash-elés és ezt másra is használják 
    és a CRYPTO-t, ezért telepítettük fel -> npm i crypto 
*/
import { createHash } from "crypto";
/*
    Itt meg kell majd határozni majd az algoritmust, ami nekünk jelen esetben 'hash512' 
    Ami egy biztonságos algoritmus, bármilyen string-ből amit megkap csinál 128 karakternyi titkosított string-et 

    Így müködik 
    ->
*/
console.log(createHash("sha512").update(req.body.pass).digest("hex"));
/*
    1. createHash("sha512") -> itt kiválasztjuk az algoritmust 
    2. update(req.body.pass) -> update()-vel/ben kell megadni az értéket 
    3. digest("hex") -> ez meg csinál nekünk egy hexadecimális értéket (ami egy hosszú string lesz alfanumerikus értkekkel)
        mondjuk egy ilyen 'a43f45323bc4523...' -> 1-9-ig és a-f-ig (ez a hexadecimalistás)!!!!! 
        tehát ez hexadecimális-ba megcsinálja utána meg toString()-eli, ezért van ''-ben 

    És ezt kell beledobni (passHash) nekünk majd beledobni az insert-be (ez az egész a post kérésben van ugye)!!!
    -> 
    
    const passHash = createHash("sha512").update(req.body.pass).digest("hex");

    const response = await conn.promise().query(`
        insert into users (userName, email, pass)
        values(?,?,?)    
    `, 
    [req.body.userName.trim(), req.body.email.trim(), passHash]); 

    és ha utána felviszünk egy másikat akkor ez fog megjelenni az adatbázisban 
        Most megjelentek az értékek az adatbázisban, hogy 
    userID   isAdmin   userName     email     firstName   lastName   pass        created      updated 
    2        0         asdfas       asdfas    NULL        Null   ab43cf443ea2222...        2024...      Null

    Tehát a jelszó(pass) titkosítva lesz!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    Az a jó ebben a hashben, hogy nem lehet visszafejteni, mert nincs hozzá kulcs amivel vissza lehetne fejteni!!! 
    Tehát ez egy egyírányú titkosítás 
    De kérdés, hogy hogyan tudjuk egyeztetni a bejelentkezéskor, a jelszó beírásakor azt a jelsztó, ami nincsen hash-elve
    nyilvánvalóan, azzal ami az adatbázisban, ami meg hash-elve van már 
    -> 
    A beíert jelszót hash-eljük és akkor a hesh-elt verziót hasonlítjük össze a hash-elt verzióval!!! 
*/

/*
    Hogy ez a regisztráció hiteles legyen, akkor le kell majd ellenőrizni, hogy a userName az legalább x karakteres, 
    hogy az email az email formátumú-e, hogy a password legalább x karakteres és tartalmaz valami nem betű karakter-t stb. 

    Létre kell hozni egy regurális kifejezést az email-ek számára -> REGEX -> https://regex101.com/
    [\w] -> word karakter, ebbe már alapból benne vannak a digit-ek!! 
    [\w\_\-\.] - lehetnek bennük ezek a karakterek még, hogy _,-,.
    [\w\_\-\.]{1-255} -> ez az első rész és min 1 és may 255 karaktert tartalmazhat 
    ezután van egy kukac jel @ -> \@
    megint egy olyan mint a legelején (hotmail, gmail) -> [\w\_\-\.]{1,255}
    utána egy pont \.
    és egy domain végződés [\w]{2,8}
    ez a végleges -> 
    [\w\_\-\.]{1,255}\@[\w\_\-\.]{1,255}\.[\w]{2,8}

    Ennek az ellenőrzésére csinálunk egy üres tömböt 
    const err = [];

    const emailRegex = /^[\w\_\-\.]{1,255}\@[\w\_\-\.]{1,255}\.[\w]{2,8}$/
        azért kell majd a ^$, hogy a felhasználó csak egyszer tudjon egy hiteles email címet megadni 
        pl -> norbi@hotmail.jp 
        ne így -> norbi@hotmail.jpnorbi@hotmail.jp
  

    if(!emailRegex.test(req.body.email)); -> és ha ez nem megy át, akkor az errors tömbbe rakunk valamit push-val, egy hibaüzenet
        err.push("Az email cím nem megfelelő!");

    az egész 
    -> 
*/
app.post("/regisztracio", async (req, res)=> {
    console.log(req.body);
    const passHash = createHash("sha512").update(req.body.pass).digest("hex");

    const errors = [];

    const emailRegex = /^[\w\_\-\.]{1,255}\@[\w\_\-\.]{1,255}\.[\w]{2,8}$/;

    if(!emailRegex.test(req.body.email))
        errors.push("Az email cím nem megfelelő");

    /*
        és ha az errors-ban nincs semmi, akkor csináljuk meg az adatbázis felvitelt!! 
    */
    if(errors.length === 0) {
        const response = await conn.promise().query(`
            insert into users (userName, email, pass)
            values(?,?,?)    
        `, 
        [req.body.userName.trim(), req.body.email.trim(), passHash]);   
    }


    res.render("register_post", {
        layout: "./layout/public_layout",
        messages: ["helló"],
        title: "Regisztráció",
        page: "regisztracio", 
        success: errors.length === 0
        /*
            Lesz egy ilyen kulcs, hogy success, tehát ha az error értéke az nulla, akkor kiírjuk, hogy sikeres regisztració 
            és akkor zölddel írjuk, ha pedig nem sikeres, akkor meg pirossal az üzenetünket!! 

            ezt a register_post.ejs-ben csináljuk 
        */
    })
});




app.listen(3000, console.log("the app is listening on localhost:3000"));
