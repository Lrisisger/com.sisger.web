package com.sisger.demo.section.application.service;

import com.sisger.demo.company.domain.Company;
import com.sisger.demo.section.domain.Section;
import com.sisger.demo.section.domain.dto.RequestDeleteSectionDTO;
import com.sisger.demo.section.domain.dto.RequestSectionDTO;
import com.sisger.demo.section.domain.dto.RequestUpdateSectionDTO;
import com.sisger.demo.section.domain.dto.ResponseSectionDTO;
import com.sisger.demo.user.domain.User;
import com.sisger.demo.util.AuthorityChecker;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

public interface SectionServiceInterface {
    List<ResponseSectionDTO> findAllSections(User user);
    Section create(RequestSectionDTO requestSectionDTO, User manager);
    void delete(RequestDeleteSectionDTO requestDeleteSectionDTO, User manager);
    Section update(RequestUpdateSectionDTO requestUpdateSectionDTO, User manager);
    Section findById(String id);
    ResponseSectionDTO findBySectionId(String id);
}
