package com.ca.originations.services;

import lombok.SneakyThrows;
import org.apache.http.ssl.SSLContextBuilder;
import org.apache.http.ssl.SSLContexts;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchConfiguration;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
import org.springframework.stereotype.Component;

import javax.net.ssl.SSLContext;

@Component
@Configuration
public class Config extends ElasticsearchConfiguration {

    @SneakyThrows
    @Override
    public ClientConfiguration clientConfiguration() {
        SSLContextBuilder sslBuilder = SSLContexts.custom().loadTrustMaterial(null, (x509Certificates, s) -> true);
        final SSLContext sslContext = sslBuilder.build();
        return ClientConfiguration.builder()
                .connectedTo("localhost:9200").usingSsl(sslContext).withBasicAuth("elastic", "XnXnOyXT_LhZWsuSAQDW").build();
    }


}