insert into users
("firstName", "lastName", "password")
values
('Paul', 'Dean', 'asdf'),
('John', 'Lww', 'sdfds'),
('Sam', 'Jones', 'sunbrero')
returning *;

insert into spots
("eventName", "userId", "description", "photoUrl", "lat", "lng")
values
('Food', '1', 'this is really good food', 'https://bit.ly/3gjR5dO', 34.048637, -118.248880),
('Food', '2', 'this is really good food', 'https://bit.ly/3gjR5dO', 35.048637, -119.248880),
('Food', '3', 'this is really good food', 'https://bit.ly/3gjR5dO', 36.048637, -120.248880)
returning *;
