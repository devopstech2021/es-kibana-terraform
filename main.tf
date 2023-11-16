
module "instance" {
  source                    = "./modules/ec2"
  for_each                  = tomap(local.ec2_inputs)
  ami                       = var.ami_id
  instance_type             = var.instance_type
  subnet_id                 = each.value.subnet_id
  key_name                  = var.key_name
  ebs_volume_size           = each.value.ebs_volume_size  
  security_group_id         = var.security_group_id
  #iam_instance_profile      = data.aws_iam_instance_profile.ecs_profile.name
  public_ip                 = var.associate_public_ip
  eip_allocation_id         = each.value.eip_allocation_id
  elastic_ip                = each.value.elastic_ip
  tags                      = each.value.tag  
  user_data                 = each.value.user_data
  output_file_path          = each.value.output_file_path
}


