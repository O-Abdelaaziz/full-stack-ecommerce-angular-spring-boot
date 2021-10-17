package com.sprinboot.ecommerce.service;

import com.sprinboot.ecommerce.payload.request.PurchaseRequest;
import com.sprinboot.ecommerce.payload.response.PurchaseResponse;

/**
 * @Created 17/10/2021 - 13:14
 * @Package com.sprinboot.ecommerce.service
 * @Project sprin-boot-ecommerce
 * @User LegendDZ
 * @Author Abdelaaziz Ouakala
 **/
public interface ICheckOutService {
    PurchaseResponse placeOrder(PurchaseRequest purchaseRequest);
}
