package com.sprinboot.ecommerce.repository;

import com.sprinboot.ecommerce.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 * @Created 11/10/2021 - 13:41
 * @Package com.sprinboot.ecommerce.repository
 * @Project sprin-boot-ecommerce
 * @User LegendDZ
 * @Author Abdelaaziz Ouakala
 **/
@CrossOrigin("http://localhost:4200/")
public interface StateRepository extends JpaRepository<State,Long> {
}
