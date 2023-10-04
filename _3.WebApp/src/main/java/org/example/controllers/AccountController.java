package org.example.controllers;

import lombok.RequiredArgsConstructor;
import org.example.dto.account.AuthResponseDto;
import org.example.dto.account.LoginDto;
import org.example.dto.account.RegisterDTO;
import org.example.services.AccountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/account")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService service;

    @PostMapping("login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginDto dto) {
        try {

            var googleSecretKey = "6LctSFIoAAAAAAkT0xS6X6VknXkzp5RZBLPNtTHt";
            //Перед перевіркою даних користувача відправити запит на гугл і переконатися, що гугл
            //перевірив форму перед відправкою нам.
            var auth = service.login(dto);
            return ResponseEntity.ok(auth);
        }
        catch(Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register(@RequestBody RegisterDTO registrationRequest) {
        try {
            service.register(registrationRequest);
            var auth = service.login(LoginDto
                    .builder()
                            .email(registrationRequest.getEmail())
                            .password(registrationRequest.getPassword())
                    .build());
            return ResponseEntity.ok(auth);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}
