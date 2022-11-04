insert into users
("firstName", "lastName", "password")
values
('Paul', 'Dean', 'asdf'),
('John', 'Lww', 'sdfds'),
('Sam', 'Jones', 'sunbrero')
returning *;

insert into spots
("eventName" , "description" , "lat", "lng")
values
('Food', 'this is really good food', 34.048637, -118.248880),
('Food', 'this is really good food', 35.048637, -119.248880),
('Food', 'this is really good food', 36.048637, -120.248880)
returning *;
