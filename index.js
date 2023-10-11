const monthText = document.getElementById('month');
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function updateMonthText() {
    monthText.textContent = `${month[currentMonth]} ${currentYear}`;
}

updateMonthText();

const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');
nextButton.addEventListener('click', nextMonth);
prevButton.addEventListener('click', prevMonth);

function nextMonth() {
    currentMonth = (currentMonth + 1) % 12;
    if (currentMonth === 0) {
        currentYear++;
    }
    updateMonthText();
    generateDayButtons();
}

function prevMonth() {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    updateMonthText();
    generateDayButtons();
}

const dayContainer = document.querySelector('.day-container');
const inputBox = document.querySelector('.input-box');
const popupInput = document.getElementById('popupInput');
const saveButton = document.getElementById('saveButton');

function generateDayButtons() {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    dayContainer.innerHTML = '';

    for (let i = 1; i <= daysInMonth; i++) {
        const dayButton = document.createElement('button');
        dayButton.className = `day day${i}`;
        dayButton.textContent = i;

        dayButton.addEventListener('click', () => {
            const dayNumber = i;
            const localStorageKey = `day${currentYear}-${currentMonth + 1}-${dayNumber}`;
            popupInput.dataset.day = dayNumber;
            const storedInput = localStorage.getItem(localStorageKey);

            if (storedInput) {
                popupInput.value = storedInput;
            } else {
                popupInput.value = '';
            }

            inputBox.style.display = 'block';
        });

        dayContainer.appendChild(dayButton);
    }
}

generateDayButtons();

saveButton.addEventListener('click', () => {
    const dayNumber = popupInput.dataset.day;
    const localStorageKey = `day${currentYear}-${currentMonth + 1}-${dayNumber}`;
    const textValue = popupInput.value;

    localStorage.setItem(localStorageKey, textValue);

    inputBox.style.display = 'none';
});
