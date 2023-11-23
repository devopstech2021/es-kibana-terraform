variable "key_name" {
    type = string
}

variable "private_ips" {
    type    = list(string)
}

variable "server_tag" {
     type = string
}

variable "eip_allocation_id" {
    type = string
}