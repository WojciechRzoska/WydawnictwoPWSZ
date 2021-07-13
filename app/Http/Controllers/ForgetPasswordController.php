<?php

namespace App\Http\Controllers;

use App\Http\Requests\ForgetPasswordRequest;
use App\Mail\ForgetPasswordMail;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class ForgetPasswordController extends Controller
{
    public function ForgetPassword(ForgetPasswordRequest $request){
        $email = $request->email;

        if (User::where('email',$email)->doesntExist()) {
            return response([
                'message' => 'Email Invalid'
            ],401);
        }

        // generate Random Token
        $token = rand(10,100000);

        try{
            DB::table('password_resets')->insert([
                'email' => $email,
                'token' => $token
            ]);

            // Mail Send to User
            Mail::to($email)->send(new ForgetPasswordMail($token));

            return response([
                'message' => 'Reset Password Mail send on your email'
            ],200);

        }catch(Exception $exception){
            return response([
                'message' => $exception->getMessage()
            ],400);
        }
    }
}
