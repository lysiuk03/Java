package org.example.entities;

import lombok.Data;

@Data
public class PostTagPK {
    private PostEntity post;
    private TagEntity tag;
}