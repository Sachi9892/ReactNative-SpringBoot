package com.full.controller;


import com.full.entity.Students;
import com.full.repository.StudentsRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
public class DeleteStudentController {

    private final StudentsRepository studentsRepository;

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteRecord(@RequestParam int rollNo) {

        Students toDelete = studentsRepository.findByRollNo(rollNo);

        System.out.println("Record came for deletion :" + toDelete);

        studentsRepository.delete(toDelete);

        return ResponseEntity.status(HttpStatus.OK).body("Record deleted successfully !");

    }
}
