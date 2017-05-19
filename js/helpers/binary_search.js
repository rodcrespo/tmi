//from https://oli.me.uk/2014/12/17/revisiting-searching-javascript-arrays-with-a-binary-search/
/**
 * Performs a binary search on the provided sorted list and returns the index of the item if found. If it can't be found it'll return where it is supposed to be inserted
 *
 * @param {*[]} list Items to search through.
 * @param {*} item The item to look for.
 * @return {Number} The index of the item if found, or the position where is should be inserted
 */
function binarySearch(list, item) {
    var min = 0;
    var max = list.length - 1;
    var guess;
 
    while (min <= max) {
		guess = Math.floor((min + max) / 2);
 
        if (list[guess] === item) {
            return guess;
        }
        else {
            if (list[guess] < item) {
                min = guess + 1;
            }
            else {
                max = guess - 1;
            }
        }
    }
 
    return min;
}