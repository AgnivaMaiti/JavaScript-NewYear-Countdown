let language = 'english';
let isGregorianCountdown = true;
let nextYearDate = null;

function toBengaliNumeral(number) {
    const bengaliNumerals = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return number.toString().replace(/\d/g, digit => bengaliNumerals[digit]);
}

function isTodayNewYear() {
    const today = new Date();
    const currentYear = today.getFullYear();

    if (isGregorianCountdown) {
        return today.getMonth() === 0 && today.getDate() === 1;
    } else {
        return today.getMonth() === 3 && today.getDate() === 14;
    }
}

function updateTimer() {
    const now = new Date().getTime();
    const currentYear = new Date().getFullYear();

    if (isTodayNewYear()) {
        nextYearDate = null;
    }

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

    if (isTodayNewYear() || now >= nextYearDate) {
        timerElement.innerHTML = (language === 'english') ? "Happy New Year!" : "শুভ নববর্ষ!";
    } else {
        let distance = nextYearDate - now;
        let d = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hrs = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let min = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let sec = Math.floor((distance % (1000 * 60)) / 1000);

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

    toggleButton.innerHTML = isGregorianCountdown ? 
        (language === 'english' ? "Switch to Bengali New Year" : "বাংলা নববর্ষে পরিবর্তন করুন") : 
        (language === 'english' ? "Switch to Gregorian New Year" : "গ্রেগোরীয় নববর্ষে পরিবর্তন করুন");

    titleElement.innerHTML = isGregorianCountdown ? 
        (language === 'english' ? "JavaScript New Year Countdown" : "জাভাস্ক্রিপ্ট গ্রেগোরীয় নববর্ষ গণনা") : 
        (language === 'english' ? "JavaScript Bengali New Year Countdown" : "জাভাস্ক্রিপ্ট বাংলা নববর্ষ গণনা");
}

function toggleCountdown() {
    isGregorianCountdown = !isGregorianCountdown;
    nextYearDate = null;
    updateTimer();
}

function setLanguage(lang) {
    language = lang;
    updateTimer();
}

updateTimer();
var x = setInterval(updateTimer, 1000);
