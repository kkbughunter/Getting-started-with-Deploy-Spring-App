package com.web.backend;

import java.util.List;

public interface StudentService {
    Student addStudent(Student student);
    List<Student> getAllStudents();
    Student updateStudent(int id, Student student);
    String deleteStudent(int id);
}