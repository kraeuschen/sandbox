<?php

require 'Slim/Slim.php';

$app = new Slim();

// define routes
$app->get('/wines', 'getWines');
$app->get('/wines/:id', 'getWine');
$app->get('/wines/search/:query', 'findByName');
$app->post('/wines', 'addWine');
$app->put('/wines/:id', 'updateWine');
$app->delete('/wines/:id', 'deleteWine');

$app->run();

// define methods
function getWines() {
	$query = "SELECT
			  	*
			  FROM
			  	`wine`
			  ORDER BY
			  	`name`";

	try {

		$db = getConnection();

		$statement  = $db->query($query);

		$wines = $statement->fetchAll(PDO::FETCH_OBJ);

		$db = null;

		echo json_encode($wines);

	} catch (PDOException $e) {
		echo '{"error":{"text":' . $e->getMessage() . '}}';
	}
}

function getWine($id) {

    $query = "SELECT
    		 	*
    		  FROM
    		  	`wine`
    		  WHERE
    		  	`id`=:id";

    try {

        $db = getConnection();

        $statement = $db->prepare($query);

        $statement->bindParam("id", $id);

        $statement->execute();

        $wine = $statement->fetchObject();

        $db = null;

        echo json_encode($wine);

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
 
function addWine() {

    $request = Slim::getInstance()->request();

    $wine = json_decode($request->getBody());

    $query = "INSERT INTO
    		 	`wine`
    		 	(`name`, `grapes`, `country`, `region`, `year`, `description`)
		 	  VALUES
		 	  	(:name, :grapes, :country, :region, :year, :description)";
    try {
        $db = getConnection();

        $statement = $db->prepare($query);

        $statement->bindParam("name", $wine->name);
        $statement->bindParam("grapes", $wine->grapes);
        $statement->bindParam("country", $wine->country);
        $statement->bindParam("region", $wine->region);
        $statement->bindParam("year", $wine->year);
        $statement->bindParam("description", $wine->description);

        $statement->execute();

        $wine->id = $db->lastInsertId();

        $db = null;

        echo json_encode($wine);

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
 
function updateWine($id) {

    $request = Slim::getInstance()->request();

    $body = $request->getBody();
    $wine = json_decode($body);

    $query = "UPDATE
    		 	`wine`
		 	  SET
		 	  	`name` = :name,
		 	  	`grapes` = :grapes,
		 	  	`country` = :country,
		 	  	`region` = :region,
		 	  	`year` = :year,
		 	  	`description` = :description
	 	  	  WHERE
	 	  	  	`id`=:id";
    try {
        $db = getConnection();

        $statement = $db->prepare($query);

        $statement->bindParam("name", $wine->name);
        $statement->bindParam("grapes", $wine->grapes);
        $statement->bindParam("country", $wine->country);
        $statement->bindParam("region", $wine->region);
        $statement->bindParam("year", $wine->year);
        $statement->bindParam("description", $wine->description);
        $statement->bindParam("id", $id);

        $statement->execute();

        $db = null;

        echo json_encode($wine);

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
 
function deleteWine($id) {
    $query = "DELETE FROM
    		 	`wine`
    		  WHERE
    		  	`id`=:id";

    try {

        $db = getConnection();

        $statement = $db->prepare($query);

        $statement->bindParam("id", $id);

        $statement->execute();

        $db = null;

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
 
function findByName($string) {
    $query = "SELECT
    		 	*
    		  FROM
    		  	`wine`
    		  WHERE
    		  	UPPER(`name`) LIKE :string
    		  ORDER BY `name`";

    try {

        $db = getConnection();

        $statement = $db->prepare($query);

        $string = "%".$string."%";

        $statement->bindParam("string", $string);

        $statement->execute();

        $wines = $statement->fetchAll(PDO::FETCH_OBJ);

        $db = null;

        echo '{"wine": ' . json_encode($wines) . '}';

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
 
function getConnection() {
    $dbhost="127.0.0.1";
    $dbuser="root";
    $dbpass="";
    $dbname="cellar";

    $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);

    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    return $dbh;
}