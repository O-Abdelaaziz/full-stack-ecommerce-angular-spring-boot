package com.sprinboot.ecommerce.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * @Created 13/10/2021 - 12:55
 * @Package com.sprinboot.ecommerce.entity
 * @Project sprin-boot-ecommerce
 * @User LegendDZ
 * @Author Abdelaaziz Ouakala
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "customer")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Order> orders;

    public void add(Order order) {
        if (order == null) {
            orders = new HashSet<>();
        }
        orders.add(order);
        order.setCustomer(this);
    }
}
