# data "aws_iam_instance_profile" "ecs_profile" {
#   name = var.iam_role_name
# }


data "template_file" "master_node" {
  template = file("${path.module}/master_node.sh")
  vars = {
    data_node1_pvt_ip = "${var.private_ips[1]}"
    data_node2_pvt_ip = "${var.private_ips[2]}"
    kibana_node_pvt_ip = "${var.private_ips[3]}"
    private_key = "'${var.key_name}.pem'"   
  }
}

data "template_file" "data_node" {
  template = file("${path.module}/data_node.sh")
 
}

data "template_file" "kibana_node" {
  template = file("${path.module}/kibana_node.sh")
  vars = {
    data_node1_pvt_ip = "${var.private_ips[1]}"
    data_node2_pvt_ip = "${var.private_ips[2]}"
    master_node_pvt_ip = "${var.private_ips[0]}"  
  }
 }
