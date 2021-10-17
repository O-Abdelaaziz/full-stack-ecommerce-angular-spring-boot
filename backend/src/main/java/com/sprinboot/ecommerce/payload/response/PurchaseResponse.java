package com.sprinboot.ecommerce.payload.response;

import lombok.Data;

/**
 * @Created 17/10/2021 - 12:59
 * @Package com.sprinboot.ecommerce.payload.response
 * @Project sprin-boot-ecommerce
 * @User LegendDZ
 * @Author Abdelaaziz Ouakala
 **/
@Data
public class PurchaseResponse {
    private String orderTrackingNumber;

    public PurchaseResponse(String orderTrackingNumber) {
        this.orderTrackingNumber = orderTrackingNumber;
    }
}
