package com.sprinboot.ecommerce.repository;

import com.sprinboot.ecommerce.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

/**
 * @Created 11/10/2021 - 13:41
 * @Package com.sprinboot.ecommerce.repository
 * @Project sprin-boot-ecommerce
 * @User LegendDZ
 * @Author Abdelaaziz Ouakala
 **/
@RepositoryRestResource()
public interface StateRepository extends JpaRepository<State,Long> {
    List<State> findByCountryCode(@Param("code") String code);
}
