package com.sprinboot.ecommerce.repository;

import com.sprinboot.ecommerce.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @Created 17/10/2021 - 13:12
 * @Package com.sprinboot.ecommerce.repository
 * @Project sprin-boot-ecommerce
 * @User LegendDZ
 * @Author Abdelaaziz Ouakala
 **/
@Repository
public interface CustomerRepository extends JpaRepository<Customer ,Long> {
    Customer findByEmail(String email);
}
