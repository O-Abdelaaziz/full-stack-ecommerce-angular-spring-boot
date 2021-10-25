package com.sprinboot.ecommerce.service.impl;

import com.sprinboot.ecommerce.entity.Address;
import com.sprinboot.ecommerce.entity.Customer;
import com.sprinboot.ecommerce.entity.Order;
import com.sprinboot.ecommerce.entity.OrderItem;
import com.sprinboot.ecommerce.payload.request.PurchaseRequest;
import com.sprinboot.ecommerce.payload.response.PurchaseResponse;
import com.sprinboot.ecommerce.repository.CustomerRepository;
import com.sprinboot.ecommerce.service.ICheckOutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.Set;
import java.util.UUID;

/**
 * @Created 17/10/2021 - 13:15
 * @Package com.sprinboot.ecommerce.service.impl
 * @Project sprin-boot-ecommerce
 * @User LegendDZ
 * @Author Abdelaaziz Ouakala
 **/
@Service
@Transactional
public class CheckOutServiceImpl implements ICheckOutService {

    private CustomerRepository customerRepository;

    @Autowired
    public CheckOutServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public PurchaseResponse placeOrder(PurchaseRequest purchaseRequest) {
        // retrieve the order info from dto
        Order order= purchaseRequest.getOrder();

        // generate tracking number
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        // populate order with orderItems
        Set<OrderItem> orderItems=purchaseRequest.getOrderItems();
        orderItems.forEach(item -> order.add(item));

        // populate order with billingAddress and shippingAddress
        order.setShippingAddress(purchaseRequest.getShippingAddress());
        order.setBillingAddress(purchaseRequest.getBillingAddress());
        // populate customer with order

        Customer customer=purchaseRequest.getCustomer();
        customer.add(order);
        // save to the database
        Customer checkCustomer=customerRepository.findByEmail(customer.getEmail());

        if(checkCustomer !=null){
            customer=checkCustomer;
        }
        customerRepository.save(customer);
        // return a response
        return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {
        // generate a random UUID number (UUID version-4)
        // For details see: https://en.wikipedia.org/wiki/Universally_unique_identifier
        //
        return UUID.randomUUID().toString();
    }
}
