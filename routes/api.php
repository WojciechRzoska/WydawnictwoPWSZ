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

//Account routes
Route::post('/login', [\App\Http\Controllers\AuthController::class, 'Login']);
Route::post('/register', [\App\Http\Controllers\AuthController::class, 'Register']);
Route::post('/forgetpassword', [\App\Http\Controllers\ForgetPasswordController::class, 'ForgetPassword']);
Route::post('/resetpassword', [\App\Http\Controllers\ResetPasswordController::class, 'ResetPassword']);
Route::get('user',[\App\Http\Controllers\UserController::class, 'User'])->middleware('auth:api');
Route::resource('handle-user','App\Http\Controllers\UserController');



//payment routes
Route::post('/registerToken', [App\Http\Controllers\Przelewy24Controller::class, 'registerToken']);
Route::put('/paymentVerify', [App\Http\Controllers\Przelewy24Controller::class], 'paymentVerify' );

//Modules routes
Route::resource('book', 'App\Http\Controllers\BooksController');
Route::get('book/search/{key}',[\App\Http\Controllers\BooksController::class,'search']);
Route::resource('bulletin', 'App\Http\Controllers\BulletinsController');
Route::get('bulletin/search/{key}', [\App\Http\Controllers\BulletinsController::class, 'search']);
Route::resource('magazine', 'App\Http\Controllers\MagazinesController');
Route::get('magazine/search/{key}', [\App\Http\Controllers\MagazinesController::class, 'search']);
Route::resource('magazine-files', 'App\Http\Controllers\MagazineFilesController');
Route::get('magazines', [\App\Http\Controllers\MagazinesController::class, 'getAll']);

Route::post('/edit-text', [\App\Http\Controllers\EditWebsiteData::class, 'editInfo']);
Route::post('/add-text', [\App\Http\Controllers\EditWebsiteData::class, 'addInfo']);
Route::post('/delete-text', [\App\Http\Controllers\EditWebsiteData::class, 'deleteInfo']);



