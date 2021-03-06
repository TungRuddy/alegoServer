var express = require('express'), router = express.Router();

var mysql = require('../../sqlConnection/mySQL');

router.get('/:idRequest/:idUser', function (req, res, next) {
    var idRequest = Buffer.from(req.params.idRequest, 'base64').toString('ascii');
    var idUser = Buffer.from(req.params.idUser, 'base64').toString('ascii');
    var sql = "SELECT * FROM `forgot_password` WHERE id_verify =?  AND id_user =? AND ROUND(time_to_sec((TIMEDIFF(NOW(), date_request))) / 60) < 21";
    mysql.conn.query(sql, [idRequest, idUser], function (error, results, fields) {
        if (error) throw error;
        if (results[0]) {
            res.send(`
            <!DOCTYPE html>
<html lang="en">
<head>
  <title>Reset Password</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
</head>
<body>

<div style="background: #FFC000" class="jumbotron text-center">
  <img src="http://i1150.photobucket.com/albums/o614/manhtung159/Alego/logo_zpsqm9ynzni.png"> 
</div>
  
<div class="container">
  <h2>Reset password</h2>
  <form method="POST" action="/resetpassword">
    <div class="form-group">
      <label for="newPassword">New password</label>
      <input class="form-control" type="password" id="newPassword" name="newPassword">
    </div>
    <div class="form-group">
      <input class="form-control" style="visibility: hidden;position: absolute;pointer-events: none;" name="id_verify" value="`+ idRequest + `">
    </div>
    <div class="form-group">
      <input class="form-control" style="visibility: hidden;position: absolute;pointer-events: none;" name="id_user" value="`+ idUser + `">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</div>

</body>
</html>`);
        }
        else {
            return res.send(
                `
                <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>Error page</title>
    </head>
    
    <style type="text/css">
        /*
    VIEW IN FULL SCREEN MODE
    FULL SCREEN MODE: http://salehriaz.com/404Page/404.html
    
    DRIBBBLE: https://dribbble.com/shots/4330167-404-Page-Lost-In-Space
    */
    
    @import url('https://fonts.googleapis.com/css?family=Dosis:300,400,500');
    
    @-moz-keyframes rocket-movement { 100% {-moz-transform: translate(1200px,-600px);} }
    @-webkit-keyframes rocket-movement {100% {-webkit-transform: translate(1200px,-600px); } }
    @keyframes rocket-movement { 100% {transform: translate(1200px,-600px);} }
    @-moz-keyframes spin-earth { 100% { -moz-transform: rotate(-360deg); transition: transform 20s;  } }
    @-webkit-keyframes spin-earth { 100% { -webkit-transform: rotate(-360deg); transition: transform 20s;  } }
    @keyframes spin-earth{ 100% { -webkit-transform: rotate(-360deg); transform:rotate(-360deg); transition: transform 20s; } }
    
    @-moz-keyframes move-astronaut {
        100% { -moz-transform: translate(-160px, -160px);}
    }
    @-webkit-keyframes move-astronaut {
        100% { -webkit-transform: translate(-160px, -160px);}
    }
    @keyframes move-astronaut{
        100% { -webkit-transform: translate(-160px, -160px); transform:translate(-160px, -160px); }
    }
    @-moz-keyframes rotate-astronaut {
        100% { -moz-transform: rotate(-720deg);}
    }
    @-webkit-keyframes rotate-astronaut {
        100% { -webkit-transform: rotate(-720deg);}
    }
    @keyframes rotate-astronaut{
        100% { -webkit-transform: rotate(-720deg); transform:rotate(-720deg); }
    }
    
    @-moz-keyframes glow-star {
        40% { -moz-opacity: 0.3;}
        90%,100% { -moz-opacity: 1; -moz-transform: scale(1.2);}
    }
    @-webkit-keyframes glow-star {
        40% { -webkit-opacity: 0.3;}
        90%,100% { -webkit-opacity: 1; -webkit-transform: scale(1.2);}
    }
    @keyframes glow-star{
        40% { -webkit-opacity: 0.3; opacity: 0.3;  }
        90%,100% { -webkit-opacity: 1; opacity: 1; -webkit-transform: scale(1.2); transform: scale(1.2); border-radius: 999999px;}
    }
    
    .spin-earth-on-hover{
        
        transition: ease 200s !important;
        transform: rotate(-3600deg) !important;
    }
    
    html, body{
        margin: 0;
        width: 100%;
        height: 100%;
        font-family: 'Dosis', sans-serif;
        font-weight: 300;
        -webkit-user-select: none; /* Safari 3.1+ */
        -moz-user-select: none; /* Firefox 2+ */
        -ms-user-select: none; /* IE 10+ */
        user-select: none; /* Standard syntax */
    }
    
    .bg-purple{
        background: url(http://salehriaz.com/404Page/img/bg_purple.png);
        background-repeat: repeat-x;
        background-size: cover;
        background-position: left top;
        height: 100%;
        overflow: hidden;
        
    }
    
    .custom-navbar{
        padding-top: 15px;
    }
    
    .brand-logo{
        margin-left: 25px;
        margin-top: 5px;
        display: inline-block;
    }
    
    .navbar-links{
        display: inline-block;
        float: right;
        margin-right: 15px;
        text-transform: uppercase;
        
        
    }
    
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    /*    overflow: hidden;*/
        display: flex; 
        align-items: center; 
    }
    
    li {
        float: left;
        padding: 0px 15px;
    }
    
    li a {
        display: block;
        color: white;
        text-align: center;
        text-decoration: none;
        letter-spacing : 2px;
        font-size: 12px;
        
        -webkit-transition: all 0.3s ease-in;
        -moz-transition: all 0.3s ease-in;
        -ms-transition: all 0.3s ease-in;
        -o-transition: all 0.3s ease-in;
        transition: all 0.3s ease-in;
    }
    
    li a:hover {
        color: #ffcb39;
    }
    
    .btn-request{
        padding: 10px 25px;
        border: 1px solid #FFCB39;
        border-radius: 100px;
        font-weight: 400;
    }
    
    .btn-request:hover{
        background-color: #FFCB39;
        color: #fff;
        transform: scale(1.05);
        box-shadow: 0px 20px 20px rgba(0,0,0,0.1);
    }
    
    .btn-go-home{
        position: relative;
        z-index: 200;
        margin: 15px auto;
        width: 100px;
        padding: 10px 15px;
        border: 1px solid #FFCB39;
        border-radius: 100px;
        font-weight: 400;
        display: block;
        color: white;
        text-align: center;
        text-decoration: none;
        letter-spacing : 2px;
        font-size: 11px;
        
        -webkit-transition: all 0.3s ease-in;
        -moz-transition: all 0.3s ease-in;
        -ms-transition: all 0.3s ease-in;
        -o-transition: all 0.3s ease-in;
        transition: all 0.3s ease-in;
    }
    
    .btn-go-home:hover{
        background-color: #FFCB39;
        color: #fff;
        transform: scale(1.05);
        box-shadow: 0px 20px 20px rgba(0,0,0,0.1);
    }
    
    .central-body{
    /*    width: 100%;*/
        padding: 17% 5% 10% 5%;
        text-align: center;
    }
    
    .objects img{
        z-index: 90;
        pointer-events: none;
    }
    
    .object_rocket{
        z-index: 95;
        position: absolute;
        transform: translateX(-50px);
        top: 75%;
        pointer-events: none;
        animation: rocket-movement 200s linear infinite both running;
    }
    
    .object_earth{
        position: absolute;
        top: 20%;
        left: 15%;
        z-index: 90;
    /*    animation: spin-earth 100s infinite linear both;*/
    }
    
    .object_moon{
        position: absolute;
        top: 12%;
        left: 25%;
    /*
        transform: rotate(0deg);
        transition: transform ease-in 99999999999s;
    */
    }
    
    .earth-moon{
        
    }
    
    .object_astronaut{
        animation: rotate-astronaut 200s infinite linear both alternate;
    }
    
    .box_astronaut{
        z-index: 110 !important;
        position: absolute;
        top: 60%;
        right: 20%;
        will-change: transform;
        animation: move-astronaut 50s infinite linear both alternate;
    }
    
    .image-404{
        position: relative;
        z-index: 100;
        pointer-events: none;
    }
    
    .stars{
        background: url(http://salehriaz.com/404Page/img/overlay_stars.svg);
        background-repeat: repeat;
        background-size: contain;
        background-position: left top;
    }
    
    .glowing_stars .star{
        position: absolute;
        border-radius: 100%;
        background-color: #fff;
        width: 3px;
        height: 3px;
        opacity: 0.3;
        will-change: opacity;
    }
    
    .glowing_stars .star:nth-child(1){
        top: 80%;
        left: 25%;
        animation: glow-star 2s infinite ease-in-out alternate 1s;
    }
    .glowing_stars .star:nth-child(2){
        top: 20%;
        left: 40%;
        animation: glow-star 2s infinite ease-in-out alternate 3s;
    }
    .glowing_stars .star:nth-child(3){
        top: 25%;
        left: 25%;
        animation: glow-star 2s infinite ease-in-out alternate 5s;
    }
    .glowing_stars .star:nth-child(4){
        top: 75%;
        left: 80%;
        animation: glow-star 2s infinite ease-in-out alternate 7s;
    }
    .glowing_stars .star:nth-child(5){
        top: 90%;
        left: 50%;
        animation: glow-star 2s infinite ease-in-out alternate 9s;
    }
    
    @media only screen and (max-width: 600px){
        .navbar-links{
            display: none;
        }
        
        .custom-navbar{
            text-align: center;
        }
        
        .brand-logo img{
            width: 120px;
        }
        
        .box_astronaut{
            top: 70%;
        }
        
        .central-body{
            padding-top: 25%;
        }
    }
    </style>
    <!--
    VIEW IN FULL SCREEN MODE
    FULL SCREEN MODE: http://salehriaz.com/404Page/404.html
    
    DRIBBBLE: https://dribbble.com/shots/4330167-404-Page-Lost-In-Space
    -->
    
    <body class="bg-purple">
            
            <div class="stars">
                <div class="custom-navbar">
                    <div class="brand-logo">
                        <img src="http://i1150.photobucket.com/albums/o614/manhtung159/Alego/logo_zpsqm9ynzni.png" width="80px">
                    </div>
                    <div class="navbar-links">
                        <ul>
                          <li><a href="http://localhost:4200/app" target="_blank">Home</a></li>
                          <li><a href="http://localhost:4200/app" target="_blank">About</a></li>
                          <li><a href="http://localhost:4200/app" target="_blank">Features</a></li>
                        </ul>
                    </div>
                </div>
                <div class="central-body">
                    <img class="image-404" src="http://salehriaz.com/404Page/img/404.svg" width="300px">
                    <a href="http://localhost:4200/app" class="btn-go-home" target="_blank">GO BACK HOME</a>
                </div>
                <div class="objects">
                    <img class="object_rocket" src="http://salehriaz.com/404Page/img/rocket.svg" width="40px">
                    <div class="earth-moon">
                        <img class="object_earth" src="http://salehriaz.com/404Page/img/earth.svg" width="100px">
                        <img class="object_moon" src="http://salehriaz.com/404Page/img/moon.svg" width="80px">
                    </div>
                    <div class="box_astronaut">
                        <img class="object_astronaut" src="http://salehriaz.com/404Page/img/astronaut.svg" width="140px">
                    </div>
                </div>
                <div class="glowing_stars">
                    <div class="star"></div>
                    <div class="star"></div>
                    <div class="star"></div>
                    <div class="star"></div>
                    <div class="star"></div>
    
                </div>
    
            </div>
    
        </body>
    </html>`
            );
        }

    });


})
router.post('/', function (req, res, next) {
    if (req.body.newPassword && req.body.id_verify && req.body.id_user) {
        var sql = "update user set password =? where `id_user`=?";
        mysql.conn.query(sql, [req.body.newPassword, req.body.id_user], function (error, results, fields) {
            if (error) throw error;
            var sqldelete = "delete from forgot_password where id_verify =?";
            mysql.conn.query(sqldelete, [req.body.id_verify], function (error, data, fields) {
                if (error) throw error;
                return res.send(`
                <!DOCTYPE html>
<html lang="en">
<head>
  <title>Bootstrap Example</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
</head>
<body>

<div style="background: #FFC000" class="jumbotron text-center">
  <img src="http://i1150.photobucket.com/albums/o614/manhtung159/Alego/logo_zpsqm9ynzni.png"> 
</div>
  
<div class="container">
	<h2>Mật khẩu của bạn được thay đổi thành công ! Cảm ơn .</h2>
	<p>Click <a href="http://localhost:4200/signin"><strong>vào đây</strong></a> để đăng nhập</p>
</div>

</body>
</html>
                `);
            });
        });
    }
    else {
        return res.send(
            `
            <!DOCTYPE html>
<html lang="en">
<head>
  <title>Error page</title>
</head>

<style type="text/css">
	/*
VIEW IN FULL SCREEN MODE
FULL SCREEN MODE: http://salehriaz.com/404Page/404.html

DRIBBBLE: https://dribbble.com/shots/4330167-404-Page-Lost-In-Space
*/

@import url('https://fonts.googleapis.com/css?family=Dosis:300,400,500');

@-moz-keyframes rocket-movement { 100% {-moz-transform: translate(1200px,-600px);} }
@-webkit-keyframes rocket-movement {100% {-webkit-transform: translate(1200px,-600px); } }
@keyframes rocket-movement { 100% {transform: translate(1200px,-600px);} }
@-moz-keyframes spin-earth { 100% { -moz-transform: rotate(-360deg); transition: transform 20s;  } }
@-webkit-keyframes spin-earth { 100% { -webkit-transform: rotate(-360deg); transition: transform 20s;  } }
@keyframes spin-earth{ 100% { -webkit-transform: rotate(-360deg); transform:rotate(-360deg); transition: transform 20s; } }

@-moz-keyframes move-astronaut {
    100% { -moz-transform: translate(-160px, -160px);}
}
@-webkit-keyframes move-astronaut {
    100% { -webkit-transform: translate(-160px, -160px);}
}
@keyframes move-astronaut{
    100% { -webkit-transform: translate(-160px, -160px); transform:translate(-160px, -160px); }
}
@-moz-keyframes rotate-astronaut {
    100% { -moz-transform: rotate(-720deg);}
}
@-webkit-keyframes rotate-astronaut {
    100% { -webkit-transform: rotate(-720deg);}
}
@keyframes rotate-astronaut{
    100% { -webkit-transform: rotate(-720deg); transform:rotate(-720deg); }
}

@-moz-keyframes glow-star {
    40% { -moz-opacity: 0.3;}
    90%,100% { -moz-opacity: 1; -moz-transform: scale(1.2);}
}
@-webkit-keyframes glow-star {
    40% { -webkit-opacity: 0.3;}
    90%,100% { -webkit-opacity: 1; -webkit-transform: scale(1.2);}
}
@keyframes glow-star{
    40% { -webkit-opacity: 0.3; opacity: 0.3;  }
    90%,100% { -webkit-opacity: 1; opacity: 1; -webkit-transform: scale(1.2); transform: scale(1.2); border-radius: 999999px;}
}

.spin-earth-on-hover{
    
    transition: ease 200s !important;
    transform: rotate(-3600deg) !important;
}

html, body{
    margin: 0;
    width: 100%;
    height: 100%;
    font-family: 'Dosis', sans-serif;
    font-weight: 300;
    -webkit-user-select: none; /* Safari 3.1+ */
    -moz-user-select: none; /* Firefox 2+ */
    -ms-user-select: none; /* IE 10+ */
    user-select: none; /* Standard syntax */
}

.bg-purple{
    background: url(http://salehriaz.com/404Page/img/bg_purple.png);
    background-repeat: repeat-x;
    background-size: cover;
    background-position: left top;
    height: 100%;
    overflow: hidden;
    
}

.custom-navbar{
    padding-top: 15px;
}

.brand-logo{
    margin-left: 25px;
    margin-top: 5px;
    display: inline-block;
}

.navbar-links{
    display: inline-block;
    float: right;
    margin-right: 15px;
    text-transform: uppercase;
    
    
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
/*    overflow: hidden;*/
    display: flex; 
    align-items: center; 
}

li {
    float: left;
    padding: 0px 15px;
}

li a {
    display: block;
    color: white;
    text-align: center;
    text-decoration: none;
    letter-spacing : 2px;
    font-size: 12px;
    
    -webkit-transition: all 0.3s ease-in;
    -moz-transition: all 0.3s ease-in;
    -ms-transition: all 0.3s ease-in;
    -o-transition: all 0.3s ease-in;
    transition: all 0.3s ease-in;
}

li a:hover {
    color: #ffcb39;
}

.btn-request{
    padding: 10px 25px;
    border: 1px solid #FFCB39;
    border-radius: 100px;
    font-weight: 400;
}

.btn-request:hover{
    background-color: #FFCB39;
    color: #fff;
    transform: scale(1.05);
    box-shadow: 0px 20px 20px rgba(0,0,0,0.1);
}

.btn-go-home{
    position: relative;
    z-index: 200;
    margin: 15px auto;
    width: 100px;
    padding: 10px 15px;
    border: 1px solid #FFCB39;
    border-radius: 100px;
    font-weight: 400;
    display: block;
    color: white;
    text-align: center;
    text-decoration: none;
    letter-spacing : 2px;
    font-size: 11px;
    
    -webkit-transition: all 0.3s ease-in;
    -moz-transition: all 0.3s ease-in;
    -ms-transition: all 0.3s ease-in;
    -o-transition: all 0.3s ease-in;
    transition: all 0.3s ease-in;
}

.btn-go-home:hover{
    background-color: #FFCB39;
    color: #fff;
    transform: scale(1.05);
    box-shadow: 0px 20px 20px rgba(0,0,0,0.1);
}

.central-body{
/*    width: 100%;*/
    padding: 17% 5% 10% 5%;
    text-align: center;
}

.objects img{
    z-index: 90;
    pointer-events: none;
}

.object_rocket{
    z-index: 95;
    position: absolute;
    transform: translateX(-50px);
    top: 75%;
    pointer-events: none;
    animation: rocket-movement 200s linear infinite both running;
}

.object_earth{
    position: absolute;
    top: 20%;
    left: 15%;
    z-index: 90;
/*    animation: spin-earth 100s infinite linear both;*/
}

.object_moon{
    position: absolute;
    top: 12%;
    left: 25%;
/*
    transform: rotate(0deg);
    transition: transform ease-in 99999999999s;
*/
}

.earth-moon{
    
}

.object_astronaut{
    animation: rotate-astronaut 200s infinite linear both alternate;
}

.box_astronaut{
    z-index: 110 !important;
    position: absolute;
    top: 60%;
    right: 20%;
    will-change: transform;
    animation: move-astronaut 50s infinite linear both alternate;
}

.image-404{
    position: relative;
    z-index: 100;
    pointer-events: none;
}

.stars{
    background: url(http://salehriaz.com/404Page/img/overlay_stars.svg);
    background-repeat: repeat;
    background-size: contain;
    background-position: left top;
}

.glowing_stars .star{
    position: absolute;
    border-radius: 100%;
    background-color: #fff;
    width: 3px;
    height: 3px;
    opacity: 0.3;
    will-change: opacity;
}

.glowing_stars .star:nth-child(1){
    top: 80%;
    left: 25%;
    animation: glow-star 2s infinite ease-in-out alternate 1s;
}
.glowing_stars .star:nth-child(2){
    top: 20%;
    left: 40%;
    animation: glow-star 2s infinite ease-in-out alternate 3s;
}
.glowing_stars .star:nth-child(3){
    top: 25%;
    left: 25%;
    animation: glow-star 2s infinite ease-in-out alternate 5s;
}
.glowing_stars .star:nth-child(4){
    top: 75%;
    left: 80%;
    animation: glow-star 2s infinite ease-in-out alternate 7s;
}
.glowing_stars .star:nth-child(5){
    top: 90%;
    left: 50%;
    animation: glow-star 2s infinite ease-in-out alternate 9s;
}

@media only screen and (max-width: 600px){
    .navbar-links{
        display: none;
    }
    
    .custom-navbar{
        text-align: center;
    }
    
    .brand-logo img{
        width: 120px;
    }
    
    .box_astronaut{
        top: 70%;
    }
    
    .central-body{
        padding-top: 25%;
    }
}
</style>
<!--
VIEW IN FULL SCREEN MODE
FULL SCREEN MODE: http://salehriaz.com/404Page/404.html

DRIBBBLE: https://dribbble.com/shots/4330167-404-Page-Lost-In-Space
-->

<body class="bg-purple">
        
        <div class="stars">
            <div class="custom-navbar">
                <div class="brand-logo">
                    <img src="http://i1150.photobucket.com/albums/o614/manhtung159/Alego/logo_zpsqm9ynzni.png" width="80px">
                </div>
                <div class="navbar-links">
                    <ul>
                      <li><a href="http://localhost:4200/app" target="_blank">Home</a></li>
                      <li><a href="http://localhost:4200/app" target="_blank">About</a></li>
                      <li><a href="http://localhost:4200/app" target="_blank">Features</a></li>
                    </ul>
                </div>
            </div>
            <div class="central-body">
                <img class="image-404" src="http://salehriaz.com/404Page/img/404.svg" width="300px">
                <a href="http://localhost:4200/app" class="btn-go-home" target="_blank">GO BACK HOME</a>
            </div>
            <div class="objects">
                <img class="object_rocket" src="http://salehriaz.com/404Page/img/rocket.svg" width="40px">
                <div class="earth-moon">
                    <img class="object_earth" src="http://salehriaz.com/404Page/img/earth.svg" width="100px">
                    <img class="object_moon" src="http://salehriaz.com/404Page/img/moon.svg" width="80px">
                </div>
                <div class="box_astronaut">
                    <img class="object_astronaut" src="http://salehriaz.com/404Page/img/astronaut.svg" width="140px">
                </div>
            </div>
            <div class="glowing_stars">
                <div class="star"></div>
                <div class="star"></div>
                <div class="star"></div>
                <div class="star"></div>
                <div class="star"></div>

            </div>

        </div>

    </body>
</html>`
        );
    }

});

module.exports = router;