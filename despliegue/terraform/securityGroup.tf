# Grupo de Seguridad para los Nodos de Kubernetes y el Balanceador
resource "aws_security_group" "seguridad_web" {
  name        = "sg_acceso_web"
  description = "Permitir trafico HTTP, HTTPS y SSH para el cluster"
  vpc_id      = aws_vpc.Desarrollo-web-VPC.id

  # Acceso Web Estándar
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Salida total a internet
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "SG-Web-TFG"
  }
}