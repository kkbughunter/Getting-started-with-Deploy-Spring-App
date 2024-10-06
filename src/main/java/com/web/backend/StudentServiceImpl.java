package com.web.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepo studentRepo;

    @Override
    public Student addStudent(Student student) {
        return studentRepo.save(student);
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }

    @Override
    public Student updateStudent(int id, Student student) {
        Optional<Student> existingStudent = studentRepo.findById(id);
        if (existingStudent.isPresent()) {
            Student updatedStudent = existingStudent.get();
            updatedStudent.setName(student.getName());
            updatedStudent.setDept(student.getDept());
            return studentRepo.save(updatedStudent);
        } else {
            throw new RuntimeException("Student not found with id: " + id);
        }
    }

    @Override
    public String deleteStudent(int id) {
        Optional<Student> existingStudent = studentRepo.findById(id);
        if (existingStudent.isPresent()) {
            studentRepo.deleteById(id);
            return "Student deleted with id: " + id;
        } else {
            throw new RuntimeException("Student not found with id: " + id);
        }
    }
}