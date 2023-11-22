variable "key_name" {
    type = string
}

variable "public_ips" {
    type    = list(string)
}

variable "private_ips" {
    type    = list(string)
}

