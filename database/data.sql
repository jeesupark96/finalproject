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
('Food', '1', 'this is really good food', 'https://tinyurl.com/54tb7dys', 'Long Beach'),
('Food', '2', 'this is really good food', 'https://tinyurl.com/54tb7dys', 'San Diego'),
('Food', '2', 'this is really good food', 'https://tinyurl.com/54tb7dys', 'San Diego'),
('Food', '2', 'this is really good food', 'https://tinyurl.com/54tb7dys', 'San Diego'),
('Food', '2', 'this is really good food', 'https://tinyurl.com/54tb7dys', 'San Diego')
returning *;
