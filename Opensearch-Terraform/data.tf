data "aws_vpc" "selected" {
  tags = {
    Name = var.vpc_name
  }
}

data "aws_subnets" "private" {
  filter {
    name   = "tag:Name"
    values = ["*Private*"]
  }
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.selected.id]
  }
}

data "aws_security_group" "sg" {
  name = var.security_group_name
}
