package com.deeremail.mailscheduler;

import java.io.FileNotFoundException;
import java.io.IOException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.deeremail.utils.Config;
/** 
@ComponentScan("com.deeremail.controllers")
@ComponentScan("com.deeremail.DTOs")
@ComponentScan("com.deeremail.utils")
@ComponentScan("com.deeremail.infra")
@ComponentScan("com.deeremail.services")
@ComponentScan("com.deeremail.repositories")
@ComponentScan("com.deeremail.DTOs.user")*/

@SpringBootApplication
@ComponentScan(basePackages = "com.deeremail")
@EntityScan(basePackages = "com.deeremail.DTOs.user")
@EnableJpaRepositories(basePackages = "com.deeremail.repositories")
public class MailschedulerApplication {
	public static void main(String[] args) {

		try {
			Config.getConfig();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		SpringApplication.run(MailschedulerApplication.class, args);
	}

}
