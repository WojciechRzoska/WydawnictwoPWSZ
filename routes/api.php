<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::resource('book', 'App\Http\Controllers\BooksController');
Route::get('book/search/{key}',[\App\Http\Controllers\BooksController::class,'search']);
Route::resource('bulletin', 'App\Http\Controllers\BulletinsController');
Route::get('bulletin/search/{key}', [\App\Http\Controllers\BulletinsController::class, 'search']);
Route::resource('magazine', 'App\Http\Controllers\MagazinesController');

//Route::get('magazine',[\App\Http\Controllers\DataTestController::class,'index']);



