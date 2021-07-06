<?php

namespace App\Http\Controllers;

use App\Models\Magazine;
use Illuminate\Http\Request;

class DataTestController extends Controller
{
      function index($id){
          return Magazine::find($id);
      }
}
