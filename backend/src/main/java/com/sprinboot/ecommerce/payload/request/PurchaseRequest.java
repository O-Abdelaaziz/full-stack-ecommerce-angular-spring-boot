package com.sprinboot.ecommerce.payload.request;

import com.sprinboot.ecommerce.entity.Address;
import com.sprinboot.ecommerce.entity.Customer;
import com.sprinboot.ecommerce.entity.Order;
import com.sprinboot.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

/**
 * @Created 17/10/2021 - 12:51
 * @Package com.sprinboot.ecommerce.payload.request
 * @Project sprin-boot-ecommerce
 * @User LegendDZ
 * @Author Abdelaaziz Ouakala
 **/
@Data
public class PurchaseRequest {
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
