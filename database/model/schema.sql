CREATE TABLE part_of_speech (
    part_of_speech varchar(255) NOT NULL,
    abbreviation varchar(4),
    PRIMARY KEY (part_of_speech)
);

CREATE TABLE vocabulary (
    id int AUTO_INCREMENT,
    word varchar(255),
    part_of_speech varchar(255),
    phonetic varchar(255),
    definition varchar(255),
    PRIMARY KEY (id),
    FOREIGN KEY (part_of_speech) REFERENCES part_of_speech(part_of_speech)
);

CREATE TABLE citation (
    id int AUTO_INCREMENT,
    quote varchar(255),
    author varchar(255),
    body_of_work varchar(255),
    context varchar(255),
    PRIMARY KEY (id)
);

CREATE TABLE entry (
    id int AUTO_INCREMENT,
    vocabulary_id int,
    citation_id int,
    PRIMARY KEY (id),
    FOREIGN KEY (vocabulary_id) REFERENCES vocabulary(id),
    FOREIGN KEY (citation_id) REFERENCES citation(id)
);
