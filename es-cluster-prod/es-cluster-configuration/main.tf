module "eip_association" {
  source                    = "./modules/eip" 
  instance_id               = data.aws_instance.ec2.id
  eip_allocation_id         = var.eip_allocation_id
}


resource "null_resource" "execute_script" {
  for_each    =  tomap(local.cluster_inputs)
  depends_on = [ module.eip_association ]
  provisioner "remote-exec" {
    inline = [
      "sudo chmod +x /home/ec2-user/cluster_configruation.sh",
      "sudo bash /home/ec2-user/cluster_configruation.sh" 
    ]
  connection {
      type        = "ssh"
      user        = "ec2-user"  
      private_key = file("${var.key_name}.pem")  
      host        = each.value.private_ip  
    } 
  }
}
