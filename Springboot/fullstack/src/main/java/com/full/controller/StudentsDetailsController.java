package com.full.controller;

import com.full.entity.Students;
import com.full.repository.StudentsRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class StudentsDetailsController {

    private final StudentsRepository studentsRepository;

    @GetMapping("/students")
    public ResponseEntity<List<Students>> getAllStudents() {
        List<Students> studentsList = studentsRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(studentsList);
    }
}
