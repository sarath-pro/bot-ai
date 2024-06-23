export function now() {
    let date = new Date()
    let hrs = date.getHours();
    let mts = date.getMinutes();
    let ampm = 'AM'
    if(hrs>=12) {
        ampm = 'PM'
    }
    if(hrs == 0) {
        hrs = 12;
    } else if(hrs > 12) {
        hrs -= 12;
    }
    if(mts<10) {
        mts = '0'+mts
    }
    return hrs+":"+mts+" "+ampm;
}