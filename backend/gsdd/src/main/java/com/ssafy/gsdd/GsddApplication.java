package com.ssafy.gsdd;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class GsddApplication {

	public static void main(String[] args) {
		SpringApplication.run(GsddApplication.class, args);
	}

}
