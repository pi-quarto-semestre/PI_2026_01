package com.deeremail.mailscheduler;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;

@PropertySource("file:settings.ini")
@ComponentScan("com.deeremail")
@SpringBootApplication
public class MailschedulerApplication {

	public static void main(String[] args) {
		SpringApplication.run(MailschedulerApplication.class, args);
	}

}
