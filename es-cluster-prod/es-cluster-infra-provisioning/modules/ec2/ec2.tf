resource "aws_instance" "vm" {
  ami                           = var.ami
  instance_type                 = var.instance_type
  subnet_id                     = var.subnet_id
  key_name                      = var.key_name
  private_ip                    = var.private_ip
  vpc_security_group_ids        = [var.security_group_id]
  user_data                     = var.user_data
  tags                      = {
      Name                  = "${var.tags}"  
  }

  connection {
    type        = "ssh"
    user        = "ec2-user"    
    private_key = file("${var.key_name}.pem")
    host        = aws_instance.vm.private_ip
    timeout     = "5m"
  } 

  provisioner "file" {
    content     = "${var.script_file}"  
    destination = "/home/ec2-user/cluster_configruation.sh"  
  }

  provisioner "file" {
    source = "${var.ssl_key_name}"
    destination = "/home/ec2-user/${var.ssl_key_name}"  
  }

  provisioner "file" {
    source = "${var.ssl_cert_name}"
    destination = "/home/ec2-user/${var.ssl_cert_name}"  
  }

  provisioner "file" {
    source     = "${var.key_name}.pem"  
    destination = "/home/ec2-user/${var.key_name}.pem"  
  }    
}

resource "aws_ebs_volume" "ebs" {
  availability_zone = aws_instance.vm.availability_zone
  size              = var.ebs_volume_size
  type              = "gp3"
  iops              = "3000"
  depends_on        = [aws_instance.vm]

  tags = {
    Name = "${var.tags}-volume"
  }
}

resource "aws_volume_attachment" "ebs_att" {
  device_name = "/dev/xvdf"
  volume_id   = aws_ebs_volume.ebs.id
  instance_id = aws_instance.vm.id
}





 