package com.ca.originations.models;

import lombok.*;

@Data
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Location {
    private double lon;
    private double lat;
}
