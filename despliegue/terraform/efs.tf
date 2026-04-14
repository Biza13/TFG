# 1. Crear el sistema de archivos EFS
resource "aws_efs_file_system" "symfony_efs" {
  creation_token = "symfony-storage"
  encrypted      = true

  tags = {
    Name = "EFS-Symfony-TFG"
  }
}

# 2. Permitir que Kubernetes se conecte al EFS (Security Group)
resource "aws_security_group" "efs_sg" {
  name        = "efs-access"
  description = "Permitir trafico NFS desde la VPC"
  vpc_id      = aws_vpc.Desarrollo-web-VPC.id

  ingress {
    from_port   = 2049
    to_port     = 2049
    protocol    = "tcp"
    cidr_blocks = [var.vpc] # Permite que cualquier cosa en la VPC acceda
  }
}

# 3. Puntos de montaje (Uno por cada subred donde haya nodos)
resource "aws_efs_mount_target" "mount_public_1" {
  file_system_id  = aws_efs_file_system.symfony_efs.id
  subnet_id       = aws_subnet.subred-publica-1.id
  security_groups = [aws_security_group.efs_sg.id]
}

resource "aws_efs_mount_target" "mount_privada" {
  file_system_id  = aws_efs_file_system.symfony_efs.id
  subnet_id       = aws_subnet.subred-privada.id
  security_groups = [aws_security_group.efs_sg.id]
}