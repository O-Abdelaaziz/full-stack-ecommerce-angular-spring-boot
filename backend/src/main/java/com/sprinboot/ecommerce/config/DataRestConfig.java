package com.sprinboot.ecommerce.config;

import com.sprinboot.ecommerce.entity.Country;
import com.sprinboot.ecommerce.entity.Product;
import com.sprinboot.ecommerce.entity.ProductCategory;
import com.sprinboot.ecommerce.entity.State;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * @Created 03/10/2021 - 13:58
 * @Package com.sprinboot.ecommerce.config
 * @Project sprin-boot-ecommerce
 * @User LegendDZ
 * @Author Abdelaaziz Ouakala
 **/
@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;

    @Value("${allowed.origins}")
    private String allowedOrigins;
    @Autowired
    public DataRestConfig(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] unSupportedActions = {HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE,HttpMethod.PATCH};

        disableHttpMethods(Product.class,config, unSupportedActions);
        disableHttpMethods(ProductCategory.class,config, unSupportedActions);
        disableHttpMethods(Country.class,config, unSupportedActions);
        disableHttpMethods(State.class,config, unSupportedActions);
        
        exposeIds(config);

        cors.addMapping(config.getBasePath() + "/**").allowedOrigins(allowedOrigins);
    }

    private void disableHttpMethods(Class targetClass, RepositoryRestConfiguration config, HttpMethod[] unSupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(targetClass)
                .withItemExposure(((metadata, httpMethods) -> httpMethods.disable(unSupportedActions)))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(unSupportedActions)));
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        Set<EntityType<?>> entities=entityManager.getMetamodel().getEntities();
        List<Class> entityClass = new ArrayList<>();
        for(EntityType tempEntityType:entities){
            entityClass.add(tempEntityType.getJavaType());
        }
        Class[] domainTypes = entityClass.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }
}
