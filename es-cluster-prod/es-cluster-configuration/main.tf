resource "null_resource" "execute_script" {
  for_each    =  tomap(local.cluster_inputs)
  provisioner "remote-exec" {
    inline = [
      "sudo chmod +x /home/ec2-user/cluster_configruation.sh",
      "sudo bash /home/ec2-user/cluster_configruation.sh" 
    ]
  connection {
      type        = "ssh"
      user        = "ec2-user"  
      private_key = file("${var.key_name}.pem")  
      host        = each.value.public_ip  
    } 
  }
}
