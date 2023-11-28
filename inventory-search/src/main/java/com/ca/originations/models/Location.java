package com.ca.originations.models;

import lombok.*;

@Data
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Location {
    private double lat;
    private double lon;
}
