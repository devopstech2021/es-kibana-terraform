variable "cluster_name" {}
    
variable "subnet_ids" {}

variable "instance_type" {}

variable "desired_size" {}

variable "max_size" {}

variable "min_size" {}

variable "eks_cluster_role_arn" {}

variable "worker_node_role_arn" {}

variable "node_ssh_key_name" {}

variable "disk_size" {}

variable "tag" {}

variable "cluster_log_types" {}

variable "endpoint_private_access"{}

variable "endpoint_public_access" {}

variable "cluster_security_group_ids" {}

variable "addon_name" {}

variable "addon_version" {}

variable "source_security_group_ids" {}