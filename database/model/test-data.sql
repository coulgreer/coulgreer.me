INSERT INTO citation
(quote, author, body_of_work, context)
VALUES
("A quote for the first citation", "You or me", "Reality", "Here and now"),
("The second citation's quote", "Him or her", "Cyberspace", "Then and there"),
("Some kind of quote used for the thrid citation", "Them and those", "Places Unknown", "Long ago");

INSERT INTO part_of_speech (full_form, abbreviation)
VALUES ("noun", "n."), ("article", "art."), ("verb", "v.");

INSERT INTO vocabulary
(word, part_of_speech, phonetic, definition)
VALUES
("quote", "noun", "", "the definition of QUOTE"),
("the", "article", "", "the definition of THE"),
("used", "verb", "", "the definition of USED");

INSERT INTO entry (vocabulary_id, citation_id)
VALUES (1, 1), (2, 2), (3, 3);
