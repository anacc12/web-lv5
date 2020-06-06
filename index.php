<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Zadatak 1</title>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous" />
</head>

<body>
<section class="container d-flex flex-column align-items-center mb-4">
    <h1>CFC 3</h1>
    <h2>Choose your cat</h2>
</section>
<div class="container d-flex flex-column align-items-center">
    <div id="clock" class="clock display-4"></div>
    <div id="message" class="message"></div>
</div>
<div class="row">
    <div id="firstSide" class="container d-flex flex-column align-items-center side first-side col-5">
        <div class="row d-flex justify-content-end">
            <div class="col-auto">
                <ul class="cat-info list-group">
                    <li class="list-group-item name">Cat Name</li>
                    <li class="list-group-item age">Cat age</li>
                    <li class="list-group-item skills">Cat Info</li>
                    <li class="list-group-item record">
                        Wins:<span class="wins"></span> Loss: <span class="loss"></span>
                    </li>
                </ul>
            </div>
            <div class="col-auto featured-cat-fighter">
                <img class="featured-cat-fighter-image img-rounded" src="https://via.placeholder.com/300" alt="Featured cat fighter" width="300" height="300" />
            </div>
            <div class="col-auto w-100" style="margin-top: 24px;">
                <div class="row fighter-list">
                    <?php
                    //dodavanje nove mačke iz baze
                    include 'classes/db.php';
                    $db = new Database;
                    $result = $db->query("SELECT * FROM cats");
                    if ($result->num_rows > 0) {
                        while ($row = $result->fetch_assoc()) {
                            $cat = (object) array(); //u novi objekt se spremaju vrijednosti iz baze
                            $cat->id = $row["id"];
                            $cat->name = $row["name"];
                            $cat->age = $row["age"];
                            $cat->catInfo = $row["info"];
                            @$cat->record->wins = $row['wins']; //@ ne prikazuje warning
                            $cat->record->loss = $row['loss'];

                            echo '<div class="col-md-4 mb-1">';
                            echo '<div class="fighter-box" data-info = \'' . (json_encode($cat, JSON_NUMERIC_CHECK)) . '\' >'; //JSON_NUMERIC_CHECK pretvara wins i loss u brojeve
                            echo '<img src="./img/' . $row["image"] . '" alt="Figter Box ' . $row['id'] . '" width="150" height="150">';
                            echo '</div>';
                            echo '<button class="btn btn-primary mt-2 btn-mg" id="editCat">Edit</button>';
                            echo '</div>';
                        }
                    }

                    ?>

                </div>
            </div>
        </div>
    </div>
    <div class="col-2 d-flex flex-column align-items-center">
        <p class="display-4">VS</p>
        <button id="generateFight" class="btn btn-primary mb-4 btn-lg">
            Fight
        </button>
        <button id="randomFight" class="btn btn-secondary">
            Select Random fighters
        </button>

        <form action="new_fighter.php">
            <input type="submit" value="Add new fighter" class="btn btn-primary mt-4 btn-mg" />
        </form>
    </div>
    <div id="secondSide" class="container d-flex flex-column align-items-center side second-side col-5">
        <div class="row">
            <div class="col-auto featured-cat-fighter">
                <img class="featured-cat-fighter-image img-rounded" src="https://via.placeholder.com/300" alt="Featured cat fighter" width="300" height="300" />
            </div>
            <div class="col-auto">
                <ul class="cat-info list-group">
                    <li class="list-group-item name">Cat Name</li>
                    <li class="list-group-item age">Cat age</li>
                    <li class="list-group-item skills">Cat Info</li>
                    <li class="list-group-item record">
                        Wins: <span class="wins"></span>Loss: <span class="loss"></span>
                    </li>
                </ul>
            </div>
            <div class="col-auto w-100" style="margin-top: 24px;">
                <div class="row fighter-list">
                    <?php
                    $dbs = new Database;
                    $result = $dbs->query("SELECT * FROM cats");
                    if ($result->num_rows > 0) {
                        while ($row = $result->fetch_assoc()) {
                            $cat = (object) array();
                            $cat->id = $row["id"];
                            $cat->name = $row["name"];
                            $cat->age = $row["age"];
                            $cat->catInfo = $row["info"];
                            @$cat->record->wins = $row['wins'];
                            $cat->record->loss = $row['loss'];

                            echo '<div class="col-md-4 mb-1">';
                            echo '<div class="fighter-box" data-info = \'' . (json_encode($cat, JSON_NUMERIC_CHECK)) . '\' >';
                            echo '<img src="./img/' . $row["image"] . '" alt="Figter Box ' . $row['id'] . '" width="150" height="150">';
                            echo '</div>';
                            echo '<button class="btn btn-primary mt-2 btn-mg" id="editCat">Edit</button>';
                            echo '</div>';
                        }
                    }
                    ?>
                </div>

            </div>
        </div>
    </div>
</div>
<script src="./src/app.js"></script>
</body>

</html>