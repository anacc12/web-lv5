<?php
include 'classes/db.php';
$data = new Database;
$msg = '';
if (isset($_POST['submit'])) {
    $file = $_FILES['file']['name'];
    $target = "img/" . basename($file);

    //polje koje predstavlja podatke koji će se staviti u bazu
    $insert_data = array(
        'name' => mysqli_real_escape_string($data->conn, $_POST['name']),
        'age' => mysqli_real_escape_string($data->conn, $_POST['age']),
        'info' => mysqli_real_escape_string($data->conn, $_POST['info']),
        'wins' => mysqli_real_escape_string($data->conn, $_POST['wins']),
        'loss' => mysqli_real_escape_string($data->conn, $_POST['loss']),
        'image' => mysqli_real_escape_string($data->conn, $file),
    );

    //umetanje podataka u bazu i preusmjeravanje
    if ($data->insert('cats', $insert_data)) {
        if (move_uploaded_file($_FILES['file']['tmp_name'], $target)) {
            $msg = "Image uploaded successfully.";
            header("location: index.php");
        } else {
            $msg = "Failed to upload image.";
        }
    } else $msg = "Failed to insert.";
}
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous" />
</head>

<body>
    <div class="m-4">
        <?php
        echo $msg;
        ?>
    </div>
    <form action="" method="POST" enctype="multipart/form-data">
        <div class="form-row ml-4 mr-4 mt-4 ">
            <div class="form-group col-sm-6">
                <input type="text" class="form-control rounded-pill p-4" name="name" placeholder="Name" required="required">
            </div>
        </div>

        <div class="form-row ml-4 mr-4 mt-2">
            <div class="form-group col-sm-6">
                <input type="text" class="form-control rounded-pill  p-4" name="age" placeholder="Age" required="required">
            </div>
        </div>

        <div class="form-row ml-4 mr-4 mt-2">
            <div class="form-group col-sm-6">
                <input type="text" class="form-control rounded-pill  p-4" name="info" placeholder="Cat info" required="required">
            </div>
        </div>

        <div class="form-row ml-4 mr-4 mt-2">
            <div class="form-group col-sm-3">
                <input type="text" class="form-control rounded-pill  p-4" name="wins" placeholder="Wins" required="required">
            </div>
            <div class="form-group col-sm-3">
                <input type="text" class="form-control rounded-pill p-4" name="loss" placeholder="Loss" required="required">
            </div>
        </div>



        <div class="form-row ml-4 mr-4 mt-2">
            <div class="col-sm-6 file btn btn-secondary">
                <input type="file" name="file" />
            </div>
        </div>

        <div class="form-row ml-4 mr-4 mt-3">
            <button class="btn btn-primary col-sm-6 p-2 " type="submit" name="submit" value="Submit">
                Submit form
            </button>
        </div>
        </div>
        </div>
    </form>
</body>

</html>