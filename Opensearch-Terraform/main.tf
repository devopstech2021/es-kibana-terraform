
module "opensearch" {
  source                          = "./modules/opensearch"
  domain_name                     = var.domain_name   
  engine_version                  = var.engine_version
  dedicated_master_count          = var.dedicated_master_count
  dedicated_master_type           = var.dedicated_master_type
  dedicated_master_enabled        = var.dedicated_master_enabled
  instance_type                   = var.instance_type
  instance_count                  = var.instance_count
  zone_awareness_enabled          = var.zone_awareness_enabled
  subnet_ids                      = data.aws_subnets.private.ids
  security_options_enabled        = var.security_options_enabled
  master_user                     = var.master_user
  custom_endpoint_enabled         = var.custom_endpoint_enabled
  custom_endpoint                 = var.custom_endpoint
  custom_endpoint_certificate_arn = var.custom_endpoint_certificate_arn
  ebs_enabled                     = var.ebs_enabled
  ebs_volume_size                 = var.ebs_volume_size
  volume_type                     = var.volume_type
  throughput                      = var.throughput
  opensearch_securitygroup_id     = data.aws_security_group.sg.id
}
