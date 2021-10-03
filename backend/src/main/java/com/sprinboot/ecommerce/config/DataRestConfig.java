package com.sprinboot.ecommerce.config;

import com.sprinboot.ecommerce.entity.Product;
import com.sprinboot.ecommerce.entity.ProductCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

/**
 * @Created 03/10/2021 - 13:58
 * @Package com.sprinboot.ecommerce.config
 * @Project sprin-boot-ecommerce
 * @User LegendDZ
 * @Author Abdelaaziz Ouakala
 **/
@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] unSupportedActions = {HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE};
        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(unSupportedActions)))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(unSupportedActions)));

        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(unSupportedActions)))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(unSupportedActions)));
    }
}
