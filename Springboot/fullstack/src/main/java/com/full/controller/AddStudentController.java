package com.full.controller;

import com.full.entity.Students;
import com.full.repository.StudentsRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@AllArgsConstructor
public class AddStudentController {

    private final StudentsRepository studentsRepository;

    @PostMapping("/add")
    public ResponseEntity<String> addStudent(@RequestBody Students student) {
        studentsRepository.save(student);
        System.out.println("Received student: " + student);
        return ResponseEntity.ok("Student added successfully!");
    }
}
