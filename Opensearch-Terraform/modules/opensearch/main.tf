resource "aws_opensearch_domain" "opensearch" {
  domain_name    = var.domain_name
  engine_version = "OpenSearch_${var.engine_version}"

  cluster_config {
    dedicated_master_count   = var.dedicated_master_count
    dedicated_master_type    = var.dedicated_master_type
    dedicated_master_enabled = var.dedicated_master_enabled
    instance_type            = var.instance_type
    instance_count           = var.instance_count
    zone_awareness_enabled   = var.zone_awareness_enabled
    zone_awareness_config {
      availability_zone_count = var.zone_awareness_enabled ? length(var.subnet_ids) : null
    }
  }

  advanced_security_options {
    enabled                        = var.security_options_enabled
    anonymous_auth_enabled         = false
    internal_user_database_enabled = true
    master_user_options {
      master_user_name     = var.master_user
      master_user_password = random_password.password.result
    }
  }

  encrypt_at_rest {
    enabled = true
  }

  domain_endpoint_options {
    enforce_https       = true
    tls_security_policy = "Policy-Min-TLS-1-2-2019-07"

    custom_endpoint_enabled         = var.custom_endpoint_enabled
    custom_endpoint                 = var.custom_endpoint
    custom_endpoint_certificate_arn = var.custom_endpoint_certificate_arn
  }

  ebs_options {
    ebs_enabled = var.ebs_enabled
    volume_size = var.ebs_volume_size
    volume_type = var.volume_type
    throughput  = var.throughput
  }

  log_publishing_options {
    cloudwatch_log_group_arn = aws_cloudwatch_log_group.logs.arn
    log_type                 = "INDEX_SLOW_LOGS"
  }
  log_publishing_options {
    cloudwatch_log_group_arn = aws_cloudwatch_log_group.logs.arn
    log_type                 = "SEARCH_SLOW_LOGS"
  }
  log_publishing_options {
    cloudwatch_log_group_arn = aws_cloudwatch_log_group.logs.arn
    log_type                 = "ES_APPLICATION_LOGS"
  }
  
  node_to_node_encryption {
    enabled = true
  }

  software_update_options{
    auto_software_update_enabled = false
  }

  off_peak_window_options {
    enabled = true
    off_peak_window {
    window_start_time {
        hours = 18
        minutes = 00
      }
    }
  }

  vpc_options {
    subnet_ids = var.subnet_ids

    security_group_ids = [var.opensearch_securitygroup_id]
  }


  access_policies = <<CONFIG
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": "es:*",
            "Principal": "*",
            "Effect": "Allow",
            "Resource": "arn:aws:es:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:domain/${var.domain_name}/*"
        }
    ]
}
CONFIG

tags = {
    Name = "${var.domain_name}"
  }

}


resource "aws_cloudwatch_log_group" "logs" {
  name = "${var.domain_name}_logs"
  retention_in_days = 7
}


resource "aws_cloudwatch_log_resource_policy" "opensearch_log_resource_policy" {
  policy_name = "${var.domain_name}-log-resource-policy"

  policy_document = <<CONFIG
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "es.amazonaws.com"
      },
      "Action": [
        "logs:PutLogEvents",
        "logs:PutLogEventsBatch",
        "logs:CreateLogStream"
      ],
      "Resource": [
        "${aws_cloudwatch_log_group.logs.arn}:*"        
      ],
      "Condition": {
          "StringEquals": {
              "aws:SourceAccount": "${data.aws_caller_identity.current.account_id}"
          },
          "ArnLike": {
              "aws:SourceArn": "arn:aws:es:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:domain/${var.domain_name}"
          }
      }
    }
  ]
}
CONFIG
}

resource "random_password" "password" {
  length  = 12
  special = true
}

resource "aws_ssm_parameter" "opensearch_master_user" {
  name        = "/service/${var.domain_name}/MASTER_USER"
  description = "opensearch_password for ${var.domain_name} domain"
  type        = "SecureString"
  value       = "${var.master_user},${random_password.password.result}"
}