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
        return; // Exit the function early if it's already the new year
    }

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

    timerElement.innerHTML = (language === 'bengali') 
        ? `${d} দিন ${hrs} ঘন্টা ${min} মিনিট ${sec} সেকেন্ড`
        : `${d} days ${hrs} hours ${min} minutes ${sec} seconds`;

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
