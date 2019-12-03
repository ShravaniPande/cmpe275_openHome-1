package com.testproject.springsecurityjpamysql.resource;

import java.io.StringReader;
import java.rmi.server.UID;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.stream.JsonReader;
import com.testproject.springsecurityjpamysql.model.Address;
import com.testproject.springsecurityjpamysql.model.Filter;
import com.testproject.springsecurityjpamysql.model.Property;
import com.testproject.springsecurityjpamysql.model.UserProfile;
import com.testproject.springsecurityjpamysql.repository.AddressRepository;
import com.testproject.springsecurityjpamysql.repository.PostingsRepository;
import com.testproject.springsecurityjpamysql.service.SearchService;
import com.testproject.springsecurityjpamysql.service.UserService;

@RequestMapping("/posting")
@CrossOrigin(origins = "*")
@RestController
public class PostingResource {
	
	@Autowired
	SearchService searchService;
	
	@Autowired
	PostingsRepository prepo;

	/*
	 * Gets all listings for the given filter
	 */	
	
	@PostMapping(value = "/search" , consumes = MediaType.APPLICATION_JSON_VALUE)
	public List<Property> getPosts(@RequestBody Object filterJSON) throws IllegalArgumentException, IllegalAccessException {
				
		Gson g = new Gson();				
		Filter filter = g.fromJson(g.toJson(filterJSON), Filter.class);		
		return searchService.getPostings(filter);

	}

	
	@GetMapping("/test")
	public List<Property> testMethod() {
		
		Property p = new Property();
		Address a = new Address();
		a.setCity("San Jose");
		p.setAddress(a);
		Example<Property> propExample = Example.of(p);
		return prepo.findAll(propExample);		
		
	}
	
		
	/*
	 * Get all properties with no filter
	 */
	@GetMapping(value="/all")
	public List<Property> getAllPostings(@RequestBody Object newPostObj) {
		
		return searchService.findAllProps();
		
	}
	
	
	/*
	 * Post a new place
	 */
	@PostMapping(value = "/place")
	public void addPosting(@RequestBody Object newPropertyJSON) {
		
		Gson g = new Gson();				
		Property p = g.fromJson(g.toJson(newPropertyJSON), Property.class);					
		searchService.addPosting(p);
	}

}