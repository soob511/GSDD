package com.ssafy.gsdd.service;

import com.ssafy.gsdd.DTO.NewsDTO;
import com.ssafy.gsdd.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class NewsService {
    @Autowired
    NewsRepository newsRepository;

    public List<NewsDTO> getList(String si, String gu) {
        return newsRepository.getList(si, gu).stream().map(n -> new NewsDTO(n.getTitle(), n.getUrl())).collect(Collectors.toList());

    }
}
