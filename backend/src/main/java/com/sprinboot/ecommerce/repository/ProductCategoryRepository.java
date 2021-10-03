package com.sprinboot.ecommerce.repository;

import com.sprinboot.ecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 * @Created 03/10/2021 - 13:48
 * @Package com.sprinboot.ecommerce.repository
 * @Project sprin-boot-ecommerce
 * @User LegendDZ
 * @Author Abdelaaziz Ouakala
 **/
@RepositoryRestResource(collectionResourceRel = "productCategory",path = "product-category")
@CrossOrigin("http://localhost:4200/")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory,Long> {
}
