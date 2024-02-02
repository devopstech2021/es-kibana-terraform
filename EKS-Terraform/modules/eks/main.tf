resource "aws_eks_cluster" "eks_cluster" {
 name = "${var.cluster_name}"
 role_arn = var.eks_cluster_role_arn
 enabled_cluster_log_types = var.cluster_log_types

 vpc_config {
  endpoint_private_access = var.endpoint_private_access
  endpoint_public_access  = var.endpoint_public_access
  subnet_ids = var.subnet_ids
  security_group_ids = [var.cluster_security_group_ids]
 }

access_config {
    authentication_mode = "API_AND_CONFIG_MAP"  # You can also use "API" or "API_AND_CONFIG_MAP"
    bootstrap_cluster_creator_admin_permissions = "true"
    }

 tags = {
    Name = "${var.tag}_cluster"
  }

}

 resource "aws_eks_node_group" "worker-node-group" {
  cluster_name  = aws_eks_cluster.eks_cluster.name
  node_group_name = "${aws_eks_cluster.eks_cluster.name}_node_group"
  node_role_arn  = var.worker_node_role_arn
  subnet_ids   = var.subnet_ids
  instance_types = [var.instance_type]
  disk_size = var.disk_size

  remote_access {
    ec2_ssh_key = var.node_ssh_key_name
    source_security_group_ids = var.source_security_group_ids
  }
 
  scaling_config {
   desired_size = var.desired_size
   max_size   = var.max_size
   min_size   = var.min_size
  }

  tags = {
    Name = "${var.tag}_node_group"
  }
}

  
