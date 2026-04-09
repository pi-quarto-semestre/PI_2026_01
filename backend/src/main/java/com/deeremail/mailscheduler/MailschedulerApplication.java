package com.deeremail.mailscheduler;

import java.io.FileNotFoundException;
import java.io.IOException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;

import com.deeremail.utils.Config;

@PropertySource("file:settings.ini")

@ComponentScan("com.deeremail.controllers")
@ComponentScan("com.deeremail.DTOs")
@ComponentScan("com.deeremail.utils")

@SpringBootApplication
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
