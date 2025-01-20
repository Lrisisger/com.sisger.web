package com.sisger.demo.task.domain.dto;



import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RequestTaskDTO {
    @NotEmpty(message = "title cannot be empty")
    private String title;
    @NotEmpty(message = "description cannot be empty")
    private String description;
    private LocalDate initialDate;
    private LocalDate finalDate;
    @NotEmpty(message = "userId cannot be empty")
    private String userId;
    @NotEmpty(message = "sectionId cannot be empty")
    private String sectionId;
}
