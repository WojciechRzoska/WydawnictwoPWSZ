<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MagazineFile extends Model
{
    use HasFactory;


    protected $table = 'magazine_files';

    protected $fillable = [
        'magazine_id', 'pdf_path'
    ];

    public function magazine() {
        return $this->belongsTo(Magazine::class);
    }
}
