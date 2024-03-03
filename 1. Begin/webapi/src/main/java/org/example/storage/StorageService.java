package org.example.storage;

import org.hibernate.annotations.SecondaryRow;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface StorageService {
    void init() throws IOException;
    String SaveImage(MultipartFile file, FileSaveFormat format) throws IOException;
    void deleteImage(String fileName) throws IOException;
}

