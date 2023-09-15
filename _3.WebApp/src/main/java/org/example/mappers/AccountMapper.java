package org.example.mappers;

import org.example.dto.account.RegisterDTO;
import org.example.entities.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AccountMapper {
    @Mapping(target = "password", ignore = true)
    UserEntity itemDtoToUser(RegisterDTO registerDTO);
}
