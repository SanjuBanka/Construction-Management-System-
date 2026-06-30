package com.sanju.swpm.dto;

import com.sanju.swpm.model.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterRequest {
    private String empId;

    @NotBlank
    private String name;

    @NotBlank
    private String username;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;

    private Role role;
    private String skill;
    private String jobRole;
    private Integer experienceYears;
    private String contactNumber;
}
