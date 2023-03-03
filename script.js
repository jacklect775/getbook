$(document).ready(function() {
    // Check if the user has already downloaded files
    var downloadCount = getCookie("downloadCount");
    if (downloadCount === "") {
        downloadCount = 0;
    }

    // Check if the reset time has passed
    var resetTime = getCookie("resetTime");
    var currentTime = new Date().getTime();
    if (resetTime === "" || parseInt(resetTime) <= currentTime) {
        setCookie("downloadCount", "0", 1);
        setCookie("resetTime", currentTime + 86400000, 1);
        downloadCount = 0;
    }

    // Check if the user has reached the download limit
    if (downloadCount >= 10) {
        $("#download-btn").prop("disabled", true);
        $("#download-message").text("Bạn đã tải đủ số lượng file cho phép trong 24 giờ.");
    }

    // When the download button is clicked
    $("#download-btn").click(function() {
        // Check if the user has reached the download limit
        if (downloadCount >= 10) {
            $("#download-message").text("Bạn đã tải đủ số lượng file cho phép trong 24 giờ.");
        } else {
            // Download the file and update the download count
            downloadFile();
            downloadCount++;
            setCookie("downloadCount", downloadCount, 1);
            $("#download-count").text(downloadCount);

            // Check if the user has reached the download limit
            if (downloadCount >= 10) {
                $("#download-btn").prop("disabled", true);
                $("#download-message").text("Bạn đã tải đủ số lượng file cho phép trong 24 giờ.");
            }
        }
    });
});

function downloadFile() {
    // Code to download the file goes here
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return "";
}
