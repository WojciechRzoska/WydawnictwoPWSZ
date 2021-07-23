<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'image_path', 'pages', 'pdf_path', 'year', 'ISBN', 'publisher', 'price', 'quantity'
    ];


}
