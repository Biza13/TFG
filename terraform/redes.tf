#Poner el proveedor de terraform, en este caso aws
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Configurar la region de aws.
provider "aws" {
  region = var.region
}

# Crear una VPC.
resource "aws_vpc" "Desarrollo-web-VPC" {
  cidr_block = var.vpc
  tags = {
    "Name" = "VPC"
  }
} 

# Creacion de la internet gateway
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.Desarrollo-web-VPC.id
  tags = {
    Name = "internet_gateway"
  }
}

# SUBREDES PÚBLICAS (Necesitamos 2 para EKS)
resource "aws_subnet" "subred-publica-1" {
  vpc_id                  = aws_vpc.Desarrollo-web-VPC.id
  cidr_block              = var.cidrSubredPublica
  availability_zone       = "${var.region}a" # Ej: us-east-1a
  map_public_ip_on_launch = true
  tags = {
    Name                        = "subred-publica-1"
    "kubernetes.io/role/elb"    = "1" # Indispensable para el Ingress
  }
}

resource "aws_subnet" "subred-publica-2" {
  vpc_id                  = aws_vpc.Desarrollo-web-VPC.id
  cidr_block              = "10.0.3.0/24" # Usa una variable nueva aquí
  availability_zone       = "${var.region}b" # Ej: us-east-1b
  map_public_ip_on_launch = true
  tags = {
    Name                        = "subred-publica-2"
    "kubernetes.io/role/elb"    = "1"
  }
}

# SUBRED PRIVADA
resource "aws_subnet" "subred-privada" {
  vpc_id            = aws_vpc.Desarrollo-web-VPC.id
  cidr_block        = var.cidrSubredPrivada
  availability_zone = "${var.region}a"
  tags = {
    Name                               = "subred-privada"
    "kubernetes.io/role/internal-elb"  = "1"
  }
}

# la NAT gateway
resource "aws_nat_gateway" "nat-gateway" {
  allocation_id = var.id_eip_NAT
  subnet_id     = aws_subnet.subred-publica-1.id 
  tags = { Name = "NAT gateway" }
  depends_on    = [aws_internet_gateway.igw]
}

#creacion de la tabla de enrutamiento
resource "aws_route_table" "public-rt" {
  vpc_id = aws_vpc.Desarrollo-web-VPC.id

  route {   //definir la ruta
    cidr_block = "0.0.0.0/0"   //permitir el trafico desde cualquier direccion ip hacia fuera de la vpc
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "Tabla Enrutamiento para Internet gateway"
  }
}

#asociar la tabla de enrutamiento a la subred publica 1
resource "aws_route_table_association" "rt-asociacion-publica-1" {
  subnet_id      = aws_subnet.subred-publica-1.id
  route_table_id = aws_route_table.public-rt.id
}

# Asociar la tabla a la subred publica 2 para eks
resource "aws_route_table_association" "rt-asociacion-publica-2" {
  subnet_id      = aws_subnet.subred-publica-2.id
  route_table_id = aws_route_table.public-rt.id
}

#asociar la ip elastica que tengo en aws con la instancia del servidor web
resource "aws_eip_association" "eip_assoc_fedora" {
  allocation_id = var.id_eip
  instance_id   = aws_instance.instancia_fedora.id
}

#creamos la tabla de rutas para la nat gateway
resource "aws_route_table" "nat-gateway-rt" {
    //depends_on = [ aws_nat_gateway.nat-gateway ]
  vpc_id = aws_vpc.Desarrollo-web-VPC.id

  route {
    cidr_block = "0.0.0.0/0"    //permitir el trafico desde cualquier direccion hacia afuera de la vpc
    nat_gateway_id = aws_nat_gateway.nat-gateway.id
  }

  tags = {
    Name = "Tabla Enrutamiento para el NAT gateway"
  }
}

#asociar la tabla de enrutamiento con el nat gateway
resource "aws_route_table_association" "rt-asociacion-NAT" {
    //depends_on = [ aws_route_table.nat-gateway-rt ]
  subnet_id = aws_subnet.subred-privada.id
  route_table_id = aws_route_table.nat-gateway-rt.id
}