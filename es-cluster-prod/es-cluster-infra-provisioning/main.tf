
module "instance" {
  source                    = "./modules/ec2" 
  for_each                  = tomap(local.cluster_inputs) 
  ami                       = var.ami_id
  instance_type             = var.instance_type
  ebs_volume_size           = each.value.ebs_volume_size
  subnet_id                 = each.value.subnet_id
  private_ip                = each.value.private_ip
  key_name                  = var.key_name
  security_group_id         = var.security_group_id
  tags                      = each.value.tag  
  user_data                 = each.value.user_data
  script_file               = each.value.script_file  
  ssl_key_name              = var.ssl_key_name
  ssl_cert_name             = var.ssl_cert_name
}
