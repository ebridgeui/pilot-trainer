
-- SELECT * FROM `questions` WHERE 1
-- ALTER TABLE questions DROP PRIMARY KEY 
-- ALTER TABLE `questions` ADD PRIMARY KEY (subject_id, question_number)
INSERT INTO pt_subjects (subject_id, subject_name) 
VALUES 
(1, 'Air Law'),
(2, 'Radio'),
(3, 'Meteology')

SELECT * FROM pt_subjects;

UPDATE questions SET subject_id = 3 WHERE question_number IN (3,4,5);
UPDATE questions SET subject_id = 1 WHERE subject_id = 0;
UPDATE questions SET question_number = 1 WHERE subject_id = 3 and question_number = 3
UPDATE choices SET question_number = question_number - 2 WHERE question_number IN (3,4,5)