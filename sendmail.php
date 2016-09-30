<?php

    $hasError = false;
     //Проверка правильности ввода EMAIL
    if(trim($_POST['email']) == '')  
    {
         $hasError = true;
    } else if (!eregi("^[A-Z0-9._%-]+@[A-Z0-9._%-]+\.[A-Z]{2,4}$", trim($_POST['email']))) 
        {
           $hasError = true;
        } else {
            $email = trim($_POST['email']);
        }
    $myip=$_SERVER['REMOTE_ADDR'];
    
    //Проверка наличия ТЕКСТА сообщения
    if(trim($_POST['message']) == '') 
    {
        $hasError = true;
        
    } else {
        if(function_exists('stripslashes')) 
        {
            $comments = stripslashes(trim($_POST['message']));
        } else {
            $comments = trim($_POST['message']);
        }
    }
    
    $name = trim($_POST['username']);
    if($name == "") {
        $name = "anonymus user";
    }
    
    //Если ошибок нет, отправить email
    if(!$hasError) 
    {
        $emailTo = 'ariastation@ua.fm'; 
        $body = "Отправитель с адреса ".$email." (пользователь - ".$name.", IP:".$myip.") сoобщил:\r\n \r\n ".$comments;
        $headers = 'Content-type: text/html; charset=utf-8 \r\n; From: <'.$email.'> \r\n;';
        $goodmail=mail($emailTo, "[feedback] from RENAME.DP.UA", $body, $headers);     
        if($goodmail)
        {
            echo json_encode("ok");
            
        } else 
        {
            echo json_encode("mailerror");
            
        }
    } 
    else {
        echo json_encode("inputerror");
    }