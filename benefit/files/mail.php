<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['user-name'])) {$userName = $_POST['user-name'];}
    if (isset($_POST['user-email'])) {$userEmail = $_POST['user-email'];}
    if (isset($_POST['user-text'])) {$userText = $_POST['user-text'];}

    $to = "zerno-muka2019@mail.ru"; /*Укажите адрес, га который должно приходить письмо*/
    $sendfrom   = "test@pixwhite.com"; /*Укажите адрес, с которого будет приходить письмо, можно не настоящий, нужно для формирования заголовка письма*/
    $headers  = "From: " . strip_tags($sendfrom) . "\r\n";
    $headers .= "Reply-To: ". strip_tags($sendfrom) . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html;charset=utf-8 \r\n";
    $subject = "Обратный звонок";
    $message = "
    Имя: $userName <br />
    Почта: $userEmail <br />
    Сообщение: $userText <br />";
    $send = mail ($to, $subject, $message, $headers);
} else {
    echo "Попробуйте еще раз";
}
?>