function getXmlHttp(){
  var xmlhttp;
  try {
    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    try {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
      xmlhttp = false;
    }
  }
  if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
    xmlhttp = new XMLHttpRequest();
  }
  return xmlhttp;
}

function send() {
    var username = document.getElementById("username").value,
        email = document.getElementById("email").value,
        message = document.getElementById("message").value,
        xmlhttp = getXmlHttp(), params;

    if(username == "" || email == "" || message == "") {
        showMessage("Нужно заполнить все три поля!", "error-text");
        return;
    }

    params = 'username='+ username +'&email='+ email +'&message='+ message;
    xmlhttp.open("POST", "../sendmail.php", true);
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
    
    xmlhttp.onreadystatechange = function() {
        var answer;
        if (xmlhttp.readyState !== 4) return;

        if (xmlhttp.status === 200) {
            answer = xmlhttp.responseText;
            if (answer == '"ok"') {
                showMessage("Сообщение успешно отправлено!", "ok-text");

            } else {
                if (answer == '"mailerror"') {
                    showMessage("Ошибка почтового сервера, попробуйте попозже...", "error-text");
                }
                if (answer == '"inputerror"') {
                    showMessage("Ошибка ввода данных, исправьтесь!", "error-text");
                }
            }

        } else {
            showMessage("Ошибка передачи: "+ xmlhttp.statusText, "error-text");
        }
    };
}

function showMessage(msg, label) {
    var errorLabel = document.getElementById(label);
    errorLabel.innerHTML = msg;
    errorLabel.style.display = "block";
    setTimeout(function() {
        errorLabel.innerHTML = "";
        errorLabel.style.display = "none";
        if(label == "ok-text") window.location.reload();
    }, 3000);
}