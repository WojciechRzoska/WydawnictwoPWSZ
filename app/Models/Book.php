<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'image_path', 'pages', 'pdf_path', 'year', 'ISBN', 'publisher', 'price'
    ];


    public function getCategoryRelation(){
        return $this->belongsToMany('App\Category','book_categories','book_id','category_id');
    }

    public function getTagRelation(){
        return $this->belongsToMany('App\Tag','book_tags','book_id','tag_id');
    }

    public function getAuthorRelation(){
        return $this->belongsToMany('App\Author', 'book_authors','book_id','author_id');
    }
}
