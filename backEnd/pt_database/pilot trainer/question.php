<?php include 'database.php'; ?>
<?php session_start(); ?>
<?php
	
	//Set question number
	$number = (int) $_GET['n'];
	
	// set subject id
	$subjectId = (int)$_GET['subject-id'];

	/*
	*	Get total questions
	*/
	$query = "SELECT * FROM `questions` WHERE subject_id = $subjectId";
	//Get result
	$results = $mysqli->query($query) or die($mysqli->error.__LINE__);
	$total = $results->num_rows;
		
	
	//	read a question
	$query = 
		"   SELECT * 
		      FROM `questions`
			 WHERE question_number = $number
			   AND subject_id = $subjectId                                                      ";

	//Get result
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
	
	$question = $result->fetch_assoc();
	
	/*
	*	Get Choices
	*/
	$query = 
		"   SELECT * 
		      FROM `choices`
		  	 WHERE question_number = $number
		  	   AND subject_id = $subjectId                                                       ";
	//Get results
	$choices = $mysqli->query($query) or die($mysqli->error.__LINE__);
?>
<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8" />
	<title>Aviation Quizzer</title>
	<link rel="stylesheet" href="css/style.css" type="text/css" />
</head>
<body>
	<header>
		<div class="container">
			<h1>Aviation Quizzer</h1>
		</div>
	</header>
	<main>
		<div class="container">
			<div class="current">Question <?php echo $question['question_number']; ?> of <?php echo $total; ?></div>
			<p class="question">
				<?php echo $question['text']; ?>
			</p>
			<form method="post" action="process.php">
				<ul class="choices">
					<?php while($row = $choices->fetch_assoc()): ?>
						<li><input name="choice" type="radio" value="<?php echo $row['id']; ?>" /><?php echo $row['text']; ?></li>
					<?php endwhile; ?>
				</ul>
				<input type="submit" value="Submit" />
				<input type="hidden" name="number" value="<?php echo $number; ?>" />
				<input type="hidden" name="subject-id" value="3">
			</form>
		</div>
	</main>
	<footer>
		<div class="container">
			Copyright &copy; 2019, PilotTrainer
		</div>
	</footer>
</body>
</html>