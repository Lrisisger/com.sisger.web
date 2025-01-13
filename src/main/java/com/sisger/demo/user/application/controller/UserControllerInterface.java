package com.sisger.demo.user.application.controller;


import com.sisger.demo.user.domain.User;
import com.sisger.demo.user.domain.dto.ChangePasswordDTO;
import com.sisger.demo.user.domain.dto.RequestDeleteUserDTO;
import com.sisger.demo.user.domain.dto.RequestUpdateUserDTO;
import com.sisger.demo.user.domain.dto.RequestUserDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("user")
public interface UserControllerInterface {

    @PutMapping(value = "change-password")
    public void changePassword(@RequestHeader(name = "Authorization", required = true) String token,
                               @RequestBody ChangePasswordDTO changePasswordDTO);


    @GetMapping(value = "find-all")
    public ResponseEntity<List<User>> findAll(@RequestHeader(name = "Authorization", required = true) String token);

    @GetMapping(value = "find-user-logged")
    public ResponseEntity<User> findUserLogged(@RequestHeader(name = "Authorization", required = true) String token);

    @PostMapping(value = "new-user")
    public ResponseEntity<User> create(
            @RequestHeader(name = "Authorization", required = true) String token,
            @RequestBody RequestUserDTO requestUserDTO);

    @PutMapping(value = "update-user")
    public ResponseEntity<HttpStatus> update(
            @RequestHeader(name = "Authorization", required = true) String token,
            @RequestBody RequestUpdateUserDTO requestUpdateUser);

    @DeleteMapping(value = "delete")
    public ResponseEntity<HttpStatus> delete(@RequestHeader(name = "Authorization", required = true) String token,
                                             @RequestBody RequestDeleteUserDTO requestDeleteUserDTO);
}
