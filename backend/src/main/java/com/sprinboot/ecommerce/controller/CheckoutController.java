package com.sprinboot.ecommerce.controller;

import com.sprinboot.ecommerce.payload.request.PurchaseRequest;
import com.sprinboot.ecommerce.payload.response.PurchaseResponse;
import com.sprinboot.ecommerce.service.ICheckOutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @Created 17/10/2021 - 13:40
 * @Package com.sprinboot.ecommerce.controller
 * @Project sprin-boot-ecommerce
 * @User LegendDZ
 * @Author Abdelaaziz Ouakala
 **/
@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/checkout")
public class CheckoutController {
    private ICheckOutService iCheckOutService;

    @Autowired
    public CheckoutController(ICheckOutService iCheckOutService) {
        this.iCheckOutService = iCheckOutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody PurchaseRequest purchaseRequest){

        PurchaseResponse purchaseResponse=iCheckOutService.placeOrder(purchaseRequest);

        return purchaseResponse;
    }

}
