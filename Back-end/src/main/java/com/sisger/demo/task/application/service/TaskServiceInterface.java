package com.sisger.demo.task.application.service;

import com.sisger.demo.task.domain.Task;
import com.sisger.demo.task.domain.dto.*;
import com.sisger.demo.user.domain.User;


import java.util.List;
import java.util.Optional;

public interface TaskServiceInterface {

    Optional<Task> findById(String id);

    ResponseTaskDTO findByTaskIdResponse(String taskId, User manager);

    List<ResponseTaskDTO> findAllTasksBySection(String sectionId, User manager);

    List<ResponseTaskDTO> findAllTasksByUser(String userId, User manager);

    ResponseTaskDTO save(RequestTaskDTO requestTaskDTOTask, User employee);

    void delete(String id, User manager, String password);

    void deleteAllFromSection(String sectionId, User manager);

    void deleteAllFromUser(User user, User manager);

    void changeStatus(RequestChangeStatusTaskDTO requestChangeStatusTaskDTO, User user);

    void setEmployeeMessage(RequestEmployeeMessageDTO requestEmployeeMessageDTO, User user);
}
