
module "eks" {
  source                          = "./modules/eks"
  cluster_name                    = var.cluster_name
  subnet_ids                      = var.subnet_ids    
  endpoint_private_access         = var.endpoint_private_access
  endpoint_public_access          = var.endpoint_public_access
  instance_type                   = var.instance_type
  node_ssh_key_name               = var.node_ssh_key_name
  source_security_group_ids       = var.source_security_group_ids
  desired_size                    = var.desired_size
  max_size                        = var.max_size
  min_size                        = var.min_size
  eks_cluster_role_arn            = var.eks_cluster_role_arn
  worker_node_role_arn            = var.worker_node_role_arn
  disk_size                       = var.disk_size
  tag                             = var.tag
  cluster_log_types               = var.cluster_log_types
  cluster_security_group_ids      = var.cluster_security_group_ids
}

module "eks_addon" {
  source                          = "./modules/eks_addons"
  count                           = length(var.addon_name)
  cluster_name                    = module.eks.eks_cluster_output.name
  addon_name                      = var.addon_name[count.index]
  addon_version                   = var.addon_version[count.index]
}
