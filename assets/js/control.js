const i = document.getElementById.bind(document);
const qt = document.querySelectorAll.bind(document);
const q = document.querySelector.bind(document);
const b = document.body;

/* 
===========================
Toggle Aside
===========================
*/

var asideToggle = false;

// Dom elements
const aside = i('aside');
const overlay = i('overlay');

toggleAside();

const hamburgar = i('hamburgar');
const closeAside = i('close-aside');

[hamburgar, closeAside].forEach(e => {
    e.addEventListener('click', toggleAside);
});

function toggleAside() {
    [aside, overlay].forEach(e => {
        e.setAttribute('data-asideHidden', asideToggle)
    });
    asideToggle = !asideToggle;
}

/* 
===========================
Toggle Theme
===========================
*/

var darkEnabled = false; // Default

// Dom elements
const switchThemeIcon = i('switch-theme');

toggleTheme();
switchThemeIcon.addEventListener('click', toggleTheme);

function toggleTheme() {
    switchThemeIcon.className = 'bx';
    var targetClass = darkEnabled ? 'bx-sun' : 'bx-moon';
    switchThemeIcon.classList.add(targetClass);
    b.setAttribute('data-dark', darkEnabled);
    darkEnabled = !darkEnabled;
}

/* 
===========================
Toggle full screen song
===========================
*/

// Dom elements
const expandSong = i('expand-song');
const collapseSong = i('collapse-song');
const songShort = i('song-short');
const songFull = i('song-full');

// Expand
if(expandSong) {
    expandSong.addEventListener('click', function() {
        songShort.setAttribute('hidden','');
        songFull.removeAttribute('hidden');
    })
}

// Collapse
if(collapseSong) {
    collapseSong.addEventListener('click', function() {
        songShort.removeAttribute('hidden');
        songFull.setAttribute('hidden','');
    })
}

