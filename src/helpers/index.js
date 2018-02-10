/**
 * 324,350.00
 */
export function formatCurrency(amount){
    if (amount === undefined) {
        return null;
    } else {
        return amount.toLocaleString("en-US");
    }
}

export function formatTime(time){
    if (time > 60) {
        return (time / 60) + " minutes"
    } else {
        return time + " seconds"
    }
}
