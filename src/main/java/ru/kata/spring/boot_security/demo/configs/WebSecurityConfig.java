package ru.kata.spring.boot_security.demo.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import ru.kata.spring.boot_security.demo.service.UserService;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    private final UserService userService;
    private final SuccessUserHandler successUserHandler;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public WebSecurityConfig(UserService userService, SuccessUserHandler successUserHandler, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userService = userService;
        this.successUserHandler = successUserHandler;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
//                .antMatchers("/admin/**").hasRole("ADMIN")
//                .antMatchers("/user").hasAnyRole("USER", "ADMIN")
//                .antMatchers(HttpMethod.PATCH, "/admin/**").hasRole("ADMIN")
//                .antMatchers(HttpMethod.POST, "/admin/**").hasRole("ADMIN")
//                .antMatchers(HttpMethod.PUT, "/admin/**").hasRole("ADMIN")
//                .antMatchers(HttpMethod.DELETE, "/admin/**").hasRole("ADMIN")
//                .antMatchers(HttpMethod.GET, "/admin/**").hasRole("USER")
//                .antMatchers("/", "/index").permitAll()
                .antMatchers("/api/admin/**").permitAll() // Тесты ПОСТМАН
                .anyRequest().authenticated()
                .and()
                .formLogin().successHandler(successUserHandler)
                .permitAll()
                .and().csrf().disable() // Тесты POSTMAN
                .logout()
                .permitAll();
    }


    @Autowired
    protected void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(bCryptPasswordEncoder);
    }

}