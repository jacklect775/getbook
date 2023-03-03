// Định nghĩa một hàm kiểm tra trình duyệt
function detectAdBlocker() {
  var isAdBlockerEnabled = false;

  // Kiểm tra xem có thể đang sử dụng phần mềm chặn quảng cáo hay không
  if (typeof(window.google_jobrunner) === 'undefined') {
    isAdBlockerEnabled = true;
  }

  // Nếu phát hiện phần mềm chặn quảng cáo
  if (isAdBlockerEnabled) {
    // Kiểm tra cookie để xác định liệu popup đã hiển thị trong ngày hay chưa
    var popupShown = getCookie("popupShown");
    if (popupShown === null) {
      // Hiển thị popup cảnh báo cho người dùng
      var popup = document.createElement('div');
      popup.innerHTML = '<p>Bạn đang sử dụng phần mềm chặn quảng cáo. Vui lòng tắt nó để tiếp tục sử dụng trang web.</p><button id="close-btn">Tắt</button>';
      popup.style.position = 'fixed';
      popup.style.bottom = '0';
      popup.style.left = '0';
      popup.style.right = '0';
      popup.style.background = 'red';
      popup.style.color = 'white';
      popup.style.padding = '10px';
      document.body.appendChild(popup);

      // Gán sự kiện click cho button để ẩn popup
      var closeBtn = document.getElementById('close-btn');
      closeBtn.onclick = function() {
        popup.style.display = 'none';
      }

      // Gán cookie để đánh dấu đã hiển thị popup trong ngày
      setCookie("popupShown", "true", 1);
    }

    // Chuyển hướng tất cả các liên kết đến trang abc.com
    var links = document.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
      links[i].href = 'https://abc.com';
    }
  }
}

// Hàm setCookie và getCookie tương tự như ở ví dụ trước

// Gọi hàm kiểm tra trình duyệt khi trang web được tải
window.onload = detectAdBlocker;
