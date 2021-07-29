var gTrans = {
    title: {
        en: 'Welcome to my bookshop',
        es: 'Mis Cosas Por Hacer',
        he: 'ברוך הבא לחנות הספרים'
    },
    'book': {
        en: 'Book',
        he: 'שם',
    },
    'add-book-placeholder': {
        en: 'Book name',
        he: 'שם הספר',
    }

}

var gCurrLang = 'en';

function getTrans(transKey) {
    var keyTrans = gTrans[transKey]
    if (!keyTrans) return 'UNKNOWN';

    var txt = keyTrans[gCurrLang]

    // if not founf - use english
    if (!txt) txt = keyTrans['en']

    return txt;
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')

    els.forEach(function (el) {
        var transKey = el.dataset.trans
        var txt = getTrans(transKey)

        if (el.nodeName === 'INPUT') {
            // el.placeholder = txt
            // THE SAME!!
            el.setAttribute('placeholder', txt)
        } else {
            el.innerText = txt
        }
    }) 
}

function setLang(lang) {
    gCurrLang = lang;
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}

function kmToMiles(km) {
    return km / 1.609;
}