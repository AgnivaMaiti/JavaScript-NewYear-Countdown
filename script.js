let language = 'english';
let isGregorianCountdown = true;
let x = null; // Declare the interval variable globally

function toBengaliNumeral(number) {
    const bengaliNumerals = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return number.toString().replace(/\d/g, digit => bengaliNumerals[digit]);
}

function updateTimer() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // getMonth returns 0-indexed months
    const currentDate = now.getDate();

    let isNewYear = false;

    if (isGregorianCountdown && currentMonth === 1 && currentDate === 1) {
        isNewYear = true;
    } else if (!isGregorianCountdown && currentMonth === 4 && currentDate === 14) {
        isNewYear = true;
    }

    const timerElement = document.getElementById('timer');
    const toggleButton = document.querySelector('button[onclick="toggleCountdown()"]');
    const titleElement = document.getElementById('title');

    if (isNewYear) {
        timerElement.innerHTML = (language === 'english') ? "Happy New Year!" : "শুভ নববর্ষ!";
        clearInterval(x); // Stop the countdown interval
    } else {
        let distance, d, hrs, min, sec;

        if (isGregorianCountdown) {
            let nextYearDate = new Date(currentYear, 0, 1).getTime();
            if (now > nextYearDate) {
                nextYearDate = new Date(currentYear + 1, 0, 1).getTime();
            }
            distance = nextYearDate - now.getTime();
        } else {
            let nextYearDate = new Date(currentYear, 3, 14).getTime();
            if (now > nextYearDate) {
                nextYearDate = new Date(currentYear + 1, 3, 14).getTime();
            }
            distance = nextYearDate - now.getTime();
        }

        d = Math.floor(distance / (1000 * 60 * 60 * 24));
        hrs = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        min = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        sec = Math.floor((distance % (1000 * 60)) / 1000);

        if (language === 'bengali') {
            d = toBengaliNumeral(d);
            hrs = toBengaliNumeral(hrs);
            min = toBengaliNumeral(min);
            sec = toBengaliNumeral(sec);
        }

        timerElement.innerHTML = (language === 'bengali') 
            ? `${d} দিন ${hrs} ঘন্টা ${min} মিনিট ${sec} সেকেন্ড`
            : `${d} days ${hrs} hours ${min} minutes ${sec} seconds`;
    }

    if (isGregorianCountdown) {
        toggleButton.innerHTML = (language === 'english') 
            ? "Switch to Bengali New Year" 
            : "বাংলা নববর্ষে পরিবর্তন করুন";
        titleElement.innerHTML = (language === 'english') 
            ? "JavaScript New Year Countdown" 
            : "জাভাস্ক্রিপ্ট গ্রেগোরীয় নববর্ষ গণনা";
    } else {
        toggleButton.innerHTML = (language === 'english') 
            ? "Switch to Gregorian New Year" 
            : "গ্রেগোরীয় নববর্ষে পরিবর্তন করুন";
        titleElement.innerHTML = (language === 'english') 
            ? "JavaScript Bengali New Year Countdown" 
            : "জাভাস্ক্রিপ্ট বাংলা নববর্ষ গণনা";
    }
}

function toggleCountdown() {
    isGregorianCountdown = !isGregorianCountdown;
    clearInterval(x); // Clear the previous interval
    updateTimer();
}

function setLanguage(lang) {
    language = lang;
    updateTimer();
}

updateTimer();
x = setInterval(updateTimer, 1000); // Start the interval and assign it to x
