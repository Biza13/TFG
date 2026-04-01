variable "region" {
  description = "Región de AWS donde se desplegará la infraestructura"
  type        = string
}

variable "vpc" {
  description = "CIDR block para la VPC"
  type        = string
}

variable "cidrSubredPublica" {
  description = "CIDR para la primera subred pública (AZ-a)"
  type        = string
}

variable "cidrSubredPublica2" {
  description = "CIDR para la segunda subred pública (AZ-b) - para EKS"
  type        = string
}

variable "cidrSubredPrivada" {
  description = "CIDR para la subred privada"
  type        = string
}

variable "id_eip" {
  description = "ID de la IP Elástica para la instancia EC2"
  type        = string
}

variable "id_eip_NAT" {
  description = "ID de la IP Elástica para el NAT Gateway"
  type        = string
}

variable "s3" {
  description = "Nombre para el bucket S3 del estado de Terraform"
  type        = string
}