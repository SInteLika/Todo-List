function getMilliSecondsToday() {
    let now = new Date();
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return now - today;
}

export default function getNextMonday() {
    let date = new Date();
    let m = new Date();
    if (date.getDay()) {
        m.setDate(date.getDate() + 8 - date.getDay())
    } else {
        m.setDate(date.getDate() + 1)
    }
    return  m.getTime() - getMilliSecondsToday()
}



