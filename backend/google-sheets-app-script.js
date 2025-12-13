function doGet() {
  const data = getRegularTimetableDays()
  log(JSON.stringify(data))
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON)
}

function log(a) {
  if (debugLog)
    Logger.log(a)
}

//========== SETTINGS ==========
const SHEET_NAME = 'Название листа в таблице'
const dayIdColumnIndex = 0
const lessonNumberColumnIndex = 2
const lessonTitleColumnIndex = 3
const onlyEvenLessonTitleColumnIndex = 5
const onlyOddLessonTitleColumnIndex = 4

const debugLog = true
//==============================


function valueIsEmptyString(val) {
  return typeof val === 'string' && val.trim().length === 0
}
function valueIsNullOrUndef(val) {
  return val == null
}

function createAndPushLesson(jsonCurrentDay, num, type, title) {
  jsonCurrentDay.lessons.push({
    num: num,
    lessonType: type,
    title: title
  })
  log(`pushed lesson ${num} ${title} ${type}`)
}
function pushDay(jsonDays, day) {
  jsonDays.push(day)
  log(`pushed day: ${JSON.stringify(day)}`)
}

function getRegularTimetableDays(sheetTitle = SHEET_NAME) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetTitle)
  const data = sheet.getDataRange().getValues()

  const days = []

  let currentDay = null
  for (let i = 1; i < data.length; i++) {
    log(`row number ${i + 1} index ${i}`)
    const row = data[i]

    //============ creating a day if id cell isn't empty ============
    if (!valueIsEmptyString(row[dayIdColumnIndex])) {
      log('creating new day')
      currentDay = {
        dayOfTheWeek: row[dayIdColumnIndex],
        lessons: []
      }
    }


    //============ filling with lessons if cell isn't empty ============
    const tableLessonTitle = row[lessonTitleColumnIndex]
    const tableEvenLessonTitle = row[onlyEvenLessonTitleColumnIndex]
    const tableOddLessonTitle = row[onlyOddLessonTitleColumnIndex]
    const lessonNum = row[lessonNumberColumnIndex]

    if (!valueIsEmptyString(tableLessonTitle)) {
      createAndPushLesson(currentDay, lessonNum, 0, tableLessonTitle)
    }
    else {
      if (!valueIsEmptyString(tableOddLessonTitle)) {
        createAndPushLesson(currentDay, lessonNum, 1, tableOddLessonTitle)
      }
      if (!valueIsEmptyString(tableEvenLessonTitle)) {
        createAndPushLesson(currentDay, lessonNum, 2, tableEvenLessonTitle)
      }
    }

    //============ pushing the day if next row doesn't exist or it's a new day ============
    const nextRowExists = (i + 1) < data.length
    if (!nextRowExists) {
      pushDay(days, currentDay)
      continue
    }
    const nextDayId = data[i + 1][dayIdColumnIndex]
    if (!valueIsEmptyString(nextDayId)) {
      pushDay(days, currentDay)
    }
  }//end row loop

  //============ returning days ============
  return days
}