variable "ami_id" {}

variable "instance_type" {}

variable "key_name" {}

variable "security_group_id" {}

variable "subnet_id" {}

variable "region" {}

variable "private_ips" {
    type    = list(string)
}

variable "elastic_server_tag" {}

variable "kibana_server_tag" {}

variable "ebs_volume_size" {}

variable "ssl_key_name" {}

variable "ssl_cert_name" {}