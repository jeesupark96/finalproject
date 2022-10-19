insert into users
("firstName", "lastName", "password")
values
('Paul', 'Dean', 'asdf'),
('John', 'Lww', 'sdfds'),
('Sam', 'Jones', 'sunbrero')
returning *;

insert into spots
("eventName", "userId", "description", "photoUrl", "mapLocation")
values
('Food', '1', 'this is really good food', 'https://bit.ly/3gjR5dO', 'Long Beach'),
('Food', '2', 'this is really good food', 'https://bit.ly/3gjR5dO', 'San Diego'),
('Food', '2', 'this is really good food', 'https://bit.ly/3gjR5dO', 'San Diego'),
('Food', '2', 'this is really good food', 'https://bit.ly/3gjR5dO', 'San Diego'),
('Food', '2', 'this is really good food', 'https://bit.ly/3gjR5dO', 'San Diego')
returning *;
