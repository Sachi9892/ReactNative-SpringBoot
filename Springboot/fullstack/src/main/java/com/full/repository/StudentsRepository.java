package com.full.repository;

import com.full.entity.Students;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentsRepository extends JpaRepository<Students , Integer> {

    Students findByRollNo(int rollNo);

}
