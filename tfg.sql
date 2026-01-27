create table users (
	id int auto_increment primary key,
    name varchar(100) not null,
    birth_date date,
    email varchar(100) not null unique,
    password varchar(255) not null,
    address varchar(100),
    city varchar(50),
    picture_route varchar(255),
    role enum('ROLE_ADMIN', 'ROLE_USER') default 'ROLE_USER',
    created_at datetime default current_timestamp
);

create table dogs (
	id int auto_increment primary key,
    user_id int not null,
    name varchar(100) not null,
    birth_date date,
    breed varchar(50),
    picture_route varchar(255),
    constraint fk_dogs_users foreign key (USER_ID) references users(ID) on delete cascade
);

create table services (
	id int auto_increment primary key,
    name varchar(100),
    description text,
    features text,
    features2 text,
    icon_route varchar(255)
);

create table gallery (
	id int auto_increment primary key,
    imgvideo_route varchar(255) not null,
    type enum('image', 'video') default 'image' not null,
    text varchar(255),
    dog_id int,
    constraint fk_gallery_dog foreign key (dog_id) references dogs(id) on delete set null
);


