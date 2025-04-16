// Add student info to the page
const studentInfo = document.createElement("p");
studentInfo.textContent = "Student ID: 200588943 | Name: Mary Agnes Albert";
document.body.appendChild(studentInfo);

// Set up variables for API request
var httpMethod = "GET";
const apiKey = "Wiq89xV68yc8tgP94mh9aNcNFxdgVaaTviYmjVH2";
var baseUrl = "https://api.nasa.gov/planetary/apod?api_key=" + apiKey + "&date=";
var asyncMode = true;

// Load data from API based on selected date
function loadData() {
    var inputDate = document.getElementById("date").value;
    if (!inputDate) {
        alert("Please select a date before checking.");
        return;
    }

    makeRequest(httpMethod, baseUrl + inputDate, asyncMode)
        .then((result) => {
            showResult(result);  // Display the result on the page
        })
        .catch((error) => {
            console.error("Error:", error);  // Handle errors
            alert("Failed to fetch data. Please try again.");
        });
}

// Display the API result on the page
function showResult(info) {
    document.getElementById("pic_date").innerHTML = info.date;
    document.getElementById("title").innerHTML = info.title;
    document.getElementById("apod_pic").src = info.url;
    document.getElementById("caption").innerHTML = info.explanation;
}

// Make the API request
function makeRequest(method, url, async) {
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    var json = JSON.parse(request.responseText);
                    resolve(json);  // Return the API data
                } else {
                    reject("Status code: " + request.status);  // Error handling
                }
            }
        };
        request.open(method, url, async);
        request.send();
    });
}
