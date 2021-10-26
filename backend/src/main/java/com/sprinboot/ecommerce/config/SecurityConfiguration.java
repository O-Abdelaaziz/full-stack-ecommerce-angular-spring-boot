package com.sprinboot.ecommerce.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * @Created 26/10/2021 - 08:37
 * @Package com.sprinboot.ecommerce.config
 * @Project sprin-boot-ecommerce
 * @User LegendDZ
 * @Author Abdelaaziz Ouakala
 **/
@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
       http.authorizeRequests()
               .antMatchers("/api/orders/**")
               .authenticated()
               .and()
               .oauth2ResourceServer()
               .jwt();
       http.cors();
       http.csrf().disable();
        Okta.configureResourceServer401ResponseBody(http);
    }
}
