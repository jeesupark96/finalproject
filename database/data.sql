insert into users
("firstName", "lastName", "password")
values
('Paul', 'Dean', 'asdf'),
('John', 'Lww', 'sdfds'),
('Sam', 'Jones', 'sunbrero')
returning *;

insert into spots
("eventName", "userId", "description", "photoFile", "lat", "lng")
values

returning *;
