#terraform {
#  backend "s3" {
#    bucket          = "terraform-s3-1.2.0"
#    key             = "tfstate/terraform.tfstate"
#   region          = "us-east-2"
#   dynamodb_table  = "terraformstate"
# }
#}

provider "aws" {
  region     = "us-east-1"
 # access_key = ""
 # secret_key = ""
}
