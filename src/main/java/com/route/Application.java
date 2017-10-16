package com.route;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.ResourceProperties;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.context.embedded.ErrorPage;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.resource.PathResourceResolver;



@SpringBootApplication
public class Application extends WebMvcConfigurerAdapter {
	@Autowired
	private ResourceProperties resource = new ResourceProperties();
	@Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        Integer cachePeriod=resource.getCachePeriod();
        registry.addResourceHandler("/**/page/**")
        		.addResourceLocations(resource.getStaticLocations())
                .setCachePeriod(cachePeriod).resourceChain(true)
                .addResolver(new PathResourceResolver() {
                	@Override
                    protected Resource getResource(String resourcePath,
                            Resource location) throws IOException {
                    	if(resourcePath.endsWith(".html")){
                    		return super.getResource(resourcePath, location);
                    	}else{
                    		return super.getResource("/admin/index.html", location);
                    	}
                    }
                });
        
    }
	@Bean
	public EmbeddedServletContainerCustomizer containerCustomizer(){
		 return (container->{
		        container.addErrorPages(new ErrorPage(HttpStatus.NOT_FOUND,"/admin/index.html"));
		   });
	}
	public static void main(String[] args) {  
	    SpringApplication.run(Application.class, args);  
	}  
}
