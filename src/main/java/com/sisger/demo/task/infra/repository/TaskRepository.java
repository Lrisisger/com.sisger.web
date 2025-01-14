package com.sisger.demo.task.infra.repository;

import com.sisger.demo.task.domain.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, String> {

    void deleteAllBySectionId(String selectedId);
    List<Task> findAllBySectionId(String selectedId);

}
