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

		bootstrapRuntimeProperties();
		
		SpringApplication.run(MailschedulerApplication.class, args);
	}

	private static void bootstrapRuntimeProperties() {
		applyPropertyIfMissing("POSTGRES_CONNECTION", Config.getSqlUrl());
		applyPropertyIfMissing("DB_USER", Config.getSqlUser());
		applyPropertyIfMissing("DB_PASSWORD", Config.getSqlPassword());
		applyPropertyIfMissing("JWT_SECRET", Config.getJwtSecret());

		if (isBlank(System.getProperty("JWT_SECRET")) && isBlank(System.getenv("JWT_SECRET"))) {
			System.setProperty("JWT_SECRET", "dev-jwt-secret");
		}
	}

	private static void applyPropertyIfMissing(String key, String fallbackValue) {
		if (isBlank(System.getProperty(key)) && isBlank(System.getenv(key)) && !isBlank(fallbackValue)) {
			System.setProperty(key, fallbackValue);
		}
	}

	private static boolean isBlank(String value) {
		return value == null || value.isBlank();
	}

}
