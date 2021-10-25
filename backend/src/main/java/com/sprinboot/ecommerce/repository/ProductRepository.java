package com.sprinboot.ecommerce.repository;

import com.sprinboot.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * @Created 03/10/2021 - 13:47
 * @Package com.sprinboot.ecommerce.repository
 * @Project sprin-boot-ecommerce
 * @User LegendDZ
 * @Author Abdelaaziz Ouakala
 **/
//@RepositoryRestResource(collectionResourceRel = "products",path = "products")
public interface ProductRepository extends JpaRepository<Product,Long> {
    Page<Product> findByCategoryId(@RequestParam("id")Long id, Pageable  pageable);
    Page<Product> findByNameContainingIgnoreCase(@RequestParam("name") String name,Pageable pageable);
}
