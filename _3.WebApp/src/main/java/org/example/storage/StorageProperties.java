package org.example.storage;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("store")
@Data
public class StorageProperties {
    private String location="uploading";
}
