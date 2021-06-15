<?php
session_start();
include ("db.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$email=trim($_POST['email']); 
$password=trim($_POST['password']); 
$return_data=[]''
if (empty($email) || empty($password)){
    $return_data = msg(0,422,'Please Fill in all Required Fields!');
}else{
    $SQL = "SELECT * FROM user WHERE email = '$email'";
    $exeSQL = mysqli_query($conn, $SQL);
    $nbrecs =  mysqli_num_rows($exeSQL);

    if ($nbrecs==0){
        $return_data = msg(0,422,'Please Fill in all Required Fields!');
    }else{
        $arrayu=mysqli_fetch_array($exeSQL);
        
        if($arrayu['userPassword'] != $password){
            $return_data = ('Please Fill in all Required Fields!');
        }else{
            $return_data = [
                'success' => 1,
                'message' => 'You have successfully logged in.',
            ];
            $_SESSION['userId'] = $arrayu['userId'];
            $_SESSION['userType'] = $arrayu['userType'];
            $_SESSION['fname'] = $arrayu['userFName'];
            $_SESSION['sname'] = $arrayu['userSName'];
        }
    }
    
}
echo json_encode($return_data);
?>