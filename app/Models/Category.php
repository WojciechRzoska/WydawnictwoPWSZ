<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{

    //TODO: sprawdzic czy dzialaja te funkcje w controlerze
    public function getSubCategoryRelation(){
        return $this->hasMany('App\Category','category_id','id');
    }
}
