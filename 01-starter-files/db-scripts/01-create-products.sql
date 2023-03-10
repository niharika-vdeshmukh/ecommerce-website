-- -----------------------------------------------------
-- Database full-stack-ecommerce
-- -----------------------------------------------------

CREATE Database 'fullstackecommerce';
USE `fullstackecommerce` ;

-- -----------------------------------------------------
-- Table `product_category`
-- -----------------------------------------------------
create table product_category
(
    id            bigint generated by default as identity
        primary key,
    category_name varchar(255) default NULL::character varying
);

alter table product_category
    owner to postgres;



-- -----------------------------------------------------
-- Table `product`
-- -----------------------------------------------------
create table product
(
    id             bigint generated by default as identity
        primary key,
    sku            varchar(255)   default NULL::character varying,
    name           varchar(255)   default NULL::character varying,
    description    varchar(255)   default NULL::character varying,
    unit_price     numeric(13, 2) default NULL::numeric,
    image_url      varchar(255)   default NULL::character varying,
    active         boolean        default true,
    units_in_stock integer,
    date_created   date,
    last_updated   date,
    category_id    bigint not null
        constraint product_category_id_fk
            references product
);

alter table product
    owner to postgres;




-- -----------------------------------------------------
-- Add sample data
-- -----------------------------------------------------

INSERT INTO product_category(category_name) VALUES ('BOOKS');

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('BOOK-TECH-1000', 'JavaScript - The Fun Parts', 'Learn JavaScript',
'assets/images/products/placeholder.png'
,true,100,19.99,1, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('BOOK-TECH-1001', 'Spring Framework Tutorial', 'Learn Spring',
'assets/images/products/placeholder.png'
,true,100,29.99,1, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('BOOK-TECH-1002', 'Kubernetes - Deploying Containers', 'Learn Kubernetes',
'assets/images/products/placeholder.png'
,true,100,24.99,1, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('BOOK-TECH-1003', 'Internet of Things (IoT) - Getting Started', 'Learn IoT',
'assets/images/products/placeholder.png'
,true,100,29.99,1, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('BOOK-TECH-1004', 'The Go Programming Language: A to Z', 'Learn Go',
'assets/images/products/placeholder.png'
,true,100,24.99,1, NOW());
