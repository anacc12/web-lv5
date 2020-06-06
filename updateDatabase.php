<?php

include 'classes/db.php';
$db = new Database();
$winner = $_POST['winner'];
$loser = $_POST['loser'];

//poziva se update funkcija iz Database klase, postavlja se novi broj pobjeda i poraza pobjednika i gubitnika
$db->update("
UPDATE cats 
SET wins = wins + 1
WHERE id = '" . $winner . "'
");

$db->update("
UPDATE cats 
SET loss = loss + 1
WHERE id = '" . $loser . "'
");
