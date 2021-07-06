<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Magazine extends Model
{
    use HasFactory;

    protected $table = 'magazines';

    protected $fillable = [
        'title', 'ISSN', 'release', 'image_path'
    ];

    public function magazineFiles() {
        return $this->hasMany(MagazineFile::class);
    }
}
