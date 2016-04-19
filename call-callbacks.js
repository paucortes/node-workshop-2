/*Create a function called firstChar that takes a string and a callback, and “returns” the first character of the string after one second.
NOTE: You won’t be allowed to use the return keyword, because you’ll only be “returning” in the callback to setTimeout, way after your function has finished executing.
Create a function called lastChar that takes a string and “returns” the last character of the string after one second.
Create a function called getFirstAndLast that takes a string and “returns” the first+last character of the string. Your function should use firstChar and lastChar to do its work. I should be able to call your function like this:
  getFirstAndLast("hello", function(firstLast) {
    console.log(firstLast); // should output "ho"
  });
Add/commit/push*/

function firstChar(string, callback) {
    setTimeout(function() {
        callback(string.substring(0,1));
    }, 1000);
}
function lastChar(string, callback) {
    setTimeout(function() {
        callback(string.substring(string.length -1,string.length));
    }, 1000);
}

function getFirstAndLast(string, callback){
    firstChar(string, callback) + lastChar(string, callback);
}

getFirstAndLast("hello", function(firstLast) {
    console.log(firstLast);
});

