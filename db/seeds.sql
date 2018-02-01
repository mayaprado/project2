\c mars_db

INSERT INTO houses (name, image, address, description, price) 
VALUES 
('Milky Way Cottage', 'images/houses/house1.jpg', 'Galaxy Pl, 6', 'This 4 bedrooms / 3 bathrooms cozy martian buble-house will instantly make you feel at home. Marble kitchen countertop and stainless steel appliences are a great bonus to this awesome house!', 'M$16135800.00'),
('Moon River Cottage', 'images/houses/house2.jpg', 'NASA St, 13', 'This 2 bedrooms / 2 bathrooms space is new to the market and wont last! Hurry up and escape busy Earth in this temple of serenity and isolation!', 'M$9990000.00'),
('Gagarin Rocks Cottage', 'images/houses/house3.jpg', 'Venus Rd, 22', 'This 3 bedrooms / 2 bathrooms home was just renovated and is a unique turn key opportunity! Dont miss out on your chance to become a Martian today!', 'M$11990000.00'),
('Black Hole Cottage', 'images/houses/house4.jpg', 'Starwars Memorial St, 10', 'This 5 bedrooms / 4 bathrooms house features fantastic Earth and Moon views, marble bathrooms and lots of storage space! Beautiful indoor garden and lots of entertainment in the neighborhood!', 'M$21500000.00'),
('Cassiopeia Cottage', 'images/houses/house5.jpg', 'Andromeda Sq, 21', 'This 1 bedroom / 1 bathroom space is great for a student, located a few blocks from Mars University. Great find that wont last!', 'M$5990000.00'),
('Ursa Major Cottage', 'images/houses/house6.jpg', 'Elon Musk Ln, 18', 'Location, location, location! This 3 bedrooms / 3 bathrooms house is situated in the heart of an amazing neighborhood full of restaurants, shops, theaters and nightclubs! Best deal on the market!', 'M$20990000.00');

INSERT INTO neighbors (nei_name, species, nei_image, lifestyle, house_id) 
VALUES
('Stinky Jo', 'blob', 'images/neighbors/neighbor1.jpg', 'barely leaves his place, stinck a lot, eats trash', 1),
('Angry Bill', 'worm', 'images/neighbors/neighbor2.jpg', 'aggresive and loud, alcoholic and drug addict, eats insects and small birds', 2),
('Tired Eleonore', 'firefly', 'images/neighbors/neighbor3.jpg', 'likes to take long walks, wrote a book about space ghousts, knows some magic, vegan', 3),
('Doubting Craig', 'brainiac', 'images/neighbors/neighbor4.jpg', 'cranky and grumpy most of the time, will call cops on you if you have a party in your backyard after 10pm, doesnt tell anyone about what he likes to eat, very secretive', 4),
('Awkward Stew', 'bug', 'images/neighbors/neighbor5.jpg', 'works at the library, likes to sniff books, eats seafood and seaweed', 5),
('Patient Phil', 'lizard', 'images/neighbors/neighbor6.jpg', 'very quiet, likes water, has his own pool in the backyard, friendly, consumes solar energy as food', 6),
('Bossy Louis', 'snail', 'images/neighbors/neighbor7.jpg', 'rich and famous, has lots of fans and paparazzi around him, prefers sweets', 1),
('Dreamy Jill', 'butterfly', 'images/neighbors/neighbor8.jpg', 'adorable adn sweet, helps everyone around, eats flowers', 2),
('Stunning Leila', 'blueberry', 'images/neighbors/neighbor9.jpg', 'strong and independant, likes to party, eats lizards', 3),
('Pretty Clair', 'lizard', 'images/neighbors/neighbor10.jpg', 'tough but kind, works as a detective, vegetarian', 4),
('Amazing Julia', 'cyborg', 'images/neighbors/neighbor11.jpg', 'strong and misterious, often away from home for weeks, consumes electricity as food', 5),
('Cool Katelin', 'lizard', 'images/neighbors/neighbor12.jpg', 'Queen in exile, hopes to get her kinfdom back one day, eats humans', 6);
