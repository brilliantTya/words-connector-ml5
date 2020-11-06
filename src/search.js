let searchword = '';
let searched = false;
let warning;

var words;
var words_in_bubble = [];
var entering_words = [];

let request_words = new XMLHttpRequest();
let request_search = new XMLHttpRequest();
var allWords = [];
// http://thesaurus.altervista.org/

function prepare_words() {
    request_words.open("get", "libraries/data.json");
    request_words.send(null);
    request_words.onload = function () {
        if (request_words.status == 200) {
            let json = JSON.parse(request_words.responseText);
            allWords = json['adjs'].concat(json['nouns']);
            // console.log(allWords);
        }
    }
}

function query(word) {
    // var s = document.createElement("script");
    doRequest("GET", word);
    // s.src = "http://thesaurus.altervista.org/thesaurus/v1?word=" + word + "&language=en_US&output=json&key=xRqCbxbuUeW3tu0olE2b&callback=process";
    // document.body.appendChild(s);
}

function doRequest(method, word) {
    let x = new XMLHttpRequest();
    let cors_api_url = 'https://cors-anywhere.herokuapp.com/';
    let url = "http://thesaurus.altervista.org/thesaurus/v1?word=" + word + "&language=en_US&output=json&key=xRqCbxbuUeW3tu0olE2b&callback=process";
    x.open(method, cors_api_url + url);
    x.send(null);
    x.onload = (function () {
        if (x.status == 200) {
            console.log("CORS Request Success");
            var s = document.createElement("script");
            s.src = url;
            document.body.appendChild(s);
            searched = true;
        }
        else {
            console.log("CORS Request Fail");
            if (searched) {
                backup_words();
            } else {
                warning = "Try another? The word you requested is not in the database :(";
            }
        }
    })
}


function process(result) {
    this_search = "";

    for (key in result.response) {
        list = result.response[key].list;
        this_search += list.synonyms + '|';
    }

    if (this_search) {
        this_search = this_search.split("|");
    }

    for (let index = 0; index < this_search.length; index++) {
        this_search[index] = this_search[index].replace(/(\([^\)]*\))/g, "");
        this_search[index] = trim(this_search[index]);
    }
    // if (words != undefined && words != []) {
    //     generate_bubbles(words);
    // }
    if (words == undefined) {
        words = [];
    }
    words = words.concat(this_search)
}

function backup_words() {
    if (words.length < 25 && words.length >= 1) {
        var feed = random(words);
        query(feed);
    } else if (words == undefined || words.length < 1) {
        var feed = allWords[Math.floor(Math.random(allWords.length))];
        query(feed);
    }
}

function keyTyped() {
    searchword += key;
}

function keyPressed() {
    if (keyCode === BACKSPACE) {
        searchword = searchword.slice(0, searchword.length - 1);
    } else if (keyCode === ENTER && !searched) {
        background(32);
        query(searchword);
        // searched = true;
        searchword = "";
    }
}

function listenSearch() {
    if (!searched) {
        background(60, 174, 163);

        fill(255);
        textSize(28);
        push();
        var start = 180;
        textAlign(LEFT);
        text("Welcome to Discursia.", 120, start);
        text("This is a fun project that helps you get moving and find inspirations", 120, start + 60);
        text("at the same time.", 120, start + 100);
        text("We'll look online and feed you words that are related to your interest.", 120, start + 160);
        text("You'll need to type a first word to begin.", 120, start + 220);
        text(">>>", 120, start + 400);
        text(searchword, 200, start + 400);
        pop();
        if (warning != undefined && warning != "") {
            fill(255, 0, 0)
            text(warning, width/2, start + 300)
        }
    }
}
