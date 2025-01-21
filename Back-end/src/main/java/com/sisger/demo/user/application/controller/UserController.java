package com.sisger.demo.user.application.controller;

import com.sisger.demo.exception.BadRequestException;
import com.sisger.demo.exception.InternalServerErrorException;
import com.sisger.demo.exception.UnauthorizedException;
import com.sisger.demo.infra.security.TokenService;
import com.sisger.demo.user.domain.Role;
import com.sisger.demo.user.domain.User;
import com.sisger.demo.user.domain.dto.*;
import com.sisger.demo.user.application.service.UserService;
import com.sisger.demo.util.AuthorityChecker;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("user")
@RequiredArgsConstructor
@Log4j2
public class UserController implements UserControllerInterface{

    private final TokenService tokenService;
    private final UserService userService;

    @Override
    public ResponseEntity<HttpStatus>  changePassword(String token, ChangePasswordDTO changePasswordDTO) {
        log.info("[inicia]  UserController - changePassword");

        userService.changePassword(validateToken(token),
                changePasswordDTO.getOldPassword(),
                changePasswordDTO.getNewPassword());

        log.info("[fim]  UserController - changePassword");
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<List<ResponseUserDTO>> findAll(String token) {
        log.info("[inicia]  UserController - findAll");

        var user = validateToken(token);
        AuthorityChecker.requireManagerAuthority(user);
        List<ResponseUserDTO> userList = userService.findAllByCompany(user.getCompany());

        log.info("[fim]  UserController - findAll");

        return ResponseEntity.ok().body(userList);
    }

    @Override
    public ResponseEntity<ResponseUserDTO> findUserLogged(String token) {
        log.info("[inicia]  UserController - findUserLogged");
        var user = validateToken(token);
        ResponseUserDTO responseUserDTO = userService.buildUserResponse(user);
        log.info("[fim]  UserController - findUserLogged");
        return ResponseEntity.ok().body(responseUserDTO);
    }

    @Override
    public ResponseEntity<ResponseUserDTO> findById(String token, String id) {
        log.info("[inicia]  UserController - findById");
        var user = validateToken(token);
        AuthorityChecker.requireManagerAuthority(user);
        var employeeDTO = userService.findByIdResponseDTO(id, user);

        log.info("[fim]  UserController - findById");

        return ResponseEntity.ok().body(employeeDTO);
    }

    @Override
    public ResponseEntity<ResponseUserDTO> create(String token, RequestUserDTO requestUserDTO) {
        log.info("[inicia]  UserController - create");
        var user = validateToken(token);

        AuthorityChecker.requireManagerAuthority(user);

        if(requestUserDTO.getRole().equals(Role.MAIN))
            throw new BadRequestException(
                    "Autoridade não pode ser MAIN, por favor refaça a solicitação com role MANAGER ou menor");

        if(user.getCompany() == null)
            throw new InternalServerErrorException("Erro interno, por favor contate o suporte");

        var newEmployee = userService.createRegularUser(requestUserDTO, user);


        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newEmployee.getId())
                .toUri();
        log.info("[fim]  UserController - create");

        return ResponseEntity.created(location).body(newEmployee);

    }

    @Override
    public ResponseEntity<HttpStatus>  update(String token, RequestUpdateUserDTO requestUpdateUser) {
        log.info("[inicia]  UserController - update");
        var user = validateToken(token);
        AuthorityChecker.requireManagerAuthority(user);

        userService.update(requestUpdateUser, user);

        log.info("[fim]  UserController - update");
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<HttpStatus> delete(String token, RequestDeleteUserDTO requestDeleteUserDTO) {
        log.info("[inicia]  UserController - delete");

        var user = validateToken(token);
        AuthorityChecker.requireManagerAuthority(user);
        userService.delete(requestDeleteUserDTO, user);

        log.info("[fim]  UserController - delete");

        return ResponseEntity.noContent().build();
    }

    private User validateToken(String token) {
        log.info("[inicia]  UserController - validateToken");
        var user = tokenService.getUserByToken(token);
        if(user == null) throw new UnauthorizedException("Invalid token");
        log.info("[fim]  UserController - validateToken");
        return user;
    }

}
