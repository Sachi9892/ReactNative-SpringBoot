package com.full.controller;


import com.full.entity.Students;
import com.full.repository.StudentsRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
public class UpdateStudentController {

    private final StudentsRepository studentsRepository;

    @PutMapping("/update")
    public ResponseEntity<String> updateStudent(@RequestBody Students students) {

        Optional<Students> std = studentsRepository.findById(students.getDbId());

        if(std.isPresent()) {
            Students obj = std.get();

            obj.setId(students.getId());
            obj.setName(students.getName());
            obj.setCourse(students.getCourse());
            obj.setRollNo(students.getRollNo());

            studentsRepository.save(obj);

            return ResponseEntity.status(HttpStatus.OK).body("Record updated !");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Record not found !");

    }
}
