let language = 'english';
let isGregorianCountdown = true; 
let nextYearDate = null;

function toBengaliNumeral(number) {
    const bengaliNumerals = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return number.toString().replace(/\d/g, digit => bengaliNumerals[digit]);
}

function updateTimer() {
    const now = new Date().getTime();
    const currentYear = new Date().getFullYear();

    if (nextYearDate === null || now >= nextYearDate) {
        if (isGregorianCountdown) {
            let nextYear = currentYear + 1;
            nextYearDate = new Date("Jan 1 " + nextYear + " 00:00:00").getTime();
        } else {
            let nextYear = (currentYear + 1).toString();
            nextYearDate = new Date("Apr 14 " + nextYear + " 00:00:00").getTime();
        }
    }

    const timerElement = document.getElementById('timer');
    const toggleButton = document.querySelector('button[onclick="toggleCountdown()"]');
    const titleElement = document.getElementById('title');

    if (now >= nextYearDate) {
        timerElement.innerHTML = (language === 'english') ? "Happy New Year!" : "শুভ নববর্ষ!";
    } else {
        let distance = nextYearDate - now;
        var d = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hrs = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var min = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var sec = Math.floor((distance % (1000 * 60)) / 1000);

        if (language === 'bengali') {
            d = toBengaliNumeral(d);
            hrs = toBengaliNumeral(hrs);
            min = toBengaliNumeral(min);
            sec = toBengaliNumeral(sec);
        }

        if (language === 'bengali') {
            timerElement.innerHTML = d + " দিন " + hrs + " ঘন্টা " + min + " মিনিট " + sec + " সেকেন্ড";
        } else {
            timerElement.innerHTML = d + " days " + hrs + " hours " + min + " minutes " + sec + " seconds";
        }
    }

    if (isGregorianCountdown) {
        toggleButton.innerHTML = (language === 'english') ? "Switch to Bengali New Year" : "বাংলা নববর্ষে পরিবর্তন করুন";
        titleElement.innerHTML = (language === 'english') ? "JavaScript New Year Countdown" : "জাভাস্ক্রিপ্ট গ্রেগোরীয় নববর্ষ গণনা";
    } else {
        toggleButton.innerHTML = (language === 'english') ? "Switch to Gregorian New Year" : "গ্রেগোরীয় নববর্ষে পরিবর্তন করুন";
        titleElement.innerHTML = (language === 'english') ? "JavaScript Bengali New Year Countdown" : "জাভাস্ক্রিপ্ট বাংলা নববর্ষ গণনা";
    }
}

function toggleCountdown() {
    isGregorianCountdown = !isGregorianCountdown;
    nextYearDate = null; 
    updateTimer();
    updatePageLanguage(); 
}

function setLanguage(lang) {
    language = lang;
    updatePageLanguage();
    updateTimer(); 
}

updateTimer();
var x = setInterval(updateTimer, 1000);
