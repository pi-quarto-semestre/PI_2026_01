package com.deeremail.mailscheduler;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan("com.deeremail.controllers")
@ComponentScan("com.deeremail.DTOs")
@ComponentScan("com.deeremail.utils")

@SpringBootApplication
public class MailschedulerApplication {

	public static void main(String[] args) {
		SpringApplication.run(MailschedulerApplication.class, args);
	}

}
