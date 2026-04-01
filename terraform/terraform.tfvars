region             = "us-east-1"    
vpc                = "10.0.0.0/16"

# Subredes
cidrSubredPublica  = "10.0.1.0/24"    
cidrSubredPublica2 = "10.0.3.0/24"     
cidrSubredPrivada  = "10.0.2.0/24"    

# IDs de IPs Elásticas (Sustituye por tus IDs reales de la consola de AWS)
# Puedes encontrarlos en EC2 -> Network & Security -> Elastic IPs
id_eip             = "eipalloc-0123456789abcdef0" 
id_eip_NAT         = "eipalloc-0987654321fedcba0"

# Nombre del bucket S3
s3                 = "cubo-s3-begona"