//#region ========== ELEMENTS ==========
const lessonHolder = document.getElementById('lessonHolder')
const day0elem = document.getElementById('day0elem')
const day1elem = document.getElementById('day1elem')
const day2elem = document.getElementById('day2elem')
const day3elem = document.getElementById('day3elem')
const day4elem = document.getElementById('day4elem')
const day5elem = document.getElementById('day5elem')
const day6elem = document.getElementById('day6elem')
const dayButtonElements = [
  day0elem,
  day1elem,
  day2elem,
  day3elem,
  day4elem,
  day5elem,
  day6elem
]
const weekNumElement = document.getElementById('weekNum')
//#endregion

const DAY_DATA_URL = 'https://script.google.com/macros/s/AKfycbwyw3F88UbggaasIe2PtbKXBNGt0JapjQuStBEKOlmkm3QuQInCWUjKm4wccjdSDnKWmA/exec'
let selectedDayOfTheWeek = 0
let weekIsEven = true;
let currentlySeletedDayDate = new Date()
const HARDCODED_FIRST_DAY_FIRST_WEEK = new Date(2025, 8, 1)


// CHANGE STRUCTURE IN BACKEND-SCRIPT TOO
daysData = [
  {
    dayOfTheWeek: 0,
    lessons: [
      {
        num: null,
        lessonType: 0,
        title: "Кажется, произошла ошибка"
      }
    ]
  }
]
const emptyLesson = {
  num: 0,
  lessonType: 0,
  title: "Нет пар"
}

//#region ========== lesson entries ==========

function clearLessonEntries() {
  lessonHolder.innerHTML = '';
}

function createLessonEntryElement(num, title) {

  const lesson__right_part = document.createElement('div')
  lesson__right_part.className = 'lesson__right_part'
  lesson__right_part.innerText = title

  const lessonElement = document.createElement('div')
  lessonElement.classList = 'lesson'

  if (num != null) {
    const lesson__left_part = document.createElement('div')
    lesson__left_part.className = 'lesson__left_part'
    lesson__left_part.innerText = num
    lessonElement.appendChild(lesson__left_part)
  }
  lessonElement.appendChild(lesson__right_part)

  return lessonElement;
}

function newLessonEntry(num = null, title = 'Программирование') {
  const elem = createLessonEntryElement(num, title)
  lessonHolder.appendChild(elem)
}

function getLessons(dayOfTheWeek) {
  if (daysData[dayOfTheWeek] === undefined)
    return [emptyLesson]

  return daysData[dayOfTheWeek].lessons
}
function createLessonEntriesFromDays(dayOfTheWeek) {
  getLessons(dayOfTheWeek).forEach(lesson => {
    let createLesson = false

    if (lesson.lessonType === 0)
      createLesson = true
    else if (weekIsEven === true && lesson.lessonType === 2)
      createLesson = true
    else if (weekIsEven === false && lesson.lessonType === 1)
      createLesson = true

    if (createLesson)
      newLessonEntry(lesson.num, lesson.title)
  });
}

//#endregion

//#region ========== day buttons ==========

function setDayOfTheWeek(num) {
  selectedDayOfTheWeek = num
}

function changeDayOfTheWeekFromButton(dayOfTheWeekIndex, invokerElement) {
  clearLessonEntries()
  setDayOfTheWeek(dayOfTheWeekIndex)
  createLessonEntriesFromDays(selectedDayOfTheWeek)
  for (let i = 0; i < dayButtonElements.length; i++) {
    const element = dayButtonElements[i]
    element.className = 'header__days__dayblock'
  }
  invokerElement.className += ' header__days__dayblock__selected'
}

function enableDayButtons() {
  for (let i = 0; i < dayButtonElements.length; i++) {
    const element = dayButtonElements[i]
    element.addEventListener('click', () => {
      changeDayOfTheWeekFromButton(i, element)
    })
  }
}
//#region ========== date stuff ==========
function getMonthRus(monthIndex) {
  const ru = [
    'янв.',
    'фев.',
    'мар.',
    'апр.',
    'мая',
    'июня',
    'июля',
    'авг.',
    'сен.',
    'окт.',
    'ноя.',
    'дек.',
  ]
  return ru[monthIndex]
}

function dateGetDayOfWeek(date) {//0 is monday
  const day = date.getDay()

  return day === 0 ? 6 : day - 1
}

function getFirstDayOfWeekDate(now) {
  const a = new Date(now)
  a.setDate(now.getDate() - dateGetDayOfWeek(now))
  return a
}

function getWeekNumber(startDate, currentDate) {
  const diffTime = currentDate - startDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return Math.floor(diffDays / 7) + 1;
}
//#endregion

function changeDateOnDayButton(elemNum, date) {
  const dayStr = date.toISOString().slice(8, 10)
  const ruMonth = getMonthRus(date.getMonth())

  dayButtonElements[elemNum].firstElementChild.innerText = `${dayStr}\n${ruMonth}`
}

function changeButtonsToSelectedWeek(dayDate) {
  let loopDate = getFirstDayOfWeekDate(dayDate)
  for (let i = 0; i < dayButtonElements.length; i++) {
    changeDateOnDayButton(i, loopDate)
    loopDate.setDate(loopDate.getDate() + 1)
  }
}

//#endregion

//#region ========== week buttons ==========
function changeWeekText(dayDate) {
  const weekNum = getWeekNumber(HARDCODED_FIRST_DAY_FIRST_WEEK, dayDate)
  weekNumElement.innerText = `Неделя ${weekNum}`
  weekIsEven = weekNum % 2 === 0
}

function onClickPreviousWeek() {
  const a = new Date(currentlySeletedDayDate)
  a.setDate(currentlySeletedDayDate.getDate() - 7)
  currentlySeletedDayDate = a

  updateSelectedDateChanged()
}
function onClickNextWeek() {
  const a = new Date(currentlySeletedDayDate)
  a.setDate(currentlySeletedDayDate.getDate() + 7)
  currentlySeletedDayDate = a

  updateSelectedDateChanged()
}

function updateSelectedDateChanged() {
  changeButtonsToSelectedWeek(currentlySeletedDayDate)
  changeWeekText(currentlySeletedDayDate)
  clearLessonEntries()
  createLessonEntriesFromDays(selectedDayOfTheWeek)
}
//#endregion


async function init() {
  // const a = new Date(currentDate)
  // a.setDate(currentDate.getDate() + 0)
  // currentDate = a

  const dayOfWeekIndex = dateGetDayOfWeek(currentlySeletedDayDate)
  changeButtonsToSelectedWeek(currentlySeletedDayDate)
  changeWeekText(currentlySeletedDayDate)
  changeDayOfTheWeekFromButton(dayOfWeekIndex, dayButtonElements[dayOfWeekIndex])

  clearLessonEntries()
  newLessonEntry(null, 'Загрузка...')

  try {
    const response = await fetch(DAY_DATA_URL);
    const data = await response.json();
    clearLessonEntries()
    console.log('Получены данные:', data);
    daysData = data
  } catch (error) {
    alert(`Не удалось получить данные о парах\n\nПодробнее:\n${error}`);
    console.log(error)
    clearLessonEntries()
    newLessonEntry(null, 'Ошибка')
    return
  }
  enableDayButtons()
  createLessonEntriesFromDays(selectedDayOfTheWeek)

}

init()

//TODO
//- дни это кнопки, текущий другим цветом видно
//- подкл к экселю
//