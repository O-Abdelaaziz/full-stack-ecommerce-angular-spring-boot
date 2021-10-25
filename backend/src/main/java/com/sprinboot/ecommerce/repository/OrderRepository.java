package com.sprinboot.ecommerce.repository;

import com.sprinboot.ecommerce.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;


/**
 * @Created 25/10/2021 - 14:44
 * @Package com.sprinboot.ecommerce.repository
 * @Project sprin-boot-ecommerce
 * @User LegendDZ
 * @Author Abdelaaziz Ouakala
 **/
@RepositoryRestResource
public interface OrderRepository extends JpaRepository<Order,Long> {
    Page<Order> findByCustomerEmailOrderByCreatedDateDesc(@Param("email") String email, Pageable pageable);
}
